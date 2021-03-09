<!--
 * @Author: maggot-code
 * @Date: 2021-03-09 09:36:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-09 16:40:59
 * @Description: mg-table.vue component
-->
<template>
    <div class="mg-table" :style="`height:${height}px;`">
        <el-table
            style="width: 100%"
            v-bind="options"
            :height="tableHeight"
            :max-height="tableHeight"
            :data="tableData"
        >
            <mg-table-column
                v-for="cell in column"
                :key="cell.prop"
                v-bind="cell"
            ></mg-table-column>

            <el-table-column
                v-if="isController"
                label="操作"
                align="center"
                fixed="right"
            >
                <template slot-scope="scope">
                    <el-button-group>
                        <mg-column-handle
                            v-for="(cell, index) in handlePower"
                            :key="index"
                            :scope="scope"
                            :handle="cell"
                            @handleRow="handleRow"
                        ></mg-column-handle>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            background
            :pager-count="5"
            :total="total"
            :layout="layout"
            :page-sizes="pageSizes"
            :disabled="pageDisabled"
            :page-size.sync="pageSize"
            :current-page.sync="currentPage"
        >
        </el-pagination>
    </div>
</template>

<script>
import MgTableColumn from "../../mg-table-column";
import MgColumnHandle from "../../mg-column-handle";
import { setAttrBoolean } from "../utils";
import { isNil, isArray } from "lodash";
export default {
    name: "mg-table",
    mixins: [],
    components: { MgTableColumn, MgColumnHandle },
    props: {
        tableRef: {
            type: [String, Number],
            default: () => new Date().getTime(),
        },
        tableSchema: {
            type: Object,
            required: true,
        },
        tableData: {
            type: Array,
            default: () => [],
        },
        total: {
            type: [String, Number],
            default: () => 0,
        },
    },
    data() {
        //这里存放数据
        return {
            height: 0,
            tableHeight: 0,
            currentPage: 1,
            pageSize: 10,
            pageLock: true,
            pageSizes: [10, 20, 30, 40, 50, 100],
            pageLayout: ["total", "sizes", "prev", "pager", "next", "jumper"],
        };
    },
    //监听属性 类似于data概念
    computed: {
        isController: (vm) => {
            const { controller } = vm.tableSchema;
            return (
                !isNil(controller) &&
                isArray(controller) &&
                controller.length > 0
            );
        },
        handlePower: (vm) => {
            const { controller } = vm.tableSchema;
            return controller;
        },
        column: (vm) => {
            const { columnSchema } = vm.tableSchema;
            return columnSchema;
        },
        options: (vm) => {
            const { uiSchema } = vm.tableSchema;
            const vbind = {
                size: "medium",
                fit: vm.setFit(uiSchema),
                border: vm.setBorder(uiSchema),
                stripe: vm.setStripe(uiSchema),
                "empty-text": vm.setEmptyText(uiSchema),
                "show-header": vm.setShowHeader(uiSchema),
                "highlight-current-row": vm.setHighlight(uiSchema),
            };

            return vbind;
        },
        layout: (vm) => {
            return vm.pageLayout.join(",");
        },
        pageDisabled: (vm) => {
            return vm.total <= 0;
        },
    },
    //监控data中的数据变化
    watch: {
        pageSize(newVal) {
            this.pageLock = false;
            this.$set(this, "currentPage", 1);

            this.pageChange({
                func: "handlerSize",
                current: this.currentPage,
                size: newVal,
            });

            setTimeout(() => {
                this.pageLock = true;
            }, 0);
        },
        currentPage(newVal) {
            if (this.pageLock) {
                this.pageChange({
                    func: "handlerCurrent",
                    current: newVal,
                    size: this.pageSize,
                });
            }
        },
    },
    //方法集合
    methods: {
        handleRow(handleObject) {
            this.$emit("handleRow", handleObject);
        },
        pageChange(handle) {
            this.$emit("pageChange", { ...handle });
        },
        /**
         * @description: 设置是否显示边框
         * @param {Object} attr
         * @return {Boolean} 默认为false
         */
        setBorder(attr) {
            const { border } = attr;

            return setAttrBoolean(border);
        },
        /**
         * @description: 设置空数据提示文字
         * @param {Object} attr
         * @return {String} 空数据显示文字
         */
        setEmptyText(attr) {
            const { emptyText } = attr;
            return emptyText || "暂无数据";
        },
        /**
         * @description: 设置列宽是否自动撑开
         * @param {Object} attr
         * @return {Boolean} 默认为true
         */
        setFit(attr) {
            const { fit } = attr;

            return setAttrBoolean(fit, true);
        },
        /**
         * @description: 设置当前行是否高亮
         * @param {Object} attr
         * @return {Boolean} 默认为true
         */
        setHighlight(attr) {
            const { highlight } = attr;

            return setAttrBoolean(highlight, true);
        },
        /**
         * @description: 设置显示表头
         * @param {Object} attr
         * @return {Boolean} 默认为true
         */
        setShowHeader(attr) {
            const { showHeader } = attr;

            return setAttrBoolean(showHeader, true);
        },
        /**
         * @description: 设置斑马纹
         * @param {Object} attr
         * @return {Boolean} 默认为false
         */
        setStripe(attr) {
            const { stripe } = attr;

            return setAttrBoolean(stripe);
        },
        /**
         * @description: 设置table高度
         * @param {Number} height 父级高度
         * @return {Number} 高度减掉分页器
         */
        setHeight(height) {
            return height - 60;
        },
        /**
         * @description: 上抛表格组件的 refs
         */
        throwRefs() {
            this.$emit("getRefs", this.tableRef);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.pageChange({
            func: "handlerSize",
            current: this.currentPage,
            size: this.pageSize,
        });
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$nextTick(() => {
            const height = this.$parent.$el.clientHeight;
            this.height = height;
            this.tableHeight = this.setHeight(height);
        });
    },
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
@import "./mg-table.scss";
</style>
