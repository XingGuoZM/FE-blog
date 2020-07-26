 
原文地址：[Why You Should Know JavaScript Closures](https://www.freecodecamp.org/news/javascript-closures/) 

![Why You Should Know JavaScript Closures](https://www.freecodecamp.org/news/content/images/size/w2000/2020/06/Why-JS-Closures-Matter.png)

Fully understanding closures may seem like a right of passage to becoming a JavaScript developer.

There is a reason why it can be difficult to make sense of closures—because they are often taught backwards. You may have been taught what a closures is, but you might not understand how they are useful to the average developer or within your own code.

So why do closures matter in our day-to-day JavaScript code?

Instead of seeing closures as a topic to be memorized for some sort of pop quiz, let's see what series of steps can lead us to 

seeing a closure in the first place. Once we see what they are, we will uncover why closures are worthwhile for you to know and take advantage of in your JavaScript code.

Want to watch this lesson instead? This tutorial is part of the 2020 JS Bootcamp, a 4+ hour course that shows you how to be a JavaScript expert through tons of practical, no-nonsense lessons. [Get instant access to the JS Bootcamp here](https://jsbootcamp.io/course).

## Seeing a closure in the wild 🔎
Let's say we are making an app clone of the blogging site Medium, and we want each user to be able to like different posts.

Whenever a user clicks on the like button, its value will be incremented by one each time.

Think of it like the Medium clap button:

![demo](https://raw.githubusercontent.com/kikobeats/react-clap-button/HEAD/demo.gif)

The function that will handle increasing the count by 1 each time is called handleLikePost and we are keeping track of the number of likes with a variable named likeCount:
```
// global scope
let likeCount = 0;

function handleLikePost() {
  // function scope
  likeCount = likeCount + 1;
}

handleLikePost();
console.log("like count:", likeCount); // like count: 1
```

Whenever a user likes a post, we call handleLikePost and it increments our likeCount by 1.

And this works because we know that functions can access variables outside of themselves.

In other words, functions can access any variables defined in any parent scope.

There's a problem with this code, however. Since likeCount is in the global scope, and not in any function, likeCount is a global variable. Global variables can be used (and changed) by any other bit of code or function in our app.

For example, what if after our function, we mistakenly set our likeCount to 0?
```
let likeCount = 0;

function handleLikePost() {
  likeCount = likeCount + 1;
}

handleLikePost();
likeCount = 0;
console.log("like count:", likeCount); // like count: 0
```

Naturally, likeCount can never be incremented from 0.

When only one function needs a given piece of data, it just needs to exist locally, that is, within that function.

Now let's bring likeCount within our function:
```
function handleLikePost() {
  // likeCount moved from global scope to function scope
  let likeCount = 0;
  likeCount = likeCount + 1;
}
```

Note that there's a shorter way to write the line where we increment likeCount. Instead of saying likeCount is equal to previous value of likeCount and add one like this, we can just use the += operator like so:
```
function handleLikePost() {
  let likeCount = 0;
  likeCount += 1;
}
```

And for it to work as before and get like count's value, we also need to bring our console.log into the function as well.
```
function handleLikePost() {
  let likeCount = 0;
  likeCount += 1;
  console.log("like count:", likeCount);
}
handleLikePost(); // like count: 1
```

And it still works properly as before.

So now users should be able to like a post as many times as they want, so let's call handleLikePost a few more times:
```
handleLikePost(); // like count: 1
handleLikePost(); // like count: 1
handleLikePost(); // like count: 1
```

When we run this code, however, there's a problem.

We would expect to see the likeCount keep increasing, but we just see 1 each time. Why is that?

Take a second, look at our code and try to explain why our likeCount is no longer being incremented.

Let's look at our handleLikePost function and how it's working:
```
function handleLikePost() {
  let likeCount = 0;
  likeCount += 1;
  console.log("like count:", likeCount);
}
```

Every time we use it, we are recreating this likeCount variable, which is given an initial value of 0.

No wonder we can't keep track of the count between function calls! It keeps being set to 0 each time, then it's incremented by 1, after which the function is finished running.

So we're stuck here. Our variable needs to live inside of the handleLikePost function, but we can't preserve the count.

We need something that allows us to preserve or remember the likeCount value between function calls.

What if we tried something that may look a little strange at first—what if we tried putting another function in our function:
```
function handleLikePost() {
  let likeCount = 0;
  likeCount += 1;
  function() {

  }
}

handleLikePost();
```

Here we're going to name this function addLike. The reason? Because it will be responsible for incrementing the likeCount variable now.

And note that this inner function doesn't have to have a name. It can be an anonymous function. In most cases, it is. We're just giving it a name so we can more easily talk about it and what it does.

addLike will now be responsible for increasing our likeCount, so we'll move the line where we increment by 1 into our inner function.
```
function handleLikePost() {
  let likeCount = 0;
  function addLike() {
    likeCount += 1;
  }
}
```

What if we were to call this addLike function in handleLikePost?

All that would happen is that addLike would increment our likeCount, but still the likeCount variable would be destroyed. So again, we lose our value and the result is 0.

But instead of calling addLike within its enclosing function, what if we called it outside of the function? This seems even stranger. And how would we do that?

We know at this point that functions return values. For example, we could return our likeCount value at the end of handleLikePost to pass it to other parts of of our program:
```
function handleLikePost() {
  let likeCount = 0;
  function addLike() {
    likeCount += 1;
  }
  addLike();
  return likeCount;
}
```

But instead of doing that, let's return likeCount within addLike and then return the addLike function itself:
```
function handleLikePost() {
  let likeCount = 0;
  return function addLike() {
    likeCount += 1;
    return likeCount;
  };
  // addLike();
}

handleLikePost();
```

Now this may look bizarre, but this is allowed in JS. We can use functions like any other value in JS. That means a function can be returned from another function. By returning the inner function, we can call it from outside of its enclosing function.

But how would we do that? Think about this for a minute and see if you can figure it out...

First, to better see what's happening, let's console.log(handleLikePost) when we call it and see what we get:
```
function handleLikePost() {
  let likeCount = 0;
  return function addLike() {
    likeCount += 1;
    return likeCount;
  };
}

console.log(handleLikePost()); // ƒ addLike()
```

Unsurprisingly, we get the addLike function logged. Why? Because we're returning it, after all.

To call it, couldn't we just put it in another variable? As we just said, functions can be used like any other value in JS. If we can return it from a function, we can put it in a variable too. So let's put it in a new variable called like:
```
function handleLikePost() {
  let likeCount = 0;
  return function addLike() {
    likeCount += 1;
    return likeCount;
  };
}

const like = handleLikePost();
```

And finally, let's call like. We'll do it a few times and console.log each result:
```
function handleLikePost() {
  let likeCount = 0;
  return function addLike() {
    likeCount += 1;
    return likeCount;
  };
}

const like = handleLikePost();

console.log(like()); // 1
console.log(like()); // 2
console.log(like()); // 3
```

Our likeCount is finally preserved! Every time we call like, the likeCount is incremented from its previous value.

So what in the world happened here? Well, we figured out how to call the addLike function from outside the scope in which it was declared. We did that by returning the inner function from the outer one and storing a reference to it, named like, to call it.

## How a closure works, line-by-line 📝
So that was our implementation, of course, but how did we preserve the value of likeCount between function calls?
```
function handleLikePost() {
  let likeCount = 0;
  return function addLike() {
    likeCount += 1;
    return likeCount;
  };
}

const like = handleLikePost();

console.log(like()); // 1
```

1. The handleLikePost outer function is executed, creating an instance of the inner function addLike; that function closes over the variable likeCount, which is one scope above.
2. We called the addLike function from outside the scope in which it was declared. We did that by returning the inner function from the outer one and storing a reference to it, named like, to call it.
3. When the like function finishes running, normally we would expect all of its variables to be garbage collected (removed from memory, which is an automatic process that the JS compiler does). We'd expect each likeCount to go away when the function is done, but they don't.  

What is that reason? Closure.

Since the inner function instances are still alive (assigned to like), the closure is still preserving the countLike variables.

You would think that having a function written in another function, would just be like a function written in the global scope. But it's not.

This is why closure makes functions so powerful, because it is a special property that isn't present in anything else in the language.

## The lifetime of a variable
To better appreciate closures, we have to understand how JavaScript treats variables that are created. You might have wondered what happens to variables when you close your page or go to another page within an app. How long do variables live?

Global variables live until the program is discarded, for example when you close the window. They are around for the life of the program.

However, local variables have short lives. They are created when the function is invoked, and deleted when the function is finished.

So before, where likeCount was just a local variable, when the function was run. The likeCount variable was created at the beginning of the function and then destroyed once it finished executing.

## Closures are not snapshots - they keep local variables alive
It's sometimes stated that JavaScript closures are similar to snapshots, a picture of our program at certain point in time. This is a misconception that we can dispel by adding another feature to our like button functionality.

Let's say that on some rare occasions, we want to allow users to 'double like' a post and increment the likeCount by 2 at a time instead of 1.

How would would we add this feature?

Another way to pass values to a function is of course through arguments, which operate just like local variables.

Let's pass in an argument called step to the function, which will allow us to provide a dynamic, changeable value to increment our count by instead of the hard-coded value 1.
```
function handleLikePost(step) {
  let likeCount = 0;
  return function addLike() {
    likeCount += step;
    // likeCount += 1;
    return likeCount;
  };
}
```

Next, let's try making a special function that will allow us to double like our posts, doubleLike. We'll pass in 2 as our step value to make it and then try calling both of our functions, like and doubleLike:
```
function handleLikePost(step) {
  let likeCount = 0;
  return function addLike() {
    likeCount += step;
    return likeCount;
  };
}

const like = handleLikePost(1);
const doubleLike = handleLikePost(2);

like(); // 1
like(); // 2

doubleLike(); // 2 (the count is still being preserved!)
doubleLike(); // 4
```

We see the likeCount is also being preserved for doubleLike.

What's happening here?

Each instance of the inner addLike function closes over both the likeCount and step variables from its outer handleLikePost function's scope. step remains the same over time, but the count is updated on each invocation of that inner function. Since closure is over the variables and not just snapshots of the values, these updates are preserved between function calls.

So what does this code show to us—the fact that we can pass in dynamic values to change the result of our function? That they are still alive! Closures keep local variables alive from functions that should have destroyed them a long time ago.

In other words, they are not static and unchanging, like a snapshot of the closed-over variables value at one point in time—closures preserve the variables and provide an active link to them. As a result, we can use closures can observe or make updates to these variables over time.

## What is a closure, exactly?
Now that you see how a closure is useful, there are two criteria for something to be a closure, both of which you've seen here:

1. Closures are a property of JavaScript functions, and only functions. No other data type has them.
2. To observe a closure, you must execute a function in a different scope than where that function was originally defined.

## Why should you know closures?

Let's answer the original question we set out to answer. Based off of what we've seen, pause and take a stab at answering this question. Why should we care about closures as JS developers?

Closures matter for you and your code because they allow you to 'remember' values, which is a very powerful and unique feature in the language which only functions possess.

We saw it right here in this example. After all, what use is a like count variable that doesn't remember likes? You'll encounter this often in your JS career. You need to hold onto some value somehow and likely keep it separate from other values. What do you use? A function. Why? To keep track of data over time with a closure.

And with that, you're already a step ahead other developers.