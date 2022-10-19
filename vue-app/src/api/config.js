import router from "@/router";
import { Message } from "@element-plus/icons-vue";
import axios from "axios";
import { ElLoading } from "element-plus";

axios.defaults.baseURL = "http://localhost:8888";
let loading = null;

//请求拦截器
axios.interceptors.request.use(
  (request) => {
    //加载动画
    loading = ElLoading.service({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0.7)",
    });

    //配置统一的请求header
    if (localStorage.getItem("token")) {
      request.headers.Authorization = localStorage.getItem("token");
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(
  (response) => {
    //关闭加载动画
    setTimeout(() => {
      loading.close();
    }, 800);
    return response;
  },
  (error) => {
    setTimeout(() => {
      loading.close();
    }, 800);
    Message(error.response.data);
    //获取错误状态码
    const { status } = error.response;
    //本地token过期失效，清除本地token
    if (status == 401) {
      Message.error("token失效,请重新登录");
      localStorage.removeItem("token");
      //跳转登录页面
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axios;
