/*
 * @Author: bohe
 * @Date: 2022-01-06 11:05:01
 * @LastEditTime: 2022-01-06 11:05:01
 * @LastEditors: bohe
 * @Description: 
 */
import path from "path";
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

const _resolve = (dir) => path.resolve(__dirname, dir);
export default defineConfig(async({ command }) => {
    const config = {
        base: './', //访问路径
        plugins: [
            createVuePlugin(),
        ],
        resolve: {
            alias: {
                '@': _resolve('src')
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
        server: {
            host: '0.0.0.0',
            port: 2022, // 设置服务启动端口号
            open: false, // 设置服务启动时是否自动打开浏览器
            cors: true, // 允许跨域
            // 设置代理，根据项目实际情况配置
            proxy: {
                "/testapi": {
                    target: 'https://***.***.**/testapi/',
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/testapi/', '/')
                },
                '/baseapi': {
                    target: 'https://***.***.**/baseapi/',
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/baseapi/', '/')
                }
            }
        }
    }
    if (command === 'dev' || command === 'serve') {
        return Object.assign(config, {
            // dev 独有配置
        })
    } else {
        // command === 'build'
        return Object.assign(config, {
            // build 独有配置
        })
    }
})