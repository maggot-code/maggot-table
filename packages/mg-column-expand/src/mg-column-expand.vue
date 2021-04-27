<!--
 * @Author: maggot-code
 * @Date: 2021-04-27 16:48:57
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-27 17:21:23
 * @Description: file content
-->
<template>
    <el-button
        class="mg-column-expand"
        type="text"
        :loading="loading"
        :size="size"
        :disabled="!!disable"
        v-html="content"
        @click="cellClick('expand')"
    ></el-button>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
import { isNil } from "lodash";
export default {
    name: "mg-column-expand",
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            size: "mini",
            loading: false,
        };
    },
    //监听属性 类似于data概念
    computed: {
        content: (vm) => {
            const { $index, column, row } = vm.scope;
            const totalKey = vm.disable;
            if (!totalKey) {
                const { property } = column;
                const value = isNil(row[property]) ? "" : row[property];
                return vm.renderHtml(vm.outputValue(value, vm.format));
            }

            const baseValue = vm.handleTotalField(vm.scope, totalKey);

            return vm.renderHtml(vm.outputValue(baseValue, vm.format));
        },
        disable: (vm) => {
            const { row } = vm.scope;
            return vm.getBaseTotal(row);
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        renderHtml(text) {
            const color = this.disable ? "red" : "";
            return `<p style="color:${color}">${text}</p>`;
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
<style lang='scss' scoped></style>