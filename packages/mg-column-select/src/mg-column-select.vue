<!--
 * @FilePath: \maggot-table\packages\mg-column-select\src\mg-column-select.vue
 * @Author: maggot-code
 * @Date: 2022-11-17 09:35:14
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 17:12:02
 * @Description: 
-->
<template>
    <el-select v-if="usableRecord" class="mg-column-select" :value="rowValue" v-bind="options" @change="handleChange">
        <template v-for="item in selectList">
            <el-option :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                <p>{{ item.attachLabel }}</p>
            </el-option>
        </template>
    </el-select>

    <el-skeleton v-else class="mg-column-select" :count="1" :rows="1" animated>
        <template #template>
            <el-skeleton-item variant="text" style="width: 100%;" />
        </template>
    </el-skeleton>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
import { isNil, isBoolean, isString } from "lodash";
export default {
    name: 'mg-column-select',
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            selectList: []
        };
    },
    //监听属性 类似于data概念
    computed: {
        database() {
            return this.lib?.data ?? {};
        },
        uiSchema() {
            return this.lib?.ui ?? {};
        },
        options() {
            const bind = {
                size: "mini",
                placeholder:"请选择"
            };

            return Object.assign({}, bind, this.uiSchema);
        },
        valueKey() {
            return this.setDefault(this.database.valueField, "id");
        },
        labelKey(){
            return this.setDefault(this.database.textField, "label");
        },
        attachKey(){
            return this.setDefault(this.database.attachField, "attach");
        },
        useAttach() {
            return isBoolean(this.database.isAttach) ? this.database.isAttach : false;
        },
        useApi(){
            return isString(this.database.api);
        },
        config(){
            return {
                address: isNil(this.database.api) ? "" : this.database.api,
                lib: isNil(this.database.lib) ? {} : this.database.lib,
                field: this.property,
                valueKey: this.valueKey,
                labelKey: this.labelKey
            }
        },
        record() {
            return this.table.pondKeys[this.property];
        },
        usableRecord() {
            return Array.isArray(this.table.pond[this.property]);
        }
    },
    //监控data中的数据变化
    watch: {
        record() {
            if (!this.usableRecord) return;

            this.setupSelectList(this.table.pond[this.property]);
        }
    },
    //方法集合
    methods: {
        setDefault(value, def) {
            return isNil(value) ? def : value;
        },
        handleChange(value) {
            const { row } = this.scope;
            row[this.property] = value;
        },
        setupSelectList(data) {
            if (!Array.isArray(data)) return [];
            const list = data.map(this.setupSelectItem);

            this.$set(this,"selectList",list);
            return this.selectList;
        },
        setupSelectItem(item) {
            const {
                [this.labelKey]: label,
                [this.attachKey]: baseAttach
            } = item;
            const state = this.useAttach && isString(baseAttach);
            const attachLabel = state ? `${label}(${baseAttach})` : label;
            const value = item[this.valueKey];
            return Object.assign({}, item, { label, attachLabel, value });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        if (this.useApi) {
            this.table.setupPond(this.property, this.config);
        } else {
            this.setupSelectList(this.database.enums);
        }
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
@import "./mg-column-select.scss";
</style>
