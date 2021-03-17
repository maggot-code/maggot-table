<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-17 23:07:15
 * @Description: file content
-->
<template>
    <div id="app">
        <mg-table
            v-if="tableKey"
            :tableSchema="tableSchema"
            :tableData="tableData"
            :total="total"
            :controller="tableController"
            @pageChange="handlePageChange"
            @handleRow="handleRow"
            @cellEvent="cellEvent"
            @onChoice="onChoice"
        ></mg-table>
    </div>
</template>

<script>
import TestTableSchema from "../test/test1-table-schema.json";
import TestTableData from "../test/test-table-data.json";

import { MyList_PC, GetList } from "../api/test.api";
export default {
    name: "App",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            tableKey: false,
            tableSchema: {
                uiSchema: {
                    isChoice: true,
                    stripe: true,
                },
                columnSchema: [],
            },
            tableData: [],
            total: 9,
            tableController: {
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
            tableAllHandle: {
                add: {
                    mode: "add",
                    type: "success",
                    icon: "",
                    label: "新增",
                },
                import: {
                    mode: "import",
                    type: "primary",
                    icon: "",
                    label: "导入",
                },
                delete: {
                    mode: "delete",
                    type: "danger",
                    icon: "el-icon-delete-solid",
                    label: "批量删除",
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
        onChoice(choice) {
            console.log(choice);
        },
        cellEvent(cellEvent) {
            console.log(cellEvent);
            const { mode, row } = cellEvent;
            if (mode === "link") {
                console.log(row.routerLink);
            }
        },
        handleRow(handle) {
            console.log(handle);
        },
        handlePageChange(page) {
            const { func, current, size } = page;
        },
        testSplit(data, current, size) {
            const list = data.slice(size * current - size, size * current);

            return list;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.tableKey = true;
        // MyList_PC().then((res) => {
        //     const { data } = res.data;
        //     const { columnSchema, powerall } = data;
        //     this.tableSchema.columnSchema = columnSchema;
        //     console.log(powerall);
        //     GetList().then((res) => {
        //         const { data } = res.data;
        //         this.total = data.total;
        //         this.tableData = data.data;
        //         this.tableKey = true;
        //     });
        // });
    },
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
    width: 100%;
    height: 90%;
    padding: 0 20px;
    margin-top: 10px;
    box-sizing: border-box;
    overflow: hidden;
}
</style>