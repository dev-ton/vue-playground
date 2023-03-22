<template>
  <i-layout-header :class="['mainHeader', scrolledNav ? 'scrolled-nav' : '']">
    <i-navbar>
      <i-navbar-brand :to="{ name: 'home' }">
        <img src="@/assets/logo.svg" alt="V-playground" />
      </i-navbar-brand>
      <i-navbar-collapsible>
        <i-nav>
          <i-nav-item :to="{ name: 'home' }"> Home </i-nav-item>
          <i-dropdown trigger="hover" placement="bottom-start">
            <i-nav-item> Work </i-nav-item>
            <template #body>
              <i-dropdown-item :to="{ name: 'audio' }"> Audio Apps </i-dropdown-item>
              <i-dropdown-item :to="{ name: '' }"> Dashboards </i-dropdown-item>
              <i-dropdown-item :to="{ name: '' }"> Components </i-dropdown-item>
              <i-dropdown-item :to="{ name: 'creative' }"> Creative Coding </i-dropdown-item>
              <i-dropdown-item :to="{ name: 'animations' }"> Animations </i-dropdown-item>
            </template>
          </i-dropdown>
        </i-nav>
        <!-- <i-input placeholder="Let's find out!">
          <template #append>
            <i-button color="primary">
              <i-icon name="ink-search" />
            </i-button>
          </template>
        </i-input> -->
        <a class="color-mode" @click="setColorMode">
          <FaIcon icon="fa-solid fa-moon" v-if="colorMode === 'dark'" />
          <FaIcon icon="fa-solid fa-sun" v-else />
          <span class="_visually-hidden">
            <span>Toggle color mode</span>
          </span>
        </a>
        <i-button-group v-if="!isAuthenticated">
          <i-button :to="{ name: 'login' }">Login</i-button>
          <i-button :to="{ name: 'register' }">Register</i-button>
        </i-button-group>
        <div class="logged" v-else>
          <p>
            Logged as <span>{{ authStore.model?.username }}</span>
          </p>
          <!--TODO: type it, so it knows my User model structure-->
          <i-button @click="logout">Logout</i-button>
        </div>
      </i-navbar-collapsible>
    </i-navbar>
  </i-layout-header>
</template>
<script lang="ts" setup>
// TODO: - display header when scrolling up
import { ref, inject } from 'vue'
import { useEventListener } from '@vueuse/core'
import { authStore, isAuthenticated } from '@/api/context'
import type { Prototype } from '@inkline/inkline/plugin'

const scrolledNav = ref<boolean>(false)

const logout = () => {
  isAuthenticated.value = false
  authStore.clear()
}

useEventListener(window, 'scroll', () => {
  updateScroll()
})
const updateScroll = () => {
  const scrollPosition = window.scrollY
  if (scrollPosition > 50) {
    return (scrolledNav.value = true)
  }
  scrolledNav.value = false
}

const inkline = inject<Prototype>('inkline', {} as any)
const colorMode = ref(inkline.options.colorMode)

// Set the initial color mode value to determine the icon to be displayed
if (colorMode.value === 'system' && typeof window !== 'undefined') {
  colorMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Toggle between light and dark mode
const setColorMode = () => {
  const mode = colorMode.value === 'dark' ? 'light' : 'dark'

  inkline.options.colorMode = mode
  colorMode.value = mode
}
</script>
<style lang="scss" scoped>
.mainHeader {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: all ease-in-out 0.3s;
  color: #fff;
  top: 0;
  left: 0;
  transform: translateY(0);
}
.logo {
  display: flex;
  align-items: center;

  & img {
    width: 32px;
    height: 32px;
  }
}

.logged {
  display: flex;
  gap: 1rem;
  align-items: center;

  & > p > span {
    color: var(--color--secondary);
    font-weight: 600;
  }
}

.color-mode {
  cursor: pointer;
}

.scrolled-nav {
  transform: translateY(-100px);
}
</style>
