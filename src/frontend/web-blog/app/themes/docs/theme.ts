/**
 * @file theme.ts
 * @description 双栏文档风格主题 manifest 定义
 * @author TixXin
 * @since 2026-03-24
 */

import type { BlogThemeManifest, BlogThemeRuntime } from '../contracts'
import DocsLayout from './DocsLayout.vue'

/** 双栏文档主题运行时（同步导入，SSR 安全） */
export const docsRuntime: BlogThemeRuntime = {
  layout: DocsLayout,
}

const docsTheme: BlogThemeManifest = {
  id: 'docs',
  name: '双栏文档',
  version: '1.0.0',
  description: '顶部导航 + 宽内容区 + 可选右栏',
  author: 'TixXin',
  icon: 'lucide:book-open',
  compatibility: { app: '>=1.0.0' },
  capabilities: {
    leftSidebar: false,
    rightSidebar: true,
    customizer: ['colorMode', 'contentTransition', 'sidebarAnimation'],
  },
  load: async () => docsRuntime,
}

export default docsTheme
