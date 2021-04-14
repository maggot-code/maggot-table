/*
 * @Author: maggot-code
 * @Date: 2021-03-03 17:36:24
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-14 10:40:01
 * @Description: file content
 */
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import {
    // Basic 基本
    Button,
    ButtonGroup,
    Link,
    // Form 表单
    Input,
    InputNumber,
    Switch,
    // Data 数据
    Table,
    TableColumn,
    Pagination,
    // Notice 通知
    // Navigation 导航
    // Others 其他
    Tooltip,
} from 'element-ui';

// Basic 基本
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Link);
// Form 表单
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Switch);
// Data 数据
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
// Notice 通知
// Navigation 导航
// Others 其他
Vue.use(Tooltip);