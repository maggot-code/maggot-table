/*
 * @Author: maggot-code
 * @Date: 2021-03-12 12:07:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-28 11:28:32
 * @Description: mg-table-column format
 */
import { isNaN, isNumber, isString, isNil } from 'lodash';

const formatDate = (rule) => (value) => {
    const date = new Date(value).getTime();
    if (isNaN(date)) {
        return value;
    }

    return new Date(value).Format(rule);
}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const formatNumber = (rule) => (value) => {
    const ruleHandle = rule.split('.');
    if (!isNumber(value) || ruleHandle.length <= 0) {
        return value;
    }

    if (ruleHandle.length > 1) {
        return value[ruleHandle[0]](ruleHandle[1]);
    } else {
        return Math[ruleHandle[0]](value);
    }
}

const formatLink = (rule) => (value, row) => {
    if (!isString(rule) && rule.length <= 0) {
        return value;
    }

    const firstChar = rule[0];
    if (firstChar === '$') {
        // $strurl?aa=id&bb=name
        const [field, params] = rule.split('?');
        const fieldName = field.substr(1);
        if (!row[fieldName]) {
            !isDev && console.error(`"${fieldName}" 不存在，在数据源中无法找到`);
            return false;
        }

        const paramsStr = spliceParams(params, row);
        return paramsStr ? `${row[fieldName]}?${paramsStr}` : row[fieldName];
    } else {
        // routername?aa=id&bb=name
        const [field, params] = rule.split('?');
        const paramsStr = spliceParams(params, row);
        return paramsStr ? `${field}?${paramsStr}` : field;
    }
}
// 拼接参数字符串
const spliceParams = (params, row) => {
    if (isNil(params)) {
        return "";
    }

    return params.split('&').map(item => {
        const [key, field] = item.split('=');
        if (isNil(row[field])) {
            return false;
        }

        return `${key}=${row[field]}`
    }).filter(item => item).join('&');
}

export default {
    formatDate,
    formatNumber,
    formatLink,
}
