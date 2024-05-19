---
navigation: false
---

# JavaScript 在 V8 中的事件循环机制

## 函数执行栈 Call Stack
函数执行过程调用栈示例

```js
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  bar()
  baz()
}

foo()
```

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202401081403709.png)

类似于上述代码的正常情况下，语句逐行被放入函数调用栈，被执行

当我们使用 setTimeout() 时，情况与上面稍有不同

调用 setTimeout() 时，浏览器或 Node.js 会启动定时器。当定时器到期时，回调函数会被放入任务队列中，而不是立即执行。

任务队列又是什么东西？和函数执行栈在结构和执行上有什么区别和顺序？

这就要先讲事件循环的概念了。

## 事件循环 Event Loop

事件循环是什么？它是一个 JavaScript 引擎在等待任务、执行任务、进入休眠状态等待更多任务这几个状态之间转换的无限循环。

事件循环首先处理在函数执行栈中的栈帧，一旦执行栈空，就开始处理任务队列中的东西。

浏览器中 JavaScript 的执行流程和 Node.js 中的流程都是基于 事件循环 的。

### 整体结构概览

要理解事件循环，我们需要且仅仅需要关注这些成分：

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202401081403962.png)

- Call Stack 函数执行栈
- Macro Task Queue 宏任务队列
- Micro Task Queue 微任务队列
- Browser Threads 浏览器线程

### 大致流程

注意，图中 task queue 指的是宏任务队列，microtask queue 指的是微任务队列

下图来源于 Stack Overflow 的一个回答

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202401081402485.png)

### 更详细的事件循环算法

（尽管与 规范 相比仍然是简化过的）
1. 从 宏任务 队列（例如 “script”）中出队（dequeue）并执行最早的任务。
2. 执行所有 微任务：当微任务队列非空时，出队（dequeue）并执行最早的微任务。
1. 如果有变更，则将变更渲染出来。
2. 如果宏任务队列为空，则休眠直到出现宏任务。
3. 转到步骤 1。
注意，这其中是夹着浏览器的渲染工作的，也就是说，如果有一个宏任务，里面有非常大量的计算密集型代码，而且会占用很长时间，那么它一定会阻塞 UI，在这时候，我们通常用 0 延迟的 setTimeout 将其拆分成多个宏任务，给浏览器留一点渲染 (喘息)的空挡，就不会阻塞 UI

### 宏任务和微任务

一般来说，这些任务是宏任务：
- main 函数代码
- setTimeout 回调
- setInterval 回调
这些是微任务：
- Promise 回调

### 示例代码解释

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202401081402498.png)

1. 首先，整个主代码段可以看作一个 main 函数，视为第一个宏任务
2. 事件循环取出第一个宏任务，按顺序执行代码
  1. 创建一个 Promise
  2. 执行这个 Promise，用 then 语句传入一个匿名回调函数（此匿名函数被放入微任务队列）
  3. 调用 setTimeout，计时是 0，回调函数被立即放入宏任务队列
  4. 走 5 次 for 循环，打印 5 个数字
  5. 打印 main 函数最后一个 log 语句
3. 此时执行栈空，宏任务队列和微任务队列各有一个任务
4. 因为刚完成的 main 属于一个宏任务，所以接下来要取出微任务队列中的所有任务依次执行，直到微任务队列空（只有一个任务，也就是 promise 的回调）
5. 执行 Promise 的回调函数
6. 此时微任务队列空，从宏任务队列取一个宏任务执行（即 setTimeout 的回调函数）
7. 执行完毕，程序结束

### setTimeout(fn, 0) 的解释

使用零延迟的 setTimeout(f) 可以安排一个新的 宏任务（其实就是隐式将 fn 推入宏任务队列）
它可被用于将繁重的计算任务拆分成多个部分，以使浏览器能够对用户事件作出反应，并在任务的各部分之间显示任务进度。

此外，也被用于在事件处理程序中，将一个行为（action）安排（schedule）在事件被完全处理（冒泡完成）后。

## 手动安排微任务

安排一个新的 微任务：

- 使用 queueMicrotask(f)。
- promise 处理程序也会通过微任务队列。
在微任务之间没有 UI 或网络事件的处理：它们一个立即接一个地执行。
所以，我们可以使用 queueMicrotask 来在保持环境状态一致的情况下，异步地执行一个函数。

## 参考

[官方规范参考](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

[现代 JavaScript 教程](https://zh.javascript.info/event-loop)
