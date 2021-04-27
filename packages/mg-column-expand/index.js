/*
 * @Author: maggot-code
 * @Date: 2021-04-27 16:48:18
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-27 17:22:33
 * @Description: file content
 */
import MgColumnExpand from './src/mg-column-expand';

/* istanbul ignore next */
MgColumnExpand.install = function (Vue) {
    Vue.component(MgColumnExpand.name, MgColumnExpand);
};

export default MgColumnExpand;