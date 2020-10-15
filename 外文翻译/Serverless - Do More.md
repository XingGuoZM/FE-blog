原文地址：[Serverless - Do More](https://www.codementor.io/@chrisquinn299/serverless-do-more-nclf7ere5) 

![Serverless - Do More](https://process.filestackapi.com/cache=expiry:max/resize=width:1050/ojaRKBq1TkGZHeQU3s6Q)  

Repost of an article I wrote for Gravitywell in 2017 (original article here )

I’ve recently been looking at Serverless, a framework for creating, deploying and monitoring serverless apps and functions.

Microservices are all the rage at the minute, but behind the hype lies a heated debate on the suitability of a distributed approach in place of ‘monoliths’ (see our recommended reading at the end of this article). During some R&D time for Gravitywell Labs I took some time to dive into the process of building and deploying a serverless app.

Quick aside: in this article I’ll be specifically referencing AWS Lambda functions running Node.js modules, but the principles could, and should be applied to whatever particular mix of hosting environments and languages you are using.

## What is a serverless app?  
The core idea behind serverless architecture is that application logic can be broken down into discrete standalone functions. Each function would ideally be stateless, not requiring knowledge of any sibling function, application state, or external dependency.

Each function can be called, or invoked, at any time, but when they’re not being used, they lie dormant, and aren’t consuming any resources.

This graphic from Amazon Web Services explains:

![Lambda_HowItWorks.png](https://process.filestackapi.com/cache=expiry:max/2Mu9z7NxQBu93b5MMhT5)

## Why serverless?  
the problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them.

You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.
Peter Seibel - Coders at Work

The last sentence applies to many different situations in software development. The client wants a signup form, we gave them a CMS. The sales team wants total sales for the month, we gave them a BI tool. Software teams over-engineer at their peril, and often the simplest solution can offer the greatest returns. Serverless architectures can facilitate simple solutions without adding a ton of extra baggage (the gorilla holding the banana).

## But serverless is just another buzzword right?  
The next time you try and use the word "serverless" just remember it's like calling takeout "kitchenless".
Kate Pearce - @secvale

At some point, a request to your Lambda function code does eventually get run on a server. "Sham!" I hear you say. But, in all honesty, it's just a term - we could have called it Jeff. Commentators have also pointed to the pitfalls of vendor lock-in when putting all your eggs in AWS basket.

My take on this is that even though the 'serverless' approach has been around for time immemorial (CGI anyone?), the hype train is real - with a plethora of aggressively priced cloud services at our fingertips, even if the solutions available are heavily opinionated, they deserve consideration alongside monolithic or 'fat' apps when architecting web-based event-centric solution.

## Serverless, go!  
In order of purely technical to purely commercial, here are five benefits of a serverless approach:

1. Referentially transparent, reusable functions
2. Easy to integrate automated testing & deployment
3. Greater scalability
4. Quicker ‘time to market’
5. Lower costs  

Let’s step through these in turn.

### Referentially transparent, reusable functions
There’s a lot of similarity between a serverless approach and the philosophies of functional programming. Breaking down your application logic into small, discrete parts (or, pure functions) you can explicitly declare, test and control application logic in a demonstrable and repeatable way.

I’ll let Eric Elliot, a far more learned developer than myself, take the wheel here:  

```
When you avoid shared state, the timing and order of function calls don’t change the result of calling the function. With pure functions, given the same input, you’ll always get the same output. This makes function calls completely independent of other function calls, which can radically simplify changes and refactoring. A change in one function, or the timing of a function call won’t ripple out and break other parts of the program.
Eric Elliot - Javascript Scene
```

Pure functions change nothing else in your app, but return the same result every time, given the same inputs.

The trouble is, we may very well want to changing something about the state of our application, by say, writing to a datastore. For example, if one of our discrete functions is tasked with deleting a record from a database, then it cannot truly be called a pure function because it changes the state of our application. It can, however, be called an idempotent function, because the end result is always the same (a single record is deleted) regardless of the number of times the command is executed, given the provision of a unique identifier.

Well, this article turned heavy pretty quick didn’t it?

![inception-architecture.jpg](https://process.filestackapi.com/cache=expiry:max/HI9r5N8wTrSi1BV8ZK5S)

Here’s the key takeaway: pure functions and/or idempotency help you to write bulletproof unit tests because your functions behave predictably; which bring us neatly onto:

### Easy to integrate automated testing & deployment  
Automated unit tests are an absolute must for working with serverless apps. Why?

A stateless function (in our case a Lambda function) is usually a small part of a wider process, routine or system. This doesn’t mean we get away with treating it as a second class citizen though, we need to develop and test the function with the same care & attention we would bring to any class or module within a monolithic application.

In fact, we’ve got no excuse to not unit test our lambda functions, because they’re stateless and don’t require any special conditions to run.

On our case (Node / AWS Lambda) we can have continuously running unit tests a few simple lines:

```
npm -i nodeunit onchange

npm -i husky --save-dev
```

And make sure you add the following scripts to your package.json

```
 "scripts": { 
  "precommit": "npm test", 
  "prepush": "npm test", 
  "start": "npm run handler.js", 
  "test": "nodeunit ./tests", 
  "watch": "onchange './tests/*.js' 'handler.js' './lib/*.js' -- npm test" 
}
```

Assuming you have a tests directory, a ‘handler.js’ and a lib directory, onchange will watch for changes in those files and re-run your unit tests every time it detects a change. Notice also we’re running the tests before committing and before pushing using husky’s git hooks.

We’re using nodeunit because the test syntax is incredibly simple.

```
 exports.testTargets = function(test, cb){ 
  let targets = require('../lib/targets'); 
  let result = targets.fetch(); 
  test.equals(result.length, 6); 
  test.done(); 
}; 
```

From here, it’s easy enough to configure a post-update git hook to invoke the serverless deploy command to will deploy your changes to AWS.

```
{ 
 ... 
 “postupdate”: “serverless deploy function -f myFunction” 
 ... 
}
```

You could always pass the testing and deploy routines off to a runner like Travis or Circle, but that’s beyond the scope of what we’re discussing here. The snippets above demonstrate that you can have a robust, yet lightweight testing and deployment environment around your serverless functions. It’s also perfectly possible (though not scalable across large teams) to keep a manual deployment process by simply calling serverless deploy ad hoc.

Serverless itself is a framework that supercharges writing and deploying microservice based apps. Quick wins are achieved by tight coupling with AWS-cli, and if you’ve already configured your AWS credentials locally you can go from zero to deployed in very little time.

### Greater scalability  
This benefit is an implicit part of using AWS Lambda - requests to your lambda functions are run in parallel, with no practical limit on the number of requests. Compare this level of scalability and tolerance with a classic LAMP monolith (even several instances behind a load-balancer). To scale, a monolith consumes more and more resources, either horizontally, with more servers instances, or vertically, with more memory or computational power. With a greater operational footprint, and more moving parts, a monolithic approach needs a correspondingly greater amount of human time, monitoring and support.

With no downtime, no maintenance windows and nothing to fall over for want of resources, Lambda functions don’t fall afoul of the majority of problems associated with devops. I’ll caveat this by saying Lambda functions aren’t a panacea for web development - indeed they have their own set of operational idiosyncrasies (parallelisation caps, maximum 300ms execution time), and it’s up to the solutions architect to define at what point a serverless approach is the correct approach. It’s also correct to mix things up with both approaches where relevant, but the takeaway point here is that some operations, such as REST apis, file processing or custom analytics tracking, should absolutely be considered for a serverless approach.

Above all, serverless functions are damn quick.

### Quicker ‘time to market’  
The time I’ve spent using Serverless has been mostly spent on writing actual business logic and less time on provisioning a stack or digging around in Apache config files. I’ve previously written on how using frameworks like Meteor.js frees you up from configuring websockets and just lets you get on with building your app.

In a similar vein, Serverless handles the time-consuming parts of setting up a Lambda function (and associated AWS API Gateway), and configures IAMs permissions for you (via the AWS-cli).

However, my absolute favourite thing about this whole serverless shebang? I can use npm modules in my serverless apps. This opens up a veritable aladdin’s cave of open source awesomeness that we can leverage in our app and deploy in no time at all.

### Lower costs  
Last but not least, we reach the most non-technical reason I’m going to give for using Serverless.

Your app will cost less.

It will cost less time to develop, deploy and maintain, and less ££ to run. If these two arguments don’t convince your boss to at least let you build part of your app using Serverless then I don’t know what will.

### Getting started  
Amazon Web Services offer an ideal suite of technologies to support serverless architecture, which is why Serverless details AWS integration as the de facto resource provider for the stack, though you could choose Azure, IBM or Google’s offerings.

Getting started is as simple as:

```
npm install serverless -g 
serverless create --template hello-world 
serverless deploy
```


I’d also thoroughly recommend checking out the examples from Serverless here:

[https://github.com/serverless/examples](https://github.com/serverless/examples)

## Wrap up  
We’re right at the beginning of our journey with Serverless. Much like with Meteor back in 2015 we hope it’s going to supercharge our development processes here at Gravitywell, and sit alongside our other R&D projects at the moment like React Native and Sails.js. I hope you’ve found this article useful, let us know what you think over @gravitywelluk or hit me up over @chrisquinnr.

## Further reading  
[http://joshsymonds.com/blog/2013/04/23/the-perils-of-overengineering/](http://joshsymonds.com/blog/2013/04/23/the-perils-of-overengineering/)

[https://aadrake.com/posts/2017-05-20-enough-with-the-microservices.html](https://aadrake.com/posts/2017-05-20-enough-with-the-microservices.html)

[http://www.russmiles.com/essais/8-ways-to-lose-at-microservices-adoption](http://www.russmiles.com/essais/8-ways-to-lose-at-microservices-adoption)

[https://en.wikipedia.org/wiki/Capability_Maturity_Model](https://en.wikipedia.org/wiki/Capability_Maturity_Model)

[https://www.oreilly.com/ideas/modules-vs-microservices](https://www.oreilly.com/ideas/modules-vs-microservices)