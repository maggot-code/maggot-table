/*
 * @Author: maggot-code
 * @Date: 2021-03-03 16:50:39
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-09 13:58:58
 * @Description: mg table component inlet
 */
import '../plugins/element';
import MgTable from '../packages/mg-table';

const components = [MgTable];

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    MgTable,
}
