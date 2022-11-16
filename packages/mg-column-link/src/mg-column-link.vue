<!--
 * @FilePath: \maggot-table\packages\mg-column-link\src\mg-column-link.vue
 * @Author: maggot-code
 * @Date: 2022-11-16 17:28:10
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 17:44:51
 * @Description: 
-->
<template>
    <el-link class="mg-column-link" v-bind="options" @click="toClick">{{ rowValue }}</el-link>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
export default {
    name: "mg-column-link",
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        isUri() {
            try {
                return !!(new URL(this.rowValue));
            } catch (TypeError) {
                return false;
            }
        },
        options() {
            const bind = {
                type:"primary",
            };

            if (this.isUri) Object.assign(bind, {
                href: this.rowValue,
                target: '_blank'
            });

            return bind;
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        toClick() {
            this.cellClick("link");
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
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
@import "./mg-column-link.scss";
</style>
