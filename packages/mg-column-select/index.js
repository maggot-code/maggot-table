/*
 * @FilePath: \maggot-table\packages\mg-column-select\index.js
 * @Author: maggot-code
 * @Date: 2022-11-17 09:35:05
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 09:36:03
 * @Description: 
 */
import MgColumnSelect from "./src/mg-column-select";

/* istanbul ignore next */
MgColumnSelect.install = function (Vue) {
    Vue.component(MgColumnSelect.name, MgColumnSelect);
};

export default MgColumnSelect;
