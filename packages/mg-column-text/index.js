/*
 * @Author: maggot-code
 * @Date: 2021-03-22 23:03:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-22 23:04:08
 * @Description: file content
 */
import MgColumnText from './src/mg-column-text';

/* istanbul ignore next */
MgColumnText.install = function (Vue) {
    Vue.component(MgColumnText.name, MgColumnText);
};

export default MgColumnText;