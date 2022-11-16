/*
 * @FilePath: \maggot-table\packages\mg-column-time\index.js
 * @Author: maggot-code
 * @Date: 2022-11-16 14:15:08
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 14:15:32
 * @Description: 
 */
import MgColumnTime from "./src/mg-column-time";

/* istanbul ignore next */
MgColumnTime.install = function (Vue) {
    Vue.component(MgColumnTime.name, MgColumnTime);
};

export default MgColumnTime;
