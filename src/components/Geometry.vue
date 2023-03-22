<template>
  <label>
    Points
    <i-input type="range" min="3" max="42" v-model="numOfPoints" class="_margin:1" />
  </label>
  <svg ref="scene" viewBox="0 0 1000 1000" v-html="sceneOutput"></svg>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const numOfPoints = ref(3)
const size = ref(1000)
const scene = ref<SVGElement | null>(null)
const sceneOutput = ref<string[]>([])

function renderPoints(numOfPoints: number, size: number) {
  console.log('renderPoints triggered: ', numOfPoints)
  const polarToCartesian = (r: number, degrees: number) => {
    const radians = (degrees * Math.PI) / 180.0
    return [r + r * Math.cos(radians), r + r * Math.sin(radians)]
  }

  const random = (max: number, min: number) => Math.floor(Math.random() * (max - min) + min)

  const radius = size / 2

  const data = [...new Array(numOfPoints)].map((_a, index) => {
    const angle = 360 / numOfPoints
    const radian = angle * (index + 1)
    return polarToCartesian(radius, radian)
  })

  const renderLines = (X: number, Y: number) => {
    return data.map((entry) => {
      const [x, y] = entry
      const stroke = `hsl(${random(360, 0)}, ${random(100, 50)}%, ${random(90, 30)}%)`
      const strokeWidth = random(30, 3) / 10
      console.log(X, Y)
      if (X !== x && Y !== y)
        return `<line x1="${X}" y1="${Y}" x2="${x}" y2="${y}" stroke="${stroke}" stroke-width="${strokeWidth}"></line>`
    })
  }

  scene.value.innerHTML = data.map((entry) => {
    const [x, y] = entry
    console.log(scene.value.innerHTML)
    return renderLines(x, y).join('')
  })
}
// renderPoints(numOfPoints.value, size.value)

//TODO: SOmehow it generates the svg lines only once // Reference: https://dev.to/madsstoumann/svg-geometry-and-a-dash-of-javascript-3f9l

watch(numOfPoints, function (newValue, oldValue) {
  renderPoints(oldValue, size.value)
  console.log(newValue, oldValue)
})

// const onInput = () => {
//   renderPoints(numOfPoints.value, size.value)
//   console.log(sceneOutput.value)
// }
</script>
<style lang="scss" scoped>
svg {
  aspect-ratio: 1;
  width: 100%;
  display: block;
}
</style>
