原文地址：[What is Babel, and how will it help you write JavaScript?](http://nicholasjohnson.com/blog/what-is-babel/)

Babel is a JavaScript transpiler that converts edge JavaScript into plain old ES5 JavaScript that can run in any browser (even the old ones).

It makes available all the syntactical sugar that was added to JavaScript with the new ES6 specification, including classes, fat arrows and multiline strings.

## Installation
Babel comes packaged as an node module. Installation, as you might expect, is via npm:

npm install –save-dev 'babel-cli'

There are plugins for webpack, gulp, grunt, Sublime, Webstorm, etc. Whatever your development toolchain, Babel can probably slot into it.

[See here for setup instructions for your toolset of choice.](https://babeljs.io/docs/setup/)


## Classes
JavaScript is class free. Objects inherit directly from other objects, so any object can be the parent (superclass) of any other object.

Any function can be a constructor function, and calling it with the new keyword will yield a new object.

You can read more about this here in the [JavaScript for Smart People course - Object Orientation section](http://nicholasjohnson.com/javascript/javascript-for-programmers/exercises/object-orientation/)

This is all very cool and JavaScripty, but it understandably makes C# and Java developers a bit antsy. They are used to a bit more rigour, so ES6 introduces the class keyword. This lets us define functions which can only be used as constructors.

A class, as we all know, is a special cookie cutter object that can only be used to define other objects. This is a special case of prototypical inheritence. We limit ourselves to only creating objects from functions that we have specifically decided should be used as such.

## Classes in Babel
An ES6 class looks like this:
```
class Person {}
var dave = new Person
```
If we run it through Babel we simply get a constructor function, plus a little decoration:
```
"use strict";
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Person = function Person() {
  _classCallCheck(this, Person);
};
var dave = new Person();
```
We have our Person function, which can be used as a standard prototypical constructor. We also get a little bit of safety checking with the _classCallCheck function.

The _classCallCheck function is called inside the Person constructor, and will throw an error unless the Person function is being treated as a constructor function.

## Multiline Strings
ES6 also has a new, sugary way of defining strings. The backtick symbol (` (bottom left on your Macintosh keyboard)) lets you create multiline strings. This is especially helpful when defining templates in JavaScript. Here's a simple Angular template:
```
var template = `
<div>
  <h1>hello {{name}}</h1>
</div>
`
```
This compiles to:
```
var template = "
  <div>
    <h1>hello {{name}}</h1>
  </div>
  ";
```

## Fat Arrows
Fat Arrows give us a nice syntax for defining anonymous functions.

We can write this:
```
(x, y) => {return x + y};
```
Babel gives us this:
```
(function (x, y) {
  return x + y;
});
```
Note that this function has not been called. I could save it to a variable, or pass it as a parameter to a callback or promise.

If I want to call the function, I could do this:
```
(x, y) => {return x + y} (1,2);
```
which yields this:
```
(function (x, y) {
  return x + y;
})(1, 2);
```

### Fat arrows with exactly one parameter
When we have exactly one parameter we are allowed to omit the braces preceding the arrow:
```
x => {return x + 1};
```
yields:
```
(function (x) {
  return x + 1;
});
```

### Fat Arrows with exactly one line of code
We can go even further than this. If our function contains exactly one line of code (assuming a line ends with a semi-colon) we can omit the curly braces altogether:
```
x => x + 1
```
compiles to:
```
(function (x) {
  return x + 1;
});
```
### Fat arrows in practice
Let's use one of these to output all the elements in an array.
```
[1, 2, 99].map(num => console.log(num));
```
gives us:
```
[1, 2, 99].map(function (num) {
  return console.log(num);
});
```

### Fat Arrows and This (Lexical Scoping)
Don't skip this bit, it matters.

The this keyword is set in JavaScript to be the object immediately preceding the dot when the function is called. This is logical, but often annoying, as it sometimes requires this to be stored in that.

If this sounds crazy to you, it is a little. [More on this here](http://nicholasjohnson.com/javascript/javascript-for-programmers/exercises/meaning-of-this/):

Fat arrows get around this by preserving the current value of this. We call this lexical scoping.
```
x = {
  y: function() {
    () => {console.log(this)}();
  }
}
```
compiles to this:
```
x = {
  y: function y() {
    var _this = this;
    (function () {
      console.log(_this);
    })();
  }
};
```
We can see that the value of this has been stored in a variable inside the closure.

## To sum up
ES6 is mainly sugar on top of ES5. The JavaScript under the hood remains the same prototypical, list processing language we are used to. ES6 gives us some nice syntax that ultimately transpiles to fairly plain, ordinary JavaScript.

Some of this sugar is for the benefit of Java/C# folk who initially often find prototypical inheritance confusing.

Some of it, such as fat arrows, gives us a terser, more modern looking syntax, and enhances JavaScript's functional capabilities.

## Further Reading
For more features of Babel and ES6, see here: [https://babeljs.io/docs/learn-es2015/](https://babeljs.io/docs/learn-es2015/)

To have a try right now, have a look at the (repl)[https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=var%20a%20%3D%20%7B%0A%20%20b%3A%20function()%20%7B%0A%20%20%20%20var%20c%20%3D%20()%20%3D%3E%20console.log(this.d)%0A%20%20%20%20c()%3B%0A%20%20%7D%2C%0A%20%20d%3A'Hey%20there!'%0A%7D%3B%0A%0Aa.b()]