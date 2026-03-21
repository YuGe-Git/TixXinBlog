<!--
  @file [id].vue
  @description 文章详情页：正文、目录、评论与相关推荐
  @author TixXin
  @since 2026-03-20
-->

<template>
  <div class="main-inner">
    <CommonReadingProgress :progress="progress" />
    <CommonCustomScrollbar ref="scrollbarRef" class="article-page" viewport-class="article-viewport">
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
    </CommonCustomScrollbar>
    <ClientOnly>
      <Teleport to="#right-sidebar-target">
        <SidebarRightSidebar>
          <ArticleTableOfContents :items="tocItems" :active-id="activeId" />
          <ArticleRelatedPosts :posts="relatedPosts" />
          <AboutDonateCard />
        </SidebarRightSidebar>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {
  mockArticleDetail,
  mockComments,
  mockRelatedPosts,
  mockTocItems,
} from '~/features/post/mock'

const route = useRoute()
const scrollbarRef = ref<{ viewport: Ref<HTMLElement | null> } | null>(null)
const scrollRoot = computed(() => scrollbarRef.value?.viewport.value ?? null)

const article = computed(() => {
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
  min-height: 0;
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
