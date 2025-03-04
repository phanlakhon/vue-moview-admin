<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const ThemeProvider = defineAsyncComponent(() => import('./components/layout/ThemeProvider.vue'))
const SidebarProvider = defineAsyncComponent(
  () => import('./components/layout/SidebarProvider.vue'),
)
</script>
