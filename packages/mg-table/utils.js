/*
 * @Author: maggot-code
 * @Date: 2021-03-09 13:28:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-17 12:04:05
 * @Description: mg table utils
 */
import { isNil, isBoolean } from "lodash";

export const setAttrBoolean = (bool, def = false) => !isNil(bool) && isBoolean(bool) ? bool : def;

export function uuid() {
    const temp_url = URL.createObjectURL(new Blob());
    const uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
    URL.revokeObjectURL(temp_url);
    return uuid.split('/').at(-1);
}
