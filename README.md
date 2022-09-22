# maggot-table

## 属性

### 表格容器

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

#### `TableSchema`

| 属性           | 说明         | 类型     | 默认值 |
| -------------- | ------------ | -------- | ------ |
| `uiSchema`     | 表格视图结构 | `Object` | `{}`   |
| `columnSchema` | 表格表头结构 | `Array`  | `[]`   |

#### `UISchema`

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

#### `ColumnSchema <Item>`

| 属性           | 说明                     | 类型                        | 默认值    |
| -------------- | ------------------------ | --------------------------- | --------- |
| `mold`         | 表格列应用模板           | `String<ComponentName>`     | `default` |
| `prop`         | 列名标识（字段名字）     | `String`                    | `id`      |
| `width`        | 列宽                     | `String / Number / Boolean` |           |
| `minWidth`     | 列最小宽                 | `String / Number`           |           |
| `fixed`        | 固定列位置               | `left / right`              |           |
| `label`        | 列标题                   | `String`                    | 标签      |
| `align`        | 列对齐方式               | `left / right/ center`      | `left`    |
| `isSort`       | 是否开启列头排序         | `Boolean`                   | `false`   |
| `headerAlign`  | 表头对齐方式             | `left / right / center`     | `center`  |
| `isTips`       | 超出列是否需要`tips`提示 | `Boolean`                   | `false`   |
| `formatDate`   | 列内容格式化 - 日期      | `String`                    | 详情      |
| `formatNumber` | 列内容格式化 - 数字      | `String`                    | 详情      |
| `formatLink`   | 列内容格式化 - 链接      | `String`                    | 详情      |


## 方法
