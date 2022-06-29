# 网站开发中，如何实现图片的懒加载

图片懒加载的定义：在滚动至图片进入视口时，再加载图片。
两个问题：

1. 如何监听元素是否出现在视口。
2. 如何控制图片的加载。

## 方案一：监听 scroll + getBoundingClientRect API+ dataset

[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

1. 在视口的条件：rect.top < clientHeight
   ![20220618122221](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220618122221.png)

![20220618122242](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220618122242.png) 2. 控制图片加载：使用 data-src 存图片链接，当出现在视口时，再去设置 src

## 方案二：scroll + IntersectionObserver API + dataset

[IntersectionObserver.IntersectionObserver()](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver)

IntersectionObserver 相当于 scrool + 监听元素可视的组合 API

1. 通过 IntersectionObserver 创建监听对象，监听页面中的图片，可视时加载图片。

## 方案三：loading:lazy 属性

直接在 img 标签上增加 loading:lazy 属性，浏览器兼容性不太好。
![20220618122345](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220618122345.png)
