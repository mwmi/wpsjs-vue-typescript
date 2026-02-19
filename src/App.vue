<template>
  <RouterView />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import * as ribbon from './ribbon.ts'

onMounted(() => {
  window.ribbon = ribbon
})
</script>
