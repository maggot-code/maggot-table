/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:07:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-14 10:36:34
 * @Description: unify install form components
 */
import MgColumnDefault from '../mg-column-default';
import MgColumnLink from '../mg-column-link';
import MgColumnNumber from '../mg-column-number';
import MgColumnText from '../mg-column-text';
import MgColumnStatus from '../mg-column-status';

const components = [
    MgColumnDefault,
    MgColumnLink,
    MgColumnNumber,
    MgColumnText,
    MgColumnStatus
];

const TableColumnComponents = {};
components.forEach(component => {
    TableColumnComponents[component.name] = component;
});

export {
    TableColumnComponents
}
