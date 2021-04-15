<!--
 * @Author: maggot-code
 * @Date: 2021-03-12 13:27:13
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-15 11:01:23
 * @Description: mg-column-link.vue component
-->
<template>
    <el-link class="mg-column-link" type="primary" @click="cellClick('link')">{{
        content
    }}</el-link>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
import { isNil } from "lodash";
export default {
    name: "mg-column-link",
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        content: (vm) => {
            const { $index, column, row } = vm.scope;
            const { rule, handle } = vm.format[0];
            const { property } = column;
            const value = isNil(row[property]) ? "" : row[property];
            const formatHnadleFunc = handle(rule);
            row[`${property}_link`] = formatHnadleFunc(value, row);

            return value;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
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
<style lang='scss' scoped></style>
