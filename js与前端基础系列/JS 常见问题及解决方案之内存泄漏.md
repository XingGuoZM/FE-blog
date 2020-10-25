
## 什么是内存泄漏


## 引发原因
- 闭包引起内存泄漏
- 观察者模式在添加通知后，没有及时清理掉
- 定时器的处理函数没有及时释放，没有调用clearInterval方法
- 视图层有些控件重复添加，没有移除

## 排查方案

## 参考
- [JS内存泄漏排查方法-Chrome Profiles](http://caibaojian.com/chrome-profiles.html)