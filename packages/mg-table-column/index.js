/*
 * @Author: maggot-code
 * @Date: 2021-03-09 09:47:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-09 09:48:01
 * @Description: export mg-table-column component
 */
import MgTableColumn from './src/mg-table-column';

/* istanbul ignore next */
MgTableColumn.install = function (Vue) {
    Vue.component(MgTableColumn.name, MgTableColumn);
};

export default MgTableColumn;