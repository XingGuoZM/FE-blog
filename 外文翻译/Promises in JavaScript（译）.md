原文地址：[Promises in JavaScript](https://www.toolsqa.com/javascript/promises-in-javascript/) 

现实生活中的承诺只是对“一些事情”的保证。因此，当有人向您承诺时会发生什么？ 他们为您提供保证，您可以以此为基础进行提规划。 现在，诺言可以兑现也可以违背。 因此，当您信守诺言时，您会期望从诺言中得到一些东西。 您可以将promise的输出用于您的进一步操作或计划。 但是，当承诺违背时，您想知道为什么做出承诺的人不能跟上交易，而是会采取相应的下一个行动。[JavaScript](https://www.toolsqa.com/javascript-tutorial/)也提供了一种类似的“承诺”概念来处理[异步调用](https://www.toolsqa.com/cypress/cypress-asynchronous-nature/)。 本文涵盖以下主题，让我们了解“ JavaScript中的Promises”的详细信息：
- JavaScript中的Promises是什么？
   - 何时在JavaScript中使用Promises？
   - Promises如何在JavaScript中工作？
- 在JavaScript中创建Promise的过程。
- 如何在JavaScript中使用Promise？
   - 如何使用.then（）函数？
   - 如何使用.catch（）函数？
   - 如何使用.finally（）函数？
   - 如何将Promise.all（）函数？
   - 如何使用Promise.race（）函数？


## JavaScript中的Promises是什么？
JavaScript中的Promise是持有异步操作未来值的对象。 例如，如果我们要从服务器请求一些数据，则promise承诺我们将获得将来可以使用的数据。

一个promise对象拥有如下状态：

![States of a Promise](https://www.toolsqa.com/wp-content/gallery/javascript/1-States-of-a-Promise.png)

- Pending：这是初始状态，结果尚未准备好，正在等待异步操作完成。
- Resolved/Fulfilled：表示执行的操作已成功完成。 即，函数返回了承诺值。
- Rejected：表示执行的操作失败或发生错误。 即函数未返回承诺值。

现在，让我们理解下在JavaScript中需要promise做些什么，因为通过回调它本身来处理异步操作。

### 何时在JavaScript中使用Promises？

正如我们在[JavaScript中的回调](https://www.toolsqa.com/javascript/callback-functions-javascript/)文章中所讨论的那样，回调函数用于处理异步执行。 回调函数指示异步操作完成后JavaScript应该执行的操作。

这是运行中的回调函数的最简单示例：

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

保存名称为callbackOne.html的文件，然后在任何浏览器（Chrome，Firefox或IE）中打开它。 它应该将输出显示为：

![Callback: Ordering of functions in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/2-Callback-Ordering-of-functions-in-JavaScript.png)

### Promises如何在JavaScript中工作？
为了理解promise到底是如何工作的，让我们举个例子：考虑到您正在向母亲作出诺言，说您将在一天之后收拾完房间。 因此，可能发生两种可能的情况，要么您要打扫房间，要么不打扫房间并违背诺言。 让我们用JavaScript来写那个承诺。

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

上面的代码块显示了如何创建承诺。 即，当执行此承诺时，它将基于cleanRoom值给出解决状态或拒绝状态。

我们可以将以上创建的promise称为或使用：

```
 promiseCleanRoom.then((result)=>{
      console.log(result)
  })
```

在上面的代码片段中，它显示了如何使用已创建的承诺，并且有“ .then”方法，该方法仅在满足或解决给定的承诺时才会执行某些操作。 在这种情况下，它将在解决时打印出诺言发送的结果，即"Cleaned the Room"

如果承诺被破坏或在这种情况下发生了一些错误，还会发生另外一种情况。 然后，我们可以使用“ .catch”块，该块将允许处理损坏的或错误的实例。

```
promiseCleanRoom.then((result)=>{
      console.log(result)
}).catch((result)=>{
   console.log(result) //will execute if promise is rejected or errored out
})
```
假设，如果诺言被破坏，那么它将通过跳过then块来执行catch块，并且输出将是“Broke the promise”。

注意：我们将在以下各节中详细介绍“ .then”和“ .catch”方法。

## 在JavaScript中如何创建一个Promise？

如上所述，JavaScript中的Promise是一个对象，代表异步操作的最终完成或失败。 其语法如下所示：

语法：

```
const promise = new Promise(function(resolve,reject){

//do something

});
```

注意：我们使用Promise构造函数创建一个新的Promise，该构造函数使用一个参数，一个回调函数（也称为executor函数），该函数依次使用两个回调函数，resolve和reject。

promise创建后，executor函数立即执行。 promise通过调用resolve（）方法进行解析，并通过调用reject（）方法被拒绝。

在以下代码段的帮助下，让我们尝试了解Promise在JavaScript中的用法和工作方式。 在这里，我们将使用promise对象修改回调地狱程序（在回调文章中有所介绍）。

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

使用promise.html名称保存文件，然后在任何浏览器（Chrome，Firefox或IE）中打开它。 它应该显示为

![Understanding declaration and usage of promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/3-Understanding-declaration-and-usage-of-promise-in-JavaScript.png)

如上例所示，每个函数都返回一个使用“ .then（）”链接到下一个的promise。 在这种情况下，代码流显得更漂亮和易于理解。

现在考虑一种promise被拒绝的情况。 因此，在那种情况下，它将引发错误，并且不会调用其他链接的函数调用。

让我们修改上面编写的程序，并且拒绝来自函数“ i_take_5_sec（）”的promise，如下所示：

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

命名为promise.html并保存文件，然后在任何浏览器（Chrome，Firefox或IE）中打开它。 它应该显示为

![Understanding rejection of promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/4-Understanding-rejection-of-promise-in-JavaScript.png)

从上面的屏幕截图可以看出，JavaScript在调用方法“ i_take_5_sec”后引发了“Uncaught”错误，并且没有其他代码语句执行。 因此，这证实了，promise一旦“rejected”了，它将导致所有进一步链接的命令失败。

## 如何在JavaScript中使用promise？
通过使用.then，.catch和.finally方法注册函数来消费promise。 Promise对象用作执行程序和消费函数之间的链接，执行器和接收函数将接收结果或错误，并且使用函数可以使用.then，.catch或.finally方法中的任何一种。 让我们在以下各节中查看所有这些方法的用法：


### 如何使用.then（）作为消费者函数？
.then（）方法在一个promise明确resolved或rejected时调用。 其语法如下所示：

语法：
```
.then(function(result){
        //statements when the promise is resolved successfully
    }, function(error){
        //statements when the prmise was rejected or raised an error
    })
```

通过下图，我们可以了解“ .then（）”方法的主要用法：
![usage of .then method](https://www.toolsqa.com/wp-content/gallery/javascript/5-usage-of-then-method-to-consume-a-promise-in-JavaScript.png)

让我们以这种方式理解，假设一条if-else语句，其中当给定条件为true时，if块中的代码将执行； 否则，它将执行else块。 同样，“ then”方法将使用两个函数作为参数，第一个函数将在promise成功解决后运行，或者在promise拒绝或引发错误时执行第二个方法。

通过修改上面编写的程序，让我们了解“ .then（）消费者方法”的用法和实现：

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

保存名称为promiseThen.html的文件，然后在任何浏览器（Chrome，Firefox或IE）中打开它。 它应该将输出显示为：

![handling promise using .then() method in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/6-handling-promise-using-then-method-in-JavaScript.png)


从上面的屏幕截图中我们可以看到，由于“ i_take_5_sec（）”方法导致承诺被拒绝，因此run方法中的调用流调用了第二个函数，而不是第一个函数。 因此，以这种方式，用户可以根据promise的预期输出，使用“ .then（）”方法控制程序的执行流程。

 

但是，传递两个函数作为then方法的参数看起来有些混乱。 因此，为克服此问题，引入了“ .catch”块或函数，当出现拒绝或发生某些错误时，catch块将显式处理。

### 如何使用.catch（）作为消费者函数？

当承诺被拒绝或执行中发生错误时，.catch（）方法将调用。 其语法如下所示：

语法：
```
.catch(function(error){
        //Statements to handle error raised
    })
```

下图可以帮助您理解“ .catch（）”方法的基本用法：

![usage of .catch method for rejection of promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/7-usage-of-.catch-method-for-rejection-of-promise-in-JavaScript.png)

从上图可以明显看出，在指定.catch（）方法的情况下，当承诺被拒绝时，它将调用“ .catch”块。

让我们通过如下修改上述编写的程序来了解“ .catch（）消费者函数”的用法和实现：


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
 使用名称promiseCatch.html保存文件，然后在任何浏览器（Chrome，Firefox或IE）中打开文件。 它应该将输出显示为：


![using catch to handle rejected promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/8-using-catch-to-handle-rejected-promise-in-JavaScript.png)

从上面的屏幕截图中我们可以看到，由于“ i_take_5_sec（）”方法导致承诺被拒绝，因此调用流程引发了异常，该异常发生在.catch（）块中。 另外，由于异常发生得当，它不会阻止调用流程，并且仍然会执行“ Done”打印所产生的.then（）部分中的下一部分。 很明显，即使中间调用之一导致错误或异常，使用.catch（）块也可以确保继续执行进一步的链接调用。


### 如何使用.finally（）作为消费者者函数？

我们过去经常使用在try{...}catch{...}语句中使用finally块，在promises也有finally。当promise完成后这个消费者函数总是会执行，无论是resolve或者reject。finally块是执行清理操作的良好处理程序，我们一直希望执行该处理程序。其语法如下所示：
```
.finally(() => {
 // Statements which are expected to be executed always
})
```

下图可以帮助您理解“ .finally（）”方法的基本用法：

![finally clause to handle a promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/9-finally-clause-to-handle-a-promise-in-JavaScript.png)

从上图可以看出，无论promise是否resolved或者rejected，“ finally”块始终都会执行。

通过修改上面编写的程序，让我们在“ .finally（）消费者方法”的用法和实现下进行以下操作：
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
 保存名称为promiseFinally.html的文件，然后在任何浏览器（Chrome，Firefox或IE）中打开它。 它应该将输出显示为：

 ![Using finally clause to handle promise in JavaScript](https://www.toolsqa.com/wp-content/gallery/javascript/10-Using-finally-clause-to-handle-promise-in-JavaScript.png)


 从上面的屏幕截图中我们可以看到，由于“ i_take_5_sec（）”方法导致承诺被拒绝，因此引发了异常，并且未执行“ Done”块的下一个.then（）方法。 但是，仍然可以从输出中看到执行了finally（）块。 因此，很清楚，无论promise返回已解决，已拒绝还是错误状态，都将始终执行“ finally（）”块。

 ### 如何使用Promise.all（）作为消费者函数？

 如果你需要并行执行多个promise，并且想要在所有promise完成之后继续执行，则可以使用JavaScript中Promises提供的“ .all”函数。 它接受一个promises函数数组，并同时/并行执行所有函数，然后等到所有promise都被rejecte或resolve为止。 其语法如下所示：
 ```
Promise.all([array of promises]);
```

通过以下示例，让我们了解“ Promise.all”的用法：

示例：
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
保存名称为promiseAll.html的文件，然后在任何浏览器（Chrome，Firefox或IE）中打开它。 它应该将输出显示为：

![usage of Promise.all() method](https://www.toolsqa.com/wp-content/gallery/javascript/11-usage-of-Promise.all-method.png)

我们可以看到，所有的promise都在同时执行，并且会等到所有promise已经resolve或reject为止。

注意：Promise.all（）不能确保promise的任何顺序。 它只是并行执行所有promise。


### 如何使用Promise.race（）作为消费者函数？

如果您想并行执行多个promise，但又不想等待所有promise的完成再继续进行，则可以使用JavaScript中Promises提供的“ .race”函数。 它只是等待任何一个promise的完成，然后首先返回。 它将使用一组promise函数并同时执行所有函数，并等待直到任何一个promise已经resolve或reject为止。 其语法如下所示：
```
Promise.race([array of promises])
```

在以下示例的帮助下，我们了解“ Promise.race”的用法：

示例：
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
保存名称为promiseRace.html的文件，然后在任何浏览器（Chrome，Firefox或IE）中打开它。 它应该将输出显示为：

![Usage of Promise.Race method](https://www.toolsqa.com/wp-content/gallery/javascript/12-Usage-of-Promise.Race-method.png)

在上面的示例中，我们可以看到，一个promise（i_take_5 sec）一旦resolve，它就会从then函数中退出。

## 重点  
- promise可以处理JavaScript中的异步调用。
- 根据异步调用的响应，promise在执行时将处于“pending”状态，并导致“resolved”或“rejected”。
- promise避免由于嵌套的回调函数而发生的“回调地狱”问题。

现在，让我们转到下一篇文章“ [DOM Manipulation](https://www.toolsqa.com/javascript/dom-in-javascript/)”，那里我们将介绍JavaScript提供的各种概念/功能，DOM将使用这些概念/功能 可以在运行时动态地进行操作