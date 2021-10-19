import vue from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// dayjs 本身只处理日期格式化之类的核心功能
// 其它例如相对时间，需要单独配置它自己的插件才可以使用
dayjs.extend(relativeTime)
// 全局使用中文
dayjs.locale('zh-cn')

// 全局过滤器：处理相对时间
vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
