/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:12:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-09 15:12:52
 * @Description: export mg-column-handle
 */
import MgColumnHandle from './src/mg-column-handle';

/* istanbul ignore next */
MgColumnHandle.install = function (Vue) {
    Vue.component(MgColumnHandle.name, MgColumnHandle);
};

export default MgColumnHandle;