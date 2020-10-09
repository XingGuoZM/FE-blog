原文地址：[Getting Started with NestJS](https://www.digitalocean.com/community/tutorials/getting-started-with-nestjs)

## Introduction
If you’ve worked on a Node.js application, you may have noticed that it became more difficult to maintain over time. The more you add new features to the application, the larger the codebase becomes.

[Nest.js](https://nestjs.com/) is a server-side Node.js framework for building efficient, reliable and scalable applications. It provides backend applications a modular structure for organizing code into separate modules. It was built to eliminate disorganized codebases.

Heavily inspired by [Angular](https://angular.io/), Nest.js was built with [TypeScript](https://www.typescriptlang.org/) and uses [Express.js](https://expressjs.com/) under the hood, which makes it compatible with the majority of Express middleware.

In this post, you’ll create a small RESTful API that enables users to fetch, create and delete books in a bookstore.

## Prerequisites
To complete this tutorial, you will need:

- A local development environment for Node.js. Follow [How to Install Node.js and Create a Local Development Environment](https://www.digitalocean.com/community/tutorial_series/how-to-install-node-js-and-create-a-local-development-environment)

## Understanding the Building blocks of Nest.js
The following are the building blocks used when building Nest.js applications:

- Controllers
- Providers
- Modules

We’ll start by looking at controllers. Like most web frameworks, controllers in Nest.js are responsible for handling any incoming requests and returning responses to the client side of the application. For example, if you make an API call to a particular endpoint, say /home, the controller will receive this request and based on the available resources, it will returned the appropriate response.

Nest.js was structured in a way that the routing mechanism is able to control which controller will be responsible for handling a particular request.

To define a controller in Nest.js, create a TypeScript file and include a decorator @Controller() as shown in the following code snippet:

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
The prefix of users within the Controller decorator will prompt the UsersController to handle any /users GET request within an application and return the appropriate response as specified. Other HTTP request handled by the controller includes POST , PUT, DELETE as we will see later in the tutorial.

Once a controller is created, it needs to be added to the module definition before Nest.js can easily recognise it. This could be the root ApplicationModule or any other module created within the application. More about this in the module section of this post.

Now let’s look at providers.

As mentioned earlier, Nest.js was heavily inspired by Angular and similar to an Angular application, you can create a provider and inject it into controllers or other providers. These providers are also called services, and they’re designed to abstract any form of complexity and logic.

A service provider in Nest.js is a JavaScript class with a special @Injectable() decorator at the top. For example, you can create a service to fetch users:
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
The provider created above is a class with two methods create() and findAll(), which can be used to create and return all users respectively. And to easily help with type checking an interface was used to specify the type of elements that should be received by the methods.

Finally, let’s look at Modules. Modules let you group related files. They are Typescript files decorated with @Module decorator. This attached decorator provides metadata that Nest makes use of to organize the application structure.

Each Nest.js application must have at least one module, usually referred to as the root module. This root module is the top-level module and usually enough for a small application. It is advisable to break a large application into multiple modules as it helps to maintain the structure of the application.

If you have an application that manages a lot of data or functionality about users , you can group the controller, services, and other related files into a single module, like UsersModule:
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

In this example, we are exported a UsersModule that contains both the UsersController and UsersService. With this in place, we can then proceed to import and use the UsersModule within the root module of the application as shown in the following code snippet:

```
...
import { UsersModule } from './users/users.module';

@Module({
  ...
})

export class AppModule { }
```

There are a few other important concepts in Nest.js:

- DTO: Data transfer object is an object that defines how data will be sent over the network.
- Interfaces: TypeScript interfaces are used for type-checking and defining the types of data that can be passed to a controller or a Nest service.
- Dependency injection: Dependency injection is a design pattern used to increase efficiency and modularity of applications. It is often used by the biggest frameworks to keep code clean and easier to use. Nest.js also makes use of it to basically create coupled components.

With this pattern, it is very easy to manage dependencies between building blocks like controllers, providers and modules. The only thing required is to define the dependency for example a UsersService() in the constructor of a controller as shown here:

```
...
@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService){}
 ...
}
```
With some of these concepts briefly covered, you can now proceed to the next section, where you will put all the knowledge gained so far in this post into use as you will learn how to seamlessly build a RESTful API using Nest.js.

As stated earlier in this post, you will create a sample application that will help you get a good grasp on some of the core concepts of Nest.js.

This application will be specifically for a bookstore. At the end of the post you would have created a micro-service that will enable users to create and add a new book with few descriptions to an existing list of books. This could be from a database, but to ensure simplicity in this post, we won’t really be connecting our application to a database yet. But instead, we will make use of a mock data of books and once a new book is created, we will push and add it to the list.

## Step 1 – Installing Nest.js
In order to scaffold a new Nest.js application, you will need to globally install the [Nest CLI](https://docs.nestjs.com/cli/overview) application. It is a command-line tool specifically created to craft a new Nest.js app and provide access to several commands to generate different files and produce a well-structured application.

Apart from using the CLI tool, you can also install a new Nest.js application by cloning the [starter project](https://github.com/nestjs/typescript-starter) from [GitHub](https://github.com/) using [Git](https://git-scm.com/), but for the purpose of this tutorial run the following command to install the Nest CLI:
```
npm install -g @nestjs/cli
```

This will give you access to the nest command for project installation and other project specific commands.

Next, run the following command to install a new project named bookstore-nest within your development folder:
```
nest new bookstore-nest
```

You will be asked a few questions during the installation, just follow the prompt and respond accordingly. Next, once the installation is complete, switch your working directory into the newly created project:
```
cd bookstore-nest
```
Start the application with:
```
npm run start
```
You can also run the followingcommand in order to use Nodemon for the project:
```
// start the application using nodemon
npm run start:dev
```
Navigate to http://localhost:3000 in your browser and you will see the Hello World! message as shown in the following image:

![](https://scotch-res.cloudinary.com/image/upload/v1544588904/knbn6shhai8kdxlfznpu.png)

With the project started, let’s create the root module.

## Step 2 – Generating a Module
Let’s generate a module for the bookstore. To do this, you will leverage the Nest CLI’s file generator. Run the following command to scaffold a new module for the application:
```
nest generate module books
```

This creates a new folder named books within the src folder. Within the books folder you will find a books.module.ts file:
```
// src/books/books/module.ts
import { Module } from '@nestjs/common';
@Module({})
export class BooksModule {}
```

This was generated by the command and the module has also been added to the app.module.ts which happens to be the root module of the application.

Next, you will create routes for the endpoints

## Step 3 – Creating Routes and Controllers
As mentioned earlier, routes exist in controllers, so you need to create controllers that will handle individual endpoints. Again, use Nest CLI to generate your controllers, run the following command:
```
nest generate controller books
```
This creates a controller inside the books folder.
Since we won’t be connecting to the database for now, create a sample mock data for the bookstore. Under the src folder, create a subfolder named mocks and within the newly created folder, create a new TypeScript file named books.mock.ts and add the following code in it:
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
Next, you will create a service to hold all the logic for the bookstore.

## Step 4 – Setting up a Service
Run the following command to generate a service:
```
nest generate service books
```
This command will create a new file named books.service.ts within ./src/books folder.

Next, open the newly created file and paste the following:
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
First, you imported the requires modules from Nest.js and also BOOKS from the mock data you created earlier.

Next, you created two different methods named getBooks() and getBook() to retrieve the list of books from the mock data and to fetch just one book using the bookID as a parameter.

Next, add the following method to the /src/books/books.service.ts immediately after the getBook() method:
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
The method above will be used to push a new book to the existing list

Finally, add the last method to delete a particular book using the bookID as a parameter:
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
## Step 5 – Injecting the Service into the Controller
Here, you will use dependency injection design pattern to pass the BooksService into the BooksController through a constructor. Open the BooksController created earlier and paste the following code in it:
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

First, the important modules were imported from @nestjs/common and you also import both the BooksService and CreateBookDTO respectively. CreateBookDTO is a data transfer object, a TypeScript class created for type-checking and to define the structures of what an object looks like when creating a new book. We will create this DTO in a bit.

Next, you used constructor to inject the BooksService into the controller and created four different methods which are:

- getBooks(): Used to fetch the list of all books. It has @Get() decorator attached to it. This helps to map any GET request sent to /books to this controller.

- getBook(): Used to retrieve the details of a particular book by passing the bookID as a parameter.

- addBook(): Used to create and post a new book to the existing book list. And because we are not persisting into the database, the newly added book will only be held in memory.

- deleteBook(): Used to delete a book by passing the bookID as a query parameter.

Each of the methods has a special decorator attached to it, which makes it very easy to route each HTTP request to a specific method within the controller.

## Step 6 – Defining The DTO
In the previous section, you made use of a data transfer object called CreateBookDTO. To create it, navigate to the ./src/books folder and create a new subfolder name dto. Next, within the newly created folder, create another file and call it create-book.dto.ts and paste the following in it:
```
// src/books/dto/create-book.dto.ts
export class CreateBookDTO {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly author: string;
}
```

You are almost done with the application. Navigate back to the ./src/books/books.module.ts file you created earlier and update it with the following code:
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
Start the application again if it is not running at the moment with:
```
npm run start
```
Then use [postman](https://www.getpostman.com/) to test the API

![](https://scotch-res.cloudinary.com/image/upload/v1544589034/y9n5haiplryjvtakn36l.png)

Create some new books:

![](https://scotch-res.cloudinary.com/image/upload/v1544589622/gjlmlpxta0sydymqwzcb.png)

Get a book using an ID:

![](https://scotch-res.cloudinary.com/image/upload/v1544589609/qis0fpn6j3klz4yd6al9.png)

And delete a book:

![](https://scotch-res.cloudinary.com/image/upload/v1544589635/b7ucv3tccktklkgskyaw.png)


## Conclusion
In this tutorial you took a quick look at the fundamentals and basic building blocks of Nest.js and then built a RESTful API.

You will find the complete source code of this tutorial [here on GitHub](https://github.com/yemiwebby/bookstore-nest).