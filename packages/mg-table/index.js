/*
 * @Author: maggot-code
 * @Date: 2021-03-09 09:36:37
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-09 09:43:09
 * @Description: export mg-table component
 */
import MgTable from './src/mg-table';

/* istanbul ignore next */
MgTable.install = function (Vue) {
    Vue.component(MgTable.name, MgTable);
};

export default MgTable;
