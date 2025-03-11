---
title: Objective-C 学习笔记
draft: true
--- 

# Objective-C 学习笔记

## 参考资料备忘

[官方文档](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html#//apple_ref/doc/uid/TP40011210-CH1-SW1)

## 数据类型

### 基本数据类型

标准 C 数据类型也是可以用的

```c
int someInt = 42;
float someFloat = 3.2f;
```

> 局部变量在栈上分配，而对象在堆上分配

```objc
BOOL a = YES;
```

### 非基本

```objc
// 根类型
NSObject

// 不可变类型
NSString : NSObject
NSNumber : NSObject

// 可变类型
NSMutableString : NSString

```

用法
```objc
NSString *str = @"fuckyou";

NSNumber *num = [[NSNumber alloc] initWithInt:42];

// 使用工厂方法 更方便
NSNumber *num2 = [NSNumber numberWithInt:43];

// 使用 boxed expression
NSNumber *num3 = @(84 / 2);
```

### 加@的数据类型

```objc
@[1,2,3,4]

@"我是一个字符串"

@{
    "a": @"I am a string"
}
```

### NSArray

### NSDictionary

## 打印

```objc
NSLog(@"I am a line of log");

// 行为类似 printf 的模板串，%@表示任何对象（会调用对象的 description 方法，类似 Java 类的 toString 方法）
NSLog(@"%@", greeting);
```

## 方法

### 调用

```objectivec
UIViewController *vc = [[UIViewController alloc] init];
```

在类 C 语言中相当于 
```js
UIViewController *vc = UIViewController.alloc().init()
```

### 传参

```objc
UIView *view = [[UIView alloc] init];
view.backgroundColor = [UIColor greenColor];
view.frame = CGRectMake(150, 150, 100, 100);
[self.view addSubview:view];
```

类似于 
```js
UIView *view = UIView.alloc().init();
view.backgroundColor = UIColor.greenColor();
view.frame = {
    x: 150,
    y: 150,
    width: 100,
    height: 100
};
self.view.addSubView(view);
```

传单个参数的例子
```objc
#import "Foundation/NSObjCRuntime.h"
#import "XYZPerson.h"

@implementation XYZPerson


- (void) saySomething:(NSString *)word {
    NSLog(@"%@", word);
}

- (void) sayHello{
    [self saySomething:@"Hello"];
}

@end
```


## 类

### 声明/实现/头文件

类的声明一般放在 `.h` 文件

类的实现放在 `.m` 文件


声明
```objc
// MyViewController.h

@interface MyViewController : UIViewController

// 属性应该写到 interface 里面
@property NSString *name;
@property NSNumber *id;
@property (readonly) NSString *readOnlyName;

// 减号表示是实例的方法
- (void)someMethod;

@end
```

实现
```objc
#import "MyViewController.h"

@implementation MyViewController

- (instancetype)init{
    self = [super init];
    if (self) {
        
    }
    return self;
}

- (void)viewDidDisappear:(BOOL)animated{
    [super viewDidDisappear:animated];
}


@end
```

### 初始化

初始化的时候，alloc 和 init 必须连续调用，然后拿最后那个返回值

- alloc 的作用是清除要分配的内存区域的脏数据
- init 的作用是给各种属性分配合适的初始值

```objc
// 用法 1
MyViewController *myVc = [[MyViewController alloc] init];

// 用法 2, 它实际上与不带参数调用alloc和init相同
MyViewController *myVc = [MyViewController new];
```