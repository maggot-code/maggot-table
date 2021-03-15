/*
 * @Author: maggot-code
 * @Date: 2021-03-15 14:20:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-15 14:25:07
 * @Description: file content
 */
const { send } = require('./request');

// /Achievements/AM_Appraisal/MyList_PC 接口说明：成果鉴定录入页面接口
export const MyList_PC = () => send({
    url: '/kyhxs/Achievements/AM_Appraisal/MyList_PC'
})

// /Achievements/AM_Appraisal/GetList 接口说明：获取数据列表
export const GetList = () => send({
    url: '/kyhxs/Achievements/AM_Appraisal/GetList',
    method: 'POST'
})

