<!--
 * @Author: maggot-code
 * @Date: 2021-03-09 09:36:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-17 23:08:27
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
            @selection-change="handleSelectionChange"
        >
            <el-table-column
                v-if="useChoice"
                type="selection"
                align="center"
                width="40"
                min-width="40"
            >
            </el-table-column>

            <el-table-column
                v-if="useIndex"
                type="index"
                width="60"
                fixed="left"
                :index="indexMethod"
            >
            </el-table-column>

            <mg-table-column
                v-for="cell in column"
                :key="cell.prop"
                v-bind="cell"
                @cellEvent="tableCellEvent"
            ></mg-table-column>

            <el-table-column
                v-if="useHandle"
                label="操作"
                align="center"
                fixed="left"
                :width="handleWidth"
                :min-width="handleWidth"
            >
                <template slot-scope="scope">
                    <el-button-group>
                        <mg-column-handle
                            v-for="(cell, key) in controller"
                            :key="key"
                            :scope="scope"
                            :handle="cell"
                            :rowPower="rowPower"
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
import { isNil, isBoolean } from "lodash";
export default {
    name: "mg-table",
    mixins: [],
    components: { MgTableColumn, MgColumnHandle },
    props: {
        tableSchema: {
            type: Object,
            required: true,
        },
        tableData: {
            type: Array,
            default: () => [],
        },
        controller: {
            type: Object,
            default: () => ({}),
        },
        rowPower: {
            type: String,
            default: () => "rowpower",
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
            multipleSelection: [],
        };
    },
    //监听属性 类似于data概念
    computed: {
        controllerLen: (vm) => Object.keys(vm.controller).length,
        handleWidth: (vm) => {
            let btnStrLen = 0;

            for (const key in vm.controller) {
                const { label } = vm.controller[key];
                btnStrLen += label.length;
            }

            const fontWidth = vm.controllerLen * 18 + btnStrLen * 12;
            const width = vm.controllerLen * 42 + fontWidth;
            const offset = 12 / vm.controllerLen;

            return width + offset;
        },
        column: (vm) => {
            const { columnSchema } = vm.tableSchema;
            return columnSchema;
        },
        options: (vm) => {
            const { uiSchema } = vm.tableSchema;
            const schema = isNil(uiSchema) ? {} : uiSchema;
            const vbind = {
                size: "medium",
                fit: vm.setFit(schema),
                border: vm.setBorder(schema),
                stripe: vm.setStripe(schema),
                "empty-text": vm.setEmptyText(schema),
                "show-header": vm.setShowHeader(schema),
                "highlight-current-row": vm.setHighlight(schema),
            };

            return vbind;
        },
        useChoice: (vm) => {
            const { uiSchema } = vm.tableSchema;
            const schema = isNil(uiSchema) ? {} : uiSchema;
            const { isChoice } = schema;

            return !isNil(isChoice) &&
                isBoolean(isChoice) &&
                vm.tableData.length > 0
                ? isChoice
                : false;
        },
        useIndex: (vm) => vm.tableData.length > 0,
        useHandle: (vm) => vm.controllerLen > 0 && vm.tableData.length > 0,
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
        multipleSelection(newVal) {
            this.$emit("onChoice", newVal);
        },
    },
    //方法集合
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        tableCellEvent(event) {
            this.$emit("cellEvent", event);
        },
        indexMethod(index) {
            return index + 1 + (this.currentPage - 1) * this.pageSize;
        },
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

            return setAttrBoolean(border, true);
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
            const height = this.$el.parentNode.clientHeight;
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
<style lang='scss'>
.mg-table {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: auto;
    overflow: hidden;
    & /deep/ .el-pagination {
        align-self: center;
    }
}
</style>
