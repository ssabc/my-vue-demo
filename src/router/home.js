/*
 * @Author: bohe
 * @Date: 2022-01-05 15:47:37
 * @LastEditTime: 2022-01-05 15:47:37
 * @LastEditors: bohe
 * @Description: 通用布局里的页面
 */
/* Layout */
import Layout from "@/layout/index.vue";

export default {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [{
        path: "/index",
        name: "首页",
        component: () =>
            import ( /* webpackChunkName: "home" */ "@/views/home/index.vue"),
    }, ],
};