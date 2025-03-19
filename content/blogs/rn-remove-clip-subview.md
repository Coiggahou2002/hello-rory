---
title: React Native 列表 removeClippedSubview 的坑
time: 2025-01-22
---

# React Native 列表 removeClippedSubview 的坑


## 属性简介

React Native 官方文档在[如何优化 FlatList 性能](https://reactnative.dev/docs/0.72/optimizing-flatlist-configuration#removeclippedsubviews) 这篇博客，提到过一个名为 `removeClippedSubviews` 的属性，说是可以减轻主线程的计算负担，从而减少掉帧的出现。

其原理是把一些没出现在视图里的 subview 从它的 superview 上卸载下来（但仍然保留在内存中）

![removeClippedSubviews](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202503191118712.png)

## 背景 

我们业务有一个 IntersectionObserverView 组件，它使用一个 View 包裹一个目标组件（此处简称 target），使用 RN 提供的 [measure](https://reactnative.dev/docs/0.72/direct-manipulation#measurecallback) 方法来测量 target 出现在 RCTRootView 中的面积是否达到指定的要求，从而判定此组件是否「曝光」，然后触发对应的回调，主要为业务曝光埋点需求服务。

## 问题表现

我们有一个横向滑动列表（结构见下方例子），每个元素都套了一个 IntersectionObserverView，用于曝光埋点。

```tsx
const CustomComponent = ({ item }) => {
    return (
        <IntersectionObserverView>
            <Text>{item}</Text>
        </IntersectionObserverView>
    );
};

const App = () => {
    const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

    return (
        <FlatList
            horizontal
            removeClippedSubview
            data={data}
            renderItem={({ item }) => <CustomComponent item={item} />}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}
```

这个列表大概有 10+ 个元素，一般来说，手机屏幕下，如果用户不滑动，只能看到 3～4 个

但我们发现:

**第 4 个及它之后的元素，总是会上报曝光，而且曝光率是 100%**

数据分析师提出添加滑动埋点验证用户侧是否真的如此，我们通过 `onScrollBeginDrag` 添加埋点后发现: **上述问题是我们的 bug，大多数用户根本没有滑动，更不要说曝光后面的元素了。**

## 分析

### measure 的具体实现

measure 方法是 RCTUIManager 提供并暴露的方法，从下图容易看出，其原理是通过 `view.superview` 向上找到最顶部（最多到达 RCTRootView 结束）的祖先 view，然后返回 target 在祖先 view 坐标下的 bounds。

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202503191132453.png)


### removeClippedSubview 的逻辑

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202503191136306.png)


大致原理就是，如果设置了 `removeClippedSubview={true}`，就会走下面的逻辑：
- 如果父 view 完全包含子 view，就把子 view 完整挂载上来
- 如果父 view 和子 view 有相交部分，就递归调用此方法
- 如果父 view 和子 view 完全不相交，就对子 view 调用 `[view removeFromSuperview]`

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202503191137051.png)


### 两者结合产生的问题

由上面可以知道，如果子 view 与其父容器已经不相交，就会被从它的 superview 上卸载下来

那么很容易想到，此时如果对这个 view 调用 measure 方法，在通过 superview 往上走的过程中，并不能够到达 RCTRootView，而是在到达之前就会停在中途某个 view 上（具体中间有多少层级，取决于用户的具体布局）

这样一来，measure 得到的 bounds，就**不是** target 相对于 RCTRootView 的 bounds，那么 IntersectionObserverView 内部逻辑计算得到的相交比例就是错误的。

**有一种很典型的情况:**

假设 measure 方法在 target 往上爬的时候，只爬了一层就停下来了，那么此时通过返回的 bounds 计算出来的相交比例，很有可能接近于 1，此时就会被误判为「target 和根视图的相交比例很高，可以认为 target 几乎整个完全暴露在视图内了」，从而误认为target 曝光，然后上报错误的数据。

## 问题的本质

- 对列表设置 removeClippedSubview 属性，导致列表中不可见的 view 被从 superview 上卸载
- measure 得到了**不是相对于 RCTRootView 的** bounds，导致相交比例是错的，并误认为曝光 
- 从 measure 的返回值中，我们无法得知最终测量的相对祖先到底是不是 RCTRootView

## 解决方法

### (临时) 使用 `measureInWindow` 替代

:::warning{title=注意}
使用此方法的前提是，RCTRootView 和 window 在视觉尺寸上几乎等价，或者换句话说，RCTRootView 不是以部分形式存在的，而是几乎占满整个屏幕。
:::

measureInWindow 的逻辑和 measure 有点不同

它不会通过 `superview` 来一直往上爬，而是直接通过 `[view.window]` 获取比较的那个 frame，然后使用 `convertRect` 来转换坐标

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202503191159405.png)

使用此方法去 measure 一个 target 时，如果 target（或target 的某个祖先/父亲）已经被 removeFromSuperview 的话，通过 `[view window]` 拿到的是 `nil`，从而转换坐标得到的 bounds 是 `(0,0,0,0)`，由此得出的相交面积必然为 0，从而相交比例也是 0，恰好符合「未曝光」的性质。


### (彻底) 自定义 measure

桥一个自定义的 measure 方法，使得它能够多带一个信息，告诉我们相对祖先是不是 RCTRootView，然后交由业务侧自己判断是否要采用 or 相信它的返回结果。


```objc
- (void)customMeasureReactView:(NSDictionary *)params
                      resolver:(WRBridgeResolveBlock)resolve
                      rejecter:(WRBridgeRejectBlock)reject
{
    WRRCTBundleLoader *bundleLoader = [[WRRCTBundleLoaderManager sharedInstance] bundleLoaderWithKey:BundleLoader_Default];
    RCTBridge *bridge = bundleLoader.bridge;
    id tagObj = [params objectForKey:@"reactTag"];
    if (![tagObj isKindOfClass:NSNumber.class]) {
        if (reject) {
            reject(@"0", @"Type Error: expected parameter reactTag to be a number", nil);
        }
        return;
    }
    NSNumber *targetReactTag = (NSNumber*) tagObj;
    dispatch_async([bridge.uiManager methodQueue] , ^{
        [bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
            UIView *view = viewRegistry[targetReactTag];
            if (!view) {
                NSLog(@"invalid empty view pointer");
                if (reject) {
                    reject(@"0", @"Cannot retrieve view from viewRegistry by the given reactTag", nil);
                }
                return;
            }
                
            UIView *rootView = view;
            while (rootView.superview && ![rootView isReactRootView]) {
                rootView = rootView.superview;
            }
            BOOL relativeToRootView = [rootView isReactRootView];
            CGRect frame = view.frame;
            CGRect globalBounds = [view convertRect:view.bounds toView:rootView];
            
            NSDictionary *result = @{
                @"x": @(frame.origin.x),
                @"y": @(frame.origin.y),
                @"width": @(globalBounds.size.width),
                @"height": @(globalBounds.size.height),
                @"pageX": @(globalBounds.origin.x),
                @"pageY": @(globalBounds.origin.y),
                @"isRelativeToReactRootView": @(relativeToRootView),
            };
            if (resolve) {
                resolve(result);
            }
        }];
    });
}
```