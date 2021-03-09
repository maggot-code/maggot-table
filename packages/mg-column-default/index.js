/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:14:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-09 15:16:08
 * @Description: export mg-column-default
 */
import MgColumnDefault from './src/mg-column-default';

/* istanbul ignore next */
MgColumnDefault.install = function (Vue) {
    Vue.component(MgColumnDefault.name, MgColumnDefault);
};

export default MgColumnDefault;