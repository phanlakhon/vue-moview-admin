<script setup>
import { ref, onMounted } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Button from '@/components/ui/Button.vue'
import Editor from '@tinymce/tinymce-vue'
import { useRouter, useRoute } from 'vue-router'
import { getItems, addItem, getItemById, updateItem } from '@/firebase/database'

import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

const route = useRoute()
const movieId = route.params.id

const router = useRouter()
const categoriesList = ref([])
const currentPageTitle = ref('Add Movie')
const newMovie = ref({ name: '', description: '', categories: [], imageURL: '' })

onMounted(async () => {
  const categories = await getItems('categories')
  categoriesList.value = categories.map((value) => ({
    value: value.id,
    label: value?.name,
  }))

  if (movieId) {
    const movie = await getItemById('movies', movieId)
    currentPageTitle.value = `Edit Movie - ${movie.name}`
    newMovie.value = { ...movie }
  }
})

const addMovie = async () => {
  try {
    const docRef = await addItem('movies', newMovie.value)

    if (docRef.id) router.push('/movies')
  } catch (error) {
    console.error('Error adding document:', error)
  }
}

const editMovie = async () => {
  try {
    const docRef = await updateItem('movies', movieId, newMovie.value)

    if (docRef.id) router.push('/movies')
  } catch (error) {
    console.error('Error adding document:', error)
  }
}
</script>

<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="my-4">
      <div>
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Movie Name
        </label>
        <input
          type="text"
          v-model="newMovie.name"
          placeholder="Movie Name"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>
    </div>

    <div class="my-4">
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Categories
      </label>

      <Multiselect
        v-model="newMovie.categories"
        mode="tags"
        placeholder="Select Description"
        :options="categoriesList"
        :close-on-select="false"
      />
    </div>

    <div class="my-4">
      <div>
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Description
        </label>
        <Editor
          api-key="cibxrcdcs7qbor2lke6k0xmhux8duh63oh5zecbxkm35dztk"
          v-model="newMovie.description"
          placeholder="Movie Desription"
          :init="{
            plugins: 'lists link image table code help wordcount',
          }"
        />
      </div>
    </div>

    <div class="my-4">
      <div>
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Image URL
        </label>
        <input
          type="text"
          v-model="newMovie.imageURL"
          placeholder="Image URL"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>
    </div>

    <div class="flex justify-end mt-2">
      <Button size="xs" variant="primary" :onclick="movieId ? editMovie : addMovie">
        {{ movieId ? 'Edit Movie' : 'Add Movie' }}
      </Button>
    </div>
  </AdminLayout>
</template>
