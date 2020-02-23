import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import FastClick from "fastclick";
import VueLazyLoad from 'vue-lazyload';

import Toast from "components/common/toast";

Vue.config.productionTip = false;
// 添加事件总线对象
Vue.prototype.$bus = new Vue();
// 安装Toast插件
Vue.use(Toast);
// 解决移动端300ms延迟
FastClick.attach(document.body);
// 图片懒加载插件
Vue.use(VueLazyLoad,{
  // loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
