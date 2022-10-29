<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import useProjects from '@/compositions/useProjects';

  const { loadProjects } = useProjects();

  onMounted(async () => {
    await loadProjects();
  });
</script>
