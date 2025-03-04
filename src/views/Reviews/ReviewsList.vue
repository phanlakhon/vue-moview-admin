<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import BasicTableOne from '@/components/tables/basic-tables/BasicTableOne.vue'
const currentPageTitle = ref('Reviews')
</script>

<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <BasicTableOne />
  </AdminLayout>
</template>
