/*
 * @Author: bohe
 * @Date: 2022-01-05 15:34:35
 * @LastEditTime: 2022-01-05 15:34:35
 * @LastEditors: bohe
 * @Description: 系统管理
 */

import Layout from "@/layout/components/index";

export default [{
    path: "/system-management",
    name: "系统管理",
    component: Layout,
    redirect: "/system-management/index",
    children: [{
        path: "index",
        name: "系统管理",
        component: () =>
            import (
                /* webpackChunkName: "system-management-index" */
                "@/views/system-management"
            ),
    }, ],
}, ];