<!--
  @file default.vue
  @description 博客默认布局，作为薄代理层动态渲染当前激活的布局主题组件
  @author TixXin
  @since 2025-03-17
-->

<template>
  <component :is="activeLayout" :key="activeTheme.id" />
</template>

<script setup lang="ts">
const { activeTheme, activeLayout } = useLayoutTheme()
</script>
