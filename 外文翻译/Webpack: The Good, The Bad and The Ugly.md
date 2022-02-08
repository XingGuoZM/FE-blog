原文地址：[Webpack: The Good, The Bad and The Ugly](https://www.north-47.com/knowledge-base/webpack-the-good-the-bad-and-the-ugly/)

## Introduction
Webpack, a static module bundler, a complex yet simple tool, that allows you to spend between 10 minutes and 10 hours to make a simple web application bundlable.

## The Good
As a static module bundler, Webpack delivers a bundle of code that’s easily parseable for your browser or node environment. It allows users to use the UMD/AMD system of bundling code and applies it on images, HTML, CSS and much much more. This allows the developer to create a module or more modules with a segment or multiple segments of a web app, and serve it all, or serve parts.
One of the major sell points of Webpack is the ability to modify it to your choosing. It’s a rich ecosystem of plugins that exist to enhance the already plentiful options of the bundler itself. This allows for Front-end libraries and frameworks to use it to bundle their code using custom solutions and plugins, the likes of Angular, ReactJS and VueJS.

This is made easy by the years of development through which we have reached Webpack 4, that allows for multiple configuration files for development and production environments.

![](https://www.north-47.com/wp-content/uploads/2019/02/1_WCAdMi04IFEWdngK8bkFcw.png)

The example in the image is a view into the differences that allow for good development overview and testing, yet at the same time make it possible to use a single script to build a production-ready build. All of this together makes Webpack a viable bundler for most JS projects, especially when it’s the base of ecosystems like in Angular or React.

## The Bad
Whilst Webpack is a good bundler of JS, it’s not the only one available. Issues in Webpack come from the fact that most of the libraries that you use need to have been worked on and developed with Webpack bundling in mind. Its native module support is limited, requiring you to specify those resources and what way you do want them to be represented in the final build. And most of the time, a random version update of a model can break the entire project, even on tertiary modules.

The learning curve of Webpack is getting higher and higher, it all depends on how complex a project you are working on, and whether you are working with a preconfigured project or building a configuration on your own.

Just for this article I have gone over not only the Webpack docs, but around 20 articles, a ton of github issues. And around a year and a half of my personal setup experience bundling project with Webpack using Three.js, A-Frame, React, Angular, and a myriad of other niche applications. And in the end it still feel like i’ve barely scratched the surface.

The entire debugging process is ugly, it depends upon source-maps which vary from library to library. You can use the in-built Webpack option or use a plugin for your specific tech, it will never be fun. Loading up a 160k code bundle and blocking your pc, even with source-maps.

## The Ugly
All in all, when you give Webpack a chance, your encounter will rarely be a pleasant one. There shall never be a valid standardized version for using and implementing the core. And the plugins don’t help. Each time you find something that works, something new will magically brake. It’s like trying to fix a sinking ship.

![](https://www.north-47.com/wp-content/uploads/2019/02/1_1Y2a8P7rK4sOSF00kL8COQ.jpeg)

This image represents my average day using Webpack, if my project was the dog and Webpack the firestarter. Currently using it in combination with VueJS. It’s the same story, either use the vue–cli and a preloaded config. Or regret not doing that later when you need to optimize your specific code integration that needs to run as a bundled part of a larger application.

The worst part of all of this probably is the widespread usage of black-box software like Webpack, which in theory is open source but is a bundle of libraries and custom code that takes as much time as a doctors thesis to study properly. And for all of this, it still is one of the better options out there.

## Conclusion
Webpack as a bundler is excellent for use in a multitude of applications. Especially if someone else handles the config for you (Angular, React, Vue clis). It will hopefully become better, but like anything else in JS its roots and backwards compatibility will always bring it down. Be ready for a high learning curve and a lot of frustration. If you like to explore new things, or reimplement existing solutions, or optimize workflow, give it a try.