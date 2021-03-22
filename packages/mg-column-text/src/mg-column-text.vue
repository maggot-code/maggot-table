<!--
 * @Author: maggot-code
 * @Date: 2021-03-22 23:04:17
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-22 23:15:30
 * @Description: file content
-->
<template>
    <el-input
        class="mg-column-text"
        size="mini"
        placeholder="请输入内容"
        v-model="textValue"
        clearable
        @change="onChange"
    >
    </el-input>
</template>

<script>
import MgColumnMixins from "../../mg-table/mixins/mg-column-mixins";
import { isNil } from "lodash";
export default {
    name: "mg-column-text",
    mixins: [MgColumnMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            textValue: "",
        };
    },
    //监听属性 类似于data概念
    computed: {
        content: (vm) => {
            const { $index, column, row } = vm.scope;
            const { property } = column;
            const value = isNil(row[property]) ? "" : row[property];

            return value;
        },
    },
    //监控data中的数据变化
    watch: {
        content(newVal) {
            this.textValue = newVal;
        },
    },
    //方法集合
    methods: {
        onChange(value) {
            const { column, row } = this.scope;
            const { property } = column;
            row[property] = value;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.textValue = this.content;
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
@import "./mg-column-text.scss";
</style>