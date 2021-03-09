/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:07:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-09 15:47:25
 * @Description: unify install form components
 */
import MgColumnDefault from '../mg-column-default';

const components = [
    MgColumnDefault,
];

const TableColumnComponents = {};
components.forEach(component => {
    TableColumnComponents[component.name] = component;
});

export {
    TableColumnComponents
}
