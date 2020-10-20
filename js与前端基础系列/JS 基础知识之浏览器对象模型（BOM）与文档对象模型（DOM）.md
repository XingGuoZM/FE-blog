## 浏览器对象模型（BOM）
- window
    - navigator: 当前应用程序的相关信息（只读）  
    - location: 文档位置
    - history: 浏览历史
    - performance: 性能
    - screen: 当前渲染窗口中和屏幕有关的属性

## 文档对象模型（DOM）
- Node  
- Element
### scrollIntoView() 
    Element.scrollIntoView() 方法让当前的元素滚动到浏览器窗口的可视区域内。

### getBoundingClientRect()  
    Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置，有4个值分别为top、left、right、bottom

## 参考  
- [MDN Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)  
- [MDN Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)  