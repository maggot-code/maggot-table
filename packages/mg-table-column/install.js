/*
 * @Author: maggot-code
 * @Date: 2021-03-09 15:07:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 17:29:35
 * @Description: unify install form components
 */
import MgColumnDefault from '../mg-column-default';
import MgColumnHtml from "../mg-column-html";
import MgColumnLink from "../mg-column-link";

const components = [MgColumnDefault, MgColumnHtml, MgColumnLink];

const TableColumnComponents = {};
components.forEach(component => {
    TableColumnComponents[component.name] = component;
});

export {
    TableColumnComponents
}
