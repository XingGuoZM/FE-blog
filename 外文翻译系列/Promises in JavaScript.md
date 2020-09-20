原文地址：[Promises in JavaScript](https://www.toolsqa.com/javascript/promises-in-javascript/) 

A promise in real life is just an assurance about ‘something.’ So what happens when somebody makes a promise to you? They give you a guarantee based on which you can plan something. Now, the promise can either be kept or broken. So, when you keep a promise, you expect something out of that promise. You can make use of the output of a promise for your further actions or plans. But, when a promise breaks, you would like to know why the person who made the promise was not able to keep up his side of the bargain and will take the next action accordingly. [JavaScript](https://www.toolsqa.com/javascript-tutorial/) also provides a kind of similar concept of “Promises” for handling the [asynchronous calls](https://www.toolsqa.com/cypress/cypress-asynchronous-nature/). Let’s understand the details of “Promises in JavaScript” by covering the following topics in this article:

- What are Promises in JavaScript?
  - When to use Promises in JavaScript?
  - How do Promises work in JavaScript?
- Procedure to create a Promise in JavaScript.
- How to consume a Promise in JavaScript?
  - How to use .then() as a consumer function?
  - How to use .catch() as a consumer function?
  - How to use .finally() as a consumer function?
  - How to use Promise.all() as a consumer function?
  - How to use Promise.race() as a function?
 

 

## What are promises in JavaScript?
A Promise in JavaScript is an object that holds the future value of an asynchronous operation. For example, if we are requesting some data from a server, the promise promises us to get that data that we can use in the future.

A promise object can have the following states:

![States of a Promise](https://www.toolsqa.com/wp-content/gallery/javascript/1-States-of-a-Promise.png)

- Pending: it is an initial state, where the result is not ready, and it is waiting for the asynchronous operation to get finished.
- Resolved/Fulfilled: it means that performed action completed successfully. i.e., Function returned promised value.
- Rejected: it means that performed action failed or an error occurred. i.e., function did not return the promised value.

Now let’s understand what was the need for the promise in JavaScript, as the async operations would have handled using the callbacks itself.

 

### When to use Promises in JavaScript?
As we discussed in the “[Callbacks in JavaScript](https://www.toolsqa.com/javascript/callback-functions-javascript/)“ article, callback functions used to handle asynchronous execution. A callback function indicates the operation which JavaScript should execute once an asynchronous operation finishes.

Here is the simplest example of a callback function in action:

```
<html>

	<body> Demonstrating callback in javascript:</br>
    	<script type="text/javascript">
    		function i_take_1_sec() {
                return setTimeout(() => {
                    document.write('I was no: 2 and I take 1 second</br>')
                }, 1000);
            }
            function i_take_10_sec(callback) {
                return setTimeout(() => {
                    document.write('I was no: 1 and I take 10 seconds</br>')
                    callback()
                }, 10000);
            }
            function run (){
                i_take_10_sec(i_take_1_sec);
            }
            run();
        </script>
    </body>

</html>
```
 

Save the file with name callbackOne.html and open it in any browser (Chrome, Firefox, or IE). It should show the output as:

![Callback: Ordering of functions in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/2-Callback-Ordering-of-functions-in-JavaScript.png)

### How Promises works in JavaScript?
To understand how exactly promises works, let us take the example, Consider you are making a promise to your mother saying that you are going to clean up your room by the end of the day. So two possible things can happen either you will be going to clean the room, or you are going not to clean the room and break your promise. Let’s write that promise in the JavaScript.

```
let promiseCleanRoom = new Promise(function(resolve,reject){
    cleanRoom = true;
    if(cleanRoom){
      resolve('Cleaned the Room');
    }else{
      reject('Broke the promise');
    }
});
```
 

The above code block shows how to create the promise. i.e., when this promise executes, then it will give either resolve status or reject status based on the cleanRoom value.

We can call or use the above-created promise as:

```
 promiseCleanRoom.then((result)=>{
      console.log(result)
  })
```
In the above snippet, it shows how to utilize the created promise, and there is “.then,” a method that will perform some of the action only when a given promise is fulfilled or resolved. In this case, it will print the result sent by promise when it resolves, i.e., Cleaned the Room

There is one more case that will happen if the promise got broken or some error occurred in that case. Then we can use the “.catch ” block that will allow handling the broken or instances of error.

```
promiseCleanRoom.then((result)=>{
      console.log(result)
}).catch((result)=>{
   console.log(result) //will execute if promise is rejected or errored out
})
```
Suppose, if the promise breaks, then it will execute the catch block by skipping the then block, and output will be “Broke the promise.”

Note: We will cover the “.then” and .”catch” method in detail in the following sections.

 

 

## How to Create a Promise in JavaScript?
As we discussed above, A Promise in JavaScript is an object representing the eventual completion or failure of an asynchronous operation. Its syntax looks like below:

Syntax:

```
const promise = new Promise(function(resolve,reject){

//do something

});
```

Note: We create a new promise using the Promise constructor, which takes a single argument, a callback function, also known as executor function, which in turn takes two callbacks functions, resolve, and reject. 

 

The executor function immediately executes when a promise creates. The promise resolves by calling the resolve() method and is rejected by calling the reject() method.

Let’s try to understand the usage and working of Promise in JavaScript with the help of following code snippet. Here, we will modify the program of callback hell (briefed in the callbacks article) using the promise objects.

```
<html>

<body> Demonstrating promise in javascript:</br>
    <script type="text/javascript">

    	function i_take_10_sec()
    	{
    	 	return new Promise((resolve, reject)=>{
    	 	 	setTimeout(() => { 
    	 			resolve('I was no: 1 and I take 10 seconds');
    	 		}, 10000);
			})
    	}

    	function i_take_1_sec()
    	{ 
    		return new Promise((resolve, reject)=>{
    			setTimeout(() => { 
    				resolve('I was no: 2 and I take 1 second');
    			}, 1000);
    		}) 
    	}

    	function i_take_5_sec(callback) 
    	{ 
    		return new Promise((resolve, reject)=>{
    		 	setTimeout(() => { 
    				resolve('I was no: 3 and I take 5 second')
    			}, 5000); 
    		})
    	}

    	function i_take_7_sec(callback) 
    	{ 
    		return new Promise((resolve, reject)=>{
    			setTimeout(() => { 
    				resolve('I was no: 4 and I take 7 second')
    			}, 7000);
    		}) 
    	}

    
    	function run()
    	{
    		i_take_10_sec()
    		.then((result) => {
            console.log(result);
        		return i_take_1_sec()
   		})
    		.then((result) => {
            console.log(result);
        		return i_take_5_sec()
    		})
    		.then((result) => {
            console.log(result);
        		return i_take_7_sec()
    		})
    		.then((result)=>{
            console.log(result);
          })
    	}

    	run();

    </script>
</body>

</html>
```
 

Save the file with name promise.html and open it in any browser (Chrome, Firefox, or IE). It should show the output as

![Understanding declaration and usage of promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/3-Understanding-declaration-and-usage-of-promise-in-JavaScript.png)

 

As seen in the above example, each of the functions returns a promise that chains to the next using “.then().” The code flow appears much prettier and understandable in this case.

Now consider a scenario that one of the promises rejects. So, in that scenario, it will raise an error and will not invoke the other chained function calls.

Let’s modify the above-written program and reject the promise from function “i_take_5_sec()” as below:

```
<html>
 
<body> Demonstrating promise in javascript:</br>
    <script type="text/javascript">
 
    	function i_take_10_sec()
    	{
     return new Promise((resolve, reject)=>{
     setTimeout(() => { 
     resolve('I was no: 1 and I take 10 seconds');
     }, 10000);
 })
    	}
 
    	function i_take_1_sec()
    	{ 
     return new Promise((resolve, reject)=>{
     setTimeout(() => { 
     resolve('I was no: 2 and I take 1 second');
     }, 1000);
     }) 
    	}
 
    	function i_take_5_sec(callback) 
    	{ 
     return new Promise((resolve, reject)=>{
     setTimeout(() => { 
     reject('I was no: 3 and I take 5 second')
     }, 5000); 
     })
    	}
 
    	function i_take_7_sec(callback) 
    	{ 
     return new Promise((resolve, reject)=>{
     setTimeout(() => { 
     resolve('I was no: 4 and I take 7 second')
     }, 7000);
     }) 
    	}
 
    
    	function run()
    	{
     i_take_10_sec()
     .then((result) => {
            console.log(result);
         return i_take_1_sec()
   })
     .then((result) => {
            console.log(result);
         return i_take_5_sec()
     })
     .then((result) => {
            console.log(result);
         return i_take_7_sec()
     })
     .then((result)=>{
            console.log(result);
          })
    	}
 
    	run();
 
    </script>
</body>
 
</html>
```

Save the file with name promise.html and open it in any browser (Chrome, Firefox, or IE). It should show the output as

![Understanding rejection of promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/4-Understanding-rejection-of-promise-in-JavaScript.png)

 

As we can see from the above screenshot that JavaScript raised an “Uncaught” error after invoking the method “i_take_5_sec,” and no further code statements execute. So, this confirms that, once the promise is “rejected,” it will lead to failure of all the further chained commands.

 

 

## How to consume a promise in JavaScript?
Promises consume by registering functions using .then, .catch, and .finally methods. A Promise object serves as a link between the executor and the consuming functions, which will receive the result or error, and the consuming functions can use any of the .then, .catch, or .finally methods. Let’s see the usage of all these methods in the below sections:

 

### How to use .then() as a consumer function?
The .then() method invokes when a promise is either resolved or rejected. Its syntax looks like below:

Syntax: 
```
.then(function(result){
        //statements when the promise is resolved successfully
    }, function(error){
        //statements when the prmise was rejected or raised an error
    })
```

We can understand the primary usage of the “.then()” method with the help of the following figure:

![usage of .then method](https://www.toolsqa.com/wp-content/gallery/javascript/5-usage-of-then-method-to-consume-a-promise-in-JavaScript.png)

 

Let comprehend in this way, assume an if-else statement where code in if block will execute when the given condition is true; otherwise, it will execute the else block. Similarly, the “then” method will take two functions as parameters where the first function will run when a promise resolves successfully, or it will execute the second method when a promise rejects or raise an error.

Let’s under the usage and implementation of the “.then() consumer method,” by modifying the above-written program as follows:

```
<html>

<body> Demonstrating promise consumer using .then()  method in javascript:</br>
    <script type="text/javascript">

    	function i_take_10_sec()
    	{
    	 	return new Promise((resolve, reject)=>{
    	 	 	setTimeout(() => { 
    	 			resolve('I was no: 1 and I take 10 seconds');
    	 		}, 10000);
			})
    	}

    	function i_take_5_sec(callback) 
    	{ 
    		return new Promise((resolve, reject)=>{
    		 	setTimeout(() => { 
    				reject('I was no: 3 and I take 5 second')
    			}, 5000); 
    		})
    	}
    
    	function run()
    	{
    		i_take_10_sec()
    		.then((result) => {
                        console.log(result);
        		return i_take_5_sec()
   		})
    		.then((result)=>{
                   console.log(result);
                 },()=>{
                    console.log('Error Raised')
                 })
    	}

    	run();

    </script>
</body>

</html>
```


Save the file with name promiseThen.html and open it in any browser (Chrome, Firefox, or IE). It should show the output as:

![handling promise using .then() method in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/6-handling-promise-using-then-method-in-JavaScript.png)

 

We can see from the above screenshot that, as the “i_take_5_sec()” method resulted in the promise to be rejected, so the call flow in the run method invoked the second function, instead of the first function. So, in this way, a user can control the flow of program execution using the “.then()” method depending on the expected outputs of the promise.

 

But passing two functions as parameters for then method looked somewhat confusing. Therefore, to overcome this, the “.catch” block or function was introduced where the catch block will explicitly handle when there is rejection, or some error has occurred.

 

### How to use .catch() as a consumer function?
The .catch() method invokes when a promise rejects, or some error occurs in the execution. Its syntax looks like below:

Syntax: 
```
.catch(function(error){
        //Statements to handle error raised
    })
```
 

The basic usage of the “.catch()” method can be understood with the help of the following figure:

![usage of .catch method for rejection of promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/7-usage-of-.catch-method-for-rejection-of-promise-in-JavaScript.png)

 

As is evident from the above image, in case of .catch() method specified, it will invoke the “.catch” block when the promise gets rejected.

Lets under the usage and implementation of the “.catch() consumer method,” by modifying the above-written program as follows:
```
<html>

<body> Demonstrating promise consumer using .catch() method in javascript:</br>
    <script type="text/javascript">

    	function i_take_10_sec()
    	{
    	 	return new Promise((resolve, reject)=>{
    	 	 	setTimeout(() => { 
    	 			resolve('I was no: 1 and I take 10 seconds');
    	 		}, 10000);
			})
    	}

    	function i_take_5_sec(callback) 
    	{ 
    		return new Promise((resolve, reject)=>{
    		 	setTimeout(() => { 
    				reject('I was no: 3 and I take 5 second')
    			}, 5000); 
    		})
    	}
    
    	function run()
    	{
    		i_take_10_sec()
    		.then((result) => {
                        console.log(result);
        		return i_take_5_sec()
   		})
    		.then((result)=>{
                    console.log(result);
                }).catch(()=>{
                   console.log('Error Raised')
               })
    	}

    	run();

    </script>
</body>

</html>
```
 

Save the file with name promiseCatch.html and open it in any browser (Chrome, Firefox, or IE). It should show the output as:

![using catch to handle rejected promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/8-using-catch-to-handle-rejected-promise-in-JavaScript.png)

 

We can see from the above screenshot that, as the “i_take_5_sec()” method resulted in the promise to be rejected, so the call flow raised the exception, which happened in the .catch() block. Also, as the exception occurred properly, it didn’t block the call flow and still executed the next part in the .then() part resulting from the printing of “Done.”  It makes it clear that using the .catch() block ensures that the further chained calls will still execute, even though one of the intermediate calls resulted in an error or exception.

 

 

### How to use .finally() as a consumer function?
As we used to have the finally block in a regular try{…} catch{…} of exception handling, there’s finally in promises also. This consumer function always executes when the promise settles: be it resolve or reject. The finally block a good handler for performing cleanup actions, which we always expect to execute. Its syntax looks like below:
```
.finally(() => {
 // Statements which are expected to be executed always
})
```
 

The basic usage of the “.catch()” method can be understood with the help of the following figure:

![finally clause to handle a promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/9-finally-clause-to-handle-a-promise-in-JavaScript.png)

 

As we can see from the above picture, the “finally” block will always execute, no matter whether the promise has been resolved or rejected.

Lets under the usage and implementation of the “.finally() consumer method,” by modifying the above-written program as follows:

```
<html>

<body> Demonstrating promise consumer using .finally() method in javascript:</br>
    <script type="text/javascript">

    	function i_take_10_sec()
    	{
    	 	return new Promise((resolve, reject)=>{
    	 	 	setTimeout(() => { 
    	 			resolve('I was no: 1 and I take 10 seconds');
    	 		}, 10000);
			})
    	}

    	function i_take_5_sec(callback) 
    	{ 
    		return new Promise((resolve, reject)=>{
    		 	setTimeout(() => { 
    				reject('I was no: 3 and I take 5 second')
    			}, 5000); 
    		})
    	}
    
    	function run()
    	{
    		i_take_10_sec()
    		.then((result) => {
            console.log(result);
        		return i_take_5_sec()
   		})
    		.then((result)=>{
            console.log(result);
          }).catch(()=>{
             console.log('Error Raised')
          }).finally(()=>{
             console.log('Completed Execution')
          })
    	}

    	run();

    </script>
</body>

</html>
```
 

Save the file with name promiseFinally.html and open it in any browser (Chrome, Firefox, or IE). It should show the output as:

![Using finally clause to handle promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/10-Using-finally-clause-to-handle-promise-in-JavaScript.png)

 

We can see from the above screenshot that, as the “i_take_5_sec()” method resulted in the promise to be rejected, due to which the exception raised and the next .then() method of the “Done” block was not executed. But still, we can see from the output that the finally() block executed. So, it makes it clear that, whether the promise returns a resolved, rejected or and error state, the “finally()” block will always be executed.

 

### How to use Promise.all() as a consumer function?
If you want to execute multiple promises in parallel and want to wait for the completion of all the promises before proceeding further, you can use the “.all” function provided by the Promises in JavaScript. It takes an array of promises function and executes all functions simultaneously/parallelly and wait until all promises are either resolve or reject. Its syntax looks like below:
```
Promise.all([array of promises]);
```

Let’s understand the usage of “Promise.all” with the help of the following example:

Example:
```
<html>

<body> Demonstrating promise all() method in javascript:</br>
    <script type="text/javascript">

    	function i_take_10_sec()
    	{
    	 	return new Promise((resolve, reject)=>{
    	 	 	setTimeout(() => { 
               console.log('I was no: 1 and I take 10 second')
    	 			resolve('I was no: 1 and I take 10 seconds');
    	 		}, 10000);
			})
    	}

    	function i_take_5_sec(callback) 
    	{ 
    		return new Promise((resolve, reject)=>{
    		 	setTimeout(() => { 
               console.log('I was no: 2 and I take 5 second')
    				resolve('I was no: 2 and I take 5 second')
    			}, 5000); 
    		})
    	}

      function i_take_7_sec(callback) 
    	{ 
    		return new Promise((resolve, reject)=>{
    		 	setTimeout(() => { 
               console.log('I was no: 3 and I take 7 second')
    				resolve('I was no: 3 and I take 7 second')
    			}, 7000); 
    		})
    	}
    
    	function run()
    	{
    		Promise.all([i_take_10_sec(),i_take_5_sec(),i_take_7_sec()]).then(()=>{
             console.log("All finished");
          })
    	}

    	run();
    </script>
</body>

</html>
```


Save the file with name promiseAll.html and open it in any browser (Chrome, Firefox, or IE). It should show the output as:

![usage of Promise.all() method](https://www.toolsqa.com/wp-content/gallery/javascript/11-usage-of-Promise.all-method.png)

 

As we can see that all the promises are executing simultaneously and will wait until all promises either resolve or reject.

Note: Promise.all() doesn’t ensure any ordering of promises. It just executes all of the promises in parallel.

### How to use Promise.race() as a consumer function?
If you want to execute multiple promises in parallel but don’t want to wait for the completion of all the promises before proceeding further, you can use the “.race” function provided by the Promises in JavaScript. It just waits for completion of any one promise, which returns first. It will take an array of promises function and execute all functions simultaneously and wait until any one of the promises is either resolve or reject. Its syntax looks like below:
```
Promise.race([array of promises])
```

Let’s understand the usage of “Promise.race” with the help of the following example:

Example:
```
<html>

<body> Demonstrating promise race() method in javascript:</br>
    <script type="text/javascript">

    	function i_take_10_sec()
    	{
    	 	return new Promise((resolve, reject)=>{
    	 	 	setTimeout(() => { 
               console.log('I was no: 1 and I take 10 second')
    	 			resolve('I was no: 1 and I take 10 seconds');
    	 		}, 10000);
			})
    	}

    	function i_take_5_sec(callback) 
    	{ 
    		return new Promise((resolve, reject)=>{
    		 	setTimeout(() => { 
               console.log('I was no: 2 and I take 5 second')
    				resolve('I was no: 2 and I take 5 second')
    			}, 5000); 
    		})
    	}

      function i_take_7_sec(callback) 
    	{ 
    		return new Promise((resolve, reject)=>{
    		 	setTimeout(() => { 
               console.log('I was no: 3 and I take 7 second')
    				resolve('I was no: 3 and I take 7 second')
    			}, 7000); 
    		})
    	}
    
    	function run()
    	{
    		Promise.race([i_take_10_sec(),i_take_5_sec(),i_take_7_sec()]).then(()=>{
             console.log("All finished");
          })
    	}

    	run();
    </script>
</body>

</html>
```

 

Save the file with name promiseRace.html and open it in any browser (Chrome, Firefox, or IE). It should show the output as:

![Usage of Promise.Race method](https://www.toolsqa.com/wp-content/gallery/javascript/12-Usage-of-Promise.Race-method.png)

 

In the above example, we can see that as soon as one promise(i_take_5 sec) resolves, it exits from then function.

 

 

## Key Takeaways
- Promises can handle the asynchronous calls in JavaScript.
- A promise will be “pending” when executed and will result in “resolved” or “rejected,” depending on the response of the asynchronous call.
- Promises avoid the problem of “callback hell,” which happens due to nested callback functions.
 

Let’s now move to the next article, “[DOM Manipulation](https://www.toolsqa.com/javascript/dom-in-javascript/),” where we will cover various concepts/features provided by JavaScript using which the DOM can be manipulated dynamically at run time