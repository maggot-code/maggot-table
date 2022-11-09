/*
 * @FilePath: \maggot-table\packages\mg-column-select\index.js
 * @Author: maggot-code
 * @Date: 2022-11-09 12:53:05
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-09 12:53:26
 * @Description: 
 */
import MgColumnSelect from "./src/mg-column-select";

/* istanbul ignore next */
MgColumnSelect.install = function (Vue) {
    Vue.component(MgColumnSelect.name, MgColumnSelect);
};

export default MgColumnSelect;
