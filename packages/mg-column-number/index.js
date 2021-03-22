/*
 * @Author: maggot-code
 * @Date: 2021-03-21 18:01:47
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-22 23:03:50
 * @Description: export mg-column-number
 */
import MgColumnNumber from './src/mg-column-number';

/* istanbul ignore next */
MgColumnNumber.install = function (Vue) {
    Vue.component(MgColumnNumber.name, MgColumnNumber);
};

export default MgColumnNumber;