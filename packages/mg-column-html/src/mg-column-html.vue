<!--
 * @FilePath: \maggot-table\packages\mg-column-html\src\mg-column-html.vue
 * @Author: maggot-code
 * @Date: 2022-11-16 16:47:49
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 17:23:46
 * @Description: 
-->
<template>
    <div class='mg-column-html' :style="style" v-html="content"></div>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
export default {
    name: 'mg-column-html',
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        content() {
            return this.rowValue;
        }
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
@import "./mg-column-html.scss";
</style>
