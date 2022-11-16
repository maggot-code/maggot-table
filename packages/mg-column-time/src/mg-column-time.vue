<!--
 * @FilePath: \maggot-table\packages\mg-column-time\src\mg-column-time.vue
 * @Author: maggot-code
 * @Date: 2022-11-16 14:15:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 14:16:23
 * @Description: 
-->
<template>
    <p class="mg-column-time">time</p>
    <!-- <el-select class="mg-column-select" v-model="selectValue" v-bind="options">
        <template v-for="item in selectList">
            <el-option :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                <p>{{ item.attachLabel }}</p>
            </el-option>
        </template>
    </el-select> -->
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
export default {
    name: 'mg-column-time',
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
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
@import "./mg-column-time.scss";
</style>
