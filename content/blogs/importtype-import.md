---
time: 2024-06-23
author: rorycai
---
# 从 import 与 import type 的区别引出的深入讨论

## 背景

工作中，一直稳定运行的 Nuxt 3 框架的其中一个页面突然在生产环境出现 500，遂与同事用本地 dev 模式排查问题。

以本地开发模式排查报错的过程中，发现了项目抛出了一个错误 `SyntaxError: The requested module myTypes does not provide an export named 'SomeType'`，是由于在引入一个类型时，使用了 import 而不是 import type 导致的, 如下所示。

```ts
// 项目里的写法 (导致报错)
import { SomeType, SomeInterface, SomeEnum } from "@/types/myTypes";

// 规范些应该这样写
import { type SomeType, type SomeInterface, SomeEnum } from "@/types/myTypes";

// 最严格的写法应该是
import type { SomeType, SomeInterface } from "@/types/myTypes";
import { SomeEnum } from "@/types/myTypes";
```

> 其实第三种写法是最规范的，第二种写法是有隐患的，至于为什么先按下不表，在本文后面详细解释


在此之前，我们已经知道有这个写法规范的问题存在，但 Nuxt 3 框架在之前并不会因为这个问题而报错，为什么现在突然因为这个问题报错了呢？

因为该项目近段时间刚升级过框架，第一想法是框架升级导致的，所以查原因的重点主要在以下几个方面：
1. Nuxt 框架升级过程中，是否有 TS 相关的配置性变动？
2. 为什么类型的问题，却导致抛出运行时的错误？


## 前置知识

### 类型和值

`type` 和 `interface` 在 TypeScript 编译过程中一般会直接被删除，不会留在产物 JS 代码中, 而 `enum` 是会以双向 map 对象的形式留在产物 JS 代码中，此中我们称 `type` 和 `interface` 这种不产生 JS 代码产物的类型为**纯类型**，把 `enum` 这种会产生 JS 代码产物的类型称为**带值类型**。

由于我们在下文中只关心它们**是否产生 JS 产物**这项区别，所以我们把他们一个叫作**类型**，一个叫作**值**。
 
### TS 转译器

负责将 TS 转成 JS 的工具，有很多种，官方的工具是 typescript（一般称为 tsc）, 此外还有 Babel, esbuild, SWC 等。

这里简单介绍下 esbuild:

它是一个用 golang 语言编写的打包器（bundler），能够将 TS 转为 JS，但并不会进行类型检查，需要额外运行类型检查器。不同于 tsc，它使用的是单文件转译模式。

> 单文件转译模式在下文会详细解释。

- 仅尊重某些 tsconfig 字段
- https://esbuild.github.io/content-types/#typescript-caveats 详细叙述了如果用esbuild来打包TS项目，需要注意什么，需要开启哪些tsconfig

### 缩写和简称的声明

下文中均用 TS 代指 TypeScript，用 JS 代指 JavaScript，用 tsc 代指微软官方的 TypeScript 编译器

## 抛出运行时错误的原因分析

要分析这一点，我们需要对 Nuxt 3 这个框架和 TypeScript 的编译行为有基本的了解。

我们的运行时错误信息说明，项目在客户端运行时(Client Runtime)向 `@types/myTypes` 这个模块请求了 `SomeType` 这个值，但却没有拿到，这说明 `import { SomeType } from '@types/myTypes'` 这句话，被留到了打包后的 JS 产物中（因为运行时跑的肯定是转译后的 JS 而不是 TS）。

但仔细一想，这句话其实不应该被留掉打包后的 JS 产物中，为什么呢？因为 `SomeType` 是一个纯类型，它并不为运行时提供任何值，只在编译时起作用，用来辅助类型检查器为写代码的人提供类型检查和类型提示，所以这句话应该在编译期被去除。

为什么没有被去除呢？这个就是本文的重点了。

## 编译器是怎么处理 import 语句的？

通常来说，我们在文件 A 中 import 文件 B 提供的东西，是为了使用模块化机制合理拆分代码，以及为了在 A 文件中使用 B 提供的某些东西（）

> 如果我们安装了 lint 插件，import了但是没有使用的东西，lint会提示 unused import 报错，我们会把它移除

通常来说，我们写的是 TS，但运行时跑的是 JS，TS 编译器总是要做一些工作，将我们的 JS 转换成 TS。

编译器在遇到 import 语句的时候，可能会做各种行为（包括解析模块引用、查找文件等），除此之外，编译器还需要决定每一条 import 语句的去留，面对这个问题（我们这里主要讨论这个问题），编译器可以做两个选择：

**1. 移除这个 import 语句**

- 如果编译器认为， import 的这个东西并没有在代码中被使用，当然要移除它
- 如果编译器认为，import 的这个东西，是一个纯类型，编译器就应该把它移除，因为如果不移除，最后的 JS 代码里就会有 `import { SomeType } from '@/types/myTypes'`，但最后的 JS 代码里并不会有 `SomeType`（因为 TS 编译器会直接移除所有纯类型的声明），此时就会引发运行时的报错：`SyntaxError: The requested module 'myTypes' does not provide an export named 'SomeType'`

**2. 留下这个 import 语句**

- 这个最简单，当编译器不确定一条语句是否能够被移除时，他就会保留

---

**那么问题又来了：**
- 第一个问题，编译器如何判定import的东西是否在代码中被使用？
- 第二个问题，编译器如何知道你 import 的东西是一个纯类型，还是一个值？


### 编译器如何判定 import 的东西是否在代码中被使用

这个一般通过语法分析就可以实现，几乎所有代码编译的第二步（第一步是将字符串根据关键字和特定符号切分成 tokens）都是将 tokens 列表转换为 AST（Abstract Syntax Tree，抽象语法树），编译器会遍历 AST 和符号表，检查是否有对导入模块的成员进行引用。如果一个成员在代码中被引用，它就会被标记为“已使用”。

当然，也有编译器判定不了的特殊情况，例如被 `eval()` 包裹的代码字符串，里面是一个字符串字面量，但实际意义却是代码，但编译器只是将其识别为了字符串字面量，并没有转换成AST，所以是漏网之鱼。

```ts
// 编译器会认为你并没有使用到 Animal 这个东西

import { Animal } from './animals'

eval('let b = new Animal()');
```

### 编译器如何判断 import 的东西是类型还是值？

第一种情况，如果你显式声明了引用的是类型，编译器就不用猜了;

第二种情况，如果你并没有显式声明 import 的是类型还是值...

```ts
// 显式声明引用的是一个类型而不是值，编译器就不用猜了，直接移除这一行
import type { SomeInterface } from './types'

// 没有显式声明，而且类型和值混在一起，编译器需要逐个判断是否能去除
import { SomeInterface, SomeEnum } from './types'
```

具体来说，编译器是这样判断的：

- 对于 tsc 来说，它有办法利用多个文件蕴含的整个类型系统的信息，来发现你这个 `SomeInterface` 指代的是一个类型，而 `SomeEnum` 是一个值，它就会去除掉 SomeInterface，但保留 SomeEnum 的引入语句
- 对于 tsc 以外的 TypeScript 编译器来说，就不一定了——例如 Babel 的 TS 转译器和 esbuild 都是单文件转译的模式，他们不像 tsc 一样具备在整个类型系统信息的背景下转译这个文件的能力，所以**在某些情况下，他们没办法判断一个 `import A` 的 `A` 到底是不是一个纯类型**，那么此时编译器就并不能肯定地认为这个语句能够去掉，于是就会保留它。

这种被错误保留的语句，它们引用了在编译时已经被去除的类型声明，也就是在运行时引用了一个不存在的值，所以这种情况一般会引发一些 bug 或者运行时错误（这一点在 [TypeScript 官方文档](https://www.typescriptlang.org/tsconfig/#isolatedModules)和 [Evan Wallance 的回复](https://github.com/evanw/esbuild/issues/314#issuecomment-668401819)，以及 [esbuild 的文档](https://esbuild.github.io/content-types/#isolated-modules)中都有说明）


回到前面铺垫的 esbuild，它是单文件转译模式，也就意味着它无法像 tsc 那样在转译时拥有整个类型系统的信息（但是它快啊！在转译同样代码量的 TS 项目时，不需要关心太多上下文的 esbuild 比 tsc 快很多倍）

**题外话：** 这里恰好解释了为什么 Vite 在开发模式选用了 esbuild 来做 TS 的转译，因为这刚好符合 Vite 的「不打包、对浏览器按需提供文件」的模式

[Vite 官方文档的原话](https://vitejs.dev/guide/features.html#transpile-only)为：

> The reason Vite does not perform type checking as part of the transform process is because the two jobs work fundamentally differently. Transpilation can work on a per-file basis and aligns perfectly with Vite's on-demand compile model. In comparison, type checking requires knowledge of the entire module graph. Shoe-horning type checking into Vite's transform pipeline will inevitably compromise Vite's speed benefits.

## TS 的相关配置

TODO: 这里讲一下每个配置有什么作用

- isolatedModules: 为了让用单文件的编译器的用户，也能及时爆出一些错误
- importsNotUsedAsValues: 规定那些没有用到的 import 值应该怎么处理，remove/perserve/error
- preserveValueImports
- verbatimModuleSyntax

## 其他信息

- Vite 5.3.1 之前，生产打包用的是 @rollup/plugin-typescript, 之后换成了 esbuild
- Nuxt 3.7 发布的时候带上了 isolatedModules = true
- Nuxt 3.8 发布带上了 verbatimModuleSyntax = true
- Rollup 计划在 4.x 某个版本后改成 SWC 翻译
- 项目用的是 Nuxt 3.11 + Vite 4.5.3 + Rollup 3.2.9

TODO: 还有副作用记得说一下，以及配套的 typescript-eslint 的那个选项

## 参考资料

esbuild 作者：https://github.com/evanw/esbuild/issues/314#issuecomment-668401819

How exclude type which export by third library inside output?

https://github.com/evanw/esbuild/issues/341


## 影响这件事情的配置

tsconfig.json 选项

"isolatedModules": true

## 为什么Nuxt升级，这个东西变了？Nuxt是否改动过默认的tsconfig？