<template>
  <i-layout-header :class="['mainHeader', scrolledNav ? 'scrolled-nav' : '']">
    <i-navbar>
      <i-navbar-brand :to="{ name: 'home' }">
        <img src="@/assets/logo.svg" alt="V-playground" />
      </i-navbar-brand>
      <i-navbar-collapsible>
        <i-nav>
          <i-nav-item :to="{ name: 'home' }"> Home </i-nav-item>
          <i-nav-item :to="{ name: '' }"> Music Apps </i-nav-item>
          <i-nav-item :to="{ name: '' }"> Dashboards </i-nav-item>
          <i-nav-item :to="{ name: '' }"> Components </i-nav-item>
          <i-nav-item :to="{ name: '' }"> Creative Coding </i-nav-item>
          <i-nav-item :to="{ name: 'animations' }"> Animations </i-nav-item>
        </i-nav>
        <!-- <i-input placeholder="Let's find out!">
          <template #append>
            <i-button color="primary">
              <i-icon name="ink-search" />
            </i-button>
          </template>
        </i-input> -->
        <i-button-group v-if="!userState">
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
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { authStore, userState } from '@/api/context'

const scrolledNav = ref<boolean>(false)

const logout = () => {
  userState.value = false
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

.scrolled-nav {
  transform: translateY(-100px);
}
</style>
