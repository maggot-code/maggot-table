<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-12 13:39:22
 * @Description: file content
-->
<template>
    <div id="app">
        <mg-table
            :tableSchema="tableSchema"
            :tableData="tableData"
            :total="total"
            :controller="tableController"
            @pageChange="handlePageChange"
            @handleRow="handleRow"
            @cellEvent="cellEvent"
        ></mg-table>
    </div>
</template>

<script>
import TestTableSchema from "../test/test1-table-schema.json";
import TestTableData from "../test/test-table-data.json";
const setTestData = (num) => {
    const data = [];
    for (let index = 0; index < num; index++) {
        const address = `上海市普陀区金沙江路 ${index + 1} 弄`;
        const name = `张阳 - ${index + 1}`;
        data.push({
            date: `2021-03-${index + 1}`,
            address: address,
            name: name,
        });
    }
    return data;
};
const TestData = setTestData(200);

export default {
    name: "App",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            tableSchema: {
                uiSchema: {
                    stripe: true,
                },
                columnSchema: TestTableSchema.columnSchema,
            },
            tableData: [],
            total: 111,
            tableLoading: false,
            tableController: {
                view: {
                    mode: "view",
                    type: "primary",
                    icon: "el-icon-view",
                    label: "查看",
                },
                edit: {
                    mode: "edit",
                    type: "warning",
                    icon: "el-icon-edit",
                    label: "修改",
                },
                delete: {
                    mode: "delete",
                    type: "danger",
                    icon: "el-icon-delete-solid",
                    label: "删除",
                },
            },
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        cellEvent(cellEvent) {
            console.log(cellEvent);
        },
        handleRow(handle) {
            console.log(handle);
        },
        handlePageChange(page) {
            const { func, current, size } = page;
            const data = this.testSplit(TestTableData.rows, current, size);
            this.$set(this, "tableData", data);
        },
        testSplit(data, current, size) {
            const list = data.slice(size * current - size, size * current);

            return list;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss'>
* {
    margin: 0;
    padding: 0;
}
html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
ul,
ol,
li {
    list-style: none;
}
#app {
    width: 80%;
    height: 80%;
    margin: 100px auto;
    overflow: hidden;
}
</style>