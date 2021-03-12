/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:07:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-12 13:28:14
 * @Description: unify install form components
 */
import MgColumnDefault from '../mg-column-default';
import MgColumnLink from '../mg-column-link';

const components = [
    MgColumnDefault,
    MgColumnLink
];

const TableColumnComponents = {};
components.forEach(component => {
    TableColumnComponents[component.name] = component;
});

export {
    TableColumnComponents
}
