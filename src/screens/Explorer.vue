<template>
  <div>
    <Tabs>
      <Tab v-for="project in openProjects" :key="project" :label="project" :active="project === activeProject"
        @click="activateProject(project)"
        @close="closeProject(project)"  />
    </Tabs>
  </div>
</template>

<script setup lang="ts">
  import useProjects from '@/compositions/useProjects';
  import Tabs from '@/components/Tabs.vue';
  import Tab from '@/components/Tab.vue';

  const { openProjects, activeProject, activateProject, closeProject } = useProjects();
</script>
