<template>
    <div class="login">
        <el-card class="box-card">
            <template #header>
                <h1>资金管理系统</h1>
            </template>
            <el-form
                :model="loginData"
                label-width="120px"
                label-position="left"
            >

                <el-form-item
                    label="邮箱"
                    prop="email"
                    required
                >
                    <el-input
                        v-model="loginData.email"
                        prefix-icon="Setting"
                        clearable
                    />
                </el-form-item>
                <el-form-item
                    label="密码"
                    prop="password"
                    required
                >
                    <el-input
                        type="password"
                        v-model="loginData.password"
                        prefix-icon="Lock"
                        clearable
                    />
                </el-form-item>
                <div class="btn">
                    <el-button
                        type="primary"
                        @click="handleLogin"
                    >登录</el-button>
                </div>
            </el-form>
            <div class="toReg">还没有注册?去<router-link to="/register">注册</router-link>一下
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { loginUser } from "../api/api";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";

const store = useStore()
const router = useRouter();
const loginData = reactive({
    email: "",
    password: ""
});

const handleLogin = async () => {
    let res = await loginUser(loginData);
    if (res.data.code == 500) {
        ElMessage({
            type: "error",
            message: "用户不存在，请先注册!"
        })
        loginData.email = "";
        loginData.password = ""
    }
    if (res.data.code == 200) {
        ElMessage({
            type: "success",
            message: "登录成功"
        })
        const { token } = res.data;

        //存储token到本地
        localStorage.setItem("token", token);

        //前端解析token
        const decoded = jwt_decode(token);

        //将解析后的token存储到vuex
        store.dispatch("setAuthentivated", decoded ? true : false);
        store.dispatch("setUser", decoded);

        router.push("/home");
    }
}

</script>

<style lang="scss" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(../assets/bg1.jpg);
    background-size: 1200px 700px;

    .box-card {
        width: 400px;
        opacity: 0.9;
        border-radius: 10px;

        &:hover {
            box-shadow: 0 0 5px #dcdcdc;
        }

        .btn {
            text-align: center;
        }

        .toReg {
            font-size: 13px;
            margin-left: 220px;
            margin-top: 20px;
        }
    }
}
</style>