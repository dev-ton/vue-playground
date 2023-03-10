<template>
  <Transition name="panel" appear>
    <i-sidebar placement="right" :class="['sidebar', { active: inputs.length > 0 }]">
      <i-nav vertical>
        <div v-if="inputs.length === 0">
          <p>No inputs found</p>
        </div>
        <template v-else>
          <i-nav-item v-for="(input, index) in inputs" :key="input.name + index" @click="fireInput(index)" class="item">
            {{ input.name }}
          </i-nav-item>
        </template>
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
.sidebar {
  opacity: 0.3;
  transition: opacity ease 0.5s;
}
.active {
  opacity: 1;
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
  opacity: 0.3;
}
</style>
