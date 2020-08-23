### 代码展示  
```
// IOS
const isIOS = () => {
  if (typeof window.navigator.userAgent !== 'string') return false;
  const u = window.navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

//Android
const isAndroid = () => {
  if (typeof window.navigator.userAgent !== 'string') return false;

  return /android/i.test(window.navigator.userAgent.toLowerCase());
};

//iphoneX
const isIphoneX = () => {
  if (typeof window.navigator.userAgent !== 'string') return false;
  const u = window.navigator.userAgent;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

  if (isIOS) {
      if (
      (window.screen.height === 812 && window.screen.width === 375)
      || (window.screen.height === 896 && window.screen.width === 414)
      ) {
      return true;
      }
  }
  return false;

}
```