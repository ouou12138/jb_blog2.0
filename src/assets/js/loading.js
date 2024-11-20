/**
 *  这个文件报错，vue3不能直接挂在prototype,这个组件需要重构
 */
import { createApp, createVNode, h, render } from "vue";
import LoadingComponent from "@/components/Loading.vue";

let loadingNode = null; // 存储loading节点元素

const install = function () {
  if (!loadingNode) {
    loadingNode = h(LoadingComponent);

    const wrapper = document.createElement("div");
    wrapper.classList.add("loading-wrapper");
    document.body.appendChild(wrapper);
    render(loadingNode, wrapper);
  }
};

const show = () => {
  loadingNode.component.exposed.show();
};

const hide = () => {
  loadingNode.component.exposed.hide();
};

const hideBefore = function (fn) {
  loadingNode.hide();
  setTimeout(() => {
    fn();
  }, 200);
};

export default {
  install,
  show,
  hide,
  hideBefore,
};
