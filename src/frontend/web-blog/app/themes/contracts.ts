/**
 * @file contracts.ts
 * @description 主题契约体系：定义主题 manifest、runtime、capabilities 与父子合并等全部类型
 * @author TixXin
 * @since 2026-03-26
 */

import type { Component } from 'vue'

// ─── 主题能力声明 ───

/** 主题可声明支持的设置面板项 */
export type ThemeCustomizerCapability =
  | 'colorMode'
  | 'contentTransition'
  | 'sidebarAnimation'
  | 'layoutDensity'

/** 主题设置项当前状态值 */
export interface ThemeCustomizerState {
  contentTransition: string
  sidebarAnimation: string
  layoutDensity: string
}

/** 主题能力声明：描述主题提供的布局结构与可定制项 */
export interface ThemeCapabilities {
  /** 是否包含左侧栏导航 */
  leftSidebar: boolean
  /** 是否包含右侧栏（提供 #right-sidebar-target） */
  rightSidebar: boolean
  /** 主题支持的设置面板定制项，面板据此动态显示/隐藏 */
  customizer?: ThemeCustomizerCapability[]
}

// ─── 主题运行时 ───

/** 主题可覆盖的宿主组件插槽 */
export interface ThemeComponentSlots {
  PostCard: Component
  SidebarNav: Component
  StatusFooter: Component
  PageHeader: Component
  [key: string]: Component
}

/** 主题运行时产物：布局组件、可选组件覆盖与样式 tokens */
export interface BlogThemeRuntime {
  /** 主布局组件，必填 */
  layout: Component
  /** 特定路由可使用的子布局，键为路由 name 或 path 模式 */
  pageLayouts?: Partial<Record<string, Component>>
  /** 覆盖宿主默认组件 */
  components?: Partial<ThemeComponentSlots>
  /** 注入 CSS 自定义属性，键为变量名（含 --），值为 CSS 值 */
  tokens?: Record<string, string>
}

// ─── 主题 Manifest ───

/** 主题预览信息，用于主题设置面板展示 */
export interface ThemePreview {
  /** 预览封面图 URL */
  cover?: string
  /** 调色板色值数组，用于面板缩略展示 */
  palette?: string[]
}

/** 宿主与框架兼容性声明 */
export interface ThemeCompatibility {
  /** 宿主应用版本范围，semver range（如 '>=1.0.0'） */
  app: string
  /** Nuxt 版本范围，可选 */
  nuxt?: string
}

/**
 * 主题 Manifest：主题包的完整声明。
 * 包含元信息、能力、兼容性、默认值与异步加载入口。
 */
export interface BlogThemeManifest {
  /** 唯一标识符，如 'classic', 'docs', 'minimal' */
  id: string
  /** 显示名称 */
  name: string
  /** 版本号，semver 格式 */
  version: string
  /** 一句话描述 */
  description: string
  /** 作者 */
  author: string
  /** lucide 图标名，用于外观面板展示 */
  icon: string
  /** 父主题 ID，可选；启用后将继承父主题的 capabilities、defaults 等 */
  parent?: string
  /** 预览信息 */
  preview?: ThemePreview
  /** 兼容性声明 */
  compatibility: ThemeCompatibility
  /** 能力声明 */
  capabilities: ThemeCapabilities
  /** 设置项默认值 */
  defaults?: Partial<ThemeCustomizerState>
  /** 异步加载运行时产物 */
  load: () => Promise<BlogThemeRuntime>
}

// ─── 默认值 ───

export const DEFAULT_THEME_ID = 'classic'
