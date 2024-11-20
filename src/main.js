import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SvgIcon from "@/components/SvgIcon.vue";
import Loading from "@/assets/js/loading";
// import Toast from "@/assets/js/toast";
import api from "./request/api/index"; // 导入api接口
import VueClipboard from "vue-clipboard3";
// import Highlight from 'vue-markdown-highlight';
// import 'highlight.js/scss/monokai-sublime.scss';

// 切换路由置顶滚动条
router.afterEach(() => {
  window.scrollTo(0, 0);
});

const app = createApp(App);

// 全局注册 Highlight
// app.use(Highlight);

// 全局挂载 api 到实例
app.config.globalProperties.$api = api;

// 使用 VueClipboard
app.use(VueClipboard);

// 注册全局组件
app.component("svg-icon", SvgIcon);

// // // 加载所有 SVG 图标
// // const requireAll = (requireContext) => requireContext.keys().map(requireContext);
// // const req = require.context("@/assets/svg", false, /\.svg$/);
// // requireAll(req);

// 使用 Loading 和 Toast 插件
// app.use(Loading);
Loading.install();
//需要重构
// app.use(Toast);

Loading.show();

// 禁用生产环境提示
app.config.productionTip = false;

// 挂载应用
app.use(router).use(store).mount("#app");
