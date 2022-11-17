<!--
 * @FilePath: \maggot-table\packages\mg-column-input\src\mg-column-input.vue
 * @Author: maggot-code
 * @Date: 2022-11-16 18:16:00
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 09:23:19
 * @Description: 
-->
<template>
    <el-input class="mg-column-input" :value="rowValue" v-bind="options" @input="toInput"></el-input>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";

// 固定属性
const constant = {
    size: "mini",
};

export default {
    name: 'mg-column-input',
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        uiSchema() {
            return Object.assign({}, this.lib?.ui ?? {}, constant);
        },
        options() {
            const bind = {};

            return Object.assign({},bind,this.uiSchema);
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        toInput(value) {
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
@import "./mg-column-input.scss";
</style>
