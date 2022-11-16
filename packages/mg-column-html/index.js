/*
 * @FilePath: \maggot-table\packages\mg-column-html\index.js
 * @Author: maggot-code
 * @Date: 2022-11-16 16:47:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 16:47:40
 * @Description: 
 */
import MgColumnHtml from "./src/mg-column-html";

/* istanbul ignore next */
MgColumnHtml.install = function (Vue) {
    Vue.component(MgColumnHtml.name, MgColumnHtml);
};

export default MgColumnHtml;
