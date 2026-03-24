/**
 * @file theme.ts
 * @description 双栏文档风格主题定义
 * @author TixXin
 * @since 2026-03-24
 */

import type { BlogLayoutTheme } from '../types'
import DocsLayout from './DocsLayout.vue'

const docsTheme: BlogLayoutTheme = {
  id: 'docs',
  name: '双栏文档',
  description: '顶部导航 + 宽内容区 + 可选右栏',
  author: 'TixXin',
  icon: 'lucide:book-open',
  layoutComponent: DocsLayout,
  hasLeftSidebar: false,
  hasRightSidebar: true,
}

export default docsTheme
