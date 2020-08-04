原文地址：[Introduction to Deno: A Secure JavaScript & TypeScript Runtime](https://www.sitepoint.com/deno-introduction/)   

#### 2020年五月发布的Deno 1.0，已经成为了一个异常火爆的谈论话题。如果你也想来凑凑热闹，那么你来对地方了！

在本文中，我将给你讲解Deno是什么。 我们将研究其主要功能，并阐述为什么你会想要开始学习这个新工具。

## Deno是什么？  
那么，Deno是什么，为什么创造它？它是Javascript和TypeScript的运行时，这意味着你可以使用两者中的任何一种语言编写程序并使用命令执行它们。与浏览器中运行的JavaScript不同，Deno程序可以访问主机上的资源，例如文件系统和环境变量。

如果您知道[Node.js]（https://www.sitepoint.com/an-introduction-to-node-js/），并且您认为Deno听起来很相似，那是对的 。 Deno是Node的创建者Ryan Dahl的创意，他创建了Deno来解决他认为的[Node的设计缺陷]（https://www.youtube.com/watch?v=M3BM9TB-8yA）。 该项目的目的是提供一个默认情况下安全的脚本环境，它将TypeScript视为一流的语言，并尽可能与浏览器兼容（在实际情况下）

## 安全特性  
Deno设计为开箱即用。 默认情况下，所有代码都在安全的沙箱中执行，这意味着您需要授予明确的权限，以允许程序访问网络或文件系统。

可以使用以下命令行参数为程序授权：

- -A，–allow-all：允许所有权限（禁用所有安全性）。
- –allow-env：允许获取和设置环境变量。
- –allow-hrtime：允许高分辨率时间测量（可用于定时攻击和指纹识别）。
- –allow-net = \：允许网络访问。 （可选）采用逗号分隔的域白名单。
- –allow-plugin：允许加载插件（不稳定的功能）。
- –allow-read = \：允许文件系统读取访问。 （可选）以逗号分隔的目录或文件白名单。  
- –allow-run：允许运行子进程。
- –allow-write = \：允许文件系统写访问。 （可选）以逗号分隔的目录或文件白名单。

## 支持第一流语言TypeScript  
正如前文提到的那样，Deno可以执行JavaScript和TypeScript。 而且，它还支持被称为第一流语言的TypeScript。 这意味着它可以加载和运行您的TypeScript代码，而无需任何其他构建步骤。 无需设置其他工具即可先将代码转换为JavaScript。

当然，由于TypeScript是现代JavaScript的超集，因此，如果您愿意，也可以使用旧的JS编写代码！ Deno支持一些对开发人员友好的出色功能，例如ES模块导入。

## 使用外部代码
正如Ryan在演讲中提到的那样，Deno的目标之一是避免使用包管理器。与Node.js和PHP（分别使用[npm]（https://www.sitepoint.com/beginners-guide-node-package-manager/）和composer包管理器）等运行时/语言不同，Deno不使用包管理器。

相反，外部的包通过URL来引入
```
import { Client } from "https://deno.land/x/mysql@2.2.0/mod.ts";
```
首次运行脚本时，Deno将获取，编译和缓存所有需要导入的包，以便加快后面的启动速度。 显然，有时您可能要强制重新获取包，并且可以使用cache子命令执行此操作：
```
deno cache --reload my_module.ts
```

## 软件包托管  
尽管Deno没有提供软件包的注册中心，但有一个[第三方可用的模块列表]（https://deno.land/x）。 该服务提供了一个标准化的版本化的URL，该URL映射到该模块的GitHub仓库。 您可以按名称搜索软件包并查看简要说明，通过单击可以查看软件包的readme。

## 标准库  
Deno提供了一个[标准库]（https://deno.land/std）（大致基于Golang），该库提供了一组高质量的没有外部依赖的标准模块。

标准库中的软件包没有和Deno一起安装。相反，它们可以在线使用。回顾上一节，这些模块是有版本的，你可以将代码固定到某个特定的版本：
```
import { copy } from "https://deno.land/std@0.50.0/fs/copy.ts";
```

这意味着您编写的任何依赖于标准库中模块的代码都应在以后的版本中继续使用。

该库包含构建命令行和基于HTTP的应用程序可能需要的各种帮助程序和实用程序：

- archive: 操作tar文件  
- async: 异步程序  
- bytes: 二进制数组  
- datetime: 日期字符串转日期对象  
- encoding: base32, binary, CSV, TOML, and YAML格式的转码器
- flags: 命令行参数的解析器  
- fmt: 打印格式化输出的工具  
- fs: 文件系统  
- hash: 使用各种算法创建哈希  
- http: 创建HTTP和文件服务器，并操作cookies  
- io: 字符串输入输出  
- log: 日志记录  
- mime: 多数据格式支持  
- node: 兼容node  
- path: 路径  
- permissions: 权限   
- signal: 信号  
- testing: 测试断言  
- uuid: 生成和验证UUIDs  
- ws: 创建websocket客户端和服务器  

## 安装Deno  
Deno作为单个可执行文件存在，并没有其他依赖。 您可以从[发布页]（https://github.com/denoland/deno/releases）下载二进制文件，或使用以下安装程序进行安装：

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

## 升级  
安装完成之后，Deno也可以使用以下命令将自身升级到最新版本：
```
deno upgrade
```

或者，您可以升级/降级到特定版本：
```
deno upgrade --version 1.0.1
```

## 未来可期  
Deno[手册](https://deno.land/manual)上说"这是一个可以替代之前使用Bash或者Python编写的实用脚本"。这确实是真的，但我希望它越来越多的用于当前node.js受欢迎的地方。已经出现了许多类似于Expresss/Koa的框架，允许你构建类型安全的REST API，以及越来越多第三方可用的模块。

因此，你应该抛弃Node.js并开始学习Deno吗？业界目前的观点是Node.js不会很快消失，但是Deno绝对是一项值得关注的技术。  

## Deno Foundations    
通过我们的Deno Foundations系列了解Deno。当我们发布时，您会在这里找到我们所有的有关Deno的内容，其整理出的东西可以为为初学者提供最大的帮助。

## Deno基础  
- [Introduction to Deno: A Secure JavaScript & TypeScript Runtime](https://www.sitepoint.com/deno-introduction/)
- [Node.js vs Deno: What You Need to Know](https://www.sitepoint.com/node-vs-deno/)