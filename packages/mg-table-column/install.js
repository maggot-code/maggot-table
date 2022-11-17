/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:07:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 13:45:02
 * @Description: unify install form components
 */
import MgColumnDefault from '../mg-column-default';
import MgColumnHtml from "../mg-column-html";
import MgColumnLink from "../mg-column-link";
import MgColumnInput from "../mg-column-input";
import MgColumnNumber from "../mg-column-number";
import MgColumnMoney from '../mg-column-money';
import MgColumnSelect from "../mg-column-select";
import MgColumnCascader from '../mg-column-cascader/index';

const components = [
    MgColumnDefault,
    MgColumnHtml,
    MgColumnLink,
    MgColumnInput,
    MgColumnNumber,
    MgColumnMoney,
    MgColumnSelect,
    MgColumnCascader,
];

const TableColumnComponents = {};
components.forEach(component => {
    TableColumnComponents[component.name] = component;
});

export {
    TableColumnComponents
}
