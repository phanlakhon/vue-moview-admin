<script setup>
import { ref, onMounted } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import CategoriseList from '@/components/tables/categories-list/CategoriseList.vue'
import Button from '@/components/ui/Button.vue'
import { useRouter } from 'vue-router'
import { getItems } from '@/firebase/database'

const router = useRouter()
const currentPageTitle = ref('Movie Categories')
const items = ref([])

onMounted(async () => {
  items.value = await getItems('categories')
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
    <CategoriseList :items="items" />
  </AdminLayout>
</template>
