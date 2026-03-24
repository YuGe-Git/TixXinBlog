/**
 * @file useLayoutTheme.ts
 * @description 管理当前激活的布局主题，支持运行时切换和 cookie 持久化
 * @author TixXin
 * @since 2026-03-24
 */

import type { BlogLayoutTheme } from '~/themes/types'
import { DEFAULT_LAYOUT_THEME, LAYOUT_THEME_PRESETS } from '~/themes/types'
import { getRegisteredThemes, isThemeRegistered, registerBuiltinThemesSync, resolveTheme } from '~/themes/registry'

const COOKIE_KEY = 'tixxin-blog-layout-theme'

function ensureThemesRegistered() {
  if (!isThemeRegistered('classic')) {
    registerBuiltinThemesSync()
  }
}

export function useLayoutTheme() {
  ensureThemesRegistered()

  // useCookie 在 SSR 和 CSR 均可读写，消除水合不匹配
  const currentThemeId = useCookie<string>(COOKIE_KEY, {
    default: () => DEFAULT_LAYOUT_THEME,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    watch: true,
  })

  // 校验 cookie 值合法性，非法则回退默认
  if (!LAYOUT_THEME_PRESETS.includes(currentThemeId.value as any)) {
    currentThemeId.value = DEFAULT_LAYOUT_THEME
  }

  const activeTheme = computed<BlogLayoutTheme>(() => resolveTheme(currentThemeId.value))

  const availableThemes = computed<BlogLayoutTheme[]>(() => getRegisteredThemes())

  function setLayoutTheme(id: string) {
    currentThemeId.value = id
  }

  return {
    currentThemeId,
    activeTheme,
    availableThemes,
    setLayoutTheme,
  }
}
