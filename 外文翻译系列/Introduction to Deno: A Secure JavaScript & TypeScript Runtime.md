原文地址：[Introduction to Deno: A Secure JavaScript & TypeScript Runtime](https://www.sitepoint.com/deno-introduction/)   

#### May 2020 saw the release of Deno 1.0, and it’s been a pretty popular topic of conversation. If you’re wondering what the fuss is all about, you’ve come to the right place!

In this article, I hope to give you an overview of what Deno is. We’ll take a look at its key features, and ask why you might want to start learning this new tool.

## What Is Deno?
So what is it Deno, and why was it created? It’s a JavaScript and TypeScript runtime, meaning you can write programs in either language and execute them from the command line. Unlike JavaScript run within a browser, Deno programs can access resources on the host computer, such as the filesystem and environment variables.

If you’re aware of [Node.js](https://www.sitepoint.com/an-introduction-to-node-js/), and you’re thinking that Deno sounds pretty similar, you’d be right. Deno is the brainchild of Node’s creator, Ryan Dahl, who created Deno to address what he sees as [the design flaws in Node](https://www.youtube.com/watch?v=M3BM9TB-8yA). The aims of the project are to provide a scripting environment that is secure by default, that treats TypeScript as a first-class language, and that is as browser-compatible as possible (where practical).

## Security Features  
Deno is designed to be secure out of the box. All code is executed in a secure sandbox by default, which means you need to give explicit permission to allow a program to access the network or the filesystem.

Programs can be granted permissions with the following command-line flags:

- -A, –allow-all: allow all permissions (disables all security).
- –allow-env: allow getting and setting of environment variables.
- –allow-hrtime: allow high resolution time measurement (can be used in timing attacks and fingerprinting).
- –allow-net=\: allow network access. Optionally takes a comma-separated whitelist of domains.
- –allow-plugin: allow loading plugins (unstable feature).
- –allow-read=\: allow file system read access. Optionally takes a comma-separated whitelist of directories or files.
- –allow-run: allow running subprocesses.
- –allow-write=\: allow file system write access. Optionally takes a comma-separated whitelist of directories or files.

## First-class TypeScript Support  
As I mentioned earlier, Deno can execute both JavaScript and TypeScript. What’s more, it supports TypeScript as a first-class language. This means it can load and run your TypeScript code without any additional build step. There’s no need to set up additional tooling to transpile your code into JavaScript first.

Of course, since TypeScript is a superset of modern JavaScript, you can also write your code in good old JS if you want to! Deno supports some great, developer-friendly features such as ES Module imports

## Using External Code  
As Ryan mentioned in his talk, one of his goals for Deno was to avoid the need for a package manager. Unlike with runtimes/languages such as Node.js and PHP (which use the [npm](https://www.sitepoint.com/beginners-guide-node-package-manager/) and composer package managers respectively), there’s no package manager for Deno.

Instead, external packages are imported directly via a URL:
```
import { Client } from "https://deno.land/x/mysql@2.2.0/mod.ts";
```

The first time you run your script, Deno will fetch, compile, and cache all the imports so that subsequent starts are lightning fast. Obviously there are times when you may want to force it to re-fetch the imports, and you can do this with the cache subcommand:
```
deno cache --reload my_module.ts
```

## Package hosting
While Deno doesn’t provide a package registry as such, there’s a [list of third-party modules available](https://deno.land/x). The service provides a standardized, versioned URL that maps to the module’s GitHub repo. You can search for packages by name and see a brief description, and click through to see the package readme.

## The Standard Library

Deno provides a [standard library ](https://deno.land/std) — loosely based on Golang’s — which provides a set of high-quality standard modules with no external dependencies.

The packages in the standard library are not installed along with Deno. Rather, they’re available online and linked to as we saw in the previous section. The modules are versioned, allowing you to pin your code to the usage of a specific version:
```
import { copy } from "https://deno.land/std@0.50.0/fs/copy.ts";
```

This means that any code you write that relies on a module from the standard library should continue to work in future versions.

The library includes various helpers and utilities you might need for building both command-line and HTTP-based applications:

- archive: modules to work with tar files
- async: async utilities
- bytes: helpers for working with binary arrays
- datetime: a helper for parsing date strings into Date objects
- encoding: encoders for dealing with base32, binary, CSV, TOML, and YAML formats
- flags: a command line arguments parser
- fmt: a tool for printing formatted output
- fs: helpers for working with the filesystem
- hash: a module for creating hashes using a variety of algorithms
- http: create HTTP and file servers, and manipulate cookies
- io: utilities for string input/output
- log: simple logging module
- mime: provides support for multipart data
- node: a (currently in-progress) compatibility layer for Node.js code
- path: path manipulation utility
- permissions: helpers to check and prompt for security permissions
- signal: helpers for handling Deno process signals
- testing: test assertions for using with Deno’s built-in test runner
- uuid: utilities for generating and validating UUIDs
- ws: helpers for creating WebSocket clients and servers

## Installing Deno
Deno ships as a single executable with no dependencies. You can download a binary from the [releases page](https://github.com/denoland/deno/releases), or install it using the installers below:

Shell (macOS, Linux):
```
curl -fsSL https://deno.land/x/install/install.sh |  sh
```

PowerShell (Windows):
```
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

[Homebrew](https://formulae.brew.sh/formula/deno) (macOS):
```
brew install deno
```

## Upgrading
Once installed, Deno can also upgrade itself to the latest release, using the following command:
```
deno upgrade
```

Or, you can up/downgrade to a specific version:
```
deno upgrade --version 1.0.1
```

## The Future is Bright
The Deno [manual](https://deno.land/manual) suggests that it “is a great replacement for utility scripts that may have been historically written with Bash or Python”. While this is certainly true, I would expect to see it increasingly being used for the same use cases where Node.js is currently popular. There are already a number of Express/Koa-like frameworks cropping up, allowing you to build type-safe REST APIs, along with a growing number of third-party modules becoming available.

So, should you forget Node.js and start learning Deno? Current opinion in the industry is that Node.js is not about to disappear anytime soon, but Deno is definitely a technology to watch.

## Deno Foundations
Learn Deno with our Deno Foundations collection. You’ll find all of our Deno coverage here as we publish it, organized in a way that helps you most as a beginner.

## Deno Fundamentals
- [Introduction to Deno: A Secure JavaScript & TypeScript Runtime](https://www.sitepoint.com/deno-introduction/)
- [Node.js vs Deno: What You Need to Know](https://www.sitepoint.com/node-vs-deno/)