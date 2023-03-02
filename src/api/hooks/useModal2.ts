import { ref, onMounted, defineAsyncComponent, h } from 'vue'

export default function useModal(componentName: String) {
  const isVisible = ref(false)

  const open = () => {
    isVisible.value = true
  }

  const close = () => {
    isVisible.value = false
  }

  const ModalComponent = defineAsyncComponent(() => import(`@/components/${componentName}.vue`))

  onMounted(() => {
    // Dynamically create a div element for the modal
    const modalElement = document.createElement('div')
    document.body.appendChild(modalElement)

    // Render the modal using teleport and the ModalComponent
    h(
      ModalComponent,
      {
        onClose: close,
      },
      null
    )

    h(
      'Teleport',
      {
        to: modalElement,
      },
      isVisible.value && ModalComponent ? h(ModalComponent, { onClose: close }) : null
    )
  })

  return {
    isVisible,
    open,
    close,
  }
}
