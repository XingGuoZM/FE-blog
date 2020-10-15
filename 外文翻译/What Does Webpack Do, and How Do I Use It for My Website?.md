原文地址：[What Does Webpack Do, and How Do I Use It for My Website?](https://www.cloudsavvyit.com/1183/what-does-webpack-do-and-how-do-i-use-it-for-my-website/)


![](https://www.cloudsavvyit.com/thumbcache/0/0/d8074ecdca076d29d67101de0745ec9f/p/uploads/2019/07/42bf547d.png)

Webpack is a utility that can bundle your JavaScript files together. This allows you to be more organized and productive, and also allows the use of preprocessed languages like SASS and TypeScript.

## What Is Webpack for?
Imagine you’ve been working on a website with a lot of custom JavaScript. You’ve been on this project for a while, and things have quickly gotten out of hand. Your index.html has 20 different  &lt;script&gt; tags all sourcing different files; some are your own, some are external resources you depend on. Managing these is a pain, particularly because of the way most browsers handle the loading of JavaScript. How do you ensure your code is ran after jQuery is loaded? Usually, you just put jQuery physically first in the HTML, but this is a pain to manage for many discrepancies.

There’s also the issue of performance. Every script file needs to be loaded separately. And to make matters worse, most JavaScript is render-blocking, meaning your website will not even display until it finishes downloading, parsing, and running the JavaScript. You can see this in action under the Network tab from Chrome’s Dev Tools, which shows requests being sent out. The more requests you make, the longer it may take for all of them to finish.

![Chrome's Dev Tools shows requests being sent out](https://www.cloudsavvyit.com/thumbcache/0/0/6ecc3c3f41c257f093f40504e4575e22/p/uploads/2019/08/23e01416.png)

The solution here is bundling. Instead of linking to external resources, you’d download them all locally, and include them as dependencies of your code. Webpack bundles all of it together into one main.js file that contains everything your site needs. You’d then simply include that one JavaScript file, and get rid of all the other &lt;script&gt; tags.

This allows you to split code into multiple files without having to worry about concurrency issues, namespace issues, or site-loading times. Webpack also compresses and minifies the production code to save even more space.

## Webpack Helps You Organize Your Site’s Assets
In short, [Webpack](https://github.com/webpack/webpack) allows you to use the require() function to include one JavaScript file in another. This isn’t supported in any browser, as it’s something that needs to be run by a JavaScript bundler like Webpack, [Gulp](https://gulpjs.com/), or [Browserify](http://browserify.org/) before sending to the client. This can be something simple, like importing a dependency from npm:
```
var axios = require('axios') //node_modules/axios/index.js
```

Or something more complicated, like using images in JavaScript:
```
<img src={ require('../../assets/logo.png') } />
```
In either case, the string in the require function is passed to Webpack loaders. This is what defines how Webpack processes files. For example, we could use file-loader to handle images:
```
{
  test: /\.(png|jpe?g|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {},
    },
  ],
}
```
If the regex in test matches the filename, the loader is used. In this case, file-loader would generate a URL according to your configuration based on where that file ended up. Now, when we build our files, the img tag would look more like:
```
<img src={ 'https://cdn.yourwebsite.com/img/341234/logo.png' } />
```
This allows you to have a very organized file structure, as you no longer need to worry about file locations and adding more &lt;script&gt; and &lt;link&gt; tags. It’s not uncommon—especially with frameworks like React—to have projects that look like this:
```
src/
  |_styles/
  |  |_global.css
  |  |_darkTheme.css
  |_components/
  |  |_styles/
  |  |  |_buttonStyles.css
  |  |_button.js
  |_containers/
  |  |_homepage.js
  |  |_users.js
  |_index.js
  |_app.js
  |_package.json
```
As opposed to having a 2000 line long index.js. This makes developpement much easier in the long run, with a bit of a time investment at the start to transition to a Webpack-based environment.

## Webpack Allows You to Use Preprocessors
Because all Webpack does is pass off processing of files to loaders, a lot of magic can happen in those loaders. You end up with what’s called a preprocessor, which can add features to the language you’re working in.

For example, [SASS](https://sass-lang.com/) is a preprocessor for CSS, adding support for variables, nesting, mix ins, import and inheritance, and [a whole lot of other things](https://sass-lang.com/guide). It’s awesome, and the best part is it’s fully compatible with regular CSS, so you don’t have to worry about browser support. The end user never knows you used SASS to make your site, because you’re turning the SASS code into CSS code when you bundle with webpack.

Another useful preprocessed language is Microsoft’s [TypeScript](https://www.typescriptlang.org/index.html). TypeScript is a syntactical superset of JavaScript—meaning all JavaScript code is valid TypeScript code—and it adds support for strict types, turning JavaScript into a strongly typed language like the C variants. It’s actually a compiled language, using the tsc utility, but the ts-loader Webpack extension adds support for it. The loader will compile your .ts files into .js files.

If you’re already happy with vanilla CSS and JavaScript, you aren’t required to use any preprocessors, but for those wishing to use next-gen vanilla syntax, we recommended that you at least install [Babel](https://babeljs.io/) to support [ES2015 and above](https://www.cloudsavvyit.com/?p=1121). This will allow you to use ES2015 features like import and arrow functions.

## How to Set Up Webpack
First, you’ll need to have Node installed, so that you can run JavaScript outside the browser. Then, you can install Webpack from Node Package Manager (npm). Run these commands from the root of your project folder:
```
npm init -y
npm install webpack --save-dev
npm install webpack-cli --save-dev
```
This creates a new package.json which tracks the packages you have installed. You should see a new folder called node_modules.

Webpack is now installed, and you can run it with:
```
npx webpack
```
This assumes the entry point for your project is ./src/index, and that you would like the bundled file to go in dist/main.js. If you’d like to configure your setup differently or configure loaders, you’ll need to make a config file. There are a lot of options for you to use, and setup will vary based on what you’re using Webpack for, but most of the time the config file will be placed at the root of your project as webpack.config.js. You’ll need to load this with the --config flag, but you can automate this by specifying a script in package.json:
```
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```
Now, whenever you run:
```
npm run build
```
Webpack will run and bundle your project.

If you’d like to not have to run “npm run build” after every change you make, you should install webpack-dev-server, which will automatically rebuild when changes are made.

READ NEXT

› [What is A/B Testing and How Can You Use It?](https://www.cloudsavvyit.com/1070/what-is-a-b-testing-and-how-can-you-use-it/)

› [What Can Analytics Do for Your Website?](https://www.cloudsavvyit.com/339/what-can-analytics-do-for-your-website/)

› [What is a Log Management Tool, and Should You Use One?](https://www.cloudsavvyit.com/400/what-is-a-log-management-tool-and-should-you-use-one/)

› [A CDN Can Speed Up Your Website. Here’s What You Need to Know!](https://www.cloudsavvyit.com/784/a-cdn-can-speed-up-your-website-heres-what-you-need-to-know/)

› [What is Git Rebase and How Is it Different than Merging?](https://www.cloudsavvyit.com/852/what-is-git-rebase-and-how-is-it-different-than-merging/)