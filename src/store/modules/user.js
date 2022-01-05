/*
 * @Author: bohe
 * @Date: 2022-01-05 13:49:55
 * @LastEditTime: 2022-01-05 13:49:56
 * @LastEditors: bohe
 * @Description:
 */
import { login, logout, getInfo } from "@/api/user";
import {
    getToken,
    setToken,
    removeToken,
    setUserId,
    removeUserId,
} from "@/utils/auth";
import router, { resetRouter } from "@/router";

const state = {
    token: getToken(),
    name: "",
    avatar: "",
    introduction: "",
    roles: [],
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
};

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { email, password } = userInfo;
        console.log(userInfo);
        return new Promise((resolve, reject) => {
            login({ email: email.trim(), password: password })
                .then((response) => {
                    const { data } = response;
                    console.log(data);
                    commit("SET_TOKEN", data.token);
                    setToken(data.token);
                    setUserId(data.id);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token)
                .then((response) => {
                    const { data } = response;
                    if (!data) {
                        console.log("Verification failed, please Login again.");
                    }
                    let roles = ["admin"];
                    commit("SET_ROLES", roles);
                    resolve(roles);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token)
                .then(() => {
                    commit("SET_TOKEN", "");
                    commit("SET_ROLES", []);
                    removeToken();
                    removeUserId();
                    resetRouter();

                    // reset visited views and cached views
                    // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                    dispatch("tagsView/delAllViews", null, { root: true });

                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // remove token
    resetToken({ commit }) {
        return new Promise((resolve) => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
        });
    },

    // dynamically modify permissions
    async changeRoles({ commit, dispatch }, role) {
        const token = role + "-token";

        commit("SET_TOKEN", token);
        setToken(token);
        setUserId("");

        const { roles } = await dispatch("getInfo");

        resetRouter();

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch("permission/generateRoutes", roles, {
            root: true,
        });
        // dynamically add accessible routes
        router.addRoutes(accessRoutes);

        // reset visited views and cached views
        dispatch("tagsView/delAllViews", null, { root: true });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};