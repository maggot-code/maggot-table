/*
 * @FilePath: \maggot-table\packages\mg-column-money\index.js
 * @Author: maggot-code
 * @Date: 2022-11-16 18:41:51
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 18:43:06
 * @Description: 
 */
import MgColumnMoney from "./src/mg-column-money";

/* istanbul ignore next */
MgColumnMoney.install = function (Vue) {
    Vue.component(MgColumnMoney.name, MgColumnMoney);
};

export default MgColumnMoney;
