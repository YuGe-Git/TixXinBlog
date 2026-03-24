<!--
  @file AppearanceEntry.vue
  @description 界面设置齿轮按钮，经典主题嵌入底部栏，docs/minimal 主题嵌入顶栏
  @author TixXin
  @since 2026-03-20
-->

<template>
  <CommonTooltip content="界面设置" placement="top">
    <button
      class="appearance-fab"
      :class="{ 'appearance-fab--open': isDrawerOpen }"
      type="button"
      aria-label="界面设置"
      @click="toggleDrawer"
    >
      <Icon name="lucide:settings" size="18" class="appearance-fab__icon" />
    </button>
  </CommonTooltip>
</template>

<script setup lang="ts">
const { isDrawerOpen, toggleDrawer } = useAppearanceSettings()
</script>

<style lang="scss" scoped>
button.appearance-fab {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: $radius-sm;
  color: var(--text-soft);
  cursor: pointer;
  transition: $transition-fast;
  background: transparent;
  border: none;
  box-shadow: none;
  outline: none;

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent);
    border-radius: $radius-sm;
  }

  &:hover {
    color: var(--text-main);
    background: var(--surface-2);
  }

  &:active {
    transform: scale(0.92);
  }

  &--open {
    color: var(--text-main);
  }

  // 经典主题 footer 内：填满 .footer-appearance 容器
  :global(.footer-appearance) & {
    width: 100%;
    height: 100%;
    border-radius: 0;
    background: transparent;

    &:hover {
      background: transparent;
    }

    @media (min-width: $breakpoint-xl) {
      position: static;
      flex: 0 0 auto;
      align-self: center;
      width: auto;
      height: 100%;
      max-height: 100%;
      aspect-ratio: 1;
      min-width: 0;
    }
  }
}

.appearance-fab__icon {
  transition: transform 0.3s ease;

  .appearance-fab:hover & {
    transform: rotate(45deg);
  }

  .appearance-fab--open & {
    transform: rotate(90deg);
  }
}
</style>
