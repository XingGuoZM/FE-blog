原文地址: [What Is Webpack and How Does It Work](https://www.ma-no.org/en/programming/what-is-webpack-and-how-does-it-work)

WebPack is basically a packer of modules or module bundler, but thanks to one of its components, the plugins, can be used as tasks runner, ie we can do tasks of all kinds, such as moving directories, clean up, etc...

To understand what Webpack is, let's analyze this graph a bit.

![](https://www.ma-no.org/cache/galleries/contents-1806/webpack-how-it-works.jpeg)

## Webpack Concepts
 
To understand the concept of webpack, we need to clarify several things, such us the terminology:

- Entry. The entry point is the module, that webpack uses to start building its internal dependency graph. From there, it determines which other modules and libraries that entry point depends on and includes them in the graph until no dependency is left. By default, the entry property is set to ./src/index.js, but we can specify a different module or multiple modules) in the webpack configuration file.

- Output. The output property specifies webpack where to emit the bundle(s) and what name to use for that file(s). The default value for this property is ./dist/main.js for the main bundle and ./dist for other generated files. We can also specify different values in the configuration depending on our needs.

- Loaders. Webpack only understands JavaScript and JSON files by default. To process other types of files, webpack uses loaders. Loaders transform the source code of non-JavaScript modules, allowing us to preprocess those files before they’re added to the dependency graph. With loaders we can even import CSS files directly from our JavaScript modules.

- Plugins. Plugins are used for tasks that loaders can’t do. They provide us with a wide range of solutions about asset management, bundle minimization and optimization etc...

- Mode. Usually, when we develop our application we work with two types of source code — one for the development build and one for the production build. Webpack allows us to set which one we want to be produced by changing the mode parameter to development, production or none. This allows webpack to use built-in optimizations corresponding to each environment. The default value is production. The none mode means that there won’t be used any default optimization options.

 
In web applications, we commonly have many modules with dependencies.

We can have, for example, a JS module that will depend on other .js modules, that has images in different formats, such as JPG or PNG. We can have CSS files or be using some CSS preprocessor, such as SASS, Less or Stylus.


 
At the end we have many of these modules and a series of dependencies for each module.

Webpack takes care of taking all these modules and transforms them into assets that the browser can understand, such as JS files, CSS, images, videos, etc..

This whole packaging process is what Webpack really does.

 
## Module system
 
When we talk about modules we also have to understand which module systems are used. In the browser there was no predefined system of modules, you had to use some specification of modules, of which there were different.

Depending on which one was used, a specific library had to be used to transform those modules into something that the browser could finally understand.

The most common are:

#### AMD, which is an asynchronous definition of modules.


#### CommonJS, is the one used by NodeJS.


#### ES2015.

An example of how a module is defined in AMD is the following:
```
// In mymodule.js
define(‘myModule’, [‘dep1’, ‘dep2’], (dep1, dep2) => {
return
function(){}
})
// In app.js
define(‘app’, [‘myModule’], myModule => {
>// stuff…
});
 ```
Some modules that are being defined, have some dependencies, that are going to be loaded asynchronously, and later we will require that module that we have just created.

An example of how a module is defined in CommonJS is the following:
```
// In mymodule.js  
exports.calc = (a, b) => a + b;  
// In app.js  
const myModule = require(‘/path/to/myModule’);
console.log(myModule.calc(1, 2));
```
Here we export a series of modules and then require them. In ES2015 the way to define a module is the following:

```
// In mymodule.js
exports const calc = (a, b) => a + b;
// In app.js
import { calc } from ‘/path/to/myModule’;
console.log(calc(1, 2));
```

Here we import a function, calc in this case, then we import it and we can use it. These systems of modules, of which there are many, since in web applications each project used its own according to the one they wanted to implement, are all supported in Webpack, so we can use any or make a mixture of several to develop our applications.