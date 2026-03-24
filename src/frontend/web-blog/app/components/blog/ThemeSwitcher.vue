<!--
  @file ThemeSwitcher.vue
  @description 顶栏颜色主题切换按钮，循环切换 light → system → dark
  @author TixXin
  @since 2026-03-24
-->

<template>
  <button
    type="button"
    class="theme-switcher"
    :aria-label="`切换主题（当前：${label}）`"
    @click="cycleTheme"
  >
    <Icon :name="icon" size="18" />
  </button>
</template>

<script setup lang="ts">
import { COLOR_MODE_LABELS } from '~/features/theme/types'

const { currentPreference, setTheme, themeOptions } = useTheme()

const icon = computed(() => {
  const icons: Record<string, string> = {
    light: 'lucide:sun',
    system: 'lucide:monitor',
    dark: 'lucide:moon',
  }
  return icons[currentPreference.value] ?? 'lucide:monitor'
})

const label = computed(() => COLOR_MODE_LABELS[currentPreference.value])

function cycleTheme() {
  const idx = themeOptions.indexOf(currentPreference.value)
  const next = themeOptions[(idx + 1) % themeOptions.length]
  setTheme(next)
}
</script>

<style lang="scss" scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: $radius-sm;
  color: var(--text-soft);
  transition: $transition-fast;

  &:hover {
    color: var(--text-main);
    background: var(--surface-2);
  }

  &:active {
    transform: scale(0.92);
  }
}
</style>
