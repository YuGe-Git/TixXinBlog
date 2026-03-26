/**
 * @file types.ts
 * @description 布局主题类型入口：重导出新契约体系，并保留旧接口别名实现向后兼容
 * @author TixXin
 * @since 2026-03-24
 */

export type {
  BlogThemeManifest,
  BlogThemeRuntime,
  ThemeCapabilities,
  ThemeCustomizerCapability,
  ThemeCustomizerState,
  ThemeComponentSlots,
  ThemePreview,
  ThemeCompatibility,
} from './contracts'

export { DEFAULT_THEME_ID } from './contracts'

// ─── 向后兼容 ───

import type { BlogThemeManifest } from './contracts'

/** @deprecated 使用 BlogThemeManifest 替代 */
export type BlogLayoutTheme = BlogThemeManifest

/** 内置主题 ID 常量 */
export const LAYOUT_THEME_PRESETS = ['classic', 'docs', 'minimal'] as const
export type LayoutThemePreset = typeof LAYOUT_THEME_PRESETS[number]

/** @deprecated 使用 DEFAULT_THEME_ID 替代 */
export const DEFAULT_LAYOUT_THEME: LayoutThemePreset = 'classic'
