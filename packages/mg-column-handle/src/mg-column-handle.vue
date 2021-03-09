<!--
 * @Author: maggot-code
 * @Date: 2021-03-09 15:13:09
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-09 16:40:20
 * @Description: mg-column-handle.vue component
-->
<template>
    <el-button
        class="mg-column-handle"
        v-bind="options"
        :size="size"
        @click="handleRow"
        >{{ options.label }}</el-button
    >
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
import HandleConfig from "../config";
export default {
    name: "mg-column-handle",
    mixins: [MgColumnMixins],
    components: {},
    props: {
        handle: {
            type: String,
            default: () => "",
        },
    },
    data() {
        //这里存放数据
        return {
            size: "small",
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const defaultHandle = HandleConfig.default;
            const handle = HandleConfig[vm.handle];

            return { ...(handle || defaultHandle) };
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleRow() {
            const { $index, column, row } = this.scope;

            this.$emit("handleRow", {
                handle: this.handle,
                index: $index,
                column: column,
                row: row,
            });
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
<style lang='scss' scoped>
@import "./mg-column-handle";
</style>
