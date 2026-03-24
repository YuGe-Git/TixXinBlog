/**
 * @file types.ts
 * @description 布局主题契约接口，所有主题必须实现此接口
 * @author TixXin
 * @since 2026-03-24
 */

import type { Component } from 'vue'

/** 布局主题契约：定义一个主题必须提供的全部元信息和组件 */
export interface BlogLayoutTheme {
  /** 唯一标识符，如 'classic', 'docs', 'minimal' */
  id: string
  /** 显示名称 */
  name: string
  /** 一句话描述 */
  description: string
  /** 作者 */
  author: string
  /** lucide 图标名，用于外观面板展示 */
  icon: string
  /** 布局 Vue 组件 */
  layoutComponent: Component
  /** 是否包含左侧栏导航 */
  hasLeftSidebar: boolean
  /** 是否包含右侧栏（提供 #right-sidebar-target） */
  hasRightSidebar: boolean
}

/** 内置主题 ID 常量 */
export const LAYOUT_THEME_PRESETS = ['classic', 'docs', 'minimal'] as const
export type LayoutThemePreset = typeof LAYOUT_THEME_PRESETS[number]

export const DEFAULT_LAYOUT_THEME: LayoutThemePreset = 'classic'
