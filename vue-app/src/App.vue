<template>
  <router-view />
</template>
<script setup>
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";

const store = useStore()
//刷新页面不丢失数据
//存储token到本地
if (localStorage.getItem("token")) {
  //前端解析token
  const decoded = jwt_decode(localStorage.getItem("token"));
  //将解析后的token存储到vuex
  store.dispatch("setAuthentivated", decoded ? true : false);
  store.dispatch("setUser", decoded);
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  width: 100% !important;
}

#app {
  height: 100vh;
}
</style>
