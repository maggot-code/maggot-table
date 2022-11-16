<!--
 * @Author: maggot-code
 * @Date: 2021-03-09 09:48:13
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 17:14:38
 * @Description: mg-table-column.vue component
-->
<template>
    <!-- <mg-column-group  v-if="hasGroup" :groups="groups"></mg-column-group> -->
    <!-- <el-table-column v-else class="mg-table-column" v-bind="options"></el-table-column> -->

    <el-table-column class="mg-table-column" v-bind="options">
        <template v-if="hasGroup" v-for="(cell) in groups">
            <mg-table-column :key="cell.prop" v-bind="cell" @cellEvent="eventToosUp">
            </mg-table-column>
        </template>
        
        <template slot-scope="scope">
            <component
                :is="componentName"
                :scope="scope"
                :lib="lib"
                :format="formatFunc"
                @cell-cick="eventToosUp"
                @cell-dblclick="eventToosUp"
                @cell-change="eventToosUp"
            >
            </component>
        </template>
    </el-table-column>
</template>

<script>
import { TableColumnComponents } from "../install";
import { setAttrBoolean } from "../../mg-table/utils";
import { isNil } from "lodash";
import formatMuster from "../format";

export default {
    name: "mg-table-column",
    mixins: [],
    components: { ...TableColumnComponents},
    props: {
        lib: {
            type: Object,
            default: () => ({})
        },
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        hasGroup: (vm) => {
            const { mold, group } = vm.$attrs;
            return mold === "group" && Array.isArray(group) && group.length > 0;
        },
        groups: (vm) => {
            const { group } = vm.$attrs;
            return vm.hasGroup ? group : [];
        },
        componentName: (vm) => {
            const { mold } = vm.$attrs;
            const basename = mold || "default";
            const isBeing = Object.keys(TableColumnComponents).filter(
                (componentName) => {
                    const nameList = componentName.split("-");
                    const name = nameList[nameList.length - 1];
                    return basename === name;
                }
            );

            return isBeing.length <= 0
                ? "mg-column-default"
                : `mg-column-${basename}`;
        },
        options: (vm) => {
            const { prop } = vm.$attrs;
            const { width, minWidth } = vm.setWidth(vm.$attrs);
            const fixed = vm.setFixed(vm.$attrs);

            const vbind = {
                prop,
                resizable: false,
                "min-width": minWidth,
                label: vm.setLabel(vm.$attrs),
                align: vm.setAlign(vm.$attrs),
                sortable: vm.setSort(vm.$attrs),
                "header-align": vm.setHeaderAlign(vm.$attrs),
                "show-overflow-tooltip": vm.setOverflowTips(vm.$attrs),
            };

            if (width === 0 || width) {
                vbind.width = width;
            }

            if (fixed) {
                vbind.fixed = fixed;
            }

            return vbind;
        },
        formatFunc: (vm) => {
            const funcList = [];
            const formatHandler = formatMuster();

            for (const field in vm.$attrs) {
                formatHandler[field] &&
                    funcList.push({
                        rule: vm.$attrs[field],
                        handle: formatHandler[field],
                    });
            }

            return funcList.length <= 0 ? [{
                rule: false,
                handle: (text) => text,
            }] : funcList;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        eventToosUp(event) {
            this.$emit("cellEvent", event);
        },
        setSort(attr) {
            const { isSort } = attr;
            const baseSort = setAttrBoolean(isSort);

            return baseSort ? "custom" : false;
        },
        /**
         * @description: 设置列宽
         * @param {Object} attr
         * @return {Object} width,minWidth
         */
        setWidth(attr) {
            const { width, minWidth } = attr;
            const hasmw = isNil(minWidth);
            const hasw = isNil(width);
            const options = {
                width: false,
                minWidth: 64,
            };

            // 如果存在最小宽，不存在宽度，设置最小宽
            if (!hasmw && hasw) {
                options.minWidth = minWidth;
                return options;
            }

            // 如果存在宽度，不存在最小宽，设置宽度和最小宽为宽度
            if (!hasw && hasmw) {
                options.width = width;
                options.minWidth = width;
                return options;
            }

            // 如果都存在，则都设置
            if (!hasmw && !hasw) {
                options.width = width;
                options.minWidth = minWidth;
                return options;
            }

            // 返回默认设置
            return options;
        },
        /**
         * @description: 设置固定列
         * @param {Object} attr
         * @return {String | Boolean} 存在则返回，不存在返回false
         */
        setFixed(attr) {
            const { fixed } = attr;
            const options = ["left", "right"];

            return options.indexOf(fixed) >= 0 ? fixed : false;
        },
        /**
         * @description: 设置标题
         * @param {Object} attr
         * @return {String} 默认返回“标签”
         */
        setLabel(attr) {
            const { label } = attr;
            return label || "标签";
        },
        /**
         * @description: 设置超出列表是否需要tips提示
         * @param {Object} attr
         * @return {Boolean} 是否需要提示
         */
        setOverflowTips(attr) {
            const { isTips } = attr;

            return setAttrBoolean(isTips);
        },
        /**
         * @description: 设置列对齐方式
         * @param {Object} attr
         * @return {String} 对齐方式
         */
        setAlign(attr) {
            const { align } = attr;
            return this.isAlign(align);
        },
        /**
         * @description: 设置表头对齐方式
         * @param {Object} attr
         * @return {String} 对齐方式
         */
        setHeaderAlign(attr) {
            const { headerAlign } = attr;
            return this.isAlign(headerAlign, "center");
        },
        /**
         * @description: 判断对齐方式是否可用
         * @param {String} align 写入对齐方式
         * @param {String} def 默认对齐方式
         * @return {String} 对齐方式
         */
        isAlign(align, def = "left") {
            if (isNil(align)) {
                return def;
            }

            const options = ["left", "right", "center"];
            return options.indexOf(align) >= 0 ? align : def;
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
@import "./mg-table-column.scss";
</style>
