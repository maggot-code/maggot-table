/*
 * @FilePath: \maggot-table\packages\mg-column-datetime\index.js
 * @Author: maggot-code
 * @Date: 2022-11-22 11:15:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-22 11:16:52
 * @Description: 
 */
import MgColumnDatetime from "./src/mg-column-datetime";

/* istanbul ignore next */
MgColumnDatetime.install = function (Vue) {
    Vue.component(MgColumnDatetime.name, MgColumnDatetime);
};

export default MgColumnDatetime;
