/*
 * @Author: maggot-code
 * @Date: 2021-03-12 12:07:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-12 13:23:50
 * @Description: mg-table-column format
 */
import { isDate, isNumber } from 'lodash';

const formatDate = (rule) => (value) => {
    const date = new Date(value);
    if (!isDate(date)) {
        console.error(`${value} 不是一个日期格式`);
        return rule;
    }

    return date.Format(rule);
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
        console.error(`${value} 不是一个数字或者,${rule}不合法`);
        return rule;
    }

    if (ruleHandle.length > 1) {
        return value[ruleHandle[0]](ruleHandle[1]);
    } else {
        return Math[ruleHandle[0]](value);
    }
}

export default {
    formatDate,
    formatNumber
}
