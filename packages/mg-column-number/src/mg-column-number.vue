<!--
 * @Author: maggot-code
 * @Date: 2021-03-21 18:01:58
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-21 23:48:17
 * @Description: mg-column-number.vue component
-->
<template>
    <el-input-number
        class="mg-column-number"
        v-model="numberValue"
        size="mini"
        :precision="2"
        :step="1"
        :min="0"
        :max="Infinity"
        :disabled="disabled"
        @change="onChange"
    ></el-input-number>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
import { isNil, isBoolean } from "lodash";
export default {
    name: "mg-column-number",
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            numberValue: 0,
        };
    },
    //监听属性 类似于data概念
    computed: {
        content: (vm) => {
            const { $index, column, row } = vm.scope;
            const totalKey = vm.getBaseTotal(row);
            if (!totalKey) {
                const { property } = column;
                const value = isNil(row[property]) ? "" : row[property];

                return value;
            }

            return vm.handleTotalField(vm.scope, totalKey);
        },
        disabled: (vm) => {
            const { $index, column, row } = vm.scope;
            const { cellInfo } = row;
            if (isNil(cellInfo)) {
                return false;
            }

            const { disabled } = cellInfo;
            return !isNil(disabled) && isBoolean(disabled) ? disabled : false;
        },
    },
    //监控data中的数据变化
    watch: {
        content(newVal) {
            this.numberValue = newVal;
        },
    },
    //方法集合
    methods: {
        onChange(value) {
            this.cellChange("number", value);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.numberValue = this.content;
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
<style lang='scss' scoped>
@import "./mg-column-number.scss";
</style>
