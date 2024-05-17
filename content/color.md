---
title: 'React Native 颜色处理相关'
navigation: false
desc: 颜色相关的处理库
time: 2024-05-01
---

# 🎨 颜色相关

<!-- [[__TOC__]] -->

## 颜色处理库

颜色字符串处理库：[tinycolor2](https://www.npmjs.com/package/tinycolor2)

最常见的使用场景——给某个颜色字符串添加透明度

```js
const color = 'rgb(2,23,1)';
const colorWithAlpah = tinycolor(color).setAlpha(0.2).toRgbString();
```

:::info 备注
感觉这个库的实现应该并不复杂，可以看看源码
:::



## 主题解决方案

通过 BaseColor 的方式，达成与团队的设计系统高效地保持一致


## 渐变

RN 里画渐变色需要引入一个 npm 包 [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient), 该包依赖原生组件，所以 `npm i` 安装完还需要 `pod install` 一下, 然后重新 Build

### 水平方向渐变
```tsx
<LinearGradient
    colors={['#0087FC', '#00A3F5']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    style={styles.linearGrad}
>
    <Text style={styles.buttonText}>SIGN IN</Text>
</LinearGradient>
```

### 垂直方向渐变

```tsx
<LinearGradient
    colors={['#0087FC', '#00A3F5']}
    start={{x: 0, y: 0}}
    end={{x: 0, y: 1}}
    style={styles.linearGrad}
>
    <Text style={styles.buttonText}>SIGN IN</Text>
</LinearGradient>
```

### 透明渐变

在 colors 的某一端使用 rgba 即可，例如
```tsx
colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
```

### 示例用法 (一个登陆按钮)

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202401072046003.png)

建议配合 VS Code 插件 [color-highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight) 使用, 可以一眼看清楚渐变的两端颜色