/**
 * @file useLayoutTheme.ts
 * @description 管理当前激活的布局主题，支持运行时切换和 cookie 持久化
 * @author TixXin
 * @since 2026-03-24
 */

import type { Component } from 'vue'
import type { BlogThemeManifest } from '~/themes/contracts'
import { DEFAULT_THEME_ID } from '~/themes/contracts'
import {
  getCachedRuntime,
  getRegisteredThemes,
  isThemeRegistered,
  registerBuiltinThemesSync,
  resolveManifest,
  resolveRuntime,
} from '~/themes/registry'

export type ThemeSwitchState = 'idle' | 'loading' | 'error'

const COOKIE_KEY = 'tixxin-blog-layout-theme'

function ensureThemesRegistered() {
  if (!isThemeRegistered('classic')) {
    registerBuiltinThemesSync()
  }
}

export function useLayoutTheme() {
  ensureThemesRegistered()

  const currentThemeId = useCookie<string>(COOKIE_KEY, {
    default: () => DEFAULT_THEME_ID,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    watch: true,
  })

  if (!isThemeRegistered(currentThemeId.value)) {
    currentThemeId.value = DEFAULT_THEME_ID
  }

  /** 主题切换状态：idle / loading / error */
  const switchingState = useState<ThemeSwitchState>('layout-theme-switch-state', () => 'idle')

  const activeTheme = computed<BlogThemeManifest>(() => resolveManifest(currentThemeId.value))

  const availableThemes = computed<BlogThemeManifest[]>(() => getRegisteredThemes())

  /** 当前激活主题的布局组件（内置主题同步可用） */
  const activeLayout = computed<Component>(() => {
    const runtime = getCachedRuntime(currentThemeId.value)
    if (runtime) return runtime.layout
    return getCachedRuntime(DEFAULT_THEME_ID)!.layout
  })

  /**
   * 切换布局主题：已缓存时同步切换，未缓存时异步加载。
   * 加载期间 switchingState 为 'loading'，失败则为 'error'，
   * 保持当前主题不变，不会闪白屏。
   */
  async function setLayoutTheme(id: string) {
    if (!isThemeRegistered(id)) return

    if (getCachedRuntime(id)) {
      currentThemeId.value = id
      switchingState.value = 'idle'
      return
    }

    switchingState.value = 'loading'
    try {
      await resolveRuntime(id)
      currentThemeId.value = id
      switchingState.value = 'idle'
    }
    catch {
      switchingState.value = 'error'
    }
  }

  /**
   * 预加载主题 runtime（hover 预热）。
   * 静默执行，不影响当前主题，失败不抛出。
   */
  function preloadTheme(id: string) {
    if (getCachedRuntime(id)) return
    resolveRuntime(id).catch(() => {})
  }

  /** 禁用当前主题并回退到默认 */
  function disableCurrentTheme() {
    currentThemeId.value = DEFAULT_THEME_ID
    switchingState.value = 'idle'
  }

  return {
    currentThemeId,
    activeTheme,
    activeLayout,
    availableThemes,
    switchingState,
    setLayoutTheme,
    preloadTheme,
    disableCurrentTheme,
  }
}
