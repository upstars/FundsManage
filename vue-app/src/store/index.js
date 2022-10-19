import { createStore } from "vuex";

const types = {
  SET_AUTHENTIVATED: "SET_AUTHENTIVATED",
  SET_USER: "SET_USER",
};

export default createStore({
  state: {
    isAuthentivated: false, //设置权限,根据token是否为空判断权限
    user: {}, //存储解析token后的用户信息
    isCollapse: true,
  },
  getters: {
    isAuthentivated: (state) => state.isAuthentivated,
    user: (state) => state.user,
  },
  mutations: {
    [types.SET_AUTHENTIVATED](state, value) {
      state.isAuthentivated = value ? true : false;
    },
    [types.SET_USER](state, value) {
      state.user = value ? value : {};
    },
    setCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
  actions: {
    //异步执行mutations
    setAuthentivated({ commit }, value) {
      commit(types.SET_AUTHENTIVATED, value);
    },
    setUser({ commit }, value) {
      commit(types.SET_USER, value);
    },
    //清除vuex中的权限数据
    clearCurrent({ commit }) {
      commit(types.SET_AUTHENTIVATED, false);
      commit(types.SET_USER, null);
    },
  },
  modules: {},
});
