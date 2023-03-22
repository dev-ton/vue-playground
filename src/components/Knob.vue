<template>
  <!-- <i-progress>
    <i-progress-bar max="100" :value="((displayValue - min) / (max - min)) * 100"></i-progress-bar>
  </i-progress> -->
  <div
    class="wheel"
    ref="wheel"
    tabindex="0"
    @keydown.down.prevent="decrement"
    @keydown.left.prevent="decrement"
    @keydown.up.prevent="increment"
    @keydown.right.prevent="increment"
  >
    <div class="wheeldot-wrapper" :style="`transform: rotate(${angle}deg)`">
      <span class="wheeldot-element"></span>
    </div>
    <span class="wheel-value">{{ displayValue }}</span>
  </div>
</template>
<script setup lang="ts">
//TODO: add some accessibility stuff
import { onMounted, ref, computed, toRefs } from 'vue'
import { useMouse, useRafFn, useEventListener } from '@vueuse/core'

export interface Props {
  min?: number
  max?: number
  speed?: number
  value: number
}
const props = withDefaults(defineProps<Props>(), {
  min: 40,
  max: 180,
  speed: 0.1,
  value: 100,
})

const emit = defineEmits<{
  (e: 'update:value', value: number): void
}>()
/**
 * Represents a 2-dimensional vector
 */
class Vector2D {
  constructor(public x: number, public y: number) {}

  /**
   * Return the difference between this vector and the vector in argument
   */
  minus(v: Vector2D): Vector2D {
    return new Vector2D(this.x - v.x, this.y - v.y)
  }

  /**
   * Return the angle in degres between two vectors.
   * -180 <= diff <= 180
   */
  static angleBetween(u: Vector2D, v: Vector2D): number {
    const diffInRad = Math.atan2(v.y, v.x) - Math.atan2(u.y, u.x)
    let diffInDeg = diffInRad * (180 / Math.PI)
    if (diffInDeg < -180) diffInDeg += 360
    else if (diffInDeg > 180) diffInDeg -= 360
    return diffInDeg
  }
}

const { min, max, speed } = toRefs(props)
const wheel = ref()
const angle = ref(0)
const model = ref(props.value)
let lastEmittedValue: number
let lastMousePos = new Vector2D(0, 0)
let wheelCenter = new Vector2D(0, 0)

const displayValue = computed(() => Math.floor(model.value))

const { x, y } = useMouse()
const { pause: pauseLoop, resume: resumeLoop } = useRafFn(
  () => {
    const currentMousePos = new Vector2D(x.value, y.value).minus(wheelCenter)
    loop(currentMousePos)
  },
  { immediate: false }
)

useEventListener(wheel, 'touchstart', (e: TouchEvent) => {
  onDragStart(e.touches[0].clientX, e.touches[0].clientY)
})

useEventListener(wheel, 'mousedown', (e: MouseEvent) => {
  onDragStart(e.x, e.y)
})

const onDragStart = (x: number, y: number) => {
  lastMousePos = new Vector2D(x, y).minus(wheelCenter)
  resumeLoop()
  useEventListener(document, 'touchend', pauseLoop, { once: true })
  useEventListener(document, 'mouseup', pauseLoop, { once: true })
}

const loop = (currentPos: Vector2D) => {
  const diff = Vector2D.angleBetween(lastMousePos, currentPos)
  updateValue(diff)
  lastMousePos = currentPos
}

const updateValue = (diff: number) => {
  angle.value += diff
  model.value = Math.max(Math.min(model.value + speed.value * diff, max.value), min.value)

  if (displayValue.value !== lastEmittedValue) {
    emit('update:value', displayValue.value)
    lastEmittedValue = displayValue.value
  }
}

// center of the wheel
const setCenter = () => {
  const { right, left, top, bottom } = wheel.value.getBoundingClientRect()
  wheelCenter.x = left + (right - left) / 2
  wheelCenter.y = top + (bottom - top) / 2
}

onMounted(() => {
  setCenter()
  useEventListener(window, 'resize', setCenter)
})

// Keyboard
const decrement = () => {
  updateValue(-10)
}

const increment = () => {
  updateValue(10)
}
</script>
<style lang="scss" scoped>
.wheel {
  position: relative;
  background: var(--color--dark);
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
  width: 108px;
  height: 108px;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  border: 6px solid var(--color--black);

  // focus outline alternative that allows to use box-shadows
  &:focus-visible,
  &:focus {
    &::after {
      $outline-width: 2px;
      content: '';
      position: absolute;
      top: -$outline-width;
      bottom: -$outline-width;
      left: -$outline-width;
      right: -$outline-width;
      border: $outline-width solid #1d75ff;
      border-radius: 50%;
    }
  }

  // no focus ring on browsers that support :focus-visible
  &:focus:not(:focus-visible)::after {
    border: none;
  }
}

.wheeldot-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.wheeldot-element {
  position: absolute;
  left: 84%;
  top: 20%;
  width: 12px;
  height: 24px;
  border-radius: 36%;
  background: var(--color--secondary);
  transform: rotate(64deg);
}

.wheel-value {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
}
</style>
