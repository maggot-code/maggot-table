# components mg-table

## 基础属性类型

```json
"uiSchema" : { // object - 主体table表格的UI风格属性，非必填属性
    "border" : true, // boolean - 是否显示边框，默认true，显示边框
    "emptyText" : "暂无数据", // string - 空数据情况下的提示文字
    "fit" : true, // boolean - 是否自动撑开列宽，默认true，自动撑开
    "highlight" : true, // boolean - 是否设置当前行高亮，默认true，当前行高亮
    "showHeader" : true, // boolean - 是否显示表头，默认true，显示表头
    "stripe" : false, // boolean - 是否使用斑马纹，默认false，不使用斑马纹
    "isSelection" : false, // boolean - 是否使用多选，默认为false，不使用多选。设置多选的情况下会默认在表格的第一列设置选择框
    "isIndex" : true, // boolean - 是否显示索引序号，默认为true，显示
}
```

## 表格列头属性类型

```json
"columnSchema" : [ // array - 表格列头属性，必填属性
    {
        "mold" : "default", // string - 表格列展示类型,必填属性
        "label" : "标签", // string - 表格列名称,必填属性
        "prop" : "", // string - 表格当前列对应数据集合字段名称,必填属性
        "width" : 64, // number | string - 表格列宽
        "minWidth" : 64, // number | string - 表格最小列宽
        "fixed" : "", // string - 表格固定列属性
        "align" : "left", // string - 表格列数据对齐方式
        "headerAlign" : "center", // string - 表格列头对齐方式
        "isTips" : false, // boolean - 表格当前列超出列宽是否隐藏数据并通过tip的方式提示
        "isSort" : false, // boolean - 是否使用当前列进行排序
        "event" : [] // array[string] - 表格列单元格操作列表 ["handle:params"] ,例子：["link:id,name,label","format:yyyy-MM-dd"]
    }
]
```

* `mold`：表格列展示类型可选值：必填属性，默认设置`default`
  * `default`：默认类型，普通文字内容展示
  * `link`：
* `fixed`：表格固定列可选值：可选属性，不写的情况下不会设置
  * `left`：固定在表格左侧，多个依次排开
  * `right`：固定在表格右侧，多个依次排开
* `align`：表格列数据对齐方式可选值：可选属性，默认对齐方式`left`
  * `left`：数据列左对齐
  * `right`：数据列右对齐
  * `center`：数据列居中对齐
* `headerAlign`：表格列头对齐方式可选值：可选属性，默认对齐方式`center`
  * `left`：列头左对齐
  * `right`：列头右对齐
  * `center`：列头居中对齐
* `width & minWidth`：表格列宽和最小列宽属性说明：
  * 如果设置最小列宽，没有设置列宽的情况下，只会设置最小列宽
  * 如果设置列宽，没有设置最小列宽的情况下，会设置列宽和最小列宽都为列宽的属性
  * 如果都存在的情况下，则都会设置
  * 如果都不存在的情况下，则会设置默认数值，即**不设置列宽，最小列宽设置为64**
* `isSotr`：是否使用当前列进行排序
  * 设置`false`解释为不设置排序，`true`的情况下则直接与后端交互排序
* `event`：表格列单元格操作列表可选值：
  * `link`：跳转，可携带参数由逗号分隔，`"link:id,name,label"`
  * `formatdate`：日期格式化，`"formatdate:yyyy-MM-dd"`
  * `formatnumber`：数字格式化，`"formatnumber:toFixed.2"`

-----------------------

