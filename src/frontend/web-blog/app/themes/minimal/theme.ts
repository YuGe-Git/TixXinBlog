/**
 * @file theme.ts
 * @description 单栏极简主题定义
 * @author TixXin
 * @since 2026-03-24
 */

import type { BlogLayoutTheme } from '../types'
import MinimalLayout from './MinimalLayout.vue'

const minimalTheme: BlogLayoutTheme = {
  id: 'minimal',
  name: '单栏极简',
  description: '顶部导航 + 居中单列内容',
  author: 'TixXin',
  icon: 'lucide:minimize-2',
  layoutComponent: MinimalLayout,
  hasLeftSidebar: false,
  hasRightSidebar: false,
}

export default minimalTheme
