<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="overlay" v-if="props.visible">
        <div>
          <div ref="target" class="dialog" role="dialog" aria-modal="true">
            <div class="top-panel">
              <h2>{{ title }}</h2>
              <FaIcon class="close" icon="fa-solid fa-xmark" @click="close" />
            </div>
            <div class="content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script lang="ts">
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
// TODO:
// - i tried to defineExpose instead export useModal but it didn't work

interface ModalApi {
  hideModal: () => void
  showModal: () => void
  visible: boolean
}

const show = ref<boolean>(false)

export const useModal = (): ModalApi => {
  return new Proxy<ModalApi>(Object.create(null), {
    get(obj, prop) {
      if (prop === 'visible') {
        return computed(() => show.value)
      }
      if (prop === 'hideModal') {
        return () => (show.value = false)
      }
      if (prop === 'showModal') {
        return () => (show.value = true)
      }
    },
  })
}
</script>
<script lang="ts" setup>
const props = defineProps<{
  visible: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => {
  emit('close')
}

const target = ref(null)

onClickOutside(target, (event) => close())
</script>
<style lang="scss" scoped>
.overlay {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 101;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
  }
}
.dialog {
  background-color: #2e2e2e;
  color: #000;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  & > .top-panel {
    background-color: #423e3e;
    color: rgb(28, 28, 28);
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    width: 100%;
    border-radius: 24px 24px 0 0;
    align-items: center;

    & > .close {
      cursor: pointer;
      transition: color ease-in-out 0.3s;
      width: 24px;
      height: 24px;

      &:hover {
        color: #fff;
      }
    }

    & > h2 {
      margin-top: 0;
      margin-bottom: 0;
      color: #fff;
    }
  }

  & > .content {
    padding: 1rem;
    width: 100%;
  }
}
.animation-mode {
  width: 500px;
  height: 500px;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.fade-out {
  opacity: 0;
}
</style>
