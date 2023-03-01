<template>
  <Pagination :total-pages="totalPages" :current-page="1" :per-page="perPage"></Pagination>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import Pagination from '@/components/Pagination.vue'
import pb from '@/api/pocketbase'

const isLoading = ref<Boolean>(false)
const perPage = ref<number>(9)
const receivedRecords = ref([])
const totalPages = computed(() => {
  return Math.ceil(receivedRecords.value.length / perPage.value)
})

onMounted(() => {
  getAnimations()
})

const getAnimations = async () => {
  isLoading.value = true
  try {
    const records = await pb.collection('animations').getFullList({
      sort: '-created',
    })

    if (records) {
      isLoading.value = false
      receivedRecords.value = records
    }
  } catch (e: any) {
    return { error: e.message }
  }
}
setTimeout(() => {
  console.log(receivedRecords.value)
}, 1000) // works
</script>
