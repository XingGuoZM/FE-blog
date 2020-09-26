
原文地址：[So What Actually is Vue.set?](https://www.codementor.io/@chrisquinn299/serverless-do-more-nclf7ere5) 

![](https://d585tldpucybw.cloudfront.net/sfimages/default-source/default-album/vuel_870x22095a97f137a2c4e179c732cc687cd96e2.png?sfvrsn=d5ea31c8_1)

#### Reactivity in VueJS is one of THE core features that any developer needs to understand and completely harness to fully grasp the power of the framework. Vue.set is an API call that will fit nicely in your toolbelt for building more powerful applications. Let's go ahead and learn about it together.

Talking about Vue.set is talking about reactivity, so prepare yourself for some theory on this one. However, as always, it doesn’t need to be something hard or boring. Find your avocados and chips, make some guacamole, and let’s dip right in.

## Data and Reactivity
Whenever you create a data() property function inside a Vue component and return the object back, Vue does a lot of things behind the scenes to hook everything up inside your component and to make it reactive.
```
export default {
  data() {
   return {
     red: 'hot',
     chili: 'peppers'
   }
  }
}
```

The first thing that Vue will do here with our awesome awesome awesome RHCP data, is walk through each of the properties of the return { } object, and create a unique getter and setter for each one. The nitty gritty of how this actually happens is beyond the scope of this article, but Vue Mastery has a very nice video explaining this in detail.

The purpose of creating these is so that when you access these properties inside your code, by doing this.red for example, or when setting them with this.red = "hotter", you are actually calling these getters and setters that Vue created for you.

Inside this magical land of SETGET, Vue hooks up your computer properties, watchers, props, data, etc. to become reactive. In super simple terms, a function is called that updates the whole shebang every time the setter is changed.

## The Pitfall
Awesome! This is what we love about Vue, right? Its amazing reactivity and under-the-hood power. But there is a dark side here that needs to be explored.

Let’s change our data a little bit and see what happens when we start trying to work with dynamic data.
```
data() {
  return {
    members: {}
  }
}
```

Alright, nothing fancy so far. We have a members property of our data into which we want to add band member information. Now for the sake of example, let’s add a method that will pretend to pull some information from a remote HTTP call, that will give us back a JSON object with the band info.
```
data() {
  return {
    members: {}
  }
},
methods: {
  getMembers() {
   const newMember = {
     name: 'Flea',
     instrument: 'Bass',
     baeLevel: 'A++'
   }; // Some magical method that gives us data got us this sweet info

   // ...
  }
}
```

Hm. Ok, so looking at this example, let’s stop and think. There are many ways to resolve this current dilemma - how do we add this newMember object into our current members property?

Maybe you’re thinking, let’s turn members into an array and push it. Sure, but that’s cheating because it breaks my CAREFULLY constructed example that I didn’t just make up as I was typing this.

In this scenario, we NEED to have members as an object. Ok, simple - you’d say, let’s just add a new property to the members property, it’s an object after all. In fact, let’s go ahead and make the member’s name the name of the property.
```
getMembers() {
   const newMember = {
     name: 'Flea',
     instrument: 'Bass',
     baeLevel: 'A++' // Totally important property that we will never use
   }; // Some magical method that gives us data got us this sweet info

   this.members[newMember.name] = newMember;
  }
```
Lok’tar Ogar!
![](https://media.giphy.com/media/Cs5PBOnbE7MU8/giphy.gif)


Except, no, because A. this is not Orgrimmar, and B. we now have a problem.

If you were to run this code on your browser and test it right now, you will see that you are actually pushing this new data into the members data, but this change to the component state will not actually make any of your application re-render.

In a scenario where you are just using this data for some computation, or for some type of internal storage, then doing things this way won’t impact your application. However, and this is a huge HOWEVER, if you are using this data reactively on your app to display some information on your page, or for conditional rendering with v-if or v-else, then things are going to get funky.

## Actually Using Vue.set
So now that we understand where the problem is actually coming from, we can learn what is the proper solution. Allow me to introduce you to Vue.set.

Vue.set is a tool that allows us to add a new property to an already reactive object, and makes sure that this new property is ALSO reactive. This completely takes care of the problem that we were experiencing on the other example, because when our new property on members gets set, it will automatically be hooked into Vue’s reactivity system, with all the cool getters/setters and Vue-magic behind the scenes.

A small note is, however, required to understand how this affects arrays. So far, we have only really played around with objects, which are super easy to understand. New prop? Add it with Vue.set if you want it to be reactive. Simple.

Following up with our example, let’s switch things up to use Vue.set instead.
```
getMembers() {
   const newMember = {
     name: 'Flea',
     instrument: 'Bass',
     baeLevel: 'A++'
   }; // Some magical method that gives us data got us this sweet info

   //this.members[newMember.name] = newMember;
     this.$set(this.members, newMember.name, newMember);
  }
```
This bit is new - this.$set(this.members, newMember.name, newMember);.

There’s two things I want to mention for this piece of code. I’ve been telling you so far that Vue.set is how we are going to be doing things, but now I’m using this.$set. But fear not - this is only an alias, so it will behave in the exact same way. The cool thing is that you don’t have to import Vue inside your components to use it.

The second thing I want to make note of is the syntax of this function. It takes three parameters.

One is the object or array which we are going to modify (in this case this.members).

A second parameter that points to the property or key of the first object/array that we passed (so newMember.name because we want it to be dynamic).

And finally a third parameter which is the value we want to set into it. (In our case, newMember).
```
         this.members [newMember.name] = newMember;
//            V               V              V
this.$set(this.members, newMember.name,   newMember);
```

(P.S. My ASCII skills are not for sale. ^)

But what’s up with array reactivity?

When we create an array inside the initial state, Vue sets it up to be reactive for us. However, Vue is unable to currently detect when you directly assign a value using an index. For example, if we were doing this:
```
this.membersArray[3] = myNewValue;
```

Then Vue won’t be able to detect this change, and thus it would not be reactive. Please keep in mind that if you modify arrays with operations like pop, splice, or push, then those operations WILL trigger reactivity on the arrays, so you can safely use those.

In the off case that you need to set an index value directly, we have Vue.set to help us out. Let’s see how that would look on our previous example.

this.$set(this.membersArray, 3, myNewValue)
Js
If you want to read more about all the reactivity caveats, check out this [link to the official documentation](https://vuejs.org/v2/guide/list.html#Caveats).

## Bonus
Vue’s core team is currently working on Vue 3.0, and recently announced a lot of upcoming changes to the reactivity system that will make our lives easier as developers.

This is all still subject to change at the time of this writing, but the word on the street is that these caveats will no longer be an issue. In other words, in Vue 3.0 you will be safe to forget about these edge cases completely, with the exception of those poor souls that still have to target some old browsers that will not fully support the new reactivity system.

## For More Info on Building Great Web Apps
Want to learn more about creating great web apps? It all starts out with Kendo UI - the complete UI component library that allows you to quickly build high-quality, responsive apps. It includes everything you need, from grids and charts to dropdowns and gauges.