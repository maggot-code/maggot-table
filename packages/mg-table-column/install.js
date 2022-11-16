/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:07:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 16:12:04
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
