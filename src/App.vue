<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-09 16:41:32
 * @Description: file content
-->
<template>
    <div id="app">
        <mg-table
            :tableSchema="tableSchema"
            :tableData="tableData"
            :total="total"
            @pageChange="handlePageChange"
            @handleRow="handleRow"
        ></mg-table>
    </div>
</template>

<script>
import TestTableSchema from "../test/test-table-schema.json";
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
            tableSchema: TestTableSchema,
            tableData: [],
            total: TestData.length,
            tableLoading: false,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleRow(handle) {
            console.log(handle);
        },
        handlePageChange(page) {
            const { func, current, size } = page;
            const data = this.testSplit(TestData, current, size);
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