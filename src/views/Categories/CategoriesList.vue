<script setup>
import { ref, onMounted } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import CategoriseList from '@/components/tables/categories-list/CategoriseList.vue'
import Button from '@/components/ui/Button.vue'
import { useRouter } from 'vue-router'
import { db } from '@/firebase'
import { collection, getDocs, orderBy } from 'firebase/firestore'

const router = useRouter()
const currentPageTitle = ref('Movie Categories')
const items = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'categories'), orderBy('name', 'asc'))
  items.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  // console.log('items', items.value)
})

const goToAddCategories = () => {
  router.push('/categories/add')
}
</script>

<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="flex mb-2">
      <Button size="xs" variant="primary" :onclick="goToAddCategories">Add Categories</Button>
    </div>
    <CategoriseList :lists="items" />
  </AdminLayout>
</template>
