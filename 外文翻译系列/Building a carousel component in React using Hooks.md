原文地址：[Building a carousel component in React using Hooks](https://blog.logrocket.com/building-carousel-component-react-hooks/) 

![building-carousel-react-using-only-hook-nocdn.jpg](https://blog.logrocket.com/wp-content/uploads/2019/08/building-carousel-react-using-only-hook-nocdn.jpg)

One of the problems in web development today is the entangling of different layers. Not only do we face strong coupling to multiple dependencies, but we also wire logical code directly to some styling or presentation layer. The end result may still be easier to reuse than similar code some years ago, but it is definitely more difficult to reuse than it should be.

In this article, we look at implementing a carousel that tries to simplify the entanglement by using React Hooks.

### Introduction
Looking at the situation for available carousel implementations in the React space can be daunting. There are quite a lot, and each one makes different promises. There are many that are quite old, while others are super popular, and some come with many dependencies. However, what they all have in common is that they are opinionated about presentation and styling.

In our case, we did not want that. We already had a style in mind, and we wanted to reuse the same carousel with different styles — not only to choose, e.g., different colors for some arrows, but in fact to choose whether we use arrows at all. Ideally, the whole usage of the component is up to the user. In the end, we decided to go for our own implementation using React Hooks.

### What are Hooks?
React Hooks have been introduced to simplify code reuse. One reason why the React team introduced Hooks is to get rid of class components, which require a higher degree of knowledge in JavaScript, plus introduce a higher risk of bugs. The core reason is the correct understanding of this in JavaScript, which is everything but intuitive for people coming from other languages.

In JavaScript, this is context-bound and not instance-bound. If, e.g., a method is passed on as a callback, it loses its context. If the method is then called like a function, the context will be undefined. As such, in order to avoid this scenario, the this context has to be captured in the method. This could be done either by wrapping the method (() => f()), using a field with an arrow function instead (f = () => {}), or using a bound version of it using bind (f = f.bind(this)).

Another reason for introducing Hooks is the ability to reuse code that deals with the component’s state and lifecycle more easily. Previously, we had mixins for React class components, but they had quite a few problems and did cause more harm than good. The core issue here was that mixins still operated on the different lifecycle functions individually. They also just operated within the class components instance, meaning the probability that different mixins step on each other’s toes (e.g., by overwriting variables) was quite high.

By using React Hooks, we can separate complicated behavior from their representation quite easily. As a result, code may read like this:
```
const MyCarousel = ({ slideTime }) => {
  const carouselBehavior = useCarousel(slideTime);
  return <div className="my-carousel">...</div>;
};
```
Even though there is a variety of core Hooks, the most interesting ones are useState (creates or gets a state cell) and useEffect (gives us the ability to execute a side effect depending on some conditions). Once state gets complicated, useReducer may be handy.

The flow (or lifecycle) of Hooks can be best summarized as in the following diagram:


React Hooks are simple functions that work in conjunction with the React dispatcher. As such, they need to be called at rendering time (of the respective component), and they have to appear in the same order. One consequence is that React Hooks should never be inside a condition or loop. Also, they can only be used by functional components.

### What is a carousel, anyway?
A carousel is a UI component that uses a single view to show multiple items. The items are shown in the view by rotation. Some carousels allow the rotation to be time-triggered; others allow user interaction with bullet points (free navigation) or arrows (forward or backward). On mobile, a popular pattern is swiping to go forward or backward.

The essential state of a carousel can thus be written as:
```
const [current, setCurrent] = React.useState(0);
```
The result of calling the useState Hook with the initial value is a tuple (i.e., an array with a fixed number of items) containing the current value and a callback for changing the current value. Here, a tuple simplifies the custom naming for us.

If we want to bring in auto-rotation after a certain time (time, given in milliseconds), we could do:
```
React.useEffect(() => {
  const next = (current + 1) % slides.length;
  const id = setTimeout(() => setCurrent(next), time);
  return () => clearTimeout(id);
}, [current]);
```
The number of slides is determined by slides.length. Due to the modulo operation, we ensure that the current slide is always between 0 (inclusive) and the number of slides (exclusive).

Interestingly, we can use the second argument of useEffect to determine when the side effect has to be triggered. By setting an array to current, we tell React to dispose the previous effect (effectively calling clearTimeout), if any, and run it again.

Naturally, we therefore reset the clock on manual user interaction (going anywhere, e.g., forward) and otherwise have an effect similar to setInterval, but easier to control and much more compliant to the core ideas of React Hooks.

### Desired behavior
Alright, since we already have two potential building blocks for our carousel — and, frankly, two building blocks that could be sufficient for a very simply carousel implementation — let’s look at what behavior we want to have.

Obviously, our carousel should be capable of auto-rotating. For this, we’ll need an effect such as the one introduced earlier. However, in addition, users should be capable of dragging the current slide forward or backward. This should all run smoothly, empowered by some CSS animation. When the user starts dragging, the auto-rotation should be reset.

To distinguish between the different modes, we introduce the following state variables, which are in many cases set jointly:
```
const initialCarouselState = {
  offset: 0,
  desired: 0,
  active: 0
};
```
The offset is relevant for managing the user’s current dragging efforts. Likewise, desired and active are necessary to indicate the currently active slide versus the slide to which we actually want to go. The two are different in case of an ongoing transition.

Our requirements with the dragging and smooth scrolling requires us not to have N slides (or “images”) in the rotation, but actually N + 2. What we require under the hood should look like the following:

Hook Flow Diagram
While we start at the usual first slide, we had to insert one slide beforehand (real index 0, referring to the last Nth slide). This pseudo-slide will be used when we swipe left or would go left. Note, however, that once we reach this slide, we will reset the offset to the real slide (without any transition).

Once we are “inside” the deck of slides, there is no problem with going either forward or backward:

Inside The Slide Deck
The same problem as on the first slide can also be seen on the last slide. In this case, it’s not the going backward (swiping to the right) that is problematic, but the going forward (swiping to the left). Again, our solution is to insert a pseudo-slide (real index N+1), this time referring to the first slide.

Ending At The Last Slide
Keep in mind that while the visible container will be set to overflow: hidden, the inner container will expand beyond the screen. Thus, the width of this container will actually be (N + 2) * 100% with respect to the visible (carousel) container.

Nevertheless, the transitions inside the inner container refer to the width of the inner container. As such, while the width of the inner container may be, e.g., 500% (for three slides), a translation from one slide to the other will always be less than 100 percent. Since the minimum number of slides is three (a single real slide with two pseudo-slides — referring to the same slide), the maximum size of the translation is 33 percent. For eight real slides (i.e., 10 slides in total), we get a shift between transitions of 10 percent.

### Implementation

Since the state variables are used jointly, we should use the useReducer Hook. A possible implementation based on the carousel state as described earlier looks like:
```
function carouselReducer(state, action) {
  switch (action.type) {
    case "jump":
      return {
        ...state,
        desired: action.desired
      };
    case "next":
      return {
        ...state,
        desired: next(action.length, state.active)
      };
    case "prev":
      return {
        ...state,
        desired: previous(action.length, state.active)
      };
    case "done":
      return {
        ...state,
        offset: NaN,
        active: state.desired
      };
    case "drag":
      return {
        ...state,
        offset: action.offset
      };
    default:
      return state;
  }
}
```
Using carouselReducer is as simple as writing:
```
const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);
```
Introducing advanced touch gestures (swiping) can be done via a library (react-swipeable). This library already gives us a Hook.
```
const handlers = useSwipeable({
  onSwiping(e) {
    dispatch({
      type: "drag",
      offset: -e.deltaX
    });
  },
  onSwipedLeft(e) {
    const t = threshold(e.event.target);

    if (e.deltaX >= t) {
      dispatch({
        type: "next",
        length
      });
    } else {
      dispatch({
        type: "drag",
        offset: 0
      });
    }
  },
  onSwipedRight(e) {
    const t = threshold(e.event.target);

    if (-e.deltaX >= t) {
      dispatch({
        type: "prev",
        length
      });
    } else {
      dispatch({
        type: "drag",
        offset: 0
      });
    }
  },
  trackMouse: true,
  trackTouch: true
});
```
The returned value are the handlers that can be attached to any container for following the drag operation. The threshold can be set to any value. In this implementation, we set it to a third of the container’s width (obtained via e.event.target).

In other words, in the previous code, we distinguish between the following cases:

- A drag operation is currently ongoing, and we need to reflect the current progress in the state
- A drag operation was finished successfully, and we need to go to the next or previous slide
- A drag operation was finished without succeeding — now we should reset the offset
The whole state machinery is assisted by useEffect to get the timings right.
```
useEffect(() => {
  const id = setTimeout(() => dispatch({ type: "next", length }), interval);
  return () => clearTimeout(id);
}, [state.offset, state.active]);

useEffect(() => {
  const id = setTimeout(() => dispatch({ type: "done" }), transitionTime);
  return () => clearTimeout(id);
}, [state.desired]);
```
As noted earlier, the first useEffect is responsible for the auto-rotation. The only difference to the code presented earlier is the use of another dependency for triggering/disposing the rotation. Due to our requirements, we also introduced the offset. Thus, if a dragging operation is ongoing, we will not trigger the auto-rotation.

The second useEffect will be necessary to finally set the active state to the desired one. Because we use a CSS transition, we are not controlling the transition from JS. As such, a timeout with the same time needs to be present to help us.

For the transitions, we set the following constants:
```
const transitionTime = 400;
const elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
const smooth = `transform ${transitionTime}ms ease`;
```
The elastic transition is used to indicate a “bounce-back” when dragging the current slide was insufficient for moving forward or backward. The smooth transition is our preference when we are moving to another slide.

Finally, one use of the useCarousel Hook can look as follows:
```
export const Carousel = ({ slides, interval = 5000 }) => {
  const length = slides.length;
  const [active, setActive, handlers, style] = useCarousel(length, interval);

  return (
    length > 0 && (
      <div className="carousel">
        <ol className="carousel-indicators">
          {slides.map((_, index) => (
            <li
              onClick={() => setActive(index)}
              key={index}
              className={`${active === index ? "active" : ""}`}
            />
          ))}
        </ol>
        <div className="carousel-content" {...handlers} style={style}>
          <div className="carousel-item">{slides[slides.length - 1]}</div>
          {slides.map((slide, index) => (
            <div className="carousel-item" key={index}>
              {slide}
            </div>
          ))}
          <div className="carousel-item">{slides[0]}</div>
        </div>
      </div>
    )
  );
};
```
Note that we introduced the two duplicates as described in the behavior section; the first carousel item (referring to the last slide) and the last carousel item (referring to the first slide) are there to enable continuous dragging, yielding a periodic experience (as expected by a carousel, i.e., a round object with a certain periodicity).

The exact style — such as where the indicators are, or whether we use indicators at all — is fully determined by us. The presentation is also decoupled from the behavior logic. We only receive the style that manages or determines the transition display logic. Likewise, we received handlers to be attached where we see the point of interaction.

### Conclusion
Using React Hooks, we can come one step closer to reusable pieces of software. In the given example, we constructed a quite complicated UI component that is capable of being reused in many forms. The full code is available at GitHub.

Maybe the useLayoutEffect would have been even better. I am not fully sure yet, but my first tests indicate that useEffect is good enough. What are your thoughts and preferences? Where do you see Hooks shine? I would love to hear what you think in the comments!

### Full visibility into production React apps

Debugging React applications can be difficult, especially when users experience issues that are difficult to reproduce. If you’re interested in monitoring and tracking Redux state, automatically surfacing JavaScript errors, and tracking slow network requests and component load time, try LogRocket. LogRocket Dashboard Free Trial Banner
LogRocket is like a DVR for web apps, recording literally everything that happens on your React app. Instead of guessing why problems happen, you can aggregate and report on what state your application was in when an issue occurred. LogRocket also monitors your app's performance, reporting with metrics like client CPU load, client memory usage, and more.

The LogRocket Redux middleware package adds an extra layer of visibility into your user sessions. LogRocket logs all actions and state from your Redux stores.

Modernize how you debug your React apps — start monitoring for free.

