/*
 * @Author: bohe
 * @Date: 2022-01-05 13:44:32
 * @LastEditTime: 2022-01-05 13:47:04
 * @LastEditors: bohe
 * @Description: 通用请求
 */
import axios from "axios";
import { MessageBox, Message, Loading } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/app/auth";

let loading = null; //定义loading变量

//开始 加载loading
let startLoading = () => {
    loading = Loading.service({
        lock: true,
        text: "加载中……",
        background: "rgba(0, 0, 0, 0.1)",
    });
};
//结束 取消loading加载
let endLoading = () => {
    loading.close();
};
// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30000, // request timeout
    // 'Content-Type': 'application/json;charset=UTF-8'
});

// request interceptor
service.interceptors.request.use(
    (config) => {
        // do something before request is sent

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers["token"] = getToken();
        }
        startLoading();
        return config;
    },
    (error) => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        endLoading();
        const res = response.data;
        // if the custom code is not 20000, it is judged as an error.

        if (res.code !== 200 && res.code !== "200" && res.code !== "SYS2009") {
            Message({
                message: res.msg || res.message || "Error",
                type: "error",
                duration: 5 * 1000,
            });

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm(
                    "You have been logged out, you can cancel to stay on this page, or log in again",
                    "Confirm logout", {
                        confirmButtonText: "Re-Login",
                        cancelButtonText: "Cancel",
                        type: "warning",
                    }
                ).then(() => {
                    store.dispatch("user/resetToken").then(() => {
                        location.reload();
                    });
                });
            }
            // return Promise.reject(new Error(res.msg || 'Error'))
            return Promise.reject(res.msg || res.message || "Error");
        } else {
            if (
                response.config.url.indexOf(process.env.VUE_APP_DATA_CLEAN_BASE_URL) >
                -1
            ) {
                return res.data;
            }
            return res;
        }
    },
    (error) => {
        endLoading();
        console.log("err" + error); // for debug
        Message({
            message: error.message || error.msg,
            type: "error",
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    }
);

export default service;