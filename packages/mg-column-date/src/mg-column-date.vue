<!--
 * @FilePath: \maggot-table\packages\mg-column-date\src\mg-column-date.vue
 * @Author: maggot-code
 * @Date: 2022-11-17 14:27:52
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 15:06:46
 * @Description: 
-->
<template>
    <el-date-picker style="width: 100%;" class="mg-column-date" v-model="value" v-bind="options"></el-date-picker>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
import { formatDate } from "../../mg-table-column/format";
import { isEqual } from "lodash";

// 固定属性
const constant = {
    size: "mini",
    align: "center",
    "validate-event": false,
    "range-separator": "至",
    "value-format": "yyyy-MM-dd HH:mm:ss",
};

export default {
    name: 'mg-column-date',
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            value:""
        };
    },
    //监听属性 类似于data概念
    computed: {
        uiSchema() {
            return Object.assign({}, this.lib?.ui ?? {}, constant);
        },
        options() {
            const bind = {
                editable: false,
                clearable: true,
                format:"yyyy-MM-dd"
            };

            return Object.assign({}, bind, this.uiSchema);
        }
    },
    //监控data中的数据变化
    watch: {
        value(newVal,oldVal) {
            if (isEqual(newVal, oldVal)) return;

            this.handleChange(newVal);
        },
        rowValue: {
            handler(newVal) {
                this.value = newVal;
            },
            immediate: true
        }
    },
    //方法集合
    methods: {
        handleChange(value) {
            const { row } = this.scope;
            row[this.property] = value;
        }
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
@import "./mg-column-date.scss";
</style>
