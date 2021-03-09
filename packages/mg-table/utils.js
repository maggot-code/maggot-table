/*
 * @Author: maggot-code
 * @Date: 2021-03-09 13:28:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-09 13:30:54
 * @Description: mg table utils
 */
import { isNil, isBoolean } from "lodash";

export const setAttrBoolean = (bool, def = false) => !isNil(bool) && isBoolean(bool) ? bool : def;
