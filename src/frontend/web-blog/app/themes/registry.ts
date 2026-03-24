/**
 * @file registry.ts
 * @description 布局主题注册表，管理所有可用主题的注册与查询
 * @author TixXin
 * @since 2026-03-24
 */

import type { BlogLayoutTheme } from './types'
import { DEFAULT_LAYOUT_THEME } from './types'
import ClassicLayout from './classic/ClassicLayout.vue'
import DocsLayout from './docs/DocsLayout.vue'
import MinimalLayout from './minimal/MinimalLayout.vue'

const themeMap = new Map<string, BlogLayoutTheme>()

/** 注册一个布局主题 */
export function registerTheme(theme: BlogLayoutTheme) {
  themeMap.set(theme.id, theme)
}

/** 根据 ID 获取主题，未找到时回退到默认主题 */
export function resolveTheme(id: string): BlogLayoutTheme {
  return themeMap.get(id) ?? themeMap.get(DEFAULT_LAYOUT_THEME)!
}

/** 获取所有已注册主题列表 */
export function getRegisteredThemes(): BlogLayoutTheme[] {
  return Array.from(themeMap.values())
}

/** 检查指定 ID 的主题是否已注册 */
export function isThemeRegistered(id: string): boolean {
  return themeMap.has(id)
}

/** 注册内置主题，使用同步导入确保 SSR 水合一致性 */
export function registerBuiltinThemesSync() {
  registerTheme({
    id: 'classic',
    name: '经典三栏',
    description: '左侧导航 + 中间内容 + 右侧信息栏',
    author: 'TixXin',
    icon: 'lucide:layout-dashboard',
    layoutComponent: ClassicLayout,
    hasLeftSidebar: true,
    hasRightSidebar: true,
  })

  registerTheme({
    id: 'docs',
    name: '双栏文档',
    description: '顶部导航 + 宽内容区 + 可选右栏',
    author: 'TixXin',
    icon: 'lucide:book-open',
    layoutComponent: DocsLayout,
    hasLeftSidebar: false,
    hasRightSidebar: true,
  })

  registerTheme({
    id: 'minimal',
    name: '单栏极简',
    description: '顶部导航 + 居中单列内容',
    author: 'TixXin',
    icon: 'lucide:minimize-2',
    layoutComponent: MinimalLayout,
    hasLeftSidebar: false,
    hasRightSidebar: false,
  })
}
