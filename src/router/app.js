/*
 * @Author: bohe
 * @Date: 2022-01-05 15:41:13
 * @LastEditTime: 2022-01-05 15:41:14
 * @LastEditors: bohe
 * @Description: 非通用布局下的页面
 */
export default [{
        path: "/login",
        component: () =>
            import ( /* webpackChunkName: "login" */ "@/views/login"),
    },
    {
        path: "/404",
        component: () =>
            import ( /* webpackChunkName: "login" */ "@/views/404"),
    },
];