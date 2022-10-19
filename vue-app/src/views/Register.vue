<template>
    <div class="register">
        <el-card class="box-card">
            <template #header>
                <h1>资金管理系统</h1>
            </template>
            <el-form
                :model="registerData"
                label-width="120px"
                label-position="left"
                :rules="rules"
            >
                <el-form-item
                    label="用户名"
                    prop="name"
                    required
                >
                    <el-input
                        v-model="registerData.name"
                        prefix-icon="User"
                        clearable
                    />
                </el-form-item>
                <el-form-item
                    label="邮箱"
                    prop="email"
                    required
                >
                    <el-input
                        v-model="registerData.email"
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
                        v-model="registerData.password"
                        type="password"
                        prefix-icon="Lock"
                        clearable
                    />
                </el-form-item>
                <el-form-item
                    label="选择身份"
                    prop="identity"
                    required
                >
                    <el-select v-model="registerData.identity">
                        <el-option
                            label="管理员"
                            value="admin"
                        />
                        <el-option
                            label="员工"
                            value="worker"
                        />
                    </el-select>
                </el-form-item>
                <div class="btn">
                    <el-button
                        type="primary"
                        @click="toLogin"
                    >登录</el-button>
                    <el-button
                        type="primary"
                        @click="handleRegister"
                    >注册</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { registerUser } from "../api/api";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

const rules = {
    name: [
        { required: true, message: '用户名是必填项', trigger: 'blur' },
        { min: 5, max: 10, message: 'Length should be 5 to 10', trigger: 'blur' },
    ],
    email: [
        { required: true, message: "邮箱是必填项", trigger: 'blur' }
    ],
    password: [
        { required: true, message: "密码是必填项", trigger: 'blur' }
    ],
    identity: [
        { required: true, message: "身份是必选项", trigger: 'blur' }
    ]
};

const registerData = reactive({
    name: "",
    email: "",
    password: "",
    identity: ""
})

//注册
const handleRegister = async () => {
    if (registerData.name && registerData.email && registerData.password && registerData.identity) {
        await registerUser(registerData);
        router.push("/login");
    } else {
        ElMessage({
            type: "error",
            message: "请填写完成注册信息"
        })
    }
}

const toLogin = () => {
    router.push("/login");
}
</script>

<style lang="scss" scoped>
.register {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(../assets/bg1.jpg);
    background-size: 1200px 700px;

    .box-card {
        width: 400px;
        border-radius: 10px;
        opacity: 0.9;

        &:hover {
            box-shadow: 0 0 5px #dcdcdc;
        }

        .btn {
            text-align: center;
        }
    }
}
</style>