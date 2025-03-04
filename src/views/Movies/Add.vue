<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Button from '@/components/ui/Button.vue'
import { useRouter } from 'vue-router'

const currentPageTitle = ref('Add Categories')
const newMovie = ref({ name: '', description: '',  })

const addMovie = async () => {
  // try {
  //   const docRef = await addDoc(collection(db, 'categories'), {})

  //   await updateDoc(doc(db, 'categories', docRef.id), {
  //     id: docRef.id,
  //     ...{ name: newCategory.value.name },
  //   })

  //   newCategory.value.name = ''
  //   router.push('/categories')
  // } catch (error) {
  //   console.error('Error adding document:', error)
  // }
}
</script>

<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="space-y-6">
      <div>
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Movie Name
        </label>
        <input
          type="text"
          v-model="newMovie.name"
          placeholder="Movie Name"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>
    </div>

    <div class="flex justify-end mt-2">
      <Button size="xs" variant="primary" :onclick="addMovie">Add Movie</Button>
    </div>
  </AdminLayout>
</template>
