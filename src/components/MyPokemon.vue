<template>
  <button @click="getPokemon">Get Pokemon</button>
  <div v-for="(pokemon, idx) in pokemons" :key="idx">
    <h4>{{ pokemon.name }}</h4>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { PokeAPI } from 'pokeapi-types'

const pokemons = ref<PokeAPI.Pokemon[]>([])
async function getPokemon() {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon')
  const pokemon = await data.json()
  console.log(pokemon)
  pokemons.value = pokemon.results
}
</script>
