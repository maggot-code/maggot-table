/*
 * @FilePath: \maggot-table\packages\mg-column-date\index.js
 * @Author: maggot-code
 * @Date: 2022-11-17 14:28:15
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 14:28:39
 * @Description: 
 */
import MgColumnDate from "./src/mg-column-date";

/* istanbul ignore next */
MgColumnDate.install = function (Vue) {
    Vue.component(MgColumnDate.name, MgColumnDate);
};

export default MgColumnDate;
