/**
 * @file theme.ts
 * @description 经典三栏主题 manifest 定义
 * @author TixXin
 * @since 2026-03-24
 */

import type { BlogThemeManifest, BlogThemeRuntime } from '../contracts'
import ClassicLayout from './ClassicLayout.vue'

/** 经典三栏主题运行时（同步导入，SSR 安全） */
export const classicRuntime: BlogThemeRuntime = {
  layout: ClassicLayout,
}

const classicTheme: BlogThemeManifest = {
  id: 'classic',
  name: '经典三栏',
  version: '1.0.0',
  description: '左侧导航 + 中间内容 + 右侧信息栏',
  author: 'TixXin',
  icon: 'lucide:layout-dashboard',
  compatibility: { app: '>=1.0.0' },
  capabilities: {
    leftSidebar: true,
    rightSidebar: true,
    customizer: ['colorMode', 'contentTransition', 'sidebarAnimation'],
  },
  load: async () => classicRuntime,
}

export default classicTheme
