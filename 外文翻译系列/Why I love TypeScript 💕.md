原文地址：[Why I love TypeScript 💕](https://dev.to/smithg09/why-i-love-typescript-4jdc)   

It's been 2 years now I started writing JavaScript applications and JavaScript became my go-to language. So, a year ago I got an internship opportunity at an amazing startup called [InVideo](https://invideo.io/). I was told to learn Angular which led me to Typescript. An open source language backed by Microsoft. To be honest it was not easy to learn angular and typescript but eventually ended up liking it even more. Now a year later I have been using a lot of TypeScript, be it in small or large projects, react or NodeJS everywhere.

Let's focus on why this is my default go-to language and why I prefer to write code using TypeScript rather than JavaScript.

## TypeScript - JavaScript With Superpowers
Believe it or not but typescript has saved me a lot of time by catching errors and providing fixes before actually running the code.

Let's see how

![](https://res.cloudinary.com/practicaldev/image/fetch/s--JfOlpGy8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/yqs0wf1qg4jnhkz4plkg.PNG)


Did you see that little red underline? That’s what TypeScript giving us a hint that something has gone wrong while writing code.
You may have already figured out what's wrong here. Number has been given to user method instead of a string.

That’s the reason why I love TypeScript ❤.

Moving on, there's lot more to typescript than just type checking. Most important features I use every day is Decorators and interfaces

### Decorators

Decorators are special kind of declaration or method that can be attached to a class, method, property, or any parameter. Decorators use the @decorator_name, where decorator_name must evaluate to a method that will be called at runtime with information about the decorated declaration.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--hr1jxvLv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/malb3e064mzoy7jkttox.PNG)

### Interfaces

Providing a type shape to JavaScript objects.Interfaces are the powerful way of defining contracts within your code as well as contracts with code outside of your project.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--B9jD62qN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/jlw72gkww4m2bjh5o0by.PNG)

Typescript works great with VS Code. Anyways official Typescript docs is a great way to learn language in detail.

## How To Get Started With Typescript
It is available as a package on the npm registry available as "typescript".

Node.js environment is must to run the package. Then dependency manager like npm, yarn can be used to download TypeScript into your project.
```
npm install -g typescript --save-dev
```
You can then run the TypeScript compiler using one of the following commands:
```
npx tsc
```
Now we initialize a new typescript project using
```
tsc --init
```
You should end up with the TypeScript config.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--WZLpdAWe--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/x98hud8warbke5gbal7u.PNG)

Now all you need is to create a .ts file and start writing code in typescript. Once you are done you can compile .ts file into .js using following command
```
tsc filename.ts
```
Great 🎉 Now you can start building something awesome with Typescript.

If you have already been using it and wants to start using typescript in your NodeJS application I have a Nodejs / Typescript starter project built on express server includes GraphQL , MongoDB and jest testing framework. If you like the project leave a star🌟

[Github Repository : nodejs-typescript-graphql-starter](https://github.com/smithg09/nodejs-typescript-graphql-starter)

## To conclude
That's why I love TypeScript. Basically, Typescript allows you to write better, cleaner, productive and more maintainable code. Obviously, you don’t have to go all out for TypeScript directly and start using decorators, interfaces or classes. Initially I have used TypeScript only with type checking on small projects. and gradually you can start adding more and more features.

I hope this post helps you decide if you should give it a try, and I strongly encourage you to start using it.

Thanks for reading, stay awesome! ❤

Do check my website [smithgajjar.me](https://smithgajjar.me/)
Follow me on [LinkedIn](https://www.linkedin.com/in/smith-gajjar-5a27716b/)