原文地址：[So What Actually is Vue.set?](https://www.codementor.io/@chrisquinn299/serverless-do-more-nclf7ere5) 

![](https://d585tldpucybw.cloudfront.net/sfimages/default-source/default-album/vuel_870x22095a97f137a2c4e179c732cc687cd96e2.png?sfvrsn=d5ea31c8_1)

### 响应式是VueJS一个核心特性，每一个开发者都需要去理解并且完全掌握以致充分掌握框架的功能。Vue.set是一个API调用，在构建更强大的应用程序时，它将会非常适合你的工具条。让我们一起学习。

谈论Vue.set就是在谈论响应式，因此为自己准备一些与此相关的东西。然而，与往常一样，这不需要困难或者无聊的东西。找到你的鳄梨和薯片，做一些鳄梨调味酱，然后开始蘸酱。

## 数据与响应式  

每当您在Vue组件内创建data()属性函数并将其返回时，Vue都会在幕后进行很多操作，以将组件中的所有内容挂钩并使其具有响应式。
```
export default {
  data() {
   return {
     red: 'hot',
     chili: 'peppers'
   }
  }
}
```

