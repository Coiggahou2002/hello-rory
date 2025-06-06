---
title: encodeURIComponent 居然也会报错？split 真的能正确切分字符串吗？
---

## 一、背景

活动类型的 H5 页面，由于设计需要，经常有一些特殊的字体，此时把整个字体打进去，会让页面加载时间变得很慢（即使[设置字体不阻塞渲染](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face/font-display#%E5%AD%97%E4%BD%93%E6%98%BE%E7%A4%BA%E6%97%B6%E9%97%B4%E8%BD%B4)，也会有抖动的问题）。

这是因为一个完整的中文字体文件通常包含数千个字符，动辄几 MB 大小（一些自己制造的字体可能还会有 10MB 以上），而实际页面可能只用到其中几十个字。

为了解决这个问题，我们业务有个**字体下发服务**，通过 HTTP 请求，在 query 带上需要的字体字符串和字体名，就能拿到一段 @font-face 声明，里面只包含所需要的字体。这样可以大大减少字体文件的体积，提升页面加载速度。

这个服务的工作原理是：接收到请求后，会从完整字体文件中提取出指定字符对应的字形数据，然后生成一个新的字体文件，最后包装成 @font-face 声明返回给前端。这样前端只需要加载包含实际需要字符的字体文件。

## 二、问题是如何出现的？

向字体服务发起的请求是这样编码的：
```ts
const resource = QueryString.stringifyUrl({
    url: 'https://example.com/getfont',
    query: {
        font: "SourceHanSerifCN",
        text: "这是我需要的所有字符",
    },
});
```

由于 query-string [底层还是用 encodeURIComponent 去编码](https://github.com/sindresorhus/query-string/blob/main/base.js) query，实际上就是
```ts
const resource = `https://example.com/getfont?font=SourceHanSerifCN&text=${encodeURIComponent(allCharsThatINeed)}`;
```

然后发现 encodeURIComponent 报了个错：
```
ErrMessage: URI malformed
```

根据 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Malformed_URI) ，URI 编码和解码不成功。传递给 decodeURI、encodeURI、encodeURIComponent 或 decodeURIComponent 函数的参数不合法，导致函数无法正确对其进行编解码，此时 JavaScript 会抛出“malformed URI sequence”异常。


## 三、排查过程

当时传给 `encodeURIComponent` 的就是这样一个计算属性的值，主要从一些业务数据里取出需要特殊字体的字符，然后组合到一起。

```ts
const textNeedSpecialFont = computed(() => {
  return Array.from(
    new Set(
      [
        giftMsg.value, 
        senderName.value, 
        "0123456789", "月日", "赠于"
      ].join("").split("")
    )
  );
});
```

可以看到，这个计算属性内的逻辑是这样的:

1. 把动态的、静态的字符串拼到一起
2. 用 `split` 把拼接后得到的字符串逐个字符拆开
3. 构造一个 Set 来对字符进行去重
4. 去重后转成字符数组

通过排除法发现，去掉动态字符串之后就没有报错了，说明是 `giftMsg.value` 或 `senderName.value` 的问题

进一步发现是 `senderName.value` 导致的

于是我们打印 senderName 的原字符串：
```
听巴黎你你𓇽𓃛𓀜
```

**哦吼，这里面有 emoji。**

于是我们按照上述计算属性的逻辑，单独对 senderName 执行这段处理：
```ts
[...new Set([senderName.value].join('').split(''))]
```

得到如下
```ts
[ '听', '巴', '黎', '你',
  '\ud80c',
  '\uddfd',
  '\udcdb',
  '\udc1c',
]
```

看起来很像 emoji 的代理对被拆开了。

:::info
在 Unicode 中，码点范围 U+10000 到 U+10FFFF 的字符需要用 UTF-16 代理对（Surrogate Pair） 表示。大多数 emoji 属于 Unicode 增补字符，需要用 UTF-16 代理对（两个 16 位码元）表示。split('') 会将代理对拆分为两个单独的码元。
:::

**但是仔细一想，还有两个问题**：

1. 数量不够，一共有三个 emoji，被拆掉的话应该要有六个才对。
2. 是否被拆开之后，encodeURIComponent 就没法正常处理他们呢？

对于问题 2： 查阅一下 MDN 文档就发现，确实如此，被拆开的话就会报错了。

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202506061139800.png)

对于问题 1：仔细一想，这里是用 Set 去重过的，我们去掉去重的步骤，只做 split，得到：

```ts
['𓇽𓃛𓀜'].join('').split('')

['\uD80C', '\uDDFD', '\uD80C', '\uDCDB', '\uD80C', '\uDC1C']
```

有一个 [叫 Symbol 的网站](https://symbl.cc/)，我们可以把 emoji 粘进去，看它的码点 or 在各种编码方式下的形式。

我们来查一下这三个 emoji 是否分别对应这些代理对

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202506061203654.png)

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202506061204951.png)

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202506061205438.png)

我们发现，这三个 emoji 的 unicode 码点分别对应的是：`U+131FD`, `U+130DB`, `U+1301C`。

在 UTF-16BE 编码方式下，他们分别被编码成：
- `DB 0C DD FD`, 即 `\uD80C\uDDFD`
- `D8 0C DC DB`, 即 `\uD80C\uDCDB`
- `D8 0C DC 1C`, 即 `\uD80C\uDC1C`

<!-- :::IRealtimeCompressedFontsOptions -->
:::info
在 JavaScript 中，字符串 string [使用 UTF-16 编码](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_%E5%AD%97%E7%AC%A6%E3%80%81unicode_%E7%A0%81%E4%BD%8D%E5%92%8C%E5%AD%97%E7%B4%A0%E7%B0%87)
:::

好，这下完全确认了，原来的 `senderName` 含有这三个 emoji，被 `split` 函数把代理对拆开了，拆开之后，`encodeURIComponent` 无法处理，所以报错。


## 四、解决办法

### 方法 1 使用扩展运算符代替 split

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202506061429162.png)

:::error
扩展运算符似乎会有下面的这种问题：
:::

```ts
// Standard String.split
'♥️'.split('') => ['♥', '️']
'Emoji 🤖'.split('') => ['E', 'm', 'o', 'j', 'i', ' ', '�', '�']
'👩‍👩‍👧‍👦'.split('') => ['�', '�', '‍', '�', '�', '‍', '�', '�', '‍', '�', '�']

// ES6 string iterator
[...'♥️'] => [ '♥', '️' ]
[...'Emoji 🤖'] => [ 'E', 'm', 'o', 'j', 'i', ' ', '🤖' ]
[...'👩‍👩‍👧‍👦'] => [ '👩', '', '👩', '', '👧', '', '👦' ]
```

### 方法 2 把字符串里的 emoji 直接去掉

:::error
emojiRegex 为什么不行？要研究清楚
:::

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll

用 replaceAll + emojiRegex 在 joined 的字符串里面，没法匹配到


### 方法 3 使用 runes 正确分割含 emoji 的字符串

[runes](https://github.com/dotcypress/runes) 是一个小巧简洁的 JS 库，提供了一个 `runes` 函数，能够正确分割含有 emoji 的字符串成字符数组。

```ts
const runes = require('runes')

runes('♥️') => ['♥️']
runes('Emoji 🤖') => ['E', 'm', 'o', 'j', 'i', ' ', '🤖']
runes('👩‍👩‍👧‍👦') => ['👩‍👩‍👧‍👦']
```

## 五、兜底保护

退一万步讲，万一发生这种问题，字体样式不对，总比整个界面挂掉要好，所以这里可以补充一个 try-catch

```javascript
try {
  const encoded = encodeURIComponent("你好，世界!");
  console.log(encoded); // 输出: "%E4%BD%A0%E5%A5%BD%EF%BC%8C%E4%B8%96%E7%95%8C!"
} catch (e) {
  console.error("编码过程中出现错误:", e);
}
```

## 附、完整代码

解决了这个问题，顺便封装一个 composable 在 Nuxt 框架里，传入字体名和字符集就可以直接使用了。
```tsx
import type { Ref, ComputedRef } from 'vue';
import QueryString from 'query-string';
import runes from 'runes';

export enum SupportedFonts {
    SourceHanSerifCN_Medium = 'SourceHanSerifCN-Medium.ttf',
    SourceHanSerifCN_Heavy = 'SourceHanSerifCN-Heavy.ttf',
    FZZhengHeiS_B_GB = 'FZZhengHeiS-B-GB.ttf',
}

export interface IRealtimeCompressedFontsOptions {
    fontName: SupportedFonts;
    chars: ComputedRef<string[] | string>;
}

export const useRealtimeCompressedFonts = (
    options: IRealtimeCompressedFontsOptions
) => {
    const { fontName = '', chars = '' } = options;
    if (!fontName) {
        console.warn('useRealtimeCompressedFonts: fontName is required');
        return;
    }
    if (!chars) {
        console.warn('useRealtimeCompressedFonts: chars is required');
        return;
    }
    // add .ttf if fontName is not end with .ttf
    const suffixedFontName = fontName.endsWith('.ttf')
        ? fontName
        : `${fontName}.ttf`;
    const charSequence = computed(() => {
        if (!chars.value || chars.value.length === 0) {
            return '';
        }
        const charString = (() => {
            // 确保是字符串数组，过滤掉不是 string 的元素
            if (Array.isArray(chars.value)) {
                return chars.value.filter(v => typeof v === 'string').join('');
            }
            if (typeof chars.value === 'string') {
                return chars.value;
            }
            console.warn('useRealtimeCompressedFonts: chars is not a string or array of strings');
            return '';
        })();
        const runed = runes(charString);
        const charSet = new Set(runed);
        return [...charSet].join('');
    });
    let resource = '';
    try {
        resource = QueryString.stringifyUrl({
            url: 'https://example.com/getfont',
            query: {
                font: suffixedFontName,
                text: charSequence.value,
            },
        });
    } catch(err) {
        console.error('useRealtimeCompressedFonts: ', err);
        resource = QueryString.stringifyUrl({
            url: 'https://example.com/getfont',
            query: {
                font: suffixedFontName,
                text: "",
            },
        });
    }
    useHead({
        link: [{ rel: 'stylesheet', href: resource }]
    });
};

```