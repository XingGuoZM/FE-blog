[原文地址](https://www.sitepoint.com/understanding-es6-modules/)

### This article explores ES6 modules, showing how they can be used today with the help of a transpiler.

Almost every language has a concept of modules — a way to include functionality declared in one file within another. Typically, a developer creates an encapsulated library of code responsible for handling related tasks. That library can be referenced by applications or other modules.

The benefits:

1. Code can be split into smaller files of self-contained functionality.
2. The same modules can be shared across any number of applications.
3. Ideally, modules need never be examined by another developer, because they’ve has been proven to work.
4. Code referencing a module understands it’s a dependency. If the module file is changed or moved, the problem is immediately obvious.
5. Module code (usually) helps eradicate naming conflicts. Function x() in module1 cannot clash with function x() in module2. Options such as namespacing are employed so calls become module1.x() and module2.x().

## Where are Modules in JavaScript?
Anyone starting web development a few years ago would have been shocked to discover there was no concept of modules in JavaScript. It was impossible to directly reference or include one JavaScript file in another. Developers therefore resorted to alternative options.

### Multiple HTML \<script\> Tags
HTML can load any number JavaScript files using multiple \<script\> tags:
```
<script src="lib1.js"></script>
<script src="lib2.js"></script>
<script src="core.js"></script>
<script>
console.log('inline code');
</script>
```
The [average web page in 2018 uses 25 separate scripts](http://httparchive.org/trends.php#bytesJS&reqJS), yet it’s not a practical solution:

- Each script initiates a new HTTP request, which affects page performance. [HTTP/2](https://www.sitepoint.com/what-is-http2/) alleviates the issue to some extent, but it doesn’t help scripts referenced on other domains such as a CDN.
- Every script halts further processing while it’s run.
- Dependency management is a manual process. In the code above, if lib1.js referenced code in lib2.js, the code would fail because it had not been loaded. That could break further JavaScript processing.
- Functions can override others unless appropriate [module patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#designpatternsjavascript) are used. Early JavaScript libraries were notorious for using global function names or overriding native methods.


## Script Concatenation
One solution to problems of multiple \<script\> tags is to concatenate all JavaScript files into a single, large file. This solves some performance and dependency management issues, but it could incur a manual build and testing step.

## Module Loaders
Systems such as [RequireJS](http://requirejs.org/) and [SystemJS](https://github.com/systemjs/systemjs) provide a library for loading and namespacing other JavaScript libraries at runtime. Modules are loaded using Ajax methods when required. The systems help, but could become complicated for larger code bases or sites adding standard \<script\> tags into the mix.

## Module Bundlers, Preprocessors and Transpilers
Bundlers introduce a compile step so JavaScript code is generated at build time. Code is processed to include dependencies and produce a single ES5 cross-browser compatible concatenated file. Popular options include [Babel](https://babeljs.io/), [Browserify](http://browserify.org/), [webpack](https://webpack.github.io/) and more general task runners such as [Grunt](https://gruntjs.com/) and [Gulp](https://gulpjs.com/).

A JavaScript build process requires some effort, but there are benefits:

- Processing is automated so there’s less chance of human error.
- Further processing can lint code, remove debugging commands, minify the resulting file, etc.
- Transpiling allows you to use alternative syntaxes such as [TypeScript](https://www.typescriptlang.org/) or [CoffeeScript](http://coffeescript.org/).

## ES6 Modules
The options above introduced a variety of competing module definition formats. Widely-adopted syntaxes included:

- CommonJS — the module.exports and require syntax used in Node.js
- Asynchronous Module Definition (AMD)
- Universal Module Definition (UMD).

A single, native module standard was therefore proposed in ES6 (ES2015).

Everything inside an ES6 module is private by default, and runs in strict mode (there’s no need for 'use strict'). Public variables, functions and classes are exposed using export. For example:
```
// lib.js
export const PI = 3.1415926;

export function sum(...args) {
  log('sum', args);
  return args.reduce((num, tot) => tot + num);
}

export function mult(...args) {
  log('mult', args);
  return args.reduce((num, tot) => tot * num);
}

// private function
function log(...msg) {
  console.log(...msg);
}
```
Alternatively, a single export statement can be used. For example:
```
// lib.js
const PI = 3.1415926;

function sum(...args) {
  log('sum', args);
  return args.reduce((num, tot) => tot + num);
}

function mult(...args) {
  log('mult', args);
  return args.reduce((num, tot) => tot * num);
}

// private function
function log(...msg) {
  console.log(...msg);
}

export { PI, sum, mult };
```

import is then used to pull items from a module into another script or module:
```
// main.js
import { sum } from './lib.js';

console.log( sum(1,2,3,4) ); // 10
```
In this case, lib.js is in the same folder as main.js. Absolute file references (starting with /), relative file references (starting ./ or ../) or full URLs can be used.

Multiple items can be imported at one time:
```
import { sum, mult } from './lib.js';

console.log( sum(1,2,3,4) );  // 10
console.log( mult(1,2,3,4) ); // 24
```
and imports can be aliased to resolve naming collisions:


```
import { sum as addAll, mult as multiplyAll } from './lib.js';

console.log( addAll(1,2,3,4) );      // 10
console.log( multiplyAll(1,2,3,4) ); // 24
```
Finally, all public items can be imported by providing a namespace:
```
import * as lib from './lib.js';

console.log( lib.PI );            // 3.1415926
console.log( lib.add(1,2,3,4) );  // 10
console.log( lib.mult(1,2,3,4) ); // 24
```

## Using ES6 Modules in Browsers
At the time of writing, [ES6 modules are supported](https://caniuse.com/#feat=es6-module) in Chromium-based browsers (v63+), Safari 11+, and Edge 16+. Firefox support will arrive in version 60 (it’s behind an about:config flag in v58+).

Scripts which use modules must be loaded by setting a type="module" attribute in the \<script\> tag. For example:
```
<script type="module" src="./main.js"></script>
```
or inline:
```
<script type="module">
  import { something } from './somewhere.js';
  // ...
</script>
```
Modules are parsed once, regardless of how many times they’re referenced in the page or other modules.

## Server Considerations
Modules must be served with the MIME type application/javascript. Most servers will do this automatically, but be wary of dynamically generated scripts or .mjs files ([see the Node.js section below](https://www.sitepoint.com/understanding-es6-modules/#usinges6modulesinnodejs)).

Regular \<script\> tags can fetch scripts on other domains but modules are fetched using cross-origin resource sharing (CORS). Modules on different domains must therefore set an appropriate HTTP header, such as Access-Control-Allow-Origin: *.

Finally, modules won’t send cookies or other header credentials unless a crossorigin="use-credentials" attribute is added to the \<script\> tag and the response contains the header Access-Control-Allow-Credentials: true.

## Module Execution is Deferred
The \<script defer\> attribute delays script execution until the document has loaded and parsed. Modules — including inline scripts — defer by default. Example:
```
<!-- runs SECOND -->
<script type="module">
  // do something...
</script>

<!-- runs THIRD -->
<script defer src="c.js"></script>

<!-- runs FIRST -->
<script src="a.js"></script>

<!-- runs FOURTH -->
<script type="module" src="b.js"></script>
```

## Module Fallbacks
Browsers without module support won’t run type="module" scripts. A fallback script can be provided with a nomodule attribute which module-compatible browsers ignore. For example:
```
<script type="module" src="runs-if-module-supported.js"></script>
<script nomodule src="runs-if-module-not-supported.js"></script>
```
## Should You Use Modules in the Browser?
Browser support is growing, but it’s possibly a little premature to switch to ES6 modules. For the moment, it’s probably better to use a module bundler to create a script that works everywhere.

## Using ES6 Modules in Node.js
When Node.js was released in 2009, it would have been inconceivable for any runtime not to provide modules. CommonJS was adopted, which meant the Node package manager, npm, could be developed. Usage grew exponentially from that point.

A CommonJS module can be coded in a similar way to an ES2015 module. module.exports is used rather than export:
```
// lib.js
const PI = 3.1415926;

function sum(...args) {
  log('sum', args);
  return args.reduce((num, tot) => tot + num);
}

function mult(...args) {
  log('mult', args);
  return args.reduce((num, tot) => tot * num);
}

// private function
function log(...msg) {
  console.log(...msg);
}

module.exports = { PI, sum, mult };
```
require (rather than import) is used to pull this module into another script or module:
```
const { sum, mult } = require('./lib.js');

console.log( sum(1,2,3,4) );  // 10
console.log( mult(1,2,3,4) ); // 24
```

require can also import all items:

```
const lib = require('./lib.js');

console.log( lib.PI );            // 3.1415926
console.log( lib.add(1,2,3,4) );  // 10
console.log( lib.mult(1,2,3,4) ); // 24
```
So ES6 modules were easy to implement in Node.js, right? Er, no.

ES6 modules are [behind a flag in Node.js 9.8.0+](https://nodejs.org/api/esm.html) and will not be fully implemented until at least version 10. While CommonJS and ES6 modules share similar syntax, they work in fundamentally different ways:

- ES6 modules are pre-parsed in order to resolve further imports before code is executed.
- CommonJS modules load dependencies on demand while executing the code.
It would make no difference in the example above, but consider the following ES2015 module code:
```
// ES2015 modules

// ---------------------------------
// one.js
console.log('running one.js');
import { hello } from './two.js';
console.log(hello);

// ---------------------------------
// two.js
console.log('running two.js');
export const hello = 'Hello from two.js';
```
The output for ES2015:
```
running two.js
running one.js
hello from two.js
```
Similar code written using CommonJS:
```
// CommonJS modules

// ---------------------------------
// one.js
console.log('running one.js');
const hello = require('./two.js');
console.log(hello);

// ---------------------------------
// two.js
console.log('running two.js');
module.exports = 'Hello from two.js';
```
The output for CommonJS:
```
running one.js
running two.js
hello from two.js
```
Execution order could be critical in some applications, and what would happen if ES2015 and CommonJS modules were mixed in the same file? To resolve this problem, Node.js will only permit ES6 modules in files with the extension .mjs. Files with a .js extension will default to CommonJS. It’s a simple option which removes much of the complexity and should aid code editors and linters.

## Should You Use ES6 Modules in Node.js?
ES6 modules are only practical from Node.js v10 onwards (released in April 2018). Converting an existing project is unlikely to result in any benefit, and would render an application incompatible with earlier versions of Node.js.

For new projects, ES6 modules provide an alternative to CommonJS. The syntax is identical to client-side coding, and may offer an easier route to isomorphic JavaScript, which can run in the either the browser or on a server.

## Module Melee
A standardized JavaScript module system took many years to arrive, and even longer to implement, but the problems have been rectified. All mainstream browsers and Node.js from mid 2018 support ES6 modules, although a switch-over lag should be expected while everyone upgrades.

Learn ES6 modules today to benefit your JavaScript development tomorrow.