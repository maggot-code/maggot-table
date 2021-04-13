<!--
 * @Author: maggot-code
 * @Date: 2021-03-09 09:36:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-13 15:57:23
 * @Description: mg-table.vue component
-->
<template>
    <div class="mg-table" :style="`height:${height}px;`">
        <el-table
            style="width: 100%"
            v-bind="options"
            :ref="refKey"
            :data="tableData"
            :height="tableHeight"
            :max-height="tableHeight"
            @sort-change="handleSortChange"
            @selection-change="handleSelectionChange"
        >
            <!-- <template #append></template> -->

            <!-- :selectable="setSelectDisable"  -->
            <el-table-column
                v-if="useChoice"
                type="selection"
                align="center"
                width="40"
                min-width="40"
                :resizable="false"
            >
            </el-table-column>

            <el-table-column
                v-if="useIndex"
                type="index"
                width="60"
                fixed="left"
                :resizable="false"
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
                :resizable="false"
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
            v-if="usePage"
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
import { isNil, isBoolean, isFunction, cloneDeep } from "lodash";
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
        tableChoice: {
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
        loadPage: {
            type: Boolean,
            default: () => false,
        },
        resizeTable: {
            type: [String, Number],
            default: () => new Date().getTime(),
        },
        parentHeight: {
            type: Number,
            default: () => 0,
        },
    },
    data() {
        //这里存放数据
        return {
            refKey: new Date().getTime(),
            height: 0,
            tableHeight: 0,
            currentPage: 1,
            pageSize: 10,
            pageLock: true,
            pageSizes: [10, 20, 30, 40, 50, 100],
            pageLayout: ["total", "sizes", "prev", "pager", "next", "jumper"],
            multipleSelection: [],

            sortProp: "",
            sortOrder: "",
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
        useIndex: (vm) => {
            const { uiSchema } = vm.tableSchema;
            const schema = isNil(uiSchema) ? {} : uiSchema;
            const { isIndex } = schema;

            return !isNil(isIndex) &&
                isBoolean(isIndex) &&
                vm.tableData.length > 0
                ? isIndex
                : false;
        },
        usePage: (vm) => {
            const { uiSchema } = vm.tableSchema;
            const schema = isNil(uiSchema) ? {} : uiSchema;
            const { isPage } = schema;

            return !isNil(isPage) &&
                isBoolean(isPage) &&
                vm.tableData.length > 0
                ? isPage
                : false;
        },
        useHandle: (vm) => vm.controllerLen > 0 && vm.tableData.length > 0,
        layout: (vm) => {
            return vm.pageLayout.join(",");
        },
        pageDisabled: (vm) => {
            return vm.total <= 0;
        },
        defaultSort: (vm) => {
            const { uiSchema } = vm.tableSchema;
            const schema = isNil(uiSchema) ? {} : uiSchema;
            return vm.setDefaultSort(schema);
        },
    },
    //监控data中的数据变化
    watch: {
        pageSize(newVal) {
            this.pageLock = false;
            this.$set(this, "currentPage", 1);

            setTimeout(() => {
                this.pageLock = true;
                this.tableHandle(
                    this.sortProp,
                    this.sortOrder,
                    this.currentPage,
                    newVal
                );
            }, 0);
        },
        currentPage(newVal) {
            if (this.pageLock) {
                this.tableHandle(
                    this.sortProp,
                    this.sortOrder,
                    newVal,
                    this.pageSize
                );
            }
        },
        multipleSelection(newVal) {
            this.$emit("onChoice", newVal);
        },
        resizeTable() {
            this.$nextTick(() => this.resizeHeight());
        },
        useChoice(newVal) {
            this.$nextTick(
                () => newVal && this.setSelectChoice(this.tableChoice)
            );
        },
    },
    //方法集合
    methods: {
        // 提交表格属性
        getTableData(backFunc) {
            const tableData = cloneDeep(this.tableData);

            if (isFunction(backFunc)) {
                let data = {};

                tableData.forEach((item) => {
                    delete item.cellInfo;
                    data = Object.assign({}, data, backFunc(item));
                });

                return data;
            }

            return tableData;
        },
        handleSortChange({ prop, order }) {
            const defOrder = this.formatOrder(this.defaultSort.order);
            const defProp = this.defaultSort.prop;
            const baseOrder = isNil(order) ? defOrder : this.formatOrder(order);
            const baseProp = isNil(order) ? defProp : prop;

            this.setSortValue({ prop: baseProp, order: baseOrder });
            this.tableHandle(
                baseProp,
                baseOrder,
                this.currentPage,
                this.pageSize
            );
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // this.multipleSelection = val.filter((row) =>
            //     this.removeSelectDisable(row, this.setSelectDisable)
            // );
        },
        tableHandle(prop, order, current, size) {
            this.$emit("tableHandle", { prop, order, current, size });
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
        formatOrder(order) {
            const baseOrder = {
                ascending: "asc",
                descending: "desc",
            };

            return baseOrder[order] || null;
        },
        setSelectDisable(row, index) {
            const basePower = isNil(row[this.rowPower])
                ? ""
                : row[this.rowPower];
            const rowPower = basePower.split(",");

            return rowPower.indexOf("delete") < 0;
        },
        // 移除选中状态，避免不可删除的状态被选中
        removeSelectDisable(row, setDisable) {
            const status = setDisable(row);

            !status && this.$refs[this.refKey].toggleRowSelection(row, false);

            return status;
        },
        setSortValue({ prop, order }) {
            this.sortProp = prop;
            this.sortOrder = order;
        },
        /**
         * @description: 设置默认排序规则
         * @param {Object} attr
         * @return {Object} 默认的排序规则
         */
        setDefaultSort(attr) {
            const { sortProp, sortOrder } = attr;
            // descending
            const baseSortOrder = isNil(sortOrder) ? "ascending" : sortOrder;

            if (isNil(sortProp)) {
                return {
                    prop: "id",
                    order: baseSortOrder,
                };
            }

            return {
                prop: sortProp,
                order: baseSortOrder,
            };
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
            const offset = this.usePage ? 60 : 0;
            return height - offset;
        },
        resizeHeight() {
            const height = this.$el.parentNode.clientHeight;

            this.height = this.parentHeight <= 0 ? height : this.parentHeight;

            this.tableHeight = this.setHeight(this.height);
        },

        // 设置多选
        setSelectChoice(choice) {
            choice.forEach((item) => this.setChoiceStatus(item));
        },
        setChoiceStatus(item, status = true) {
            this.$refs[this.refKey].toggleRowSelection(item, status);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.loadPage && this.handleSortChange({ ...this.defaultSort });
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$nextTick(() => {
            this.resizeHeight();
            this.useChoice && this.setSelectChoice(this.tableChoice);
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
