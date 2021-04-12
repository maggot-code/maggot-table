<!--
 * @Author: maggot-code
 * @Date: 2021-03-09 15:13:09
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-12 10:58:33
 * @Description: mg-column-handle.vue component
-->
<template>
    <el-button
        class="mg-column-handle"
        v-bind="options"
        :loading="loading"
        :size="size"
        @click="handleRow"
        >{{ options.label }}</el-button
    >
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
export default {
    name: "mg-column-handle",
    mixins: [MgColumnMixins],
    components: {},
    props: {
        handle: {
            type: Object,
            default: () => ({
                mode: "default",
                type: "info",
                icon: "el-icon-s-tools",
                label: "操作",
                attrs: {},
            }),
        },
        rowPower: String,
    },
    data() {
        //这里存放数据
        return {
            size: "mini",
            loading: false,
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mode, type, icon, label } = vm.handle;
            const disabled = vm.handlePower(mode);
            return {
                mode,
                type,
                icon,
                label,
                disabled,
            };
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleRow() {
            const { mode, attrs } = this.handle;
            const { $index, column, row } = this.scope;
            this.$emit("handleRow", {
                index: $index,
                mode,
                attrs,
                column,
                row,
                loadingStatus: (status = false) => {
                    this.loading = status;
                },
            });
        },
        handlePower(mode) {
            const { row } = this.scope;
            if (!row[this.rowPower]) {
                return false;
            }

            const power = row[this.rowPower].split(",");
            return power.indexOf(mode) >= 0 ? true : false;
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
