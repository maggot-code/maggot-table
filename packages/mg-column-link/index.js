/*
 * @FilePath: \maggot-table\packages\mg-column-link\index.js
 * @Author: maggot-code
 * @Date: 2022-11-16 17:28:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 17:29:00
 * @Description: 
 */
import MgColumnLink from "./src/mg-column-link";

/* istanbul ignore next */
MgColumnLink.install = function (Vue) {
    Vue.component(MgColumnLink.name, MgColumnLink);
};

export default MgColumnLink;
