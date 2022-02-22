## vue是如何实现双向绑定的？
vue是通过v-model来实现双向绑定。v-model = v-bind + v-on

数据绑定机制
dep（消息中心）、watcher（订阅者）、Observer（发布者）+ Object.defineProperty

## Vue 的 computed 和 watch 的区别
computed原理
1. 初始化阶段：为computed属性创建lazy watcher (即双向绑定中的监听器)
2. 首次模版渲染：渲染watcher检测到的computed属性时，会调用computed属性的getter方法，而computed属性的getter方法会调用依赖属性的getter，从而形成链式调用，同时保存引用关系用于更新。取得计算结果后lazy watcher会将结果缓存,并返回给渲染watcher进行模板渲染
3. 多次模板渲染：直接取lazy watcher中的缓存值给到渲染watcher进行渲染
4. 依赖属性更新：根据首次模板渲染阶段构建的依赖关系向上通知lazy watcher进行重新计算，缓存计算结果并通知渲染watcher重新渲染更新页面

watch原理
watch本质上是为每个监听属性setter创建了一个watcher，当被监听的属性更新时，调用传入的回调函数，常见的配置选项有，deep和immediate。
1. deep深度监听对象，为对象的每一个属性创建一个watcher，从而确保对象的每一个属性更新时都会触发传入的回调函数。主要原因在于对象属于引用类型，单个属性的更新并不会触发对象的setter，因此引入deep能更好的解决监听对象的问题，同时也会引入判断机制，确保在多个属性更新时只会触发一次，避免性能浪费
2. immediate：在初始化时直接调用回调函数，可以通过在created阶段手动调用回调函数实现相同的效果

使用场景
computed：需要处理复杂逻辑的模板表达式
watch：需要处理异步或开销较大的操作
从表现上看，computed会创建新的属性，而watch可以将属性设置在data中，再监听依赖属性变化，调用handler方法更新属性的方式达到同样的效果。在具体的使用上还是优先考虑computed，因为相同的场景下，watch所需的代码量和性能开销一般来说会比computed大。

## react hooks原理

闭包+fiber+链表
hooks主要利用闭包来保存状态，使用链表来保存一系列的hooks，将链表中的第一个hook与fiber关联。在fiber数更新时，就能从hooks中计算出最终输出的状态和执行相关的副作用，需要注意的是，不在条件、循环或嵌套函数中调用hooks；只在react 函数组件内调用hooks。

## react fiber
[说一下 react-fiber](https://github.com/lgwebdream/FE-Interview/issues/33)


## react事件
[React 事件机制原理](https://febook.hzfe.org/awesome-interview/book4/frame-react-event-mechanism)
React事件机制可以分为两个阶段：初始化渲染时在root节点上注册原生事件；原生事件触发时模拟捕获、目标和冒泡阶段派发合成事件。通过这种机制，冒泡的原生事件类型最多在root节点上注册一次，节省内存开销。且raact为不同类型的事件定义了不同的优先级，从而让用户代码及时响应高优先级的用户交互，提升用户体验

react的事件机制依赖合成事件这个核心概念，合成事件在符合w3c的前提下，抹平了浏览器之间的差异化表现。并且简化事件逻辑，对关联事件进行合成。如每当表单类型组件的值发生改变时，都会触发onChange事件，而onChange事件由change、click、input、keydown、keyup等原生事件组成。

原生事件和合成事件
JavaScript可以通过事件和DOM进行交互，

原生事件：主流浏览器基于DOM2、DOM3规范，实现标准化DOM事件。基于Event实现了浏览器中常见的用户事件如UIEvent、InputEvent、MouseEvent，在事件触发时，相关对象会存储在Event的实例对象中，对象包含currentTarget，detail，target，preventDefault(),stopPropagation()等属性和方法。dom节点可以通过addEventListener和removeEventListener来添加或移除事件监听函数
```
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
void preventDefault()
void stopPropagation()
void stopImmediatePropagation()
DOMEventTarget target
number timeStamp
string type
```

合成事件：react事件机制中，在遵循规范的前提下，引入新的事件类型：合成事件（SyntheticEvent）。基于合成事件实现了浏览器中常见的用户事件，并对事件进行规范化处理，使他们在不同的浏览器中具有一致的属性。在事件发生时，相关信息会存储在syntheticEvent的实例对象中，对象包含原生事件类似的属性
```
// SyntheticEvent 属性
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
```
但合成事件和原生事件并不是一一对应的关系。比如onMouseEnter合成事件映射原生mouseout、mouseover事件。React通过RegistrationNameDependencies来记录合成事件和原生事件对应关系
```
/**
 * Mapping from registration name to event name
 */
export const registrationNameDependencies = {
  onClick: ["click"],
  onMouseEnter: ["mouseout", "mouseover"],
  onChange: [
    "change",
    "click",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "selectionchange",
  ],
  // ...
};
```

React事件机制

![事件注册](https://user-images.githubusercontent.com/17002181/143735223-cb577bcf-8e4c-4047-8818-cbc28a1e8b69.png)

使用ReactDOM.createRoot创建root时，React会调用listenToAllSupportedEvents方法对所有支持的原生事件进行监听
1. allNativeEvents用于收集所有合成事件相关联的原生事件名。这个收集动作在事件插件初始化阶段完成
```
SimpleEventPlugin.registerEvents();
EnterLeaveEventPlugin.registerEvents();
ChangeEventPlugin.registerEvents();
SelectEventPlugin.registerEvents();
BeforeInputEventPlugin.registerEvents();
```
2. 对每个原生事件调用addTrappedEventListener函数。该函数最终使用addEventListener方法，对原生事件进行捕获或冒泡阶段的事件监听注册
```
function addTrappedEventListener(
  targetContainer: EventTarget,
  domEventName: DOMEventName,
  eventSystemFlags: EventSystemFlags,
  isCapturePhaseListener: boolean
) {
  let listener = createEventListenerWrapperWithPriority(
    targetContainer,
    domEventName,
    eventSystemFlags
  );

  // ...

  if (isCapturePhaseListener) {
    addEventCaptureListener(targetContainer, domEventName, listener);
  } else {
    addEventBubbleListener(targetContainer, domEventName, listener);
  }
}
```
基于以上流程可知，调用ReactDOM.createRoot方法时就已经在root节点上初始化所有原生事件的监听回调函数。而不是在组件上写合成事件的监听时才开始注册事件回调。

react事件触发
![事件触发](https://user-images.githubusercontent.com/17002181/144073503-a8a2eb15-a2e7-4d98-9f0e-ef2a6b5c0738.png)

在注册事件阶段调用的addTrappedEventListener方法中，会使用createEventListenerWrapperWithPriority函数来创建事件回调。createEventListenerWrapperWithPriority函数根据事件类型划分出若干个不同优先级的dispatchEvent，事件回调最终都调用进dispatchEvent方法。
因此触发一个原生事件时，大致的执行流程如下：
1. 原生事件触发时，进入dispatchEvent回调方法
2. attemptToDispatchEvent方法根据该原生事件查找到当前原生dom节点和映射的fiber节点
3. 事件和fiber等信息被派发给插件系统进行处理，插件系统调用各个插件暴露的extractEvents方法
4. accumulateSinglePhaseListeners方法向上收集fiber树上监听相关事件的其他回调函数，构造合成事件并加入到派发队列dispatchQueue中；
5. 调用processDispatchQueue方法，基于捕获/冒泡阶段的标识，按倒序或顺序执行dispatchQueue中的方法