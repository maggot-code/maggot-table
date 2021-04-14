/*
 * @Author: maggot-code
 * @Date: 2021-04-14 10:34:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-14 10:34:52
 * @Description: file content
 */
import MgColumnStatus from './src/mg-column-status';

/* istanbul ignore next */
MgColumnStatus.install = function (Vue) {
    Vue.component(MgColumnStatus.name, MgColumnStatus);
};

export default MgColumnStatus;