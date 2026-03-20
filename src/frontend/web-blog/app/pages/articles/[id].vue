<!--
  @file [id].vue
  @description 文章详情页：正文、目录、评论与相关推荐
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
      <CommonReadingProgress :progress="progress" />
      <div ref="scrollRoot" class="article-page">
        <ArticleStickyHeader
          :title="article.title"
          :category="article.category"
          :date="article.date"
          :read-time="article.readTime"
        />
        <div class="article-page__inner">
          <div class="article-page__cover-wrap">
            <img
              :src="article.cover"
              :alt="article.title"
              class="article-page__cover"
              loading="lazy"
            >
          </div>
          <div class="article-page__stats">
            <span class="article-page__stat">
              <Icon name="lucide:eye" size="14" />
              {{ formatCount(article.views) }}
            </span>
            <span class="article-page__stat">
              <Icon name="lucide:heart" size="14" />
              {{ article.likes }}
            </span>
            <span class="article-page__stat">
              <Icon name="lucide:message-circle" size="14" />
              {{ article.comments }}
            </span>
          </div>
          <ArticleContent :sections="article.content" />
          <ArticleNav />
          <ArticleCommentSection :comments="comments" />
        </div>
      </div>
    </template>

    <template #right>
      <SidebarRightSidebar>
        <ArticleTableOfContents :items="tocItems" :active-id="activeId" />
        <ArticleRelatedPosts :posts="relatedPosts" />
        <AboutDonateCard />
      </SidebarRightSidebar>
    </template>
  </LayoutBlogShell>
</template>

<script setup lang="ts">
import {
  mockArticleDetail,
  mockComments,
  mockRelatedPosts,
  mockTocItems,
} from '~/features/post/mock'

const route = useRoute()
const scrollRoot = ref<HTMLElement | null>(null)

const article = computed(() => {
  // 当前仅 mock 一篇详情，任意 id 先复用同一份数据便于联调 UI
  void route.params.id
  return mockArticleDetail
})

const comments = mockComments
const tocItems = mockTocItems
const relatedPosts = mockRelatedPosts

const { progress } = useReadingProgress(scrollRoot)
const { activeId } = useTableOfContents(tocItems)

function formatCount(n: number) {
  return n.toLocaleString('zh-CN')
}

useHead(() => ({
  title: `${article.value.title} - TixXin Blog`,
}))
</script>

<style lang="scss" scoped>
.article-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
}

.article-page__inner {
  padding: 0 2rem 2rem;
}

.article-page__cover-wrap {
  width: 100%;
  height: 240px;
  border-radius: $radius-md;
  overflow: hidden;
  margin-bottom: 1.5rem;

  @media (min-width: $breakpoint-sm) {
    height: 320px;
  }
}

.article-page__cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-page__stats {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.8125rem;
  color: var(--text-soft);
}

.article-page__stat {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}
</style>
