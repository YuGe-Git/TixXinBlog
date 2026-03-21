<!--
  @file links.vue
  @description 友链页面，展示友情链接、申请表单和友链须知
  @author TixXin
  @since 2025-03-17
-->

<template>
  <div class="main-inner">
    <CommonPageHeader
      title="友情链接"
      subtitle="互联网上志同道合的伙伴们"
      icon="lucide:link"
    >
      <template #action>
        <CommonSearchBox placeholder="搜索友链..." />
      </template>
    </CommonPageHeader>
    <CommonCustomScrollbar class="links-body" viewport-class="links-viewport">
      <LinkGrid :links="links" />
      <LinkForm />
    </CommonCustomScrollbar>
    <ClientOnly>
      <Teleport to="#right-sidebar-target">
        <SidebarRightSidebar>
          <LinkRules :rules="linkRules" />
          <LinkSiteInfoCard :info="siteInfo" />
        </SidebarRightSidebar>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { mockLinks, mockLinkRules, mockSiteInfo } from '~/features/link/mock'

const links = mockLinks
const linkRules = mockLinkRules
const siteInfo = mockSiteInfo
</script>

<style lang="scss" scoped>
.links-body {
  flex: 1;
  padding: 0;
}

:deep(.links-viewport) {
  padding: 2rem;
}
</style>
