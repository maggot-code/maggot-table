<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-10 12:28:05
 * @Description: file content
-->
<template>
    <div id="app">
        <div :style="{ height: height }">
            <!-- :spanMethod="spanMethod" -->
            <mg-table
                :loadPage="true"
                ref="mgTable"
                :defaultPageSize="1000"
                :total="4"
                :resizeTable="resizeKey"
                :tableSchema="tableSchema"
                :tableData="tableData"
                :controller="bizRowController"
                @handleRow="handleRow"
                @cellEvent="cellEvent"
                @tableHandle="tableHandle"
                @onChoice="onChoice"
                @tableParams="tableParams"
                @onDrag="onDrag"
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
// import TestTableSchema from "../test/test-choice-schema.json";
// import TestTableData from "../test/test-choice-data.json";
// import TestTableSchema from "../test/test-nest-schema.json";
// import TestTableData from "../test/test-nest-data.json";
// import TestTableSchema from "../test/test-budget-schema-v1.json";
// import TestTableData from "../test/test-budget-schema-data-v1.json";

// import TestTableSchema from "../test/v2.column.json";
// import TestTableSchema from "../test/v3.column.json";
// import TestTableSchema from "../test/v4.column.json";
import TestTableSchema from "../test/v8.column.json";

// import TestTableData from "../test/v2.data.json";
// import TestTableData from "../test/v4.data.json";
// import TestTableData from "../test/v5.data.json";
// import TestTableData from "../test/v6.data.json";
import TestTableData from "../test/v8.data.json";

import { MyList_PC, GetList } from "../api/test.api";
import {cloneDeep,isNil} from "lodash";
export default {
    name: "App",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            height: "100%",
            resizeKey: new Date().getTime(),
            bizRowController: {
                edit: {
                    mode: "add",
                    label: "增加",
                    loading: false,
                },
            },
            tableSchema: {
                uiSchema: {
                    isDrag:false,
                    isChoice: false,
                    isIndex:false,
                    isPage: false,
                    sortProp: "id",
                    sortOrder: "ascending",
                    handleFixed:"right"
                },
                mergeSchema: {
                    keywords: [
                        "first",
                        "second",
                        "third",
                        "fourth",
                        "fifth"
                    ]
                },
                columnSchema: TestTableSchema,
            },
            tableData: [],
            tableInit: {},
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        spanMethod({ row, column, rowIndex, columnIndex,spanPond,keywords }) {
            for (let i = 0; i < keywords.length; i++) {
                if (column.property === keywords[i]) {
                    const _row = spanPond[keywords[i]][rowIndex]
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            }
        },
        onDrag(target, replace) {
            const {currentIndex, transIndex } = target;
            const transData = cloneDeep(this.tableData);
            // 判断上移还是下移
            const toIndex = transIndex > currentIndex ? transIndex + 1 : transIndex;
            const delIndex = transIndex > currentIndex ? currentIndex : currentIndex + 1;
            
            transData.splice(toIndex, 0, transData[currentIndex]);
            transData.splice(delIndex, 1);
            this.$set(this, "tableData", transData);
        },
        handleRow(handle) {
            console.log(handle);
            // const transData = cloneDeep(this.tableData);
            // transData.push({
            //     remarks: "",
            //     id: transData.length + 1001,
            // });
            // this.$set(this, "tableData", transData);
        },
        tableHandle(handle) {
            console.log(handle);
        },
        cellEvent(event) {
            const { index, row } = event;
            console.log(row);
        },
        expandChange(expand) {
            console.log(expand);
            const { row } = expand;
            row.isopen = true;
        },
        getData() {
            // this.height = this.height === "90%" ? "50%" : "90%";
            // this.resizeKey = new Date().getTime();
            const { getTableData } = this.$refs.mgTable;
            const a = getTableData();
            console.log(a);
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
        onChoice(data) {
            console.log(data);
        },
        tableParams(params) {
            console.log(params);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$set(this, "tableData", TestTableData);
    },
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
