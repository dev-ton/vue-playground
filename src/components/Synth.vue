<template>
  <i-row>
    <i-column>
      <i-button type="button" :disabled="isPlaying">Turn On the Synth</i-button>
      <i-button type="button" :disabled="!isPlaying">Stop</i-button>
    </i-column>
    <i-column>
      <label for="gain">Gain {{ volume }}</label>
      <i-input type="range" id="gain" class="_margin:1" min="0" max="1" step="0.005" value="0.1" />
    </i-column>
    <i-column>
      <label for="freq">Frequency {{ freq }} Hz</label>
      <i-input type="range" id="freq" class="_margin:1" min="0" max="1" step="0.005" value="0.1" />
    </i-column>
  </i-row>
  <i-row>
    <i-column>
      <Knob />
    </i-column>
    <i-column>
      <i-radio-group v-model="waveform">
        <i-radio value="sine">Sine</i-radio>
        <i-radio value="square">Square</i-radio>
        <i-radio value="sawtooth">SawTooth</i-radio>
        <i-radio value="triangle">Triangle</i-radio>
      </i-radio-group>
    </i-column>
    <i-column>
      <p>
        Status: <span v-if="isPlaying" class="_color:success">ON</span><span v-else class="_color:danger">OFF</span>
      </p>
    </i-column>
  </i-row>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Knob from '@/components/Knob.vue'

const isPlaying = ref(false)
const volume = ref('')
const freq = ref('')
const waveform = ref('')
</script>
