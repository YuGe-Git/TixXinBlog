/**
 * @file useSiteInfo.ts
 * @description 站点信息数据源 composable，封装页脚链接、技术栈和状态获取逻辑（当前返回 mock，后续替换为 API）
 * @author TixXin
 * @since 2026-03-26
 */

import type { FooterLink, PoweredByItem, SiteStatus } from '~/features/site/types'
import { mockFooterLinks, mockPoweredBy, mockSiteStatus } from '~/features/site/mock'

/** 获取站点页脚信息 */
export function useSiteInfo() {
  const footerLinks = computed<FooterLink[]>(() => mockFooterLinks)
  const poweredBy = computed<PoweredByItem[]>(() => mockPoweredBy)
  const siteStatus = computed<SiteStatus>(() => mockSiteStatus)

  return {
    footerLinks,
    poweredBy,
    siteStatus,
  }
}
