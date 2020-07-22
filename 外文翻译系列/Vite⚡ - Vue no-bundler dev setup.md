原文地址：[Vite⚡ - Vue no-bundler dev setup](https://dev.to/gautemeekolsen/vite-vue-no-bundler-dev-setup-4416)   

Apparently Evan You (creator of Vue.js) wasn't interested in sleeping one night and created [Vite](https://github.com/vitejs/vite).
<img src=''/>

Vite allows you to develop your Vue application with Single-File Components without any bundle step. Imports are requested by the browser as native ES module imports. The dev server intercepts requests to .vue files and compiles them on the fly. And it's instantly fast.

Note that Vite is Experimental ⚠️ I don't know what the future for Vite is or how long this article is valid. But consider this a future snack and something fun.

## Let's try it out
Create the following files

#### Comp.vue
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
Then run:
```
npx vite
```
Go to http://localhost:3000, edit the .vue file to see changes hot-reloaded.

## Bundle for Production  

Now let's build our production-ready app.

Create package.json
```
{
  "scripts": {
    "build": "vite build"
  }
}
```
Run
```
npm i -D vite
npm run build
```
Check out the dist folder for your code.

Issues I stumbled upon.

+ Error: Cannot find module 'tslib'
  - Fix: npm i -D tslib
+ Error: ENOENT: no such file or director
  - Fix: create an empty dist folder manually
## Thoughts
It was really easy to get started and the development process is really fast as I can see my changes instantly. It's like a compile on the fly setup. So this looks really promising, maybe in some time, this will be the way we develop all Vue projects.

Evan You, keep doing your magic 🧙

Fun fact: As vue = view in french, vite = fast in french.

Edit: Looks like Vite is concluded for now and will/might be picked up after Vue 3 has launched. But if you want to try Vue 3 beta today, this is the easiest way.

Edit2: I said it was concluded based on a tweet from Evan You. Looking at the commits to the repo I guess it's still being worked on 😃.