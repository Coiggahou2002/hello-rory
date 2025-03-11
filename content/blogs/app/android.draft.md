---
draft: true
---

# Android 开发学习笔记

## 官方指南

[官方 Android 开发指南](https://developer.android.com/guide?hl=zh-cn)

## 开发环境

- Android Studio
- adb

## Kotlin

- 数据类型/变量声明/控制流
- 数据结构/迭代器
- Null 安全
- 函数/高阶函数/Lambda

## 概念

### Gradle

是什么：自动化构建工具

解决什么问题：
- 依赖管理（Android 开发界的 npm）
- 自动化构建（增量/缓存）
- 编写构建脚本
- 插件系统
- 与 CI/CD 工具链集成

### Activity

Activity 是 Android 应用程序的基本构建块之一，代表用户界面的一个单独屏幕或窗口。它是用户与应用程序交互的主要方式。

主要特点：

1. 用户界面：每个 Activity 通常对应一个特定的用户界面布局。

2. 生命周期：Activity 有明确定义的生命周期，由系统管理。

3. 堆栈管理：多个 Activity 可以按照后进先出的顺序排列在一个任务栈中。

4. 独立性：每个 Activity 都是相对独立的组件，可以单独启动。

5. 数据交换：Activity 之间可以通过 Intent 传递数据。

6. 状态保存：Activity 可以保存和恢复其状态，以应对配置变化或系统回收。

7. 系统集成：可以响应系统事件，如来电或屏幕旋转。

Activity 是 Android 应用开发中最常用和最重要的组件之一，理解和正确管理 Activity 对于创建高质量的 Android 应用至关重要。


### Fragment

Fragment 是 Android 应用开发中的一个重要概念，它是一种可以嵌入到 Activity 中的组件，用于构建灵活和可重用的用户界面片段。

主要特点：

1. 可重用性：Fragment 可以被多个 Activity 重用。

2. 模块化：可以将复杂的 UI 分解为小的、可管理的片段。

3. 动态性：Fragment 可以在运行时动态地添加、移除或替换。

4. 生命周期：Fragment 有自己的生命周期，可以独立于 Activity 进行管理。

5. 数据共享：Fragment 可以与 Activity 共享数据。

6. 用户界面：Fragment 可以包含自己的用户界面布局。

7. 系统集成：可以响应系统事件，如配置变化。

### Fragment vs Activity

#### 区别

| 特性 | Activity | Fragment |
|------|----------|----------|
| 生命周期 | 完整的、独立的生命周期 | 依附于宿主 Activity，但有自己的生命周期方法 |
| 用户界面 | 通常代表一个完整的屏幕 | 代表屏幕的一部分，可以组合使用 |
| 复用性 | 复用性较低，通常代表独立功能 | 设计用于高度复用，可在不同 Activity 中重复使用 |
| 灵活性 | 切换涉及整个屏幕变化 | 可以在同一屏幕内动态添加、移除或替换 |
| 通信方式 | 通常使用 Intent 通信 | 可以直接与宿主 Activity 通信，也可以通过接口与其他 Fragment 通信 |


#### 适用场景

Activity 适用于：
- 应用的主要入口点
- 需要完整屏幕展示的独立功能
- 与系统交互的场景（如接收系统 Intent）

Fragment 适用于：
- 构建模块化、可重用的 UI 组件
- 实现多窗格布局（如平板电脑上的主从视图）
- 在大屏幕设备上优化布局
- 实现底部导航栏或侧边栏等可切换的 UI 元素

选择使用 Activity 还是 Fragment 取决于应用的具体需求、复杂度和目标设备类型。在现代 Android 开发中，通常会结合使用两者以创建灵活且高效的用户界面。


### Service

Service 是 Android 应用程序中的一个重要组件，用于在后台执行长时间运行的操作

它解决了以下问题：

1. 后台处理：允许应用在没有用户交互的情况下执行任务，如下载文件、播放音乐等。

2. 长时间运行的任务：适合执行那些需要持续运行，但不需要用户界面的操作。

3. 进程间通信：可以作为其他应用组件的后台服务，提供数据或功能。

4. 应用生命周期管理：即使用户切换到其他应用，Service 仍可继续运行。

5. 资源共享：可以在多个组件之间共享资源和数据。

主要特点：

1. 生命周期：Service 有自己的生命周期，不依赖于 Activity。

2. 两种类型：
   - 启动型 Service：由其他组件启动，可以无限期运行。
   - 绑定型 Service：允许其他组件与之绑定，提供客户端-服务器接口。

3. 优先级：Service 运行在主线程上，但优先级较低，系统资源不足时可能被终止。

4. 灵活性：可以在前台运行（显示通知），提高其优先级。

5. 系统集成：可以响应系统事件，如设备重启。

Service 是实现后台任务、保持应用持续运行的关键组件，对于需要在后台执行操作的应用来说至关重要。


### Broadcast

### ContentProvider

### Intent (意图)

Intent 是 Android 系统中的一个核心概念，它是一种消息传递机制，用于在应用程序的不同组件之间传递信息和请求操作。Intent 可以被视为一种抽象的描述，表达了一个应用想要执行的操作。

主要特点和用途：

1. 组件间通信：Intent 可以用于启动 Activity、Service，或者发送广播消息。

2. 显式和隐式：
   - 显式 Intent：明确指定要启动的组件。
   - 隐式 Intent：描述想要执行的操作，由系统匹配合适的组件。

3. 数据传递：Intent 可以携带各种类型的数据，如基本数据类型、Bundle 对象等。

4. 系统集成：通过 Intent，应用可以请求系统执行某些操作，如打开网页、发送邮件等。

5. 灵活性：Intent 提供了一种松耦合的方式来集成应用功能，增强了系统的可扩展性。

使用 Intent 可以让 Android 应用更加模块化和灵活，是实现应用间和应用内通信的重要工具。


## 内存模型

### 一个 Android 应用有哪些进程和线程？

一个 Android 应用通常包含以下进程和线程：

1. 主进程：
   - 默认情况下，应用的所有组件都运行在这个进程中
   - 进程名通常是应用的包名，如 `com.tencent.wechat`

2. 其他进程：
   - 可以通过在 AndroidManifest.xml 中指定 android:process 属性来创建额外的进程。
   - 用于隔离某些组件，提高应用的稳定性和性能。

3. 主线程（UI 线程）：
   - 负责处理 UI 相关的操作和用户交互。
   - 所有的 UI 组件（如 Activity、Fragment）都在这个线程上运行。

4. 后台线程：
   - 用于执行耗时操作，避免阻塞主线程。
   - 可以通过 AsyncTask、Thread、HandlerThread 等方式创建。

5. Binder 线程：
   - 用于处理进程间通信（IPC）。
   - 系统自动创建和管理。

6. JNI 线程：
   - 用于执行原生代码（C/C++）。

7. GC（垃圾回收）线程：
   - 负责内存管理和垃圾回收。

8. 系统创建的其他线程：
   - 如网络操作线程、I/O 线程等。

注意事项：
- 多进程会增加应用的内存占用。
- 应避免在主线程中执行耗时操作，以保证 UI 的流畅性。
- 合理使用线程池可以提高线程管理效率。

## 工程结构


## 应用状态


### 前台运行（Foreground）

- 应用在屏幕前台可见并与用户交互
- 系统优先级最高，不会被终止

### 可见（Visible）

- 应用可见但不在前台（如被对话框部分遮挡）
- 优先级较高，除非内存极度不足，否则不会被终止

### 服务运行（Service Running）

- 应用在后台运行服务
- 优先级中等，在内存不足时可能被终止

### 后台（Background）

- 应用不可见，但仍在后台运行
- 优先级较低，可能随时被系统终止以回收内存

### 空进程（Empty）

- 应用没有任何活动组件
- 优先级最低，随时可能被终止

这些状态反映了应用在系统中的运行情况和优先级，系统会根据当前的内存和资源情况来管理不同状态的应用。开发者需要了解这些状态，以便更好地管理应用的生命周期和资源使用。


## 生命周期

### 应用的生命周期

Android 应用的生命周期主要由以下几个阶段组成：

1. 启动（Launch）：
   - 用户点击应用图标或通过其他方式启动应用
   - 系统创建应用进程并加载主 Activity

2. 运行（Running）：
   - 应用在前台运行，用户可以与之交互
   - 此阶段消耗最多系统资源

3. 暂停（Paused）：
   - 应用部分可见但失去焦点（如被对话框部分遮挡）
   - 仍保留在内存中，但可能在极端情况下被系统终止

4. 停止（Stopped）：
   - 应用完全不可见，但仍保留在内存中
   - **可能随时被系统终止以回收内存**

5. 销毁（Destroyed）：
   - 应用被系统终止或用户主动关闭
   - 应用进程被销毁，所有资源被释放

6. 重启（Restart）：
   - 之前被终止的应用重新启动
   - 需要恢复之前的状态

在这个生命周期中，应用会在不同状态之间转换。开发者需要正确处理这些转换，以确保应用能够正确保存和恢复状态，有效管理资源，并提供流畅的用户体验。

### Activity LifeCycle

![](https://developer.android.com/guide/components/images/activity_lifecycle.png?hl=zh-cn)

## 状态

## 通信

## UI 库

### Jetpack Compose

现代 UI 库

## 异步库

### Observable

## JSON 处理

在 Kotlin 类的字段上使用 @JSONField 注解通常与 FastJSON 库有关。FastJSON 是一个流行的 Java 库，用于 JSON 数据的序列化和反序列化。

@JSONField 注解的主要作用包括：

1. 自定义序列化：可以指定字段在 JSON 中的名称，例如 @JSONField(name = "custom_name")。
2. 控制序列化行为：可以设置字段是否参与序列化或反序列化，例如 @JSONField(serialize = false)。
3. 指定日期格式：对于日期类型的字段，可以指定格式，如 @JSONField(format = "yyyy-MM-dd")。
4. 指定序列化行为：可以指定序列化行为，如 @JSONField(serialzeFeatures = [SerializerFeature.WriteNullStringAsEmpty])。

例子：

```kotlin
class RNConfigBundleInfoItem {
    @JSONField(name = "Key", serialzeFeatures = [SerializerFeature.WriteNullStringAsEmpty])
    var key: String = ""

    @JSONField(name = "BundleURL", serialzeFeatures = [SerializerFeature.WriteNullStringAsEmpty])
    var bundleURL: String = ""

    @JSONField(name = "BundleVersion")
    var bundleVersion: Int = 0

    @JSONField(name = "MD5", serialzeFeatures = [SerializerFeature.WriteNullStringAsEmpty])
    var md5: String = ""

    @JSONField(name = "ForcedPatchVersion", serialzeFeatures = [SerializerFeature.WriteNullNumberAsZero])
    var forcedPatchVersion : Int = 0

    @JSONField(name = "Rollback")
    var rollBack: List<Int> = listOf()

    @JSONField(serialize = false)
    fun isValid(): Boolean {
        return key.isNotEmpty()
    }

    fun zipFileName(): String {
        return "${key}_${bundleVersion}_${System.nanoTime()}"
    }

    override fun toString(): String {
        return "(key:$key,version:$bundleVersion,md5:$md5,rollBack:$rollBack)"
    }
}
```