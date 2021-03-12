/*
 * @Author: maggot-code
 * @Date: 2021-03-12 13:26:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-12 13:26:57
 * @Description: export mg-column-link
 */
import MgColumnLink from './src/mg-column-link';

/* istanbul ignore next */
MgColumnLink.install = function (Vue) {
    Vue.component(MgColumnLink.name, MgColumnLink);
};

export default MgColumnLink;