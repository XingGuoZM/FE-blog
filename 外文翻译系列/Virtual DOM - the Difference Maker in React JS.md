原文地址：[Virtual DOM - the Difference Maker in React JS](https://www.pluralsight.com/guides/virtual-dom-difference-maker-react-js) 

## Introduction  
One of the biggest challenges of the modern-day website is response time. Specifically, how quickly users can navigate to web pages and get their tasks completed. With the advent of many UI libraries, each one of them attempts to address the above issue uniquely. In this guide, you will see how React addresses this issue using a concept called virtual DOM and how this algorithm has made React JS as a highly preferred UI library among various others.

### Quick Analogy
Before jumping into the technical details, let's look at a quick analogy about Virtual DOM. Imagine a couple heading out to a party. Both spend ample time to dress perfectly for the occasion, addressing minor details. When they step out of their room and see their best friend, she gives a quick suggestion to her and asks her to wear a different piece of jewelry. Imagine if she goes back to the room and starts her makeup process all over from scratch, instead of just changing the jewelry. That's what happens when UI attempts to repaint the entire web page for a small change instead of just updating only that portion of the web page.

## What Is Virtual DOM?
First, it is important to understand that virtual DOM is not a specification, it is just an optimal way of interfacing with the DOM. Virtual DOM is a JavaScript object representation of an entire HTML document. To interface with this object model, each library has its own unique way of implementing this to improve the performance of webpage rendering and re-rendering.

### Virtual DOM vs. Real DOM
If updating a DOM object is slow, what makes updating virtual DOM faster? Isn't virtual DOM another DOM object? Absolutely, yes. Virtual DOM is just another DOM object. But it's not coupled tightly with the web page that it is rendered. Let's see what happens under the hood.

Every webpage that you see has an equivalent DOM representation which is a tree structure that holds all of the UI components. For any small change to a state in the UI, its corresponding DOM representation needs to be changed and the UI needs to be re-rendered. Updating the DOM itself is not a costly process, but rendering and re-rendering the UI is what makes it expensive. Considering the size of most of the SPAs (Single Page Application) that we see these days, it’s not the complexity of elements but the size of the tree structure that holds these elements which makes rendering the UI time-consuming.

## Optimizing Using Virtual DOM
At any point in time, the React library maintains two copies of the Virtual DOM; let's call one the pristine version and the other one the dirty version. Whenever a state changes in UI, react is going to keep track of the changes and start batching them. These changes are not applied to the actual DOM but are instead applied to the dirty version of Virtual DOM. At a specific time, determined by React, it will perform a diff operation between the pristine version and the dirty version and a delta is computed. Later on, this delta will be applied to the real DOM so that only the required part of the web page is updated, instead of repainting the entire web page.

Let's take this explanation one level deeper and look at what happens behind the scenes. The following are key operations that are part of the React rendering algorithm.

## Efficient diff Algorithm
Any calls to render() method will create a tree of React elements. If the state changes and render() method is invoked again, it will return a different tree of React elements. Now, the challenge is to effectively update the UI to match the newly generated tree. For a tree with 'n' number of elements, the complexity is in the order of O(n3). React implements an optimized O(n) algorithm based on two assumptions:

1. Elements of different types will produce different tree structures.
If the root elements have different types, React will replace the old tree elements with the new tree. If two React elements have the same type, it will compare the attributes and update only the modified attributes. Let's look at a simple React component that prints "I love ReactJS". If we change the tag to tag, all the components under
tag will be unmounted and their state will be destroyed. Instead if we just change the "className" attribute in
tag, React will keep the same DOM node and will change the attribute alone.

  ```
  class Hello extends React.component {
    render() {
      return(
        <div className="test1">
            <Hello />
        </div>
        )
    }
  }

  function Hello() {
    return <h1>I love ReactJS</h1>;
  }
  ```

2. Using a key prop to hint the child elements that may be stable across different renders.  
While generating the diff between the dirty and pristine virtual DOM, React just iterates over both the tree parallelly and generates a mutation when it finds a difference. So, if the developer can hint React using the keys attribute to identify an element, React will use this key to match the elements between two trees and minimize unnecessary mutations.

## Breadth-First Search
React traverses the DOM tree using the breadth-first search algorithm. In this algorithm, nodes are traversed from top to bottom and left to right. If React finds any element that is modified, it will, by default, re-render that subtree without proceeding pain further to check the depth of the tree.

![image 0](https://i.imgur.com/LWQy4KK.png)

In the above example of a DOM tree, though both elements B and B11 are modified, once React finds that element B is modified, it will flag the tree and the subtree underneath is modified.

## Batched Update Operations
We need to remember that JavaScript is a single thread model and all the events that happen against a DOM tree are added to call stack and the event loop executes the calls that are added. The key is, no matter how many times setState() is called against a component, inside a React event handler, they will produce only a single re-render at the end of the event.

## Conclusion
By leveraging the above algorithms in an efficient way, we can safely say that React has an almost perfected UI rendering using virtual DOM and the proof of this is in the number of companies that have been adopting React and the continuous growth in its adoption in the last few years.