<!--
 * @Author: maggot-code
 * @Date: 2021-03-09 09:36:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-02 02:38:49
 * @Description: mg-table.vue component
-->
<template>
    <div v-if="openHeight" class="mg-table" :style="`height:${height}px;`">
        <el-table style="width: 100%" v-bind="options" :ref="refKey" :data="tableData" :height="tableHeight"
            :max-height="tableHeight" @sort-change="handleSortChange" @selection-change="handleSelectionChange"
            @expand-change="handleExpandChange" @cell-mouse-enter="handleCellEnter" @cell-mouse-leave="handleCellLeave">
            <el-table-column v-if="useExpand" type="expand" align="center" width="45" min-width="45" :resizable="false">
                <template v-slot="props">
                    <slot name="expand" :params="props"></slot>
                </template>
            </el-table-column>

            <!-- useDrag -->
            <el-table-column v-if="useDrag" align="center" width="40" min-width="40" :resizable="false">
                <template>
                    <i class="mg-table-drag el-icon-rank" title='点击拖动'></i>
                </template>
            </el-table-column>

            <!-- :selectable="setSelectDisable"  -->
            <el-table-column v-if="useChoice" type="selection" align="center" width="45" min-width="45"
                :selectable="selectable" :resizable="false">
            </el-table-column>

            <el-table-column v-if="useIndex" type="index" align="center" :width="indexWidth" :min-width="indexWidth"
                fixed="left" :resizable="false" :index="indexMethod">
            </el-table-column>

            <template v-for="cell in column">
                <mg-table-column :key="cell.prop" v-bind="cell" @cellEvent="tableCellEvent">
                </mg-table-column>
            </template>

            <el-table-column v-if="useHandle" label="操作" align="center" :resizable="false" :width="handleWidth"
                :min-width="handleWidth" v-bind="handleOptions">
                <template slot-scope="scope">
                    <el-button-group>
                        <mg-column-handle v-for="(cell, key) in controller" :key="key" :scope="scope" :handle="cell"
                            :rowPower="rowPower" :useLabel="isLabel" @handleRow="handleRow"></mg-column-handle>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="mg-table-pagination" v-if="usePage" background :pager-count="5" :total="total"
            :layout="layout" :page-sizes="pageSizes" :disabled="pageDisabled" :page-size.sync="pageSize"
            :current-page.sync="currentPage">
        </el-pagination>
    </div>

    <el-table v-else style="width: 100%" v-bind="options" :ref="refKey" :data="tableData" @sort-change="handleSortChange"
        @selection-change="handleSelectionChange" @expand-change="handleExpandChange" @cell-mouse-enter="handleCellEnter"
        @cell-mouse-leave="handleCellLeave">
        <el-table-column v-if="useExpand" type="expand" align="center" width="45" min-width="45" :resizable="false">
            <template v-slot="props">
                <slot name="expand" :params="props"></slot>
            </template>
        </el-table-column>
    
        <!-- useDrag -->
        <el-table-column v-if="useDrag" align="center" width="40" min-width="40" :resizable="false">
            <template>
                <i class="mg-table-drag el-icon-rank" title='点击拖动'></i>
            </template>
        </el-table-column>
    
        <!-- :selectable="setSelectDisable"  -->
        <el-table-column v-if="useChoice" type="selection" align="center" width="45" min-width="45" :selectable="selectable"
            :resizable="false">
        </el-table-column>
    
        <el-table-column v-if="useIndex" type="index" align="center" :width="indexWidth" :min-width="indexWidth"
            fixed="left" :resizable="false" :index="indexMethod">
        </el-table-column>
    
        <template v-for="cell in column">
            <mg-table-column :key="cell.prop" v-bind="cell" @cellEvent="tableCellEvent">
            </mg-table-column>
        </template>
    
        <el-table-column v-if="useHandle" label="操作" align="center" :resizable="false" :width="handleWidth"
            :min-width="handleWidth" v-bind="handleOptions">
            <template slot-scope="scope">
                <el-button-group>
                    <mg-column-handle v-for="(cell, key) in controller" :key="key" :scope="scope" :handle="cell"
                        :rowPower="rowPower" :useLabel="isLabel" @handleRow="handleRow"></mg-column-handle>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import Sortable from "sortablejs";
import MgAsyncPondMixins from "../mixins/mg-async-pond-mixins";
import MgTableColumn from "../../mg-table-column";
import MgColumnHandle from "../../mg-column-handle";
import { setAttrBoolean } from "../utils";
import { isNil, isBoolean, isFunction, cloneDeep } from "lodash";

let unwatch = () => { }

export default {
    name: "mg-table",
    mixins: [MgAsyncPondMixins],
    components: { MgTableColumn, MgColumnHandle },
    props: {
        spanMethod: Function,
        openHeight: {
            type: Boolean,
            default: true
        },
        tableKeyname: {
            type: String,
            default: "id"
        },
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
        choicePower: {
            type: String,
            default: () => "choicepower",
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
        isLabel: {
            type: Boolean,
            default: () => true,
        },
        resetCurrentPage: {
            type: [String, Number],
            default: () => new Date().getTime()
        },
        refresh: {
            type: [String, Number],
            default: () => new Date().getTime()
        },
        defaultPageSize: {
            type: Number,
            default: () => 10,
        },
        defaultPageSizes: {
            type: Array,
            default: () => [10, 20, 30, 40, 50],
        }
    },
    data() {
        //这里存放数据
        return {
            refKey: new Date().getTime(),
            height: 0,
            tableHeight: 0,
            currentPage: 1,
            pageSize: this.defaultPageSize,
            pageLock: true,
            pageSizes: this.defaultPageSizes,
            pageLayout: ["total", "sizes", "prev", "pager", "next", "jumper"],
            multipleSelection: [],
            spanPond: {},

            sortProp: "",
            sortOrder: "",
        };
    },
    //监听属性 类似于data概念
    computed: {
        sourceKeys: (vm) => {
            return vm.tableData.map((item) => item[vm.tableKeyname]);
        },
        controllerLen: (vm) => Object.keys(vm.controller).length,
        handleOptions: (vm) => {
            const { uiSchema } = vm.tableSchema;
            const schema = isNil(uiSchema) ? {} : uiSchema;
            return {
                fixed: vm.setHandleFixed(schema)
            }
        },
        handleWidth: (vm) => {
            if (!vm.isLabel) {
                return (
                    12 / vm.controllerLen +
                    vm.controllerLen * 42 +
                    vm.controllerLen * 18
                );
            }

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
        indexWidth: (vm) => {
            //                当前页    *     一页多少个
            const offset = vm.currentPage * vm.pageSize;

            return `${offset}`.length * 20;
        },
        column: (vm) => {
            const { columnSchema } = vm.tableSchema;
            // 过滤隐藏列
            return columnSchema.filter((column) => column.mold !== "void");
        },
        options: (vm) => {
            const { uiSchema } = vm.tableSchema;
            const schema = isNil(uiSchema) ? {} : uiSchema;
            const toSpanMethod = isFunction(vm.spanMethod)
                ? (target) => vm.spanMethod(Object.assign({}, target, {
                    spanPond: vm.spanPond,
                    keywords: vm.mergeKeywords
                }))
                : vm.handleMergeCell;
            const vbind = {
                // size: "medium",
                size: vm.setSize(schema),
                fit: vm.setFit(schema),
                border: vm.setBorder(schema),
                stripe: vm.setStripe(schema),
                "empty-text": vm.setEmptyText(schema),
                "show-header": vm.setShowHeader(schema),
                "highlight-current-row": vm.setHighlight(schema),
                "span-method": vm.handleMergeCell,
                "row-key": vm.tableKeyname
            };

            return vbind;
        },
        mergeKeywords: (vm) => {
            const { mergeSchema } = vm.tableSchema;
            const schema = isNil(mergeSchema) ? {} : mergeSchema;
            return Array.isArray(schema.keywords) ? schema.keywords : [];
        },
        useExpand: (vm) => {
            const { $scopedSlots } = vm;

            return !isNil($scopedSlots.expand);
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
        useDrag: (vm) => {
            const { uiSchema } = vm.tableSchema;
            const schema = isNil(uiSchema) ? {} : uiSchema;
            const { isDrag } = schema;

            return !isNil(isDrag) &&
                isBoolean(isDrag) &&
                vm.tableData.length > 0
                ? isDrag
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
        sourceKeys() {
            this.setSpanPond(this.tableData);
            this.$nextTick(() => {
                this.$refs[this.refKey].doLayout();
            });
        },
        resetCurrentPage() {
            this.currentPage = 1;
        },
        refresh() {
            this.tableHandle(
                this.sortProp,
                this.sortOrder,
                this.currentPage,
                this.pageSize
            );
        },
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
            this.$nextTick(() => {
                this.resizeHeight();
            });
        },
        useExpand: {
            immediate: true,
            handler(newVal) {
                newVal && this.$nextTick(() => {
                    this.$refs[this.refKey].doLayout();
                });
            }
        },
        useChoice: {
            immediate: true,
            handler(newVal) {
                newVal && this.$nextTick(() => {
                    this.setSelectChoice(this.tableChoice);
                    this.$refs[this.refKey].doLayout();
                });
            }
        },
        useDrag: {
            immediate: true,
            handler(newVal) {
                newVal && this.$nextTick(() => {
                    this.$refs[this.refKey].doLayout();
                });
            }
        },
        useIndex: {
            immediate: true,
            handler(newVal) {
                newVal && this.$nextTick(() => {
                    this.$refs[this.refKey].doLayout();
                });
            }
        },
        useHandle: {
            immediate: true,
            handler(newVal) {
                newVal && this.$nextTick(() => {
                    this.$refs[this.refKey].doLayout();
                });
            }
        }
    },
    //方法集合
    methods: {
        todoLayout() {
            this.$nextTick(() => {
                this.$refs[this.refKey].doLayout();
            });
        },
        // 合并单元格
        handleMergeCell({ row, column, rowIndex, columnIndex }) {
            for (let i = 0; i < this.mergeKeywords.length; i++) {
                if (column.property === this.mergeKeywords[i]) {
                    const rowspan = this.spanPond[this.mergeKeywords[i]][rowIndex]
                    const colspan = rowspan > 0 ? 1 : 0;

                    return { rowspan, colspan }
                }
            }
        },
        // 拖拽行
        mountedDragRow() {
            !isNil(this.tableDrag) && this.tableDrag.destroy();

            const els = this.$refs[this.refKey].$el.querySelectorAll(".el-table__body-wrapper > table > tbody");
            if (els.length <= 0) return;
            const [el] = els;

            this.tableDrag = Sortable.create(el, {
                handle: ".mg-table-drag",
                // ghostClass: 'sortable-ghost',
                // dragClass: 'sortable-drag',
                forceFallback: false,
                animation: 600,
                setData: function (dataTransfer) {
                    dataTransfer.setData('Text', '')
                },
                onEnd: ({ oldIndex, newIndex }) => {
                    if (newIndex === oldIndex) return;
                    const target = {
                        row: this.tableData[oldIndex],
                        currentIndex: oldIndex,
                        transIndex: newIndex,
                    };
                    const replace = {
                        row: this.tableData[newIndex],
                        currentIndex: newIndex,
                        transIndex: oldIndex,
                    }
                    this.$emit("onDrag", target, replace);
                    this.$refs[this.refKey].doLayout();
                },
            });
        },
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
            const { baseProp, baseOrder } = this.transform(prop, order);
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
        },
        handleExpandChange(row, expandedRows) {
            const openOrClose = expandedRows.length > 0;
            const { cellInfo } = row;
            const { open } = cellInfo;

            if (isNil(cellInfo) || isNil(open) || !open) {
                this.$refs[this.refKey].toggleRowExpansion(row, false);
                return false;
            }

            openOrClose &&
                this.$emit(
                    "expandChange",
                    { row, close: openOrClose },
                    (status) => {
                        this.$refs[this.refKey].toggleRowExpansion(row, status);
                    }
                );
        },
        handleCellEnter(row, column, cell, event) {
            this.$emit("rowEnter", {
                row,
                column,
                cell,
                event,
            });
        },
        handleCellLeave(row, column, cell, event) {
            this.$emit("rowLeave", {
                row,
                column,
                cell,
                event,
            });
        },
        tableHandle(prop, order, current, size) {
            this.$emit("tableHandle", { prop, order, current, size });
        },
        tableCellEvent(event) {
            const { mode, row } = event;
            this.$emit("cellEvent", event);

            if (mode === "expand") {
                this.$refs[this.refKey].toggleRowExpansion(row);
            }
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
        // 校验是否可以被选中
        selectable(row) {
            const state = setAttrBoolean(row[this.choicePower]);
            return state ? 0 : 1;
        },
        transform(prop, order) {
            const defOrder = this.formatOrder(this.defaultSort.order);
            const defProp = this.defaultSort.prop;
            const baseOrder = isNil(order) ? defOrder : this.formatOrder(order);
            const baseProp = isNil(order) ? defProp : prop;

            return { baseProp, baseOrder };
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

            return setAttrBoolean(border, !this.useDrag);
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
        setSize(attr) {
            const { size } = attr;
            return size || "medium";
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
            if (this.useDrag) return false;

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

            return setAttrBoolean(stripe, !this.useDrag);
        },
        setHandleFixed(attr) {
            const { handleFixed } = attr;
            return handleFixed ?? "left"
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
        setSpanPond(data) {
            this.spanPond = {};

            this.mergeKeywords.forEach((key) => {
                this.spanPond[key] = [];
                let pos = 0;
                data.forEach((_, index) => {
                    if (index === 0) {
                        this.spanPond[key].push(1);
                        pos = 0;
                        return;
                    }

                    if (data[index][key] !== data[index - 1][key]) {
                        this.spanPond[key].push(1);
                        pos = index;
                        return;
                    }

                    this.spanPond[key][pos] += 1;
                    this.spanPond[key].push(0);
                });
            });
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        // unwatch = this.$watch(
        //     () => this.defaultSort,
        //     (newVal) => {
        //         const { baseProp: prop, baseOrder: order } = this.transform(newVal.prop, newVal.order);
        //         this.setSortValue({ prop, order });
        //         this.tableHandle(prop, order,  this.currentPage, this.pageSize);
        //         unwatch();
        //     },
        //     { immediate: true }
        // );
        // this.handleSortChange(this.defaultSort);
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$nextTick(() => {
            this.useDrag && this.mountedDragRow();
            this.resizeHeight();
            this.setSpanPond(this.tableData);
            this.setSelectChoice(this.tableChoice);
            this.$refs[this.refKey].doLayout();
        });
    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() {
        this.spanPond = {};
        unwatch();
        !isNil(this.tableDrag) && this.tableDrag.destroy();
    }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss">
@import "./mg-table.scss";
</style>
