<template>
  <Transition name="panel" appear>
    <Loader v-if="!inputs" color="primary" />
    <i-sidebar v-else placement="right">
      <i-nav vertical>
        <i-nav-item v-for="(input, index) in inputs" :key="input.name + index" @click="fireInput(index)" class="item">
          {{ input.name }}
        </i-nav-item>
      </i-nav>
    </i-sidebar>
  </Transition>
</template>
<script lang="ts" setup>
import type { StateMachineInput } from '@rive-app/canvas'
const props = defineProps<{
  inputs: StateMachineInput[]
}>()

const emit = defineEmits<{
  (e: 'fireInput', index: number): void
}>()

const fireInput = (index: number) => {
  emit('fireInput', index)
}

console.log(props.inputs)
</script>
<style lang="scss" scoped>
.item {
  cursor: pointer;
}
.panel-enter-from,
.panel-fade-leave-to {
  opacity: 0;
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 200ms;
}

.panel-enter-to,
.panel-leave-from {
  opacity: 1;
}
</style>
