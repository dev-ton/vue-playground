<template>
  <Teleport to="#modal">
    <Transition>
      <div class="overlay">
        <div>
          <div class="dialog" role="dialog" aria-modal="true">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
const show = ref(false)
interface ModalApi {
  hideModal: () => void
  showModal: () => void
  visible: boolean
}
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
export default defineComponent({
  setup() {
    const modal = useModal()
    const style = computed(() => {
      return {
        display: show.value ? 'block' : 'none',
      }
    })
    return {
      style,
      hide: modal.hideModal,
    }
  },
})
</script>
<style lang="scss" scoped>
.overlay {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.501);
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
  padding: 1rem;

  & > .actions {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    color: #fff;
  }
}
.btn.secondary {
  border: 1px solid #000;
  background: #fff;
  color: #000;
  margin-right: 1rem;
}
</style>
