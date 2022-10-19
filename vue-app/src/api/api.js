/**
 * 统一接口管理
 */
import axios from "./config";

//注册
const registerUser = (params) => {
  return axios({
    url: "/api/users/register",
    method: "post",
    data: params,
  });
};

//登录
const loginUser = (params) => {
  return axios({
    url: "/api/users/login",
    method: "post",
    data: params,
  });
};

//获取profile信息
const getProfile = () => {
  return axios({
    url: "/api/profiles/",
    method: "get",
  });
};

//删除profile
const deleteProfile = (params) => {
  return axios({
    url: `/api/profiles/delete/${params}`,
    method: "delete",
  });
};

//添加信息
const addProfile = (params) => {
  return axios({
    url: "/api/profiles/add",
    method: "post",
    data: params,
  });
};

//编辑信息
const editProfile = (params) => {
  return axios({
    url: `/api/profiles/edit/${params.id}`,
    method: "post",
    data: params,
  });
};

export {
  registerUser,
  loginUser,
  getProfile,
  deleteProfile,
  addProfile,
  editProfile,
};
