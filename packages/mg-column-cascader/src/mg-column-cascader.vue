<!--
 * @FilePath: \maggot-table\packages\mg-column-cascader\src\mg-column-cascader.vue
 * @Author: maggot-code
 * @Date: 2022-11-17 13:43:24
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 16:31:53
 * @Description: 
-->
<template>
    <el-skeleton v-if="unusableEnums" class="mg-column-cascader" :count="1" :rows="1" animated>
        <template #template>
            <el-skeleton-item variant="text" style="width: 100%;" />
        </template>
    </el-skeleton>

    <el-cascader  v-else class="mg-column-cascader" v-bind="options" :value="formatValue" :options="cascaderList" @change="handleChange">
        <div slot-scope="{node,data}">
            <p>{{toRender(node,data)}}</p>
        </div>
    </el-cascader>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
import { isNil, isString, isBoolean } from "lodash";

function toRender(node, data) {
    const { attachLabel } = data;
    return attachLabel;
}
// 序列化接口格式为element格式
function serializeValue(value, step) {
    if (value.length <= 0) return [];
    const valuePath = [];
    let len = Math.floor(value.length / step);
    while (len > 0) {
        valuePath.push(value.substr(0, len * step));
        len--;
    }
    return valuePath.reverse();
};
// 反序列化element格式到接口格式
function desSerializeValue(value, defValue) {
    return value.length <= 0 ? defValue : value[value.length - 1];
};

export default {
    name: 'mg-column-cascader',
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            toRender,
            cascaderList: [],
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
        unusableEnums() {
            if (!Array.isArray(this.lib.data.enums)) return true;

            return this.lib.data.enums.length <= 0;
        },
        options() {
            const {
                label,
                placeholder,
                expandTrigger,
                multiple,
                clearable,
                checkStrictly
            } = this.uiSchema;
            const baseLabel = this.setDefault(label, "内容");
            const basePlaceholder = this.setDefault(placeholder, `请选择${baseLabel}`);
            const props = {
                expandTrigger: this.setDefault(expandTrigger, "hover"),
                multiple: this.setDefault(multiple, false),
                checkStrictly: this.setDefault(checkStrictly, false),
                value: this.valueKey,
                label: this.labelKey,
                children: this.childrenKey,
                emitPath: true,
                lazy: false,
            }

            const bind = {
                size: "mini",
                props,
                placeholder: basePlaceholder,
                filterable: false,
                clearable: this.setDefault(clearable, true),
                "popper-append-to-body": true,
                "default-first-option": true,
            };

            return bind;
        },
        valueStep() {
            const { step } = this.database;
            return this.setDefault(step, 0);
        },
        // 外部value变更，映射给内部cascaderValue，字符串转数组
        formatValue() {
            if (this.options.props.multiple) {
                return this.rowValue.map(item => serializeValue(item, this.valueStep));
            }
            return serializeValue(this.rowValue, this.valueStep);
        },
        disabledKey() {
            return this.setDefault(this.database.disabledField, "disabled");
        },
        childrenKey(){
            return this.setDefault(this.database.childrenKey, "children");
        },
        valueKey() {
            return this.setDefault(this.database.valueField, "id");
        },
        labelKey() {
            return this.setDefault(this.database.textField, "label");
        },
        attachKey() {
            return this.setDefault(this.database.attachField, "attach");
        },
        useAttach() {
            return isBoolean(this.database.isAttach) ? this.database.isAttach : false;
        },
        useApi() {
            return isString(this.database.api);
        },
        config() {
            return {
                address: isNil(this.database.api) ? "" : this.database.api,
                lib: isNil(this.database.lib) ? {} : this.database.lib,
                field: this.property,
                valueKey: this.valueKey,
                labelKey: this.labelKey,
                childKey: this.childrenKey
            }
        }
    },
    //监控data中的数据变化
    watch: {
        "lib.data.enums": {
            handler(source) {
                this.$set(this, "cascaderList", this.setupSelectList(source));
                this.table.todoLayout();
            },
            deep: true
        }
    },
    //方法集合
    methods: {
        handleChange(value) {
            const outputValue = this.options.props.multiple
                ? value.map(item => desSerializeValue(item, []))
                : desSerializeValue(value, []);
                
            const { row } = this.scope;
            row[this.property] = outputValue;
        },
        setDefault(value, def) {
            return isNil(value) ? def : value;
        },
        setupSelectList(data) {
            if (!Array.isArray(data)) return [];

            return data.map(this.setupSelectItem);
        },
        setupSelectItem(item) {
            const {
                [this.labelKey]: label,
                [this.attachKey]: baseAttach
            } = item;
            const state = this.useAttach && isString(baseAttach);
            const attachLabel = state ? `${label}(${baseAttach})` : label;
            const value = item[this.valueKey];
            const hasChild = Array.isArray(item[this.childrenKey]) && item[this.childrenKey].length > 0;
            const extend = {
                label,
                attachLabel,
                value,
            }
            if (hasChild) extend[this.childrenKey] = this.setupSelectList(item[this.childrenKey]);
            return Object.assign({}, item, extend);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        if (this.useApi) {
            this.table.setupPond(this.property, this.config);
        } else {
            this.$set(this, "cascaderList", this.setupSelectList(this.database.enums));
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
@import "./mg-column-cascader.scss";
</style>
