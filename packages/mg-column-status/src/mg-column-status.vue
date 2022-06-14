<!--
 * @Author: maggot-code
 * @Date: 2021-04-14 10:35:11
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-06-14 15:56:51
 * @Description: file content
-->
<template>
    <el-tooltip class="mg-column-status" :content="content" placement="left">
        <el-switch v-model="switchValue" active-color="#13ce66" inactive-color="#ff4949" :active-value="activeValue"
            :inactive-value="inactiveValue" @change="handleChange">
        </el-switch>
    </el-tooltip>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
import { isNil } from "lodash";
export default {
    name: "mg-column-status",
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            switchValue: "",
        };
    },
    //监听属性 类似于data概念
    computed: {
        hasTips: (vm) => {
            const { column } = vm.scope;
            const { tips } = column;
            return !isNil(tips)&&tips.length>1;
        },
        activeValue: (vm) => {
            const { column } = vm.scope;
            const { tips } = column;
            return vm.hasTips ? tips[0].value : "01";
        },
        inactiveValue: (vm) => {
            const { column } = vm.scope;
            const { tips } = column;
            return vm.hasTips ? tips.at(-1).value : "00";
        },
        value: (vm) => {
            const { $index, column, row } = vm.scope;
            const { property } = column;
            const value = isNil(row[property]) ? "00" : row[property];
            return value;
        },
        content: (vm) => {
            const { column} = vm.scope;
            const { tips } = column;
            if (vm.hasTips) return tips[vm.value];
            
            return vm.value === "01" ? "开启" : "关闭";
        },
    },
    //监控data中的数据变化
    watch: {
        value(newVal) {
            this.switchValue = newVal;
        },
    },
    //方法集合
    methods: {
        handleChange(status) {
            this.cellChange("status", status);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.switchValue = this.value;
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
<style lang='scss' scoped></style>
