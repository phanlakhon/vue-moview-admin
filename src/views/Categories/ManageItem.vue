<script setup>
import { ref, onMounted } from 'vue'

import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Button from '@/components/ui/Button.vue'
import { useRouter, useRoute } from 'vue-router'
import { getItemById, addItem, updateItem } from '@/firebase/database'

const route = useRoute()
const categoryId = route.params.id

const router = useRouter()
const currentPageTitle = ref('Add Categories')
const newCategory = ref({ name: '' })

const addCategory = async () => {
  try {
    const docRef = await addItem('categories', newCategory.value)

    if (docRef.id) router.push('/categories')
  } catch (error) {
    console.error('Error adding document:', error)
  }
}

const editCategory = async () => {
  try {
    const docRef = await updateItem('categories', categoryId, newCategory.value)

    if (docRef.id) router.push('/categories')
  } catch (error) {
    console.error('Error adding document:', error)
  }
}

onMounted(async () => {
  if (categoryId) {
    const cate = await getItemById('categories', categoryId)
    currentPageTitle.value = `Edit Category - ${cate.name}`
    newCategory.value = { ...cate }
  }
})
</script>

<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="space-y-6">
      <div>
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Category Name
        </label>
        <input
          type="text"
          v-model="newCategory.name"
          placeholder="Category Name"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>
    </div>

    <div class="flex justify-end mt-2">
      <Button size="xs" variant="primary" :onclick="categoryId ? editCategory : addCategory">
        {{ categoryId ? 'Edit Category' : 'Add Category' }}
      </Button>
    </div>
  </AdminLayout>
</template>
