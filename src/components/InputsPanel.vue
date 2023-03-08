<template>
  <Transition name="panel" appear>
    <ul>
      <li v-if="!inputs">Loading ...</li>
      <li v-for="(input, index) in inputs" :key="input.name + index" @click="fireInput(index)">
        {{ input.name }}
      </li>
    </ul>
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
ul {
  list-style: none;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  padding: 0;
  & > li {
    background-color: rgb(27, 27, 27);
    padding: 1rem 2rem;
    color: rgb(82, 82, 82);
    cursor: pointer;
    &:hover {
      color: rgb(14, 14, 14);
      background-color: rgb(41, 41, 41);
    }
  }
}
.panel-enter-from,
.panel-fade-leave-to {
  opacity: 0;
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.5s ease;
}

.panel-enter-to,
.panel-leave-from {
  opacity: 1;
}
</style>
