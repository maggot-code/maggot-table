<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-26 13:12:12
 * @Description: file content
-->
<template>
    <div id="app">
        <div :style="{ height: height }">
            <mg-table
                ref="mgTable"
                :resizeTable="resizeKey"
                :tableSchema="tableSchema"
                :tableData="tableData"
                @cellEvent="cellEvent"
            ></mg-table>
        </div>
        <el-button @click="getData">获取数据</el-button>
    </div>
</template>

<script>
// import TestTableSchema from "../test/test1-table-schema.json";
// import TestTableData from "../test/test-table-data.json";
import TestTableSchema from "../test/test-table-input.json";
import TestTableData from "../test/test-table-input-data.json";

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
            tableSchema: {
                uiSchema: {
                    isPage: true,
                    stripe: true,
                },
                columnSchema: TestTableSchema,
            },
            tableData: TestTableData,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        cellEvent(event) {
            const { index, row } = event;
            const value = row.shangjibokuan + row.danwiezichou;
            this.tableData[index].yusuan = value;
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