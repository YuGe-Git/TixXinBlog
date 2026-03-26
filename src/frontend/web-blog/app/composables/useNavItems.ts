/**
 * @file useNavItems.ts
 * @description 导航数据源 composable，封装导航菜单项获取逻辑（当前返回 mock，后续替换为 API）
 * @author TixXin
 * @since 2026-03-26
 */

import type { NavItem } from '~/features/nav/types'
import { mockNavItems } from '~/features/nav/mock'

/** 获取导航菜单项（全量，含 desktopOnly 标记） */
export function useNavItems() {
  const navItems = computed<NavItem[]>(() => mockNavItems)

  /** 仅返回移动端可见的导航项（过滤掉 desktopOnly） */
  const mobileNavItems = computed<NavItem[]>(() =>
    navItems.value.filter(item => !item.desktopOnly),
  )

  return {
    navItems,
    mobileNavItems,
  }
}
