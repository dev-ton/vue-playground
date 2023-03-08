<template>
  <i-loader :color="props.color" />
</template>
<script setup lang="ts">
export interface Props {
  color: 'primary' | 'light' | 'dark'
}
const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
})
//TODO: add other props
</script>
