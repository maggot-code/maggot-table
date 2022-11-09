/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:07:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-09 12:54:13
 * @Description: unify install form components
 */
import MgColumnDefault from '../mg-column-default';
import MgColumnLink from '../mg-column-link';
import MgColumnNumber from '../mg-column-number';
import MgColumnText from '../mg-column-text';
import MgColumnStatus from '../mg-column-status';
import MgColumnExpand from '../mg-column-expand';
import MgColumnSelect from "../mg-column-select";
import MgColumnProgress from "../mg-column-progress";

const components = [
    MgColumnDefault,
    MgColumnLink,
    MgColumnNumber,
    MgColumnText,
    MgColumnStatus,
    MgColumnExpand,
    MgColumnSelect,
    MgColumnProgress,
];

const TableColumnComponents = {};
components.forEach(component => {
    TableColumnComponents[component.name] = component;
});

export {
    TableColumnComponents
}
