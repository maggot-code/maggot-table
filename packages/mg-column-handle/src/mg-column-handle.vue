<!--
 * @Author: maggot-code
 * @Date: 2021-03-09 15:13:09
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 17:59:48
 * @Description: mg-column-handle.vue component
-->
<template>
    <el-button
        v-if="useLabel"
        class="mg-column-handle"
        v-bind="options"
        :type="type"
        :icon="icon"
        :loading="loading"
        :size="size"
        @click="handleRow"
        >{{ label }}</el-button
    >
    <el-tooltip v-else effect="dark" :content="label" placement="top">
        <el-button
            class="mg-column-handle"
            v-bind="options"
            :type="type"
            :icon="icon"
            :loading="loading"
            :size="size"
            @click="handleRow"
        ></el-button>
    </el-tooltip>
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
        useLabel: Boolean,
    },
    data() {
        //这里存放数据
        return {
            size: "mini",
            loading: false,

            type: this.handle.type,
            icon: this.handle.icon,
            label: this.handle.label,
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mode, type, icon, label } = vm.handle;
            const disabled = vm.handlePower(mode);
            return {
                mode,
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
                lib: this.lib,
                params: this.params,
                update: this.setPropValue,
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
        setPropValue(field, value) {
            this[field] = value || this.handle[field];

            return { field, value };
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
