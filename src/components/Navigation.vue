<template>
  <header :class="['mainHeader', scrolledNav ? 'scrolled-nav' : '']">
    <nav aria-label="primary navigation">
      <div class="logo">
        <RouterLink :to="{ name: 'home' }">
          <img src="@/assets/logo.svg" alt="" />
        </RouterLink>
      </div>
      <ul v-show="!mobile" class="navigation">
        <li><RouterLink :to="{ name: 'home' }" class="navLink">Home</RouterLink></li>
        <li><RouterLink :to="{ name: '' }" class="navLink">Dashboards</RouterLink></li>
        <li><RouterLink :to="{ name: '' }" class="navLink">Components</RouterLink></li>
        <li><RouterLink :to="{ name: 'animations' }" class="navLink">Animations</RouterLink></li>
      </ul>
      <div v-show="mobile" :class="['icon', mobileNav ? 'active' : '']" @click="toggleMobileNav">
        <FaIcon v-if="mobileNav" icon="fa-solid fa-xmark" />
        <FaIcon v-else icon="fa-solid fa-bars" />
      </div>
      <Transition name="mobile-tr">
        <ul v-show="mobileNav" class="mobile-nav">
          <li><RouterLink :to="{ name: 'home' }" class="navLink">Home</RouterLink></li>
          <li><RouterLink :to="{ name: '' }" class="navLink">Dashboards</RouterLink></li>
          <li><RouterLink :to="{ name: '' }" class="navLink">Components</RouterLink></li>
          <li><RouterLink :to="{ name: 'animations' }" class="navLink">Animations</RouterLink></li>
        </ul>
      </Transition>
      <!-- TODO: Add search-->
    </nav>
  </header>
</template>
<script lang="ts" setup>
// TODO: this component needs a lot of refactoring
// - better mobile nav icon animation
// - navigation should be separate component
// - improve styling when I settle the brand style
// - display header when scrolling up
import { RouterLink } from 'vue-router'
import { ref, onBeforeMount } from 'vue'
import { useEventListener } from '@vueuse/core'

const mobile = ref<boolean>(true)
const mobileNav = ref<boolean>(true)
const scrolledNav = ref<boolean>(false)
const windowWidth = ref<number | null>(null)

onBeforeMount(() => {
  checkScreen()
})

useEventListener(window, 'resize', () => {
  checkScreen()
})
useEventListener(window, 'scroll', () => {
  updateScroll()
})

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value
}

const checkScreen = () => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value <= 750) {
    return (mobile.value = true)
  }
  mobile.value = false
  mobileNav.value = false
}

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

  nav {
    display: flex;
    flex-direction: row;
    padding: 1rem 0;
    transition: all ease-in-out 0.3s;
    width: 90%;
    margin: 0 auto;
    position: relative;

    @media (min-width: 1140px) {
      max-width: 1140px;
    }

    & > ul,
    .navLink {
      font-weight: 500;
      color: #fff;
      text-decoration: none;
      list-style: none;
    }

    li {
      padding: 16px;
      text-transform: uppercase;
      margin-left: 16px;
    }

    .navLink {
      font-size: 14px;
      transition: all ease-in-out 0.3s;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        color: rgb(75, 202, 61);
        border-color: rgb(75, 202, 61);
      }
    }

    .logo {
      display: flex;
      align-items: center;

      & img {
        width: 32px;
        height: 32px;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }
    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;
      z-index: 101;

      & > svg {
        cursor: pointer;
        width: 32px;
        height: 32px;
        transition: all ease-in-out 0.6s;
      }

      &.active > svg {
        transform: rotate(180deg);
      }
    }
    .mobile-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100vh;
      background-color: darkslategrey;
      top: 0;
      right: 0;
      text-align: left;
      justify-content: flex-start;
      padding-top: 100px;

      li {
        margin-left: 0;
        .navLink {
          color: #fff;
        }
      }
    }
    .mobile-tr-enter-active,
    .mobile-tr-leave-active {
      transition: all ease-in-out 0.5s;
    }
    .mobile-tr-enter-from,
    .mobile-tr-leave-to {
      transform: translateX(250px);
      opacity: 0;
    }
    .mobile-tr-enter-to {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
.scrolled-nav {
  transform: translateY(-100px);
}
</style>
