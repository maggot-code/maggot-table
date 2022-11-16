<!--
 * @FilePath: \maggot-table\packages\mg-column-money\src\mg-column-money.vue
 * @Author: maggot-code
 * @Date: 2022-11-16 18:42:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 18:56:41
 * @Description: 
-->
<template>
    <div class="mg-column-money">
        <div class="mg-column-money-icon">￥</div>
        <el-input-number  class="mg-column-money-input" :value="rowValue" v-bind="options" @input="toInput"></el-input-number>
    </div>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";

// 固定属性
const constOptions = {
    controls: false
};

export default {
    name: 'mg-column-money',
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
            return Object.assign({}, this.lib?.ui ?? {}, constOptions);
        },
        options() {
            const bind = {
                size: "mini",
            };

            return Object.assign({}, bind, this.uiSchema);
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
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./mg-column-money.scss";
</style>
