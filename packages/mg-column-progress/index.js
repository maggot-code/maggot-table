/*
 * @FilePath: \maggot-table\packages\mg-column-progress\index.js
 * @Author: maggot-code
 * @Date: 2022-11-08 16:45:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-08 16:46:07
 * @Description: 
 */
import MgColumnProgress from "./src/mg-column-progress";

/* istanbul ignore next */
MgColumnProgress.install = function (Vue) {
    Vue.component(MgColumnProgress.name, MgColumnProgress);
};

export default MgColumnProgress;
