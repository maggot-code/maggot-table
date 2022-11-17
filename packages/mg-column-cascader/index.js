/*
 * @FilePath: \maggot-table\packages\mg-column-cascader\index.js
 * @Author: maggot-code
 * @Date: 2022-11-17 13:43:17
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 13:44:23
 * @Description: 
 */
import MgColumnCascader from "./src/mg-column-cascader";

/* istanbul ignore next */
MgColumnCascader.install = function (Vue) {
    Vue.component(MgColumnCascader.name, MgColumnCascader);
};

export default MgColumnCascader;
