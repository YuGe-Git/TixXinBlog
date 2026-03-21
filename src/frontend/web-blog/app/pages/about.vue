<!--
  @file about.vue
  @description 关于我页面，展示个人信息、技能、经历和联系方式
  @author TixXin
  @since 2025-03-17
-->

<template>
  <div class="main-inner">
    <header class="about-header">
      <CommonSearchBox placeholder="搜索..." />
    </header>
    <CommonCustomScrollbar class="about-body" viewport-class="about-viewport">
      <AboutHero :profile="profile" />
      <AboutSkillBars :skills="skills" />
      <AboutExperienceTimeline :experiences="experiences" />
      <AboutContactCards :contacts="contacts" />
    </CommonCustomScrollbar>
    <ClientOnly>
      <Teleport to="#right-sidebar-target">
        <SidebarRightSidebar>
          <AboutHobbyCard :hobbies="hobbies" />
          <AboutReadingCard :books="readings" />
          <AboutDonateCard />
        </SidebarRightSidebar>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {
  mockProfile,
  mockSkills,
  mockExperiences,
  mockContacts,
  mockHobbies,
  mockReadings,
} from '~/features/about/mock'

const profile = mockProfile
const skills = mockSkills
const experiences = mockExperiences
const contacts = mockContacts
const hobbies = mockHobbies
const readings = mockReadings
</script>

<style lang="scss" scoped>
.about-header {
  padding: 1.5rem 2rem 0.5rem;
  display: flex;
  justify-content: flex-end;
}

.about-body {
  flex: 1;
  padding: 0;
}

:deep(.about-viewport) {
  padding: 1rem 2rem 2rem;
}
</style>
