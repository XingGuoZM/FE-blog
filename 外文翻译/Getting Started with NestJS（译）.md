原文地址：[Getting Started with NestJS](https://www.digitalocean.com/community/tutorials/getting-started-with-nestjs)

## 介绍
如果您使用的是Node.js应用程序，则可能已经注意到，随着时间的推移，它变得越来越难以维护。 您向应用程序添加新功能的次数越多，代码库就越大。

[Nest.js](https://nestjs.com/)是用于构建高效，可靠和可扩展的应用程序的服务端Node.js框架。 它为后端应用程序提供了一种模块化结构，用于将代码组织到单独的模块中。 它旨在消除代码库的混乱。

受[Angular](https://angular.io/)的启发，Nest.js使用[TypeScript](https://www.typescriptlang.org/)构建，并使用了[Express.js](https://expressjs.com/)，使其与大多数Express中间件兼容。

在本文中，您将创建一个小的RESTful API，使用户能够在书店中获取，创建和删除图书。

## 前提
要完成本教程，您将需要：

- Node.js的本地开发环境。移步[如何安装Node.js和创建本地开发环境](https://www.digitalocean.com/community/tutorial_series/how-to-install-node-js-and-create-a-local-development-environment)

## 了解Nest.js的组成结构
以下是构建Nest.js应用程序时使用的组成部分

- Controllers
- Providers
- Modules

我们将从查看controllers开始。 与大多数Web框架一样，Nest.js中的controllers负责处理所有传入请求，并将响应返回给应用程序的客户端。 例如，如果您对特定端点（例如/home）进行API调用，则controllers将接收到该请求，并基于可用资源，它将返回适当的响应。

Nest.js的构建方式使路由机制能够控制哪个控制器将负责处理特定请求。

要在Nest.js中定义一个controller，请创建一个TypeScript文件并包括一个装饰器@Controller()，如以下代码片段所示：

```
// users.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
 @Get()
 findAll() {
   return 'This will return all the users';
 }
}
```
Controller装饰器中用户的前缀将指示UsersController处理应用程序中的任何/ users GET请求并返回指定的适当响应。 控制器处理的其他HTTP请求包括POST，PUT，DELETE，我们将在本教程的后面部分看到。

创建controller后，需要将其添加到Module定义中，Nest.js才能轻松识别它。 这可以是根ApplicationModule或在应用程序内创建的任何其他模块。 有关更多信息，请参见本文的Modules部分。

现在让我们看一下providers。

如前所述，Nest.js受Angular的启发很大，类似于Angular应用程序，您可以创建一个提供程序并将其注入到controllers或其他providers中。 这些providers也称为服务，它们旨在抽象化任何形式的复杂性和逻辑。

Nest.js中的服务提供者是一个JavaScript类，其顶部带有一个特殊的@Injectable()装饰器。 例如，您可以创建一个服务来获取用户：
```
// users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);   }

  findAll(): User[] {
    return this.users;
  }
}
```
上面创建的提供程序是带有两个方法create()和findAll()的类，可分别用于创建和返回所有用户。为了方便进行类型检查，使用了一个接口来指定方法应接收的元素的类型。

最后，让我们看一下Modules。Modules使您可以对相关文件进行分组。它们是用@Module装饰器装饰的Typescript文件。该附加的装饰器提供了Nest用来组织应用程序结构的元数据。

每个Nest.js应用程序必须至少具有一个模块，通常称为根模块。这个根模块是顶层模块，通常对于一个小型应用程序就足够了。建议将大型应用程序分为多个模块，因为这有助于维护应用程序的结构。

如果您有一个管理有关用户的大量数据或功能的应用程序，则可以将controller，services和其他相关文件分组到一个模块中，例如UsersModule：
```
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.ts';
import { UsersService } from './users.service.ts';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule {}
```
在此示例中，我们导出了一个包含UsersController和UsersService的UsersModule。 设置好此位置之后，我们可以继续在应用程序的根模块中导入和使用UsersModule，如以下代码片段所示：

```
...
import { UsersModule } from './users/users.module';

@Module({
  ...
})

export class AppModule { }
```
Nest.js中还有一些其他重要概念：

- DTO：数据传输对象是定义如何通过网络发送数据的对象。
- 接口：TypeScript接口用于类型检查和定义可以传递给控制器或Nest服务的数据类型。
- 依赖注入：依赖注入是一种用于提高应用程序效率和模块化的设计模式。 最大的框架经常使用它来保持代码的清洁和易于使用。 Nest.js也利用它来基本创建耦合组件。

通过这种模式，管理诸如控制器，提供程序和模块之类的构建块之间的依赖性非常容易。 唯一需要做的就是在控制器的构造函数中定义依赖项，例如，UsersService（），如下所示：
```
...
@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService){}
 ...
}
```
在简要介绍了其中一些概念之后，您现在可以进入下一节，在这里您将把到目前为止所获得的所有知识投入使用，同时您还将学习如何使用Nest.js无缝构建RESTful API。

如本文前面所述，您将创建一个示例应用程序，以帮助您更好地了解Nest.js的一些核心概念。

该应用程序将专门用于书店。 在文章的结尾，您将创建一个微服务，该服务将使用户能够创建新书并向其现有书单添加很少的描述。 这可能来自数据库，但是为了确保本文的简洁性，我们还没有真正将应用程序连接到数据库。 但是，相反，我们将利用书籍的模拟数据，一旦创建了新书籍，我们将其推送并添加到列表中。

## 第1步 - 安装Nest.js
为了搭建一个新的Nest.js应用程序，您将需要全局安装[Nest CLI](https://docs.nestjs.com/cli/overview)应用程序。 这是一个命令行工具，专门用于制作新的Nest.js应用并提供对多个命令的访问权限，以生成不同的文件并生成结构良好的应用。

除了使用CLI工具之外，您还可以通过使用[Git](https://git-scm.com/)从[GitHub](https://github.com)克隆[starter project](https://github.com/nestjs/typescript-starter)安装新的Nest.js应用程序。但出于本教程的目的，请运行以下命令来安装Nest CLI：
```
npm install -g @nestjs/cli
```

这将使您可以访问nest命令以进行项目安装以及其他项目特定的命令。

接下来，运行以下命令以在开发目录中安装一个名为bookstore-nest的新项目：
```
nest new bookstore-nest
```

在安装过程中，系统将询问您一些问题，只需按照提示进行操作，然后做出相应的响应即可。 接下来，安装完成后，将工作目录切换到新创建的项目中：
```
cd bookstore-nest
```
启动应用程序:
```
npm run start
```
您也可以运行以下命令来在项目中使用Nodemon：
```
// start the application using nodemon
npm run start:dev
```
在浏览器中导航到http://localhost:3000，您将看到Hello World！，如下图所示：

![](https://scotch-res.cloudinary.com/image/upload/v1544588904/knbn6shhai8kdxlfznpu.png)

## 第2步 - 在项目启动后，让我们创建根模块。
让我们为书店生成一个模块。 为此，您将利用Nest CLI的文件生成器。 运行以下命令为应用程序搭建新模块：
```
nest generate module books
```
这将在src文件夹中创建一个名为books的新文件夹。 在books文件夹中，您将找到一个books.module.ts文件：
```
// src/books/books/module.ts
import { Module } from '@nestjs/common';
@Module({})
export class BooksModule {}
```
这是由命令生成的，该模块也已添加到app.module.ts中，该碰巧是应用程序的根模块。

接下来，您将为端点创建路由

## 第3步 - 创建路由和控制器
正如之前提到的那样，路由存在于控制器中，因此你需要创建控制器用于处理各个端点。再次使用Nest CLI生成你的控制器，运行以下命令:
```
nest generate controller books
```
这将在books文件夹中创建一个控制器。
由于我们暂时不会连接到数据库，因此请为书店创建一个简单的模拟数据。 在src文件夹下，创建一个名为mocks的子文件夹，并在新创建的文件夹内，创建一个名为books.mock.ts的新TypeScript文件，并在其中添加以下代码：
```
// src/mocks/books.mock.ts
export const BOOKS = [
    { id: 1, title: 'First book', description: "This is the description for the first book", author: 'Olususi Oluyemi' },
    { id: 2, title: 'Second book', description: "This is the description for the second book", author: 'John Barry' },
    { id: 3, title: 'Third book', description: "This is the description for the third book", author: 'Clement Wilfred' },
    { id: 4, title: 'Fourth book', description: "This is the description for the fourth book", author: 'Christian nwamba' },
    { id: 5, title: 'Fifth book', description: "This is the description for the fifth book", author: 'Chris anderson' },
    { id: 6, title: 'Sixth book', description: "This is the description for the sixth book", author: 'Olususi Oluyemi' },
];
```
接下来，您将创建一个服务来保存书店的所有逻辑。

## 第4步 – 搭建一个服务
运行以下命令以生成服务：
```
nest generate service books
```
此命令将在./src/books文件夹中创建一个名为books.service.ts的新文件。

接下来，打开新创建的文件并粘贴以下内容：

```
// /src/books/books.service.ts
import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mock';

@Injectable()
export class BooksService {
    books = BOOKS;

    getBooks(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.books);
        });
    }
    getBook(bookID): Promise<any> {
        let id = Number(bookID);
        return new Promise(resolve => {
            const book = this.books.find(book => book.id === id);
            if (!book) {
                throw new HttpException('Book does not exist!', 404);
            }
            resolve(book);
        });
    }
}
```
首先，您从Nest.js导入了需要用到的模块，还从先前创建的模拟数据中导入了BOOKS。

接下来，创建了两个名为getBooks()和getBook()的不同方法，以从模拟数据中检索书籍列表，并使用bookID作为参数仅获取一本书。

接下来，在getBook()方法之后立即将以下方法添加到/src/books/books.service.ts中：
```
// src/books/books.service.ts
import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mock';
@Injectable()
export class BooksService {
    books = BOOKS;
    ...
    addBook(book): Promise<any> {
        return new Promise(resolve => {
            this.books.push(book);
            resolve(this.books);
        });
    }
}
```
上面的方法将会用于添加一本新书到现存的列表中

最后，添加最后一个方法，使用bookID作为参数删除特定的书：
```
// src/books/books.service.ts
import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mock';
@Injectable()
export class BooksService {
    books = BOOKS;
    ...
    deleteBook(bookID): Promise<any> {
        let id = Number(bookID);
        return new Promise(resolve => {
            let index = this.books.findIndex(book => book.id === id);
            if (index === -1) {
                throw new HttpException('Book does not exist!', 404);
            }
            this.books.splice(1, index);
            resolve(this.books);
        });
    }
}
```

## 第5步 - 将服务注入控制器

在这里，您将通过构造函数的方式使用依赖项注入设计模式将BooksService传递到BooksController中。 打开先前创建的BooksController，并将以下代码粘贴到其中：

```
// src/books/books.controller.ts
import { Controller, Get, Param, Post, Body, Query, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Get()
    async getBooks() {
        const books = await this.booksService.getBooks();
        return books;
    }

    @Get(':bookID')
    async getBook(@Param('bookID') bookID) {
        const book = await this.booksService.getBook(bookID);
        return book;
    }

    @Post()
    async addBook(@Body() createBookDTO: CreateBookDTO) {
        const book = await this.booksService.addBook(createBookDTO);
        return book;
    }

    @Delete()
    async deleteBook(@Query() query) {
        const books = await this.booksService.deleteBook(query.bookID);
        return books;
    }
}
```

首先，重要模块是从@nestjs/common导入的，您还分别导入了BooksService和CreateBookDTO。 CreateBookDTO是一个数据传输对象，它是一个TypeScript类，用于类型检查并定义对象在创建新书时的外观结构。我们将稍后创建此DTO。

接下来，您使用构造函数将BooksService注入到控制器中，并创建了四个不同的方法：

- getBooks()：用于获取所有书籍的列表。它具有@Get()装饰器。这有助于将发送到 /books 的任何GET请求映射到此控制器。

- getBook()：用于通过将bookID作为参数来检索特定书籍的详细信息。

- addBook()：用于创建新书并将其发布到现有书单中。并且由于我们没有持久化到数据库中，因此新添加的书将仅保存在内存中。

- deleteBook()：用于通过传递bookID作为查询参数来删除一本书。

每个方法都附加有一个特殊的装饰器，这使得将每个HTTP请求路由到控制器内的特定方法非常容易。

## 第6步 - 定义DTO
在上一部分中，您使用了一个称为CreateBookDTO的数据传输对象。 要创建它，请导航到./src/books文件夹并创建一个新的子文件夹名称dto。 接下来，在新创建的文件夹中，创建另一个文件，并将其命名为create-book.dto.ts并将以下内容粘贴到其中：
```
// src/books/dto/create-book.dto.ts
export class CreateBookDTO {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly author: string;
}
```
您几乎已经完成了该应用程序。 导航回到先前创建的./src/books/books.module.ts文件，并使用以下代码对其进行更新：
```
// src/books/books.module.ts
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
@Module({
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
```
如果当前没有运行该应用程序，请再次启动：
```
npm run start
```
然后使用[postman](https://www.getpostman.com/)来测试API

![](https://scotch-res.cloudinary.com/image/upload/v1544589034/y9n5haiplryjvtakn36l.png)

创建一些新书：

![](https://scotch-res.cloudinary.com/image/upload/v1544589622/gjlmlpxta0sydymqwzcb.png)

使用ID获取一本书：

![](https://scotch-res.cloudinary.com/image/upload/v1544589609/qis0fpn6j3klz4yd6al9.png)

删除一本书:

![](https://scotch-res.cloudinary.com/image/upload/v1544589635/b7ucv3tccktklkgskyaw.png)

## 总结

在本教程中，您快速了解了Nest.js的基础知识和基本构建块，然后构建了RESTful API。

您会找到本教程的完整源代码[在GitHub上](https://github.com/yemiwebby/bookstore-nest)。