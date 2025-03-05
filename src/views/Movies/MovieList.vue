<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getItems } from '@/firebase/database'

import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import MoviesList from '@/components/tables/movies-list/MoviesList.vue'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const currentPageTitle = ref('Movies')

const items = ref([])
const categories = ref({})

onMounted(async () => {
  try {
    const [categoriesRes, moviesRes] = await Promise.all([
      getItems('categories'),
      getItems('movies'),
    ])

    items.value = moviesRes
    categories.value = categoriesRes.reduce((accumulator, currentValue) => {
      const { id, name } = currentValue
      accumulator[id] = name
      return accumulator
    }, {})
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

const goToAddMovie = () => {
  router.push('/movies/add')
}
</script>

<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="flex mb-2">
      <Button size="xs" variant="primary" :onclick="goToAddMovie">Add Movie</Button>
    </div>

    <MoviesList :items="items" :categories="categories" />
  </AdminLayout>
</template>
