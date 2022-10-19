<template>
    <div class="header">
        <div class="left-header">
            <div><img
                    src="../assets/logo.png"
                    alt=""
                    class="img-logo"
                    @click="changeCollapse"
                >
            </div>
            <div class="title">FundManage</div>
        </div>
        <div class="right-header">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img
                        src="../assets/avatar.png"
                        alt=""
                        class="img-user"
                    >
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="toPersonal">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router"
const store = useStore();
const router = useRouter();

const user = store.getters.user;

//个人中心
const toPersonal = () => {
    router.push("/personal")
}

//退出登录
const logout = () => {
    localStorage.removeItem("token");
    store.dispatch("clearCurrent");
    router.push("/login");
}

//侧边栏收缩
const changeCollapse = () => {
    store.commit("setCollapse")
}
</script>

<style lang="scss" scoped>
.header {
    background-color: rgb(44, 60, 79);
    height: 100%;
    display: flex;
    justify-content: space-between;

    .left-header {
        margin-left: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .img-logo {
            width: 50px;
            height: 50px;
            border-radius: 50%;

            &:hover {
                box-shadow: 0 0 5px #dcdcdc;
            }
        }

        .title {
            margin-left: 20px;
            font-size: 25px;
            color: white;
            font-family: "阿里妈妈数黑体 Bold";
            font-weight: 1000;
            src: url("//at.alicdn.com/wf/webfont/aXtffPNJuoQp/LeJL64Xt_0lqhNFlYCi20.woff2") format("woff2"),
        }
    }

    .right-header {
        display: flex;
        margin-right: 10px;
        justify-content: space-between;
        align-items: center;

        .img-user {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
}
</style>