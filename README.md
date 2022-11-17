# maggot-table

## 属性

| 属性               | 说明                     | 类型              | 默认值                 |
| ------------------ | ------------------------ | ----------------- | ---------------------- |
| `tableSchema`      | 表格结构                 | `Object`          | 必填                   |
| `tableData`        | 表格数据                 | `Array`           | `[]`                   |
| `tableChoice`      | 选中集合                 | `Array`           | `[]`                   |
| `controller`       | 行操作按钮               | `Object`          | `{}`                   |
| `rowPower`         | 按钮状态（根据权限禁用） | `String`          | `rowpower`             |
| `total`            | 表格承载数据总数         | `String / Number` | `0`                    |
| `resizeTable`      | 重置表格容器尺寸         | `String / Number` | `Date.now()`           |
| `parentHeight`     | 表格父容器高度           | `Number`          | `0`                    |
| `isLabel`          | 行操作按钮是否显示文字   | `Boolean`         | `true`                 |
| `resetCurrentPage` | 重置页码到第一页         | `String / Number` | `Date.now()`           |
| `defaultPageSize`  | 默认每页条数             | `Number`          | `10`                   |
| `defaultPageSizes` | 默认可选每页条数         | `Array`           | `[10, 20, 30, 40, 50]` |

### `TableSchema`

| 属性           | 说明         | 类型     | 默认值 |
| -------------- | ------------ | -------- | ------ |
| `uiSchema`     | 表格视图结构 | `Object` | `{}`   |
| `columnSchema` | 表格表头结构 | `Array`  | `[]`   |

### `UISchema`

| 属性          | 说明             | 类型                     | 默认值      |
| ------------- | ---------------- | ------------------------ | ----------- |
| `handleFixed` | 操作列定位位置   | `left / right`           | `left`      |
| `size`        | 表格尺寸         | `medium / small / mini`  | `medium`    |
| `fit`         | 列头是否自动撑开 | `Boolean`                | `true`      |
| `border`      | 是否显示边框     | `Boolean`                | `true`      |
| `stripe`      | 是否显示斑马纹   | `Boolean`                | `false`     |
| `emptyText`   | 空数据提示文字   | `String`                 | 暂无数据    |
| `showHeader`  | 是否显示表头     | `Boolean`                | `true`      |
| `highlight`   | 当前行是否高亮   | `Boolean`                | `true`      |
| `isChoice`    | 是否显示选择列   | `Boolean`                | `false`     |
| `isIndex`     | 是否显示索引列   | `Boolean`                | `false`     |
| `isPage`      | 是否显示分页器   | `Boolean`                | `false`     |
| `sortProp`    | 默认排序字段     | `String`                 | `id`        |
| `sortOrder`   | 默认排序方式     | `ascending / descending` | `ascending` |

### `ColumnSchema <Item>`

| 属性           | 说明                     | 类型                        | 默认值                   |
| -------------- | ------------------------ | --------------------------- | ------------------------ |
| `mold`         | 表格列应用模板           | `String<ComponentName>`     | `default`                |
| `prop`         | 列名标识（字段名字）     | `String`                    | `id`                     |
| `width`        | 列宽                     | `String / Number / Boolean` |                          |
| `minWidth`     | 列最小宽                 | `String / Number`           |                          |
| `fixed`        | 固定列位置               | `left / right`              |                          |
| `label`        | 列标题                   | `String`                    | 标签                     |
| `align`        | 列对齐方式               | `left / right/ center`      | `left`                   |
| `isSort`       | 是否开启列头排序         | `Boolean`                   | `false`                  |
| `headerAlign`  | 表头对齐方式             | `left / right / center`     | `center`                 |
| `isTips`       | 超出列是否需要`tips`提示 | `Boolean`                   | `false`                  |
| `formatDate`   | 列内容格式化 - 日期      | `String`                    | [详情](###FormatDate)   |
| `formatNumber` | 列内容格式化 - 数字      | `String`                    | [详情](###FormatNumber) |
| `formatLink`   | 列内容格式化 - 链接      | `String`                    | [详情](###FormatLink)   |

### `Controller 操作列`

| 属性     | 说明                 | 类型                                                 | 默认值            |
| -------- | -------------------- | ---------------------------------------------------- | ----------------- |
| `mode`   | 标识（自定义）       | `String`                                             | `default`         |
| `type`   | 按钮主题状态（颜色） | `primary / success / warning / danger / info / text` | `info`            |
| `icon`   | 按钮图标             | `Striing`                                            | `el-icon-s-tools` |
| `label`  | 按钮名称             | `String`                                             | 操作              |
| `useRow` | 是否用在表格行中使用 | `Boolean`                                            | `false`           |
| `useAll` | 是否用在表格全局使用 | `Boolean`                                            | `false`           |
| `attrs`  | 携带的额外信息       | `Object`                                             | `{}`              |

### FormatDate

```javascript
// format date rule
// 年 -> y+
// 月 -> M+
// 日 -> d+
// 时 -> h+
// 分 -> m+
// 秒 -> s+
// 季 -> q+
// 毫秒 -> S

// 原始数据：2022年9月22日10:44:22

// 格式化保留年月日，并使用 " - " 连接
// formatDate: "yyyy-MM-dd"
// 2022-09-22

// 格式化保留时分秒, 并使用 " : " 连接
// formatDate: "hh:mm:ss"
// 10:44:22
```

### FormatNumber

```javascript
// format number rule
// 语法1： [方法名称].[方法参数]
// 语法2： [方法名称]
// 备注：所有方法名称都是 JavaScript 提供的基础方法，目前无法扩展和组合
// 语法1 是 Number 对象提供的方法
// 语法2 是 Math 对象提供的方法

// 原始数据：value = 123.456789

// 格式化保留两位小数
// formNumber: "toFixed.2"
// 123.45

// 格式化向上取整
// formNumber: "ceil"
// 124
```

### FormatLink

```javascript
// format link rule
// 语法1：$[跳转外链]?[别名]=[数据中的字段名称 / 固定数值]
// 例子1："bilibili.com?name=projid&key=999ookie=$%#AFAD" 用于跳转到外部链接并携带参数

// 语法2：[内部组件名称]?[别名]=[数据中的字段名称 / 固定数值]
// 例子2："viewinfo?title=projname&hasAge=false"

// 原始数据：
const rawdata = [
    {
        projid:1002,
        projname:"biz",
        age:54
    }
];

// 语法1结果
// "bilibili.com?name=1002&key=999ookie=$%#AFAD"

// 语法2结果
// "viewinfo?title=biz&hasAge=false"
```

## `Schema`

```json5
// 大小写敏感
{
    // 主键字段名称
    "keyname":"id",
    
    // 表格UI结构描述, 详细属性在上面表格里
    "uiSchema":{},
    
    // 表格列结构描述, 详细属性在上面表格里
    "columnSchema":[],
    
    // 表格操作按钮集合, 详细属性在上面表格里
    "controller":[]
}
```

## `TODO`

- [x] 文本单元格（`default`）
- [x] 隐藏单元格
- [x] `HTML`单元格
- [x] `Link`单元格
- [x] 输入框单元格
- [x] 下拉框单元格
- [x] 多级下拉框单元格
- [x] 日期选择框单元格
- [ ] 进度条单元格
- [ ] `Tag`单元格
- [x] 数字单元格
- [x] 金额单元格
- [ ] 可编辑单元格
- [ ] 搜索框单元格
- [ ] 格式化文本（金额）
- [ ] 格式化文本（浮点数）
- [ ] 格式化文本（用例）
- [ ] 格式化文本（日期、时间）
- [ ] 合计行
