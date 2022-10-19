<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside :width="store.state.isCollapse ? '200px' : '64px'">
                    <Side></Side>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Side from "../components/Side.vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<style lang="scss">
.common-layout {
    height: 100%;
    flex-wrap: nowrap;

    .el-header {
        padding: 0;
    }

    .el-container {
        height: 100%;
        overflow: hidden;

        .el-main {
            padding: 0;
            height: 100%;

            &::-webkit-scrollbar {
                width: 0;
            }
        }
    }
}
</style>