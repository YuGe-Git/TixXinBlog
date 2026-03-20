<!--
  @file app.vue
  @description Nuxt 应用根组件，挂载布局与页面，配置页面切换过渡动画
  @author TixXin
  @since 2025-03-17
-->

<template>
  <NuxtLayout>
    <NuxtPage :transition="pageTransition" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const pageTransition = {
  name: 'page',
  mode: 'out-in' as const,
  duration: 300,
}
</script>
