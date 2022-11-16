/*
 * @FilePath: \maggot-table\packages\mg-input\index.js
 * @Author: maggot-code
 * @Date: 2022-11-16 18:15:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 18:15:48
 * @Description: 
 */
import MgColumnInput from "./src/mg-column-input";

/* istanbul ignore next */
MgColumnInput.install = function (Vue) {
    Vue.component(MgColumnInput.name, MgColumnInput);
};

export default MgColumnInput;
