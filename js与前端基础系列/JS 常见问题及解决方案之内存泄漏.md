
## 什么是内存泄漏


## 引发原因
- 闭包引起内存泄漏
- 观察者模式在添加通知后，没有及时清理掉
- 定时器的处理函数没有及时释放，没有调用clearInterval方法
- 视图层有些控件重复添加，没有移除

## 存在内存泄漏的页面特点
内存泄漏是一个累积的过程
- 页面生命周期长（用户可能存留10分钟、半小时甚至2小时）
- 交互功能多（页面偏功能，而不是展示）
- 重JS应用（前端有复杂的数据状态、视图管理）

## 排查方案
- Chrome Task Manager工具
- Chrome DevTools Performance面板
- Chrome DevTools Memory面板

## 参考
- [JS内存泄漏排查方法-Chrome Profiles](http://caibaojian.com/chrome-profiles.html)
- [JS内存泄漏排查方法](http://www.ayqy.net/blog/js%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E6%8E%92%E6%9F%A5%E6%96%B9%E6%B3%95/)