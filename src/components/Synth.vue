<template>
  <i-row>
    <i-column>
      <div class="topPanel">
        <i-button type="button" @click="start">
          <FaIcon icon="fa-solid fa-power-off" />
        </i-button>
        <p>
          Status: <span v-if="isPlaying" class="_color:success">{{ state }}</span
          ><span v-else class="_color:danger">{{ state }}</span>
        </p>
      </div>
    </i-column>
  </i-row>
  <i-row>
    <i-column>
      <div class="synthbox _background:dark-75">
        <div class="item">
          <p>OSC:</p>
          <div>
            <i-radio-group v-model="waveform">
              <i-radio value="sine">Sine</i-radio>
              <i-radio value="square">Square</i-radio>
              <i-radio value="sawtooth">Saw</i-radio>
              <i-radio value="triangle">Triangle</i-radio>
              <i-radio value="custom">Pulse</i-radio>
            </i-radio-group>
          </div>
        </div>
        <div class="item sliders">
          <div>
            <label for="gain">Gain {{ gainValue }}</label>
            <SliderControl id="gain" v-model:value="gainValue" :precision="2" :min="0" :max="1" :step="0.05" />
          </div>
          <div>
            <label for="duty">Duty cycle:</label>
            <SliderControl id="duty" :disabled="waveform !== 'custom'" :max="1" v-model:value="dutyCycle" />
          </div>
        </div>
        <div class="item">
          <label for="freq">Frequency(Hz)</label>
          <Knob id="freq" :min="1" :max="1760" :speed="1" v-model:value="freqValue" />
        </div>
        <div class="item">
          <canvas id="canvas" ref="canvas"></canvas>
        </div>
      </div>
    </i-column>
  </i-row>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import Knob from '@/components/Knob.vue'
import SliderControl from '@/components/SliderControl.vue'
//TODO:
// - redesign UI
// - add effects
// - improve performance of pwm
const isPlaying = ref(false)
const state = ref('off')
const gainValue = ref(0.5)
const dutyCycle = ref(0.5)
const freqValue = ref(440)
const waveform = ref<OscillatorType>('sine')
const canvas = ref<HTMLCanvasElement | null>(null)

const ctx: AudioContext = new AudioContext()
const analyser: AnalyserNode = new AnalyserNode(ctx, {
  smoothingTimeConstant: 1,
  fftSize: 2048,
})
const gainNode: GainNode = new GainNode(ctx, {
  gain: gainValue.value,
})
const dataArray: Uint8Array = new Uint8Array(analyser.frequencyBinCount)
const oscillator: OscillatorNode = new OscillatorNode(ctx, {
  type: waveform.value,
  frequency: freqValue.value,
})

let pixelRatio, sizeOnScreen, segmentWidth, c: CanvasRenderingContext2D

const suspend = () => {
  ctx.suspend().then(() => {
    state.value = 'off'
  })
}
const resume = () => {
  ctx.resume().then(() => {
    state.value = 'on'
  })
}

suspend()

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
    canvas.value.style.borderRadius = 50 + '%'
    c = canvas.value.getContext('2d')
    c.fillStyle = '#181818'
    c.fillRect(0, 0, canvas.value.width, canvas.value.height)
    c.strokeStyle = 'hsl(195 77% 39% / 1)'
    c.beginPath()
    c.moveTo(0, canvas.value.height / 2)
    c.lineTo(canvas.value.width, canvas.value.height / 2)
    c.stroke()
  }
})

// conections and osc start
oscillator.connect(ctx.destination)
oscillator.connect(gainNode)
gainNode.connect(ctx.destination)
gainNode.connect(analyser)
analyser.connect(ctx.destination)
oscillator.start()

// Click to resume/suspend ctx
const start = () => {
  if (isPlaying.value && ctx.state === 'running') {
    suspend()
  } else {
    resume()
    draw()
  }
  isPlaying.value = !isPlaying.value
}

// Draw waves in osciloscope
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

// Pulsewave v2
const maxCoef = ref(ctx.sampleRate / (2 * oscillator.frequency.value))
const real = new Float32Array(ctx.sampleRate / 2)
const imag = new Float32Array(ctx.sampleRate / 2)
real[0] = 0
imag[0] = 0
for (let i = 1; i < maxCoef.value; i++) real[i] = (2 * Math.sin(i * Math.PI * dutyCycle.value)) / (i * Math.PI)

const constantCurve = (value: number) => {
  const curve = new Float32Array(2)
  curve[0] = value
  curve[1] = value
  return curve
}
const offset = 0.5
const constantShaper = new WaveShaperNode(ctx, { curve: constantCurve(offset) })

// const pulseCalc = (max: number, duty: number) => {
//   for (let i = 1; i < max; i++) {
//     real[i] = (2 * Math.sin(i * Math.PI * duty)) / (i * Math.PI)
//     return real
//   }
//   return real
// }

// pulseCalc(maxCoef.value, dutyCycle.value)

// const pulseCalculation = (e: Event) => {
//   const input = e.target as HTMLInputElement
//   for (let i = 1; i < maxCoef; i++) {
//     real[i] = (2 * Math.sin(i * Math.PI * dCycle)) / (i * Math.PI)
//   }
// }

watch(
  [freqValue, gainValue, waveform, dutyCycle, maxCoef],
  ([newFreq, newGain, newWaveform, newDutyCycle, newMaxCoef]) => {
    if (oscillator && gainNode && isPlaying) {
      oscillator.frequency.value = newFreq
      gainNode.gain.value = newGain
      if (newWaveform === 'custom') {
        oscillator.setPeriodicWave(ctx.createPeriodicWave(real, imag))
        oscillator.connect(constantShaper)
      } else {
        oscillator.type = newWaveform
      }
      for (let i = 1; i < newMaxCoef; i++) real[i] = (2 * Math.sin(i * Math.PI * newDutyCycle)) / (i * Math.PI)
    }
  }
)
</script>
<style lang="scss" scoped>
.synthbox {
  display: flex;
  flex-wrap: wrap;
  border-radius: 16px;
  justify-content: space-between;
  align-items: stretch;
  padding: var(--padding);
  user-select: none;
  border: 1px solid var(--color--dark-50);
}
.item:not(.sliders) {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.item {
  padding: var(--padding);
  justify-content: center;
  // flex: 1 1 25%;
}
.item.sliders {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  & > * {
    display: flex;
    gap: 5rem;
    flex-direction: column;
    align-items: center;
  }
}
.topPanel {
  display: flex;
  gap: 1rem;
  padding: var(--padding);
}
</style>
