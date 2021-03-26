<!--
 * @Author: maggot-code
 * @Date: 2021-03-09 15:14:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-26 15:48:28
 * @Description: mg-column-default.vue component
-->
<template>
    <p class="mg-column-default" :style="style" v-html="content"></p>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
import { isNil } from "lodash";
export default {
    name: "mg-column-default",
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
            const totalKey = vm.getBaseTotal(row);
            if (!totalKey) {
                const { property } = column;
                const value = isNil(row[property]) ? "" : row[property];
                return vm.outputValue(value, vm.format);
            }

            const baseValue = vm.handleTotalField(vm.scope, totalKey);

            return vm.outputValue(baseValue, vm.format);
        },
        style: (vm) => {
            const { row } = vm.scope;
            const totalKey = vm.getBaseTotal(row);

            return totalKey ? { color: "#F56C6C" } : {};
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
<style lang='scss' scoped>
@import "./mg-column-default.scss";
</style>
