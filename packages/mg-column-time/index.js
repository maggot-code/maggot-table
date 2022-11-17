/*
 * @FilePath: \maggot-table\packages\mg-column-time\index.js
 * @Author: maggot-code
 * @Date: 2022-11-17 14:21:15
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 14:22:14
 * @Description: 
 */
import MgColumnTime from "./src/mg-column-time";

/* istanbul ignore next */
MgColumnTime.install = function (Vue) {
    Vue.component(MgColumnTime.name, MgColumnTime);
};

export default MgColumnTime;
