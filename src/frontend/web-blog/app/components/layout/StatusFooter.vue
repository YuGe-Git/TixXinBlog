<!--
  @file StatusFooter.vue
  @description 站点底部页脚组件，展示版权信息、链接和系统状态
  @author TixXin
  @since 2025-03-17
-->

<template>
  <footer class="site-footer">
    <div class="footer__left">
      <span>&copy; {{ currentYear }} TixXin Blog. All rights reserved.</span>
      <div class="footer__links">
        <a v-for="link in footerLinks" :key="link.label" :href="link.href">{{ link.label }}</a>
      </div>
    </div>
    <div class="footer__right">
      <div class="footer__powered">
        <span>Powered by</span>
        <template v-for="(item, idx) in poweredBy" :key="item.label">
          <span v-if="idx > 0">&amp;</span>
          <a :href="item.href" class="font-semibold" target="_blank" rel="noopener">{{ item.label }}</a>
        </template>
      </div>
      <div class="footer__divider" />
      <CommonTooltip content="服务器延迟" placement="top">
        <div class="footer__status">
          <span class="footer__ping"><Icon name="lucide:activity" size="12" /> PING {{ siteStatus.pingMs }}ms</span>
          <span class="footer__dot" />
          <span class="footer__operational">{{ siteStatus.statusText }}</span>
        </div>
      </CommonTooltip>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
const { footerLinks, poweredBy, siteStatus } = useSiteInfo()
</script>

<style lang="scss" scoped>
.footer__left,
.footer__right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--text-muted);
}

.footer__links {
  display: flex;
  align-items: center;
  gap: 1rem;

  a {
    transition: color 0.2s;

    &:hover {
      color: var(--text-main);
    }
  }
}

.footer__powered {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  a {
    color: var(--text-main);
    transition: color 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
}

.footer__divider {
  width: 1px;
  height: 1rem;
  background: var(--border);
}

.footer__status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer__ping {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: $radius-full;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.footer__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--stat-green-dot);
  box-shadow: 0 0 0 2px var(--stat-green-bg);
  animation: pulse-dot 2s infinite;
}

.footer__operational {
  color: var(--stat-green);
  font-weight: 500;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 2px var(--stat-green-bg); }
  50% { box-shadow: 0 0 0 6px transparent; }
}
</style>
