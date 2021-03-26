/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:33:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-26 16:05:50
 * @Description: mg-column-mixins
 */
import { isNil, isNumber } from 'lodash';
export default {
    name: "mg-column-default",
    mixins: [],
    components: {},
    props: {
        scope: {
            type: Object,
            default: () => ({}),
        },
        format: Array
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
        // 处理合计属性字段
        handleTotalField(scope, totalKey) {
            const { _self, column, row } = scope;
            const { property } = column;

            if (!isNumber(row[property])) {
                return row[property];
            }

            const data = _self.tableData.filter(item => totalKey.indexOf(item.field) >= 0).map(item => item[property]);
            const value = data.reduce((now, next) => now + next);

            this.cellTotal(value);
            return value;
        },
        // 查找total是否存在
        getBaseTotal(row) {
            const { cellInfo } = row;
            if (isNil(cellInfo)) {
                return false;
            }

            const { total } = cellInfo;
            if (isNil(total)) {
                return false;
            }

            return total;
        },
        outputValue(value, format) {
            let baseValue = value;

            format.forEach(item => {
                const { rule, handle } = item;
                if (!rule) {
                    return handle(value);
                }

                const formatHnadleFunc = handle(rule);
                baseValue = formatHnadleFunc(baseValue);
            });

            return baseValue;
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
        },
        cellChange(mode, value) {
            const { $index, column, row } = this.scope;
            const { property } = column;

            row[property] = value;

            this.$emit('cell-change', {
                mode: mode,
                index: $index,
                column: column,
                row: row,
                type: 'change'
            })
        },
        cellTotal(value) {
            const { $index, column, row } = this.scope;
            const { property } = column;

            row[property] = value;
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
