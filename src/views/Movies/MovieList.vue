<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import BasicTableOne from '@/components/tables/basic-tables/BasicTableOne.vue'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const currentPageTitle = ref('Movies')

import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

const items = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'reviews'))
  items.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  console.log('items', items.value)
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
    <BasicTableOne />
  </AdminLayout>
</template>
