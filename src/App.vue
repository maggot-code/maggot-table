<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-14 10:51:44
 * @Description: file content
-->
<template>
    <div id="app">
        <div :style="{ height: height }">
            <mg-table
                ref="mgTable"
                :total="4"
                rowPower="poweredit"
                :resizeTable="resizeKey"
                :tableSchema="tableSchema"
                :tableData="tableData"
                :tableChoice="tableChoice"
                :controller="bizRowController"
                @handleRow="handleRow"
                @cellEvent="cellEvent"
                @tableHandle="tableHandle"
                @onChoice="onChoice"
            ></mg-table>
        </div>
        <el-button @click="getData">获取数据</el-button>
    </div>
</template>

<script>
// import TestTableSchema from "../test/test1-table-schema.json";
// import TestTableData from "../test/test-table-data.json";
// import TestTableSchema from "../test/test-table-input.json";
// import TestTableData from "../test/test-table-input-data.json";
// import TestTableSchema from "../test/test-table-link.json";
// import TestTableData from "../test/test-table-link-data.json";
// import TestTableSchema from "../test/test-sort-schema.json";
// import TestTableData from "../test/test-sort-data.json";
import TestTableSchema from "../test/test-choice-schema.json";
import TestTableData from "../test/test-choice-data.json";

import { MyList_PC, GetList } from "../api/test.api";
export default {
    name: "App",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            height: "90%",
            resizeKey: new Date().getTime(),
            bizRowController: {
                edit: {
                    mode: "edit",
                    type: "warning",
                    icon: "el-icon-edit",
                    label: "修改",
                    loading: false,
                },
            },
            tableSchema: {
                uiSchema: {
                    isChoice: true,
                    isPage: true,
                    stripe: true,
                    sortProp: "aa",
                },
                columnSchema: TestTableSchema,
            },
            tableData: TestTableData,
            tableInit: {},
        };
    },
    //监听属性 类似于data概念
    computed: {
        tableChoice() {
            return this.tableData.filter((item) => item.ischecked === "01");
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleRow(handle) {
            const { update } = handle;
            update("label", "哈哈哈");
        },
        tableHandle(handle) {},
        cellEvent(event) {
            console.log(event);
        },
        getData() {
            this.height = this.height === "90%" ? "50%" : "90%";
            this.resizeKey = new Date().getTime();
            // const { getTableData } = this.$refs.mgTable;
            // const data = getTableData((item) => {
            //     const cell = {};
            //     const { field } = item;
            //     for (const key in item) {
            //         cell[key + field] = item[key];
            //     }
            //     return cell;
            // });

            // console.log(data);
        },
        onChoice(data) {},
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
    width: 100%;
    height: 90%;
    padding: 0 20px;
    margin-top: 10px;
    box-sizing: border-box;
    overflow: hidden;
}
</style>