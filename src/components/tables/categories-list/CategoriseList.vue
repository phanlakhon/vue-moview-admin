<script lang="ts">
import { TrashIcon, PencilSquareIcon } from '@/icons'
export { TrashIcon, PencilSquareIcon } // ต้อง export ถ้าจะใช้ใน script setup
</script>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'

defineProps({
  lists: {
    type: Array as PropType<any[]>,
    required: true,
    default: [],
  },
})
</script>

<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-2 text-left w-2 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">No.</p>
            </th>
            <th class="px-5 py-2 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Name</p>
            </th>
            <th class="px-5 py-2 text-center w-32 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Setting</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(list, index) in lists"
            :key="index"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-slate-800/10"
          >
            <td class="px-5 py-3 sm:px-6">
              <p class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {{ index + 1 }}
              </p>
            </td>
            <td class="px-5 py-3 sm:px-6">
              <p class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {{ list?.name }}
              </p>
            </td>
            <td class="px-5 py-3 text-center sm:px-6">
              <div class="flex justify-center gap-2 items-center">
                <button type="button" class="text-slate-800"><PencilSquareIcon /></button>
                <button type="button" class="text-red-600"><TrashIcon /></button>
              </div>
            </td>
          </tr>

          <tr v-if="lists.length === 0">
            <td colspan="3" class="text-center py-36">No Categories Yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here if needed */
</style>
