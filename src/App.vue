<template>
  <RouterView />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import * as ribbon from './ribbon.ts'

onMounted(() => {
  Object.assign(window, ribbon);
  if (typeof wps !== 'undefined') import('@/utils/functions.ts')
});
</script>
