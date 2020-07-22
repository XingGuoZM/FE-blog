原文地址：[Vite⚡ - Vue no-bundler dev setup](https://dev.to/gautemeekolsen/vite-vue-no-bundler-dev-setup-4416)  

众所周知，Evan You（Vue.js创建者）某天晚上都毫无睡意，因此创建了[Vite](https://github.com/vitejs/vite)。

![vite](https://upload-images.jianshu.io/upload_images/23744478-abe2d31aa300b768.jpg)

Vite允许你使用单页组件开发Vue应用，而不需要任何的打包步骤。浏览被要求使用Imports就像使用原生ES那样导入模块。dev server可以在运行的时候对.vue文件进行拦截并编译它们，而且速度很快。

请注意，Vite 是试验性的 ⚠️ ，我不知道Vite未来会怎么样或者这篇文章的有效时间会持续多久。但是，把它当作未来的快餐或者一些有趣的东西。

## 让我们尝试一下  
创建如下文件  

### Comp.vue  
```
<template>
  <button @click="count++">⚡ {{ count }}</button> 
</template>

<script>
export default {
  data: () => ({ count: 0 })
}
</script>

<style scoped>
button{
  font-size: 2rem;
}
</style>
```
#### index.html
```
<div id="app"></div>
<script type="module">
  import { createApp } from 'vue'
  import Comp from './Comp.vue'

  createApp(Comp).mount('#app')
</script>
```

然后执行命令:
```
npx vite
```
访问 http://localhost:3000, 编辑.vue文件使之变化来查看热重载.

## Bundle for Production  

现在，让我们来构建生产环境下的app

新建package.json
```
{
  "scripts": {
    "build": "vite build"
  }
}
```

执行命令
```
npm i -D vite
npm run build
```
检查一下dist文件夹下的代码

我偶然发现的问题
+ Error: Cannot find module 'tslib'
  - Fix: npm i -D tslib
+ Error: ENOENT: no such file or director
  - Fix: 手动新建一个dist文件夹


## 感想  
这很容易上手，开发过程也很快，同时我能够实时看到更改后的变化。这就像在运行时进行编译。因此，这看起来很有希望，可能以后，这将成为我们开发所有Vue项目的方式。

Evan You，继续你的魔法 🧙 

有趣的事实：在法语中 vue = view , vite=fast  

修改: 看起来Vite现在已经有了结论，等到Vue 3.0推出之后，Vite将会/可能会被选中使用。但是，如果你想现在使用Vue 3 beta版本的话，这是最简单的方法。

修改2: 这是我根据Evan You的推文得出的结论。查看仓库的代码提交，我猜测它仍然在开发中 😃