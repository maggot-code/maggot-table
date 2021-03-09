<!--
 * @Author: maggot-code
 * @Date: 2021-03-09 15:14:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-09 15:42:56
 * @Description: mg-column-default.vue component
-->
<template>
    <p class="mg-column-default">{{ content }}</p>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
export default {
    name: "mg-column-default",
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        content: (vm) => {
            const { $index, column, row } = vm.scope;
            const { property } = column;
            const value = row[property] || "";

            return value;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
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
@import "./mg-column-default.scss";
</style>
