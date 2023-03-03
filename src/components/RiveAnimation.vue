<template>
  <Loader v-if="isLoading" />
  <div v-show="!isLoading" class="container">
    <div>
      <canvas ref="canvasRef" style="width: 500px; height: 500px"></canvas>
    </div>
    <div>
      <InputsPanel :key="componentKey" :inputs="inputs" @fireInput="(i) => inputs[i].fire()" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Rive, Layout, StateMachineInput } from '@rive-app/canvas'
import type { Fit, Alignment } from '@rive-app/canvas'
import InputsPanel from '@/components/InputsPanel.vue'
import Loader from '@/components/Loader.vue'

const props = defineProps<{
  src: string
  fit?: Fit
  alignment?: Alignment
  stateMachine?: string
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const riveRef = ref<Rive | null>(null)
const isLoading = ref(true)
const componentKey = ref(0)

let inputs: StateMachineInput[] = []

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
        r.stateMachineInputs(props.stateMachine).forEach((input) => {
          inputs.push(input)
        })
      }
    },
  })
  r.resizeDrawingSurfaceToCanvas()
  riveRef.value = r
  isLoading.value = false
})

const forceRerender = () => {
  componentKey.value += 1
}

setTimeout(() => {
  forceRerender()
}, 200)
</script>
<style lang="scss" scoped>
.container {
  min-width: 1024px;
  display: flex;
  & > div:first-child {
    width: 85%;
  }
  & > div:nth-child(2) {
    width: 15%;
    align-self: stretch;
    background-color: dimgray;
  }
}
</style>
