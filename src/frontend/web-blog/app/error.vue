<!--
  @file error.vue
  @description Nuxt 全局错误页面，独立渲染，根据状态码展示对应提示
  @author TixXin
  @since 2026-03-23
-->

<template>
  <div class="error-page">
    <div class="error-page__card">
      <CommonStateBlock
        :icon="errorConfig.icon"
        :title="errorConfig.title"
        :description="errorConfig.description"
        :status-code="error?.statusCode"
        action-label="返回首页"
        @action="handleError"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const errorConfig = computed(() => {
  const code = props.error?.statusCode ?? 500

  if (code === 404) {
    return {
      icon: 'lucide:search-x',
      title: '页面未找到',
      description: '你访问的页面不存在或已被移除，请检查链接是否正确',
    }
  }

  if (code >= 500) {
    return {
      icon: 'lucide:server-crash',
      title: '服务器错误',
      description: '服务器遇到了问题，请稍后再试',
    }
  }

  return {
    icon: 'lucide:alert-triangle',
    title: '出错了',
    description: props.error?.message || '发生了未知错误',
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 2rem;
  background: var(--bg);
  background-image: radial-gradient(var(--bg-dot) 1px, transparent 1px);
  background-size: var(--bg-dot-size) var(--bg-dot-size);
}

.error-page__card {
  width: 100%;
  max-width: 28rem;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: $radius-lg;
  box-shadow: var(--shadow-card);
  padding: 2rem 1.5rem;
}
</style>
