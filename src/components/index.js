/*
 * @Author: bohe
 * @Date: 2022-01-05 14:16:46
 * @LastEditTime: 2022-01-05 14:16:47
 * @LastEditors: bohe
 * @Description: 全局组件 统一一起注册
 */
const vueFiles = require.context("./", true, /\.vue$/),
    components = [],
    getDefaultName = (path) => {
        const n = path.slice("./".length, path.length - 4).split("-");

        return n.map((item) => `${item[0].toUpperCase()}${item.slice(1)}`).join("");
    };
for (const path of vueFiles.keys()) {
    components.push(
        Object.assign(vueFiles(path).default, {
            name: vueFiles(path).default.name || getDefaultName(path),
        })
    );
}

export default function install(Vue) {
    for (const component of components.values()) {
        Vue.component(component.name, component);
    }
}