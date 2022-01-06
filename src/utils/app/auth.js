/*
 * @Author: bohe
 * @Date: 2022-01-05 13:48:15
 * @LastEditTime: 2022-01-05 17:10:15
 * @LastEditors: bohe
 * @Description:
 */
import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

// console.log(a ? .t);
export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

const UserId = "User-Id";

export function getUserId() {
    return Cookies.get(UserId);
}

export function setUserId(userId) {
    return Cookies.set(UserId, userId);
}

export function removeUserId() {
    return Cookies.remove(UserId);
}