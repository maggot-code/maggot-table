/*
 * @FilePath: \maggot-table\packages\mg-column-number\index.js
 * @Author: maggot-code
 * @Date: 2022-11-16 18:34:37
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 18:35:01
 * @Description: 
 */
import MgColumnNumber from "./src/mg-column-number";

/* istanbul ignore next */
MgColumnNumber.install = function (Vue) {
    Vue.component(MgColumnNumber.name, MgColumnNumber);
};

export default MgColumnNumber;
