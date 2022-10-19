<template>
    <div class="container">
        <!-- 添加 -->
        <div>
            <el-form
                :inline="true"
                ref="add_data"
            >
                <el-form-item class="btn-add">
                    <el-button
                        type="primary"
                        size="small"
                        @click="handleAdd()"
                        v-if="user.identity == 'admin'"
                    >添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 展示数据 -->
        <div height="100%">
            <el-scrollbar>
                <el-table
                    v-if="tableData.length > 0"
                    :data="tableData"
                    style="width: 100%"
                    :default-sort="{ prop: 'date', order: 'descending' }"
                    border
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        width="60"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="创建时间"
                        width="250"
                        align="center"
                        sortable
                    >
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                                <el-icon>
                                    <timer />
                                </el-icon>
                                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="收支类型"
                        width="100"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="describe"
                        label="收支描述"
                        width="150"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="income"
                        label="收入"
                        width="100"
                        align="center"
                    >
                        <template #default="scope">
                            <div style="display: flex; align-items: center;justify-content: center">
                                <span style="color:#00d053">+ {{ scope.row.income }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="expend"
                        label="支出"
                        width="100"
                        align="center"
                    >
                        <template #default="scope">
                            <div style="display: flex; align-items: center;justify-content: center">
                                <span style="color: #f56767;">- {{ scope.row.expend }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="cash"
                        label="现金"
                        width="100"
                        align="center"
                    >
                        <template #default="scope">
                            <div style="display: flex; align-items: center;justify-content: center">
                                <span style="color: #4db3ff;">{{ scope.row.income-scope.row.expend}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注"
                        width="150"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        v-if="user.identity == 'admin'"
                    >
                        <template #default="scope">
                            <el-button
                                size="small"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button>
                            <el-popconfirm
                                title="确认删除吗?"
                                cancel-button-type="primary"
                                confirm-button-type="danger"
                                @confirm="handleDelete(scope.$index, scope.row)"
                            >
                                <template #reference>
                                    <el-button
                                        size="small"
                                        type="danger"
                                    >删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>
        </div>
        <!-- 分页 -->
        <el-row>
            <el-col :span="24">
                <div class="pagination">
                    <el-pagination
                        v-model:currentPage="paginations.page_index"
                        v-model:page-size="paginations.page_size"
                        :page-sizes="paginations.page_sizes"
                        :layout="paginations.layout"
                        :total="paginations.total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                    />
                </div>
            </el-col>
        </el-row>
        <!-- 添加数据信息 -->
        <el-dialog
            v-model="dialogVisible"
            :title="dialogTitle ? '添加资金信息':'编辑资金信息'"
            width="40%"
            :model-append-to-body="false"
            :lock-scroll="false"
        >
            <div>
                <el-form
                    :model="profileData"
                    label-width="100px"
                    class="demo-ruleForm"
                    style="margin:10px;width:auto"
                >
                    <el-form-item
                        label="收支类型"
                        prop="type"
                    >
                        <el-select
                            v-model="profileData.type"
                            placeholder="收支类型"
                        >
                            <el-option
                                v-for="(option,index) in form_option"
                                :key="index"
                                :label="option"
                                :value="option"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="收支描述"
                        prop="describe"
                    >
                        <el-input v-model="profileData.describe" />
                    </el-form-item>
                    <el-form-item
                        label="收入"
                        prop="income"
                    >
                        <el-input v-model="profileData.income" />
                    </el-form-item>
                    <el-form-item
                        label="支出"
                        prop="expend"
                    >
                        <el-input v-model="profileData.expend" />
                    </el-form-item>
                    <el-form-item
                        label="备注"
                        prop="remark"
                    >
                        <el-input v-model="profileData.remark" />
                    </el-form-item>
                    <div class="btn-form">
                        <el-button @click="handleCancle">取消</el-button>
                        <el-button
                            type="primary"
                            @click="handleConfirm"
                        >确认</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { Timer } from '@element-plus/icons-vue';
import { getProfile, deleteProfile, addProfile, editProfile } from "../../api/api";
import { onMounted, ref, reactive, computed } from "vue";
import { ElMessageBox } from 'element-plus'
import { useStore } from "vuex";

const store = useStore();
const tableData = ref([]);
const allTableData = ref([]);
const dialogVisible = ref(false);
const profileData = reactive({
    type: "",
    describe: "",
    income: "",
    expend: "",
    remark: "",
    id: ""
})
//根据add/edit执行函数
const dialogTitle = ref(true);
const form_option = ["提现", "提现手续费", "充值", "优惠券", "转账", "充值优惠"]
const paginations = reactive({
    page_index: 1,//当前页面
    total: 0,//当前数据总数
    page_size: 5,//一页显示条数
    page_sizes: [5, 10, 15, 20],//每页显示条数
    layout: "total,sizes, prev, pager, next, jumper"//翻页属性
})
const user = computed(() => {
    return store.getters.user
})

onMounted(() => {
    getProfileMsg();
});

//获取资金信息
const getProfileMsg = async () => {
    let res = await getProfile();
    allTableData.value = res.data;
    //设置分页数据
    setPaginations();
}
//删除信息
const handleDelete = async (index, row) => {
    await deleteProfile(tableData.value[index]._id);
    getProfileMsg();
}
//编辑信息
const handleEdit = async (index, row) => {
    dialogTitle.value = false;
    dialogVisible.value = true;
    profileData.id = row._id;
    profileData.type = row.type;
    profileData.income = row.income;
    profileData.expend = row.expend;
    profileData.describe = row.describe;
    profileData.remark = row.remark;
}
//添加信息
const handleAdd = async () => {
    dialogVisible.value = true;
    dialogTitle.value = true;
}
//取消
const handleCancle = () => {
    dialogVisible.value = false;
    profileData.type = "";
            profileData.income = "";
            profileData.expend = "";
            profileData.describe = "";
            profileData.remark = "";
}
//信息确认
const handleConfirm = () => {
    ElMessageBox.confirm('确认修改信息吗?')
        .then(async () => {
            dialogVisible.value = false;
            dialogTitle.value ? await addProfile(profileData) : await editProfile(profileData);
            getProfileMsg();
            profileData.type = "";
            profileData.income = "";
            profileData.expend = "";
            profileData.describe = "";
            profileData.remark = "";
        })
}
//设置分页
const setPaginations = () => {
    paginations.total = allTableData.value.length;
    paginations.page_index = 1;
    paginations.page_size = 5;
    //设置默认分页数据
    tableData.value = allTableData.value.filter((item, index) => {
        return index < paginations.page_size;
    })
}
//页面数改变
const handleSizeChange = (page_size) => {
    paginations.page_index = 1;
    paginations.page_size = page_size;
    tableData.value = allTableData.value.filter((item, index) => {
        return index < page_size;
    })
}
//当前页面改变
const handleCurrentChange = (page) => {
    //获取当前页
    let index = paginations.page_size * (page - 1);
    //数据总数
    let nums = paginations.page_size * page;
    //rongqi
    let tables = [];
    for (let i = index; i < nums; i++) {
        if (allTableData.value[i]) {
            tables.push(allTableData.value[i])
        }
        tableData.value = tables;
    }
}

</script>

<style lang="scss" scoped>
.container {
    padding: 10px;
    display: flex;
    flex-direction: column;

    .btn-add {
        margin-bottom: 10px;
    }
}

.btn-form {
    margin-left: 180px;
}

.pagination {
    margin-top: 10px;
    float: right;
}
</style>
