<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Rive, Layout, StateMachineInput } from '@rive-app/canvas'
import type { Fit, Alignment } from '@rive-app/canvas'

const props = defineProps<{
  src: string
  fit?: Fit
  alignment?: Alignment
  stateMachine?: string
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const riveRef = ref<Rive | null>(null)
const isMounted = ref(false)

let input: StateMachineInput

onMounted(() => {
  const r = new Rive({
    canvas: canvasRef.value,
    src: props.src,
    layout: new Layout({
      fit: props.fit,
      alignment: props.alignment,
    }),
    autoplay: true,
    stateMachines: props.stateMachine,
    onLoad: () => {
      if (props.stateMachine) {
        input = r.stateMachineInputs(props.stateMachine)[0]
      }
    },
  })
  r.resizeDrawingSurfaceToCanvas()
  riveRef.value = r
  isMounted.value = true
})

console.log(riveRef)

const trigger = () => {
  input.fire()
}

defineExpose({
  trigger,
})
</script>
