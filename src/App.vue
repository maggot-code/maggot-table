<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 13:39:34
 * @Description: file content
-->
<template>
    <div id="app">
        <mg-table :remote="remote" :total="total" :tableData="tableData" :tableSchema="{ uiSchema ,mergeSchema,columnSchema}" :controller="controller" @handleRow="handleRow" @cellEvent="cellEvent"></mg-table>
    </div>
</template>

<script>
import TestTableSchema from "../test/v9.column.json";
import TestTableData from "../test/v9.data.json";
import MockData from "../test/v9.select-data.json";

async function toEnums(config) {
    console.log(config);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MockData);
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
        const { controller, uiSchema,mergeSchema,columnSchema} = TestTableSchema;
        return {
            controller,
            uiSchema, mergeSchema, columnSchema,
            tableData: TestTableData,
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
        },
        cellEvent(event) {
            console.log(event);
        }
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
    height: 100%;
    padding: 0 20px;
    margin-top: 10px;
    box-sizing: border-box;
    overflow: hidden;
}
</style>
