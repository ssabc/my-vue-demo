<!--
 * @Author: bohe
 * @Date: 2022-01-05 13:53:59
 * @LastEditTime: 2022-01-06 14:06:42
 * @LastEditors: bohe
 * @Description: 
-->
<template>
  <el-container class="layout-wrap">
    <el-header><Header></Header></el-header>
    <el-container>
      <el-aside width="200px"><Sider></Sider></el-aside>
      <el-container>
        <router-view :key="$route.fullPath" />
      </el-container>
    </el-container>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script>
import Header from "@/layout/components/header/index.vue";
import Footer from "@/layout/components/footer/index.vue";
import Sider from "@/layout/components/sider/index.vue";

export default {
  name: "Layout",
  components: {
    Header,
    Footer,
    Sider,
  },
};
</script>
<style lang="scss">
.layout-wrap {
  min-height: 100vh;
}
</style>