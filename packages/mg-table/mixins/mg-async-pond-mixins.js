/*
 * @FilePath: \maggot-table\packages\mg-table\mixins\mg-async-pond-mixins.js
 * @Author: maggot-code
 * @Date: 2022-11-17 11:16:13
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 16:55:44
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
            pondKeys:{},
            pond: {},
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        async setupPond(keyword,config) {
            if (!isNil(this.pond[keyword])) return;

            this.$set(this.pondKeys, keyword, Date.now());

            this.setupEnums(keyword, config);
        },
        clearPond() {
            this.pondKeys = {};
            this.pond = {};
        },
        async setupEnums(keyword,config) {
            const data = await this.remote.enums(config);
            this.$set(this.pond, keyword, data);
            this.$set(this.pondKeys, keyword, Date.now());
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
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
