/**
 * @file theme.ts
 * @description 单栏极简主题 manifest 定义
 * @author TixXin
 * @since 2026-03-24
 */

import type { BlogThemeManifest, BlogThemeRuntime } from '../contracts'
import MinimalLayout from './MinimalLayout.vue'

/** 单栏极简主题运行时（同步导入，SSR 安全） */
export const minimalRuntime: BlogThemeRuntime = {
  layout: MinimalLayout,
}

const minimalTheme: BlogThemeManifest = {
  id: 'minimal',
  name: '单栏极简',
  version: '1.0.0',
  description: '顶部导航 + 居中单列内容',
  author: 'TixXin',
  icon: 'lucide:minimize-2',
  compatibility: { app: '>=1.0.0' },
  capabilities: {
    leftSidebar: false,
    rightSidebar: false,
    customizer: ['colorMode', 'contentTransition'],
  },
  load: async () => minimalRuntime,
}

export default minimalTheme
