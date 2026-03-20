<!--
  @file articles.vue
  @description 文章归档页面，时间线列表与侧栏统计
  @author TixXin
  @since 2026-03-20
-->

<template>
  <LayoutBlogShell>
    <template #left>
      <LayoutSidebarNav />
      <BlogSubscribeCard />
      <BlogThemeSwitcher />
    </template>

    <template #center>
      <header class="articles-header">
        <CommonSearchBox placeholder="搜索文章标题、内容..." />
      </header>
      <CommonPageHeader
        title="文章归档"
        subtitle="共 86 篇文章，持续记录中..."
        icon="lucide:archive"
      />
      <div class="articles-body">
        <ArticleArchiveTimeline :years="archiveYears" />
      </div>
    </template>

    <template #right>
      <SidebarRightSidebar>
        <ArticleArchiveStats
          :stats="archiveStats"
          :distribution="categoryDistribution"
        />
      </SidebarRightSidebar>
    </template>
  </LayoutBlogShell>
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
.articles-header {
  padding: 1.5rem 2rem 0.5rem;
  display: flex;
  justify-content: flex-end;
}

.articles-body {
  flex: 1;
  padding: 1.5rem 2rem 2rem;
  overflow-y: auto;
}
</style>
