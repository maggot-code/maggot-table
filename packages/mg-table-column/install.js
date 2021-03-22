/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:07:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-22 23:05:12
 * @Description: unify install form components
 */
import MgColumnDefault from '../mg-column-default';
import MgColumnLink from '../mg-column-link';
import MgColumnNumber from '../mg-column-number';
import MgColumnText from '../mg-column-text';

const components = [
    MgColumnDefault,
    MgColumnLink,
    MgColumnNumber,
    MgColumnText
];

const TableColumnComponents = {};
components.forEach(component => {
    TableColumnComponents[component.name] = component;
});

export {
    TableColumnComponents
}
