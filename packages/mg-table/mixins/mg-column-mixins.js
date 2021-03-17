/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:33:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-16 13:18:02
 * @Description: mg-column-mixins
 */
export default {
    name: "mg-column-default",
    mixins: [],
    components: {},
    props: {
        scope: {
            type: Object,
            default: () => ({}),
        },
        format: Object
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        outputValue(value, format) {
            const { rule, handle } = format;
            if (!rule) {
                return handle(value);
            }

            const formatHnadleFunc = handle(rule);
            return formatHnadleFunc(value);
        },
        cellClick(mode) {
            const { $index, column, row } = this.scope;

            this.$emit('cell-cick', {
                mode: mode,
                index: $index,
                column: column,
                row: row,
                type: 'cick',
            })
        },
        cellDblclick(mode) {
            const { $index, column, row } = this.scope;

            this.$emit('cell-dblclick', {
                mode: mode,
                index: $index,
                column: column,
                row: row,
                type: 'dblclick',
            })
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
