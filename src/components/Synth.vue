<template>
  <i-row>
    <i-column>
      <i-button type="button" @click="start"><span v-if="!isPlaying">ON</span><span v-else>OFF</span></i-button>
      <p>
        Status: <span v-if="isPlaying" class="_color:success">ON</span><span v-else class="_color:danger">OFF</span>
      </p>
    </i-column>
    <i-column>
      <label for="gain">Gain {{ gainValue }}</label>
      <i-number-input id="gain" v-model="gainValue" :precision="2" :min="0" :max="1" :step="0.05" />
    </i-column>
    <i-column>
      <label for="freq">Frequency {{ freqValue }} Hz</label>
      <Knob id="freq" :min="110" :max="1760" :speed="1" v-model:value="freqValue" />
    </i-column>
  </i-row>
  <i-row>
    <i-column>
      <p>OSC:</p>
      <i-radio-group v-model="waveform">
        <i-radio value="sine">Sine</i-radio>
        <i-radio value="square">Square</i-radio>
        <i-radio value="sawtooth">Saw</i-radio>
        <i-radio value="triangle">Triangle</i-radio>
      </i-radio-group>
    </i-column>
    <i-column>
      <canvas id="canvas" ref="canvas"></canvas>
    </i-column>
  </i-row>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import Knob from '@/components/Knob.vue'
//TODO: move the nodes out of the start(), add pwm, redesign UI, add effects

let ctx: AudioContext
let oscillator: OscillatorNode
let analyser: AnalyserNode
let gainNode: GainNode
let dataArray: Uint8Array

let pixelRatio, sizeOnScreen, segmentWidth, c: CanvasRenderingContext2D

const isPlaying = ref(false)
const gainValue = ref(0.5)
const freqValue = ref(440)
const waveform = ref<OscillatorType>('sine')
const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  console.log(canvas.value)
  if (canvas.value) {
    console.log('canvas true')
    canvas.value.width = 200
    canvas.value.height = 200
    pixelRatio = window.devicePixelRatio
    sizeOnScreen = canvas.value.getBoundingClientRect()
    canvas.value.width = sizeOnScreen.width * pixelRatio
    canvas.value.height = sizeOnScreen.height * pixelRatio
    canvas.value.style.width = canvas.value.width / pixelRatio + 'px'
    canvas.value.style.height = canvas.value.height / pixelRatio + 'px'
    c = canvas.value.getContext('2d')
    c.fillStyle = '#181818'
    c.fillRect(0, 0, canvas.value.width, canvas.value.height)
    c.strokeStyle = '#33ee55'
    c.beginPath()
    c.moveTo(0, canvas.value.height / 2)
    c.lineTo(canvas.value.width, canvas.value.height / 2)
    c.stroke()
  }
})

const start = () => {
  if (isPlaying.value) {
    if (oscillator) {
      oscillator.stop()
      ctx.close()
      console.log('should stop')
    }
  } else {
    ctx = new AudioContext()
    gainNode = new GainNode(ctx, {
      gain: gainValue.value,
    })
    gainNode.connect(ctx.destination)
    analyser = new AnalyserNode(ctx, {
      smoothingTimeConstant: 1,
      fftSize: 2048,
    })
    dataArray = new Uint8Array(analyser.frequencyBinCount)
    oscillator = new OscillatorNode(ctx, {
      type: waveform.value,
      frequency: freqValue.value,
    })
    oscillator.connect(ctx.destination)
    oscillator.connect(gainNode)
    gainNode.connect(analyser)
    analyser.connect(ctx.destination)
    oscillator.start()
    draw()
    console.log('started')
  }
  isPlaying.value = !isPlaying.value
}

const draw = () => {
  if (canvas.value) {
    analyser.getByteTimeDomainData(dataArray)
    segmentWidth = canvas.value.width / analyser.frequencyBinCount
    c.fillRect(0, 0, canvas.value.width, canvas.value.height)
    c.beginPath()
    c.moveTo(-100, canvas.value.height / 2)
    if (isPlaying.value) {
      for (let i = 1; i < analyser.frequencyBinCount; i += 1) {
        let x = i * segmentWidth
        let v = dataArray[i] / 128.0
        let y = (v * canvas.value.height) / 2
        c.lineTo(x, y)
      }
    }
    c.lineTo(canvas.value.width + 100, canvas.value.height / 2)
    c.stroke()
  }
  requestAnimationFrame(draw)
}

watch([freqValue, gainValue, waveform], ([newFreq, newGain, newWaveform]) => {
  if (oscillator && gainNode && isPlaying) {
    oscillator.frequency.value = newFreq
    gainNode.gain.value = newGain
    oscillator.type = newWaveform
  }
})
</script>
