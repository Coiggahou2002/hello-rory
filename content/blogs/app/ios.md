---
title: iOS 开发学习笔记
---

# iOS 开发学习笔记

## Cocoa Touch 

Cocoa: 最初是作为用于为 NeXTStep 操作系统构建应用程序的收集框架而诞生的

Cocoa Touch: Cocoa Touch是作为 Cocoa 的 iOS 版本推出的

## 系统 Feature

- Push 推送
- 桌面长按便捷选项
- Widgets
- Universal Links

## 工具

写代码+编包：XCode

看 View 结构：Lookin

抓包代理：Whistle/WireShark/Charles

MachOView: 用于查看 Mach - O（Mach Object）文件格式内容的工具

Cydia Impactor: 越狱恢复工具


## CoreGraphics

各种结构：
- CGSize (width, height)
- CGPoint (x, y)
- CGRect (x, y, width, height)
- CGVector
- CGColor

> CGColor 和 UIColor 有什么区别？


```objc
CGRectMake(1,2,100,100)
CGPointMake(1,2)
```


## UIColor

```objc
self.view.backgroundColor = [UIColor redColor];
```

## UIImage

## UIView

### 生命周期

```objc
@interface TestView : UIView
@end


@implementation TestView

- (instancetype) init {
    self = [super init];
    if (self) {
        
    }
    return self;
}

- (void)willMoveToSuperview:(nullable UIView *)newSuperview{
    [super willMoveToSuperview:newSuperview];
}

- (void)didMoveToSuperview{
    [super didMoveToSuperview];
}

- (void)willMoveToWindow:(nullable UIWindow *)newWindow{
    [super willMoveToWindow:newWindow];
}

- (void)didMoveToWindow{
    [super didMoveToWindow];
}

@end
```


## UIViewController

### 生命周期

- init
- viewDidLoad（设置子 View 的代码一般在这里）
- viewWillAppear
- viewDidAppear
- viewWillDisapper
- viewDidDisapper
- Dealloc

```objective-c
//
//  ViewController.m
//
//  Created by rorycai on 2024/12/14.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (instancetype)init{
    self = [super init];
    if (self) {
        
    }
    return self;
}

- (void)viewDidLoad {
    // 初始化逻辑都应该放这里
    // 通常用来在这里加上子 View
    
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = [UIColor whiteColor];
    [self.view addSubview:({
        UILabel *label = [[UILabel alloc] init];
        label.text = @"relloWorld";
        [label sizeToFit];
        label.center = CGPointMake(self.view.frame.size.width/2, self.view.frame.size.height/2);
        label;
    })];
    
    TestView *view2 = [[TestView alloc] init];
    view2.backgroundColor = [UIColor greenColor];
    view2.frame = CGRectMake(150, 150, 100, 100);
    [self.view addSubview:view2];

//    UIView *view = [[UIView alloc] init];
//    view.backgroundColor = [UIColor redColor];
//    view.frame = CGRectMake(0, 100, 200, 300);
//    [self.view addSubview:view];
}

- (void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated{
    [super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated{
    [super viewDidDisappear:animated];
}

@end

```
## UIButton

## UIImageView

## UITextView

## UIScrollView

```objc
CGSize contentOffset
CGPoint contentSize
```

### UIScrollViewDelegate


## UITableView

### UITableViewDelegate
### UITableViewDataSource


## UICollectionView

## UIResponder

## UIGestureRecognizer

## 并发控制