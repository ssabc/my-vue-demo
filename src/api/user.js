/*
 * @Author: bohe
 * @Date: 2022-01-05 13:50:30
 * @LastEditTime: 2022-01-05 13:50:54
 * @LastEditors: bohe
 * @Description: 
 */
import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/api/sys/sys-user/login',
        method: 'post',
        data
    })
}

export function getInfo() {
    return request({
        url: '/api/sys/sys-user/info',
        method: 'post',
    })
}

export function logout() {
    return request({
        url: '/api/sys/logout',
        method: 'post'
    })
}