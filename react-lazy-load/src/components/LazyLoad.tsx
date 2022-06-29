import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import useForceUpdate from "../hooks/useForceUpdate";
import { off, on } from "../utils/event";
import { debounce } from "../utils/debounce";

interface ILazyLoadProps {
  wrapperClassName: string;
  style: Record<string, string>;
  once: boolean;
  children: ReactNode;
  height: string;
}

/**
 * 存储懒加载的元素
 */
const listeners: any[] = [];

/**
 * LazyLoad Wrapper组件
 */
const LazyLoad: FC<ILazyLoadProps> = (props) => {
  const { children, style, wrapperClassName = "", height, once = true } = props;
  const [visible, setVisible] = useState(false);
  const lazyLoadRef = useRef(null);
  const visibleRef = useRef(visible);
  const [stamp, setStamp] = useState("");

  /**
   * 改变state，触发re-render
   */
  const forceUpdate = useForceUpdate();

  /**
   * 初始化时,需要做几件事：
   * 1.监听scroll事件
   * 2.判断是否在可视区域,是否展示children
   */
  useEffect(() => {
    // 默认滚动容器为浏览器，接受手动传入scrollContainer
    const scrollContainer = window;
    on(scrollContainer, "scroll", finalLazyLoadHandler);
    setStamp(() => {
      const temp = `${listeners.length - 1}-${Date.now()}`;
      listeners.push({
        stamp: temp,
        lazyLoadRef,
        visibleRef,
        forceUpdate,
        setVisible,
      });
      return temp;
    });

    const vis = isVisible(lazyLoadRef, visible, forceUpdate);
    setVisible(vis);

    return () => {
      const index = listeners.findIndex((item) => item.stamp === stamp);
      if (index !== -1) {
        listeners.splice(index, 1);
      }

      off(scrollContainer, "scroll", finalLazyLoadHandler);
    };
  }, []);

  useEffect(() => {
    const index = listeners.findIndex((item) => item.stamp === stamp);

    if (index !== -1) {
      listeners[index].visibleRef.current = visible;
    }
  }, [visible]);

  /**
   * 判断某个组件/图片是否处于可视范围内
   * @param visible
   * @returns
   */
  const isVisible = (
    component: any,
    visible: boolean,
    forceUpdateCb: () => void
  ): boolean => {
    const node = component.current;
    const { top } = node.getBoundingClientRect();

    const viewHeight =
      window.innerHeight || document.documentElement.clientHeight;
    console.log(
      "info-isVisible",
      top < viewHeight && top > 0,
      !!node.getAttribute("data-once"),
      visible
    );
    // 可见
    if (top < viewHeight && top > 0) {
      // 未渲染过
      if (!visible) {
        visible = true;
        // 强制更新视图
        forceUpdateCb();
      }
      // 不可见&渲染过&支持多次懒加载
    } else if (!!node.getAttribute("data-once") && visible) {
      console.log("info-props");
      visible = false;
      forceUpdateCb();
    }
    return visible;
  };

  /**
   * 检查每个元素的可视情况
   */
  const lazyLoadHandler = (): void => {
    console.log("lazyLoadHandler");
    for (let i = 0; i < listeners.length; i++) {
      const { stamp, lazyLoadRef, visibleRef, forceUpdate, setVisible } =
        listeners[i];
      console.log("info-", stamp, visibleRef.current);
      const vis = isVisible(lazyLoadRef, visibleRef.current, forceUpdate);
      // 修改visble

      setVisible(vis);
    }
  };

  /**
   * 增加防抖
   */
  let finalLazyLoadHandler = debounce(lazyLoadHandler, 300);

  return (
    <div
      className={`${wrapperClassName}`}
      style={style}
      ref={lazyLoadRef}
      data-once={once}
    >
      {visible ? children : <div style={{ height: height }} />}
    </div>
  );
};

export default LazyLoad;
