/*
 * @Author: zhaoshan
 * @Date: 2022-01-04 10:01:13
 * @LastEditTime: 2022-01-04 10:21:32
 * @LastEditors: zhaoshan
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";
// 引入element-ui
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 注册全局组件
import components from "@/components";
// 路由
import router from "@/router/index";

Vue.use(Element, {
    size: "medium", // set element-ui default size
    // locale: enLang // 如果使用中文，无需设置，请删除
});
Vue.use(components);
Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");