/*
 * @Author: maggot-code
 * @Date: 2021-02-28 13:25:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-09 12:20:36
 * @Description: babel config
 */
module.exports = {
    presets: [["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }]],
    sourceType: "unambiguous",
    plugins: [
        [
            "component",
            {
                libraryName: "element-ui",
                styleLibraryName: "theme-chalk",
            },
        ],
        "lodash",
    ],
};
