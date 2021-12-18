
速度更快
体积更小
提前
滞后
转移

webpack应用的优化方向

开发体验上，一个是追求构建速度，另一个是响应速度
线上体验，一个是包体积缩减

## 按需加载
代码分割按需加载。
import()、require.ensure() + code split 

## tree-shaking
tree-shaking一句话概括就是摇掉没有用的代码，不将无用代码构建打包。

