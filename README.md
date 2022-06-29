# 网站开发中，如何实现图片的懒加载

图片懒加载的定义：在滚动至图片进入视口时，再加载图片。
两个问题：

1. 如何监听元素是否出现在视口。
2. 如何控制图片的加载。

## 方案一：监听 scroll + getBoundingClientRect API+ dataset

[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

1. 在视口的条件：rect.top < clientHeight

![20220618122221](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220618122221.png)

![20220618122242](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220618122242.png)

2.  控制图片加载：使用 data-src 存图片链接，当出现在视口时，再去设置 src

## 方案二：scroll + IntersectionObserver API + dataset

[IntersectionObserver.IntersectionObserver()](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver)

IntersectionObserver 相当于 scrool + 监听元素可视的组合 API

1. 通过 IntersectionObserver 创建监听对象，监听页面中的图片，可视时加载图片。

## 方案三：loading:lazy 属性

直接在 img 标签上增加 loading:lazy 属性，浏览器兼容性不太好。
![20220618122345](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220618122345.png)

## 如何优雅地使用图片懒加载？使用者可以当成黑盒使用

使用者无需纠结设置 data-src、src 还是其他属性，直接正常使用，只需要使用`LazyLoad`组件进行包裹即可。

LazyLoad 组件实现思路：

1. 渲染：visible 为 false 时，展示占位；true 时展示 children。
2. 在组件挂载时，将组件相关信息存入 listeners 列表中
3. 监听 scroll 事件，遍历 listeners，判断组件可视，visible 设置为 true，触发 forceUpdate。

**Function 组件如何触发 forceUpdate?**

自定义 hooks,改变 state，触发 re-render。

![20220629184508](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220629184508.png)

### 使用 Demo

```js
<LazyLoad height="100px" once={false}>
  <img
    src="
https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/balance_1.jpg"
    alt=""
    style={{ width: "100px", height: "100px" }}
  />
</LazyLoad>
```
