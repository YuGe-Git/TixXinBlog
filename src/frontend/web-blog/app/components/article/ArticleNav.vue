<!--
  @file ArticleNav.vue
  @description 文章详情页上一篇 / 下一篇导航卡片
  @author TixXin
  @since 2026-03-20
-->

<template>
  <nav class="article-nav" aria-label="相邻文章">
    <NuxtLink to="/articles/2" class="article-nav__card article-nav__card--prev">
      <Icon name="lucide:chevron-left" size="20" class="article-nav__icon" />
      <div class="article-nav__text">
        <p class="article-nav__label">上一篇</p>
        <p class="article-nav__title">{{ prevTitle }}</p>
      </div>
    </NuxtLink>
    <NuxtLink to="/articles/3" class="article-nav__card article-nav__card--next">
      <div class="article-nav__text">
        <p class="article-nav__label">下一篇</p>
        <p class="article-nav__title">{{ nextTitle }}</p>
      </div>
      <Icon name="lucide:chevron-right" size="20" class="article-nav__icon" />
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
/** 与原型一致的硬编码标题，后续可改为 props + API */
const prevTitle = '关于现代化个人博客交互设计的几个思考法则'
const nextTitle = '零成本使用 GitHub Actions 实现流水线自动化构建部署'
</script>

<style lang="scss" scoped>
.article-nav {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-soft);

  @media (min-width: $breakpoint-sm) {
    grid-template-columns: 1fr 1fr;
  }
}

.article-nav__card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: $radius-md;
  border: 1px solid var(--border-soft);
  background: var(--surface-1);
  text-decoration: none;
  color: inherit;
  transition: $transition-fast;
  box-shadow: var(--shadow-card);

  &:hover {
    border-color: var(--border-hover);
    box-shadow: var(--shadow-card-hover);
  }

  &--next {
    text-align: right;
    justify-content: flex-end;
  }
}

.article-nav__icon {
  flex-shrink: 0;
  color: var(--text-soft);
  transition: transform 0.2s ease;

  .article-nav__card--prev:hover & {
    transform: translateX(-4px);
    color: var(--text-muted);
  }

  .article-nav__card--next:hover & {
    transform: translateX(4px);
    color: var(--text-muted);
  }
}

.article-nav__text {
  min-width: 0;
}

.article-nav__label {
  margin: 0 0 0.125rem;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-soft);
}

.article-nav__title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .article-nav__card:hover & {
    color: var(--text-main);
  }
}
</style>
