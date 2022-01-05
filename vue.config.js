/*
 * @Author: zhaoshan
 * @Date: 2022-01-05 11:46:02
 * @LastEditTime: 2022-01-05 11:46:03
 * @LastEditors: zhaoshan
 * @Description:
 */
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: (config) => {
        // 忽略的打包文件
        config.externals({
            axios: "axios",
        });
        const entry = config.entry("app");
        entry.add("babel-polyfill").end();
        entry.add("classlist-polyfill").end();

        // 项目代码中使用process.env
        config.plugin("define").tap((args) => {
            args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
            return args;
        });
    },
    // eslint-disable-next-line
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === "production") {
            const productionGzipExtensions = ["js", "css"];
            // 仅在生产环境下启用该配置
            return {
                plugins: [
                    new CompressionWebpackPlugin({
                        filename: "[path].gz[query]",
                        algorithm: "gzip",
                        test: new RegExp(
                            "\\.(" + productionGzipExtensions.join("|") + ")$"
                        ),
                        threshold: 1024, // 只有大小大于该值的资源会被处理,当前配置为对于超过1k的数据进行处理，不足1k的可能会越压缩越大
                        minRatio: 0.99, // 只有压缩率小于这个值的资源才会被处理
                        deleteOriginalAssets: true, // 删除原文件
                    }),
                ],
            };
        }
    },
    // 配置转发代理
    devServer: {
        disableHostCheck: true,
        port: 2022,
        proxy: {
            "/api": {
                target: process.env.BASE_URL,
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/",
                },
            },
        },
    },
};