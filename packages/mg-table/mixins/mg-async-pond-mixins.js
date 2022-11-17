/*
 * @FilePath: \maggot-table\packages\mg-table\mixins\mg-async-pond-mixins.js
 * @Author: maggot-code
 * @Date: 2022-11-17 11:16:13
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 15:10:24
 * @Description: 
 */
import { isNil } from "lodash";

export default {
    name: "mg-async-pond-mixins",
    mixins: [],
    components: {},
    props: {
        remote: {
            type: Object,
            default: () => ({
                enums:()=>[],
            }),
        },
    },
    provide() {
        return {
            table: this,
        };
    },
    data() {
        //这里存放数据
        return {
            pond: {},
        };
    },
    //监听属性 类似于data概念
    computed: {
        pondKeys() {
            return Object.keys(this.pond);
        },
        pondSize() {
            return this.pondKeys.length;
        },
    },
    //监控data中的数据变化
    watch: {
        pondSize() {
            this.pondKeys.forEach(this.setupEnums);
        },
    },
    //方法集合
    methods: {
        setupPond(keyword, config) {
            if (!isNil(this.pond[keyword])) return;

            this.$set(this.pond, keyword, config);
        },
        clearPond() {
            this.pond = {};
        },
        async setupEnums(keyword) {
            const config = this.pond[keyword];
            const data = await this.remote.enums(config);
            const index = this.column.findIndex(
                (cell) => cell.prop === keyword
            );

            this.$set(this.column[index].lib.data, "enums", data);
            // this.$delete(this.pond, keyword);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.clearPond();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
        this.clearPond();
    }, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
