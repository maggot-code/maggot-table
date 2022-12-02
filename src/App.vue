<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-02 02:31:29
 * @Description: file content
-->
<template>
    <div id="app">
        <mg-table
            :remote="remote"
            :total="total"
            :tableData="tableData"
            :tableSchema="{ uiSchema ,mergeSchema,columnSchema}"
            :controller="controller"
            :refresh="refresh"
            @handleRow="handleRow"
            @cellEvent="cellEvent"
            @tableHandle="tableHandle">
        </mg-table>
    </div>
</template>

<script>
import TestTableSchema from "../test/v9.column.json";
import TestTableData from "../test/v9.data.json";
import MockData from "../test/v9.select-data.json";
import MockCascaderData from "../test/v9.cascader.data.json";

async function toEnums(config) {
    console.log(config);
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = config.field=== "sex" ? MockData : MockCascaderData;
            resolve(data);
        }, 3000);
    });
}

export default {
    name: "App",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            refresh:Date.now(),
            controller:{},
            uiSchema:{},
            mergeSchema:{},
            columnSchema:[],
            tableData: [],
            remote: {
                enums: toEnums
            }
        };
    },
    //监听属性 类似于data概念
    computed: {
        total() {
            return this.tableData.length;
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleRow(handle) {
            console.log(handle);
            this.tableData.push({
                id:1011
            });
        },
        cellEvent(event) {
            console.log(event);
        },
        tableHandle(props) {
            const {columnSchema } = TestTableSchema;
            const data = TestTableData.map((item) => {
                const keys = Object.keys(item);
                columnSchema.forEach((cell) => {
                    if (!keys.includes(cell.prop)) item[cell.prop] = "";
                });
                return item;
            });
            setTimeout(() => {
                console.log(props);
                this.tableData = data;
            }, 1200);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        setTimeout(() => {
            const { controller, uiSchema, mergeSchema, columnSchema } = TestTableSchema;
            this.controller = controller;
            this.uiSchema = uiSchema;
            this.mergeSchema = mergeSchema;
            this.columnSchema = columnSchema;
            this.refresh = Date.now();
        }, 3000);
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
    height: 100%;
    padding: 0 20px;
    margin-top: 10px;
    box-sizing: border-box;
    overflow: hidden;
}
</style>
