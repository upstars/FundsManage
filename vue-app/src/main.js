import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

//全局路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    token ? next() : next("/login");
  }
});

app.use(store).use(router).use(Element).mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
