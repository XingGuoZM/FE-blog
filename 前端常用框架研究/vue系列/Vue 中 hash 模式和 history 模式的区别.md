- 最明显的是在显示上，hash 模式的 URL 会夹杂着 # 号， 而 history 没有。  
- Vue 底层对它们的实现方式不同。 hash 模式是依靠 onhashchange 事件（监听 location.hash的改变），而 history 模式主要是依靠 HTML5 history 中新增的两个方法， pushState() 可以改变 url 地址且不会发送请求，replaceState() 可以读取历史记录栈，还可以对浏览器记录进行修改。  
- 当真正需要通过 URL 向后端发送 HTTP 请求的时候，比如常见的用户手动输入 URL 后回车，或是刷新（重启）浏览器，这时候 history模式需要后端的支持。因为 history 模式下，前端的 URL 必须和实际向后端发送请求的 URL 一致，例如有一个 URL 是带有路径 path 的（例如：www.baidu.com/images/a）,如果后端没有对这个路径做处理的话，就会返回一个 404 错误，所以需要后端增加一个覆盖所有情况的候选资源，一般会配合前端给出一个 404 页面。



### 参考  
- [2020前端近期面试题整理](https://blog.csdn.net/kkm486622296/article/details/106063151)  