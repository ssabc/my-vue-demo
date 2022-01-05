/*
 * @Author: bohe
 * @Date: 2022-01-05 13:52:11
 * @LastEditTime: 2022-01-05 13:52:11
 * @LastEditors: bohe
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";

import home from "./home";
// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
Vue.use(Router);

// 全局Layout下的页面
const homeChilds = require.context("./modules", false, /\.js$/);
homeChilds.keys().forEach((key) => {
    home.children = home.children.concat(homeChilds(key).default);
});

const modulesFiles = require.context(".", false, /\.js$/);

let configRouters = [];
modulesFiles.keys().forEach((key) => {
    if (key === "./index.js") {
        return;
    }
    configRouters = configRouters.concat(modulesFiles(key).default);
});
console.log(configRouters, "系统路由");
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
const createRouter = () =>
    new Router({
        mode: "hash", // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: configRouters || [],
    });

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

router.beforeEach((to, from, next) => {
    next();
});

export default router;