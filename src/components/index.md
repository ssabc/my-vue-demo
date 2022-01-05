<!--
 * @Author: bohe
 * @Date: 2022-01-05 15:15:06
 * @LastEditTime: 2022-01-05 15:22:03
 * @LastEditors: bohe
 * @Description: 公共组件
-->
## 代码规范
#### 全局组件components文件夹下(包含子)的.vue文件最好都要设置组件name字段,首字母大写，以便组件调用时使用

``` javascript
export default {
  name: "Test",
};
```
#### 调用时 ``` html <Test></Test> ```