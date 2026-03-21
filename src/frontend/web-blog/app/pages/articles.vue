<!--
  @file articles.vue
  @description 文章归档页面，时间线列表与侧栏统计
  @author TixXin
  @since 2026-03-20
-->

<template>
  <div class="main-inner">
    <CommonPageHeader
      title="文章归档"
      subtitle="共 86 篇文章，持续记录中..."
      icon="lucide:archive"
    >
      <template #action>
        <CommonSearchBox placeholder="搜索文章标题、内容..." />
      </template>
    </CommonPageHeader>
    <CommonCustomScrollbar class="articles-body" viewport-class="articles-viewport">
      <ArticleArchiveTimeline :years="archiveYears" />
    </CommonCustomScrollbar>
    <ClientOnly>
      <Teleport to="#right-sidebar-target">
        <SidebarRightSidebar>
          <ArticleArchiveStats
            :stats="archiveStats"
            :distribution="categoryDistribution"
          />
        </SidebarRightSidebar>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {
  mockArchiveStats,
  mockArchiveYears,
  mockCategoryDistribution,
} from '~/features/article/mock'

const archiveYears = mockArchiveYears
const archiveStats = mockArchiveStats
const categoryDistribution = mockCategoryDistribution
</script>

<style lang="scss" scoped>
.articles-body {
  flex: 1;
  padding: 0;
}

:deep(.articles-viewport) {
  padding: 1.5rem 2rem 2rem;
}
</style>
