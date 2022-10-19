<template>
    <div class="user">
        <div class="left">
            <div class="avatar"><img
                    src="../../assets/avatar.png"
                    alt=""
                ></div>
        </div>
        <div class="right">
            <div>
                <el-icon>
                    <User />
                </el-icon>
                <span>{{user.name}}</span>
            </div>
            <div>
                <el-icon>
                    <Tools />
                </el-icon>
                <span>{{user.identity}}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const user = store.getters.user;
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    .left {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .right {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        background-color: #dcdcdc;

        div {
            display: flex;
            align-items: center;

            span {
                margin-left: 5px;
            }
        }
    }
}
</style>