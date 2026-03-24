/**
 * @file theme.ts
 * @description 经典三栏主题定义
 * @author TixXin
 * @since 2026-03-24
 */

import type { BlogLayoutTheme } from '../types'
import ClassicLayout from './ClassicLayout.vue'

const classicTheme: BlogLayoutTheme = {
  id: 'classic',
  name: '经典三栏',
  description: '左侧导航 + 中间内容 + 右侧信息栏',
  author: 'TixXin',
  icon: 'lucide:layout-dashboard',
  layoutComponent: ClassicLayout,
  hasLeftSidebar: true,
  hasRightSidebar: true,
}

export default classicTheme
