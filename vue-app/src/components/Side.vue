<template>
    <el-row class="tac">
        <el-col>
            <el-menu
                class="el-menu-vertical-demo"
                background-color="rgb(44, 60, 79)"
                text-color="#fff"
                active-text-color="#ffd04b"
                :collapse="!store.state.isCollapse"
                :collapse-transition="false"
                router
            >
                <el-menu-item index="/main">
                    <el-icon>
                        <Menu />
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>
                <template v-for="menu in menus">
                    <el-sub-menu
                        v-if="menu.children"
                        :index="menu.path"
                        :key="menu.path"
                    >
                        <template #title>
                            <el-icon>
                                <component :is="menu.icon"></component>
                            </el-icon>
                            <span>{{menu.name}}</span>
                        </template>
                        <el-menu-item
                            v-for="item in menu.children"
                            :index="item.path"
                        >{{item.name}}</el-menu-item>
                    </el-sub-menu>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();

//侧边栏菜单
const menus = [
    {
        name: "资金管理",
        path: "fund",
        icon: "List",
        children: [
            {
                path: "/fundlist",
                name: "资金流水"
            }
        ]
    },
    {
        name: "信息管理",
        path: "info",
        icon: "Avatar",
        children: [
            {
                name: "个人信息",
                path: "/personal"
            }
        ]
    }
]

</script>

<style lang="scss" scoped>
.tac {
    background-color: rgb(44, 60, 79);
    height: 100%;

    .el-menu {
        border-right: none;
    }
}
</style>