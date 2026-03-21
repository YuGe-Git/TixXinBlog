<!--
  @file default.vue
  @description 博客默认布局，持有持久化的左侧栏、主内容卡片外壳与右侧栏容器，页面导航时仅内部内容参与过渡
  @author TixXin
  @since 2025-03-17
-->

<template>
  <div class="page-root">
    <div class="blog-grid">
      <aside class="aside-left" :class="sidebarAnimationClass">
        <LayoutSidebarNav />
        <BlogSubscribeCard />
      </aside>

      <div class="page-columns anim-fade-in-up anim-delay-2">
        <main class="main-content">
          <NuxtPage :transition="contentTransition" />
        </main>
        <aside id="right-sidebar-target" class="aside-right" />
      </div>
    </div>

    <div class="footer-row">
      <LayoutStatusFooter class="anim-fade-in-up anim-delay-5" />
      <div class="footer-appearance anim-fade-in-up anim-delay-5">
        <CommonAppearanceDrawer />
        <BlogAppearanceEntry />
      </div>
    </div>
    <LayoutMobileNav />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const {
  contentTransitionName,
  contentTransitionDuration,
  sidebarAnimationClass,
} = useAppearanceSettings()

/**
 * 导航前克隆右侧栏内容，让克隆元素播放退出动画。
 * Teleport 内容在 Transition 钩子触发前就会被 Vue 销毁，
 * 因此必须在 router.beforeEach 中提前捕获。
 */
router.beforeEach(() => {
  const target = document.getElementById('right-sidebar-target')
  const source = target?.firstElementChild as HTMLElement | null

  if (!target || !source) return

  const sourceRect = source.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const clone = source.cloneNode(true) as HTMLElement
  clone.classList.add('sidebar-leaving-clone')
  clone.style.left = `${sourceRect.left - targetRect.left}px`
  clone.style.top = `${sourceRect.top - targetRect.top}px`
  clone.style.width = `${sourceRect.width}px`
  clone.style.height = `${sourceRect.height}px`
  clone.style.right = 'auto'
  source.style.visibility = 'hidden'
  target.appendChild(clone)

  clone.addEventListener('animationend', () => {
    clone.remove()
  }, { once: true })
})

const contentTransition = computed(() => ({
  name: contentTransitionName.value,
  mode: 'out-in' as const,
  duration: contentTransitionDuration.value,
}))
</script>
