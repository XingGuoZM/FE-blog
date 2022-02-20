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