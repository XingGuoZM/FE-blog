## 起因
最近遇到系统优化的需求，webpack作为模块打包工具可以帮助我们。作为webpack的小白，该如何系统的学习呢？首先当然是学会webpack的基本使用，能做出些效果。我们先从最简单的构建目标开始，打包一个helloworld应用程序。[源码地址](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-helloworld)

## 使用webpack构建一个helloworld程序
新建一个目录webpack-demo-helloworld,切至该目录下
```
npm init -y
npm install --save webpack webpack-cli webpack-dev-server
```
再安装一个html的插件 html-webpack-plugin
```
npm install --save html-webpack-plugin
```

webpack项目基本的结构
- src
  - index.js
- .gitignore
- package.json
- webpack.config.js

index.js里的代码逻辑为，创建一个div，div的innerHTML设置为"hello world"，然后将这个div添加至body下。.gitignore文件是设置需要忽略提交的目录或文件。package.json是项目的清单，其中罗列了项目的名称、版本、依赖包以及一些命令等等。webpack.config.js是webpack应用的配置文件，该文件不是必须的，简单的配置可以直接写到命令当中。如果项目复杂度较高，那么webpack.config.js可以帮助开发者梳理webpack的各项配置，同时也能灵活的进行修改。webpack.config.js文件主要包含入口配置，输出配置，loader和插件配置等等。

最终展现出的效果，通过“npm run start”命令可以启动项目，在浏览器页面中会打印出"hello world"。

## webpack的组成部分
我们看到安装了三个包：webpack webpack-cli webpack-dev-server。这三个工具是一个webpack应用的必不可少的组成部分。
webpack作为一个打包工具，它的职责聚焦在js模块打包，对外开放loader和plugin来丰富其生态圈。webpack-cli是webpack的命令行工具，有了这个工具我们可以使用shell命令轻松的控制我们的项目工程，例如启动、构建打包等。webpack-dev-server是为我们的应用配套的本地web服务器，例如热加载等。这两个工具可以提升我们的开发体验和提高调试效率。

下面我们来看下这三个工具是如何配合使用的，找到./node_modules/.bin目录，里面有三个文件分别是webpack、webpack-cli、webpack-dev-server,三个文件分别对应./node_modules包下webpack、webpack-cli、webpack-dev-server三个目录下bin的文件。切到我们的目录下执行webpack或webpack-cli或webpack-dev-server，那么该应用会自动执行对应的文件。

- webpack
```js
#!/usr/bin/env node

/**
 * @param {string} command process to run
 * @param {string[]} args command line arguments
 * @returns {Promise<void>} promise
 */
const runCommand = (command, args) => {
	const cp = require("child_process");
	return new Promise((resolve, reject) => {
		const executedCommand = cp.spawn(command, args, {
			stdio: "inherit",
			shell: true
		});

		executedCommand.on("error", error => {
			reject(error);
		});

		executedCommand.on("exit", code => {
			if (code === 0) {
				resolve();
			} else {
				reject();
			}
		});
	});
};

/**
 * @param {string} packageName name of the package
 * @returns {boolean} is the package installed?
 */
const isInstalled = packageName => {
	if (process.versions.pnp) {
		return true;
	}

	const path = require("path");
	const fs = require("graceful-fs");

	let dir = __dirname;

	do {
		try {
			if (
				fs.statSync(path.join(dir, "node_modules", packageName)).isDirectory()
			) {
				return true;
			}
		} catch (_error) {
			// Nothing
		}
	} while (dir !== (dir = path.dirname(dir)));

	return false;
};

/**
 * @param {CliOption} cli options
 * @returns {void}
 */
const runCli = cli => {
	const path = require("path");
	const pkgPath = require.resolve(`${cli.package}/package.json`);
	// eslint-disable-next-line node/no-missing-require
	const pkg = require(pkgPath);
	// eslint-disable-next-line node/no-missing-require
	require(path.resolve(path.dirname(pkgPath), pkg.bin[cli.binName]));
};

/**
 * @typedef {Object} CliOption
 * @property {string} name display name
 * @property {string} package npm package name
 * @property {string} binName name of the executable file
 * @property {boolean} installed currently installed?
 * @property {string} url homepage
 */

/** @type {CliOption} */
const cli = {
	name: "webpack-cli",
	package: "webpack-cli",
	binName: "webpack-cli",
	installed: isInstalled("webpack-cli"),
	url: "https://github.com/webpack/webpack-cli"
};

if (!cli.installed) {
	const path = require("path");
	const fs = require("graceful-fs");
	const readLine = require("readline");

	const notify =
		"CLI for webpack must be installed.\n" + `  ${cli.name} (${cli.url})\n`;

	console.error(notify);

	let packageManager;

	if (fs.existsSync(path.resolve(process.cwd(), "yarn.lock"))) {
		packageManager = "yarn";
	} else if (fs.existsSync(path.resolve(process.cwd(), "pnpm-lock.yaml"))) {
		packageManager = "pnpm";
	} else {
		packageManager = "npm";
	}

	const installOptions = [packageManager === "yarn" ? "add" : "install", "-D"];

	console.error(
		`We will use "${packageManager}" to install the CLI via "${packageManager} ${installOptions.join(
			" "
		)} ${cli.package}".`
	);

	const question = `Do you want to install 'webpack-cli' (yes/no): `;

	const questionInterface = readLine.createInterface({
		input: process.stdin,
		output: process.stderr
	});

	// In certain scenarios (e.g. when STDIN is not in terminal mode), the callback function will not be
	// executed. Setting the exit code here to ensure the script exits correctly in those cases. The callback
	// function is responsible for clearing the exit code if the user wishes to install webpack-cli.
	process.exitCode = 1;
	questionInterface.question(question, answer => {
		questionInterface.close();

		const normalizedAnswer = answer.toLowerCase().startsWith("y");

		if (!normalizedAnswer) {
			console.error(
				"You need to install 'webpack-cli' to use webpack via CLI.\n" +
					"You can also install the CLI manually."
			);

			return;
		}
		process.exitCode = 0;

		console.log(
			`Installing '${
				cli.package
			}' (running '${packageManager} ${installOptions.join(" ")} ${
				cli.package
			}')...`
		);

		runCommand(packageManager, installOptions.concat(cli.package))
			.then(() => {
				runCli(cli);
			})
			.catch(error => {
				console.error(error);
				process.exitCode = 1;
			});
	});
} else {
	runCli(cli);
}

```
存在3个方法runCommand、isInstalled、runCli。
首先会判断是否安装webpack-cli,如果没有安装
- 第一会打印一条错误提示我们需要安装cli,给出名称和url。

- 第二判断当前的包管理工具是yarn、pmpm还是npm，判断方式就是查看本地是否存在yarn.lock、pnpm-lock.yaml等文件；然后给出安装方式，如果是yarn后面的操作就是add，其他即是install；最后打印出一条提示信息需要使用什么包管理工具通过什么命令进行安装

- 第三会询问你是否进行安装webpack-cli,会创建一个逐行读取的接口，不理解readLine的可以看[这里](http://nodejs.cn/api/readline.html#readline_readline),它主要看你输入的字符串的第一个字是不是“y”，不区分大小写。这里判断如果不是"y",则打印一条提示信息告诉我们"需要通过命令行安装webpack-cli，也可以手动自行安装cli"。如果是“y”,则先打印一条正在安装的信息，然后执行runCommand，安装完成之后自动执行runCli，安装失败则会提示报错信息。

如果检测到安装了则直接执行runCli.

我们再来看下runCommand和runCli这两个函数，runCommand主要实现方式是通过node子进程的[spawn方法](http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options)来执行命令。runCli主要实现方式是通过require函数来调用bin文件来执行命令行。

- webpack-cli
```js
#!/usr/bin/env node

"use strict";

const Module = require("module");

const originalModuleCompile = Module.prototype._compile;

require("v8-compile-cache");

const importLocal = require("import-local");
const runCLI = require("../lib/bootstrap");
const utils = require("../lib/utils");

if (!process.env.WEBPACK_CLI_SKIP_IMPORT_LOCAL) {
    // Prefer the local installation of `webpack-cli`
    if (importLocal(__filename)) {
        return;
    }
}

process.title = "webpack";

if (utils.packageExists("webpack")) {
    runCLI(process.argv, originalModuleCompile);
} else {
    const { promptInstallation, logger, colors } = utils;

    promptInstallation("webpack", () => {
        utils.logger.error(`It looks like ${colors.bold("webpack")} is not installed.`);
    })
        .then(() => {
            logger.success(`${colors.bold("webpack")} was installed successfully.`);

            runCLI(process.argv, originalModuleCompile);
        })
        .catch(() => {
            logger.error(
                `Action Interrupted, Please try once again or install ${colors.bold(
                    "webpack",
                )} manually.`,
            );

            process.exit(2);
        });
}

```
webpack-cli核心代码就一行“runCLI(process.argv, originalModuleCompile);”,本质上是使用[commander.js](https://github.com/tj/commander.js)来执行node.js命令。

- webpack-dev-server
```js
#!/usr/bin/env node

'use strict';

/* eslint-disable no-shadow, no-console */

const fs = require('fs');
const net = require('net');
const debug = require('debug')('webpack-dev-server');
const importLocal = require('import-local');
const yargs = require('yargs');
const webpack = require('webpack');
const Server = require('../lib/Server');
const setupExitSignals = require('../lib/utils/setupExitSignals');
const colors = require('../lib/utils/colors');
const processOptions = require('../lib/utils/processOptions');
const createLogger = require('../lib/utils/createLogger');
const getVersions = require('../lib/utils/getVersions');
const options = require('./options');

let server;
const serverData = {
  server: null,
};
// we must pass an object that contains the server object as a property so that
// we can update this server property later, and setupExitSignals will be able to
// recognize that the server has been instantiated, because we will set
// serverData.server to the new server object.
setupExitSignals(serverData);

// Prefer the local installation of webpack-dev-server
if (importLocal(__filename)) {
  debug('Using local install of webpack-dev-server');

  return;
}

try {
  require.resolve('webpack-cli');
} catch (err) {
  console.error('The CLI moved into a separate package: webpack-cli');
  console.error(
    "Please install 'webpack-cli' in addition to webpack itself to use the CLI"
  );
  console.error('-> When using npm: npm i -D webpack-cli');
  console.error('-> When using yarn: yarn add -D webpack-cli');

  process.exitCode = 1;
}

yargs.usage(
  `${getVersions()}\nUsage:  https://webpack.js.org/configuration/dev-server/`
);

// webpack-cli@3.3 path : 'webpack-cli/bin/config/config-yargs'
let configYargsPath;
try {
  require.resolve('webpack-cli/bin/config/config-yargs');
  configYargsPath = 'webpack-cli/bin/config/config-yargs';
} catch (e) {
  configYargsPath = 'webpack-cli/bin/config-yargs';
}
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-dynamic-require
require(configYargsPath)(yargs);

// It is important that this is done after the webpack yargs config,
// so it overrides webpack's version info.
yargs.version(getVersions());
yargs.options(options);

const argv = yargs.argv;

// webpack-cli@3.3 path : 'webpack-cli/bin/utils/convert-argv'
let convertArgvPath;
try {
  require.resolve('webpack-cli/bin/utils/convert-argv');
  convertArgvPath = 'webpack-cli/bin/utils/convert-argv';
} catch (e) {
  convertArgvPath = 'webpack-cli/bin/convert-argv';
}
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-dynamic-require
const config = require(convertArgvPath)(yargs, argv, {
  outputFilename: '/bundle.js',
});

function startDevServer(config, options) {
  const log = createLogger(options);

  let compiler;

  try {
    compiler = webpack(config);
  } catch (err) {
    if (err instanceof webpack.WebpackOptionsValidationError) {
      log.error(colors.error(options.stats.colors, err.message));
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }

    throw err;
  }

  try {
    server = new Server(compiler, options, log);
    serverData.server = server;
  } catch (err) {
    if (err.name === 'ValidationError') {
      log.error(colors.error(options.stats.colors, err.message));
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }

    throw err;
  }

  if (options.socket) {
    server.listeningApp.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        const clientSocket = new net.Socket();

        clientSocket.on('error', (err) => {
          if (err.code === 'ECONNREFUSED') {
            // No other server listening on this socket so it can be safely removed
            fs.unlinkSync(options.socket);

            server.listen(options.socket, options.host, (error) => {
              if (error) {
                throw error;
              }
            });
          }
        });

        clientSocket.connect({ path: options.socket }, () => {
          throw new Error('This socket is already used');
        });
      }
    });

    server.listen(options.socket, options.host, (err) => {
      if (err) {
        throw err;
      }

      // chmod 666 (rw rw rw)
      const READ_WRITE = 438;

      fs.chmod(options.socket, READ_WRITE, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  } else {
    server.listen(options.port, options.host, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

processOptions(config, argv, (config, options) => {
  startDevServer(config, options);
});

```