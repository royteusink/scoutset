<template>
  <div>
    <h1 class="text-xl font-bold">settings</h1>
    <RouterLink to="/">Back</RouterLink>

    <div v-for="project in availableProjects.values()" :key="project.id" @click="handleOpenProject(project.id)">
      {{ project.name }} ({{ project.host }})
    </div>

    <form @submit.prevent="createProject">
      <input type="text" placeholder="host" v-model="host" />
      <input type="number" placeholder="port" v-model="port" />
      <input type="text" :placeholder="host ? host : 'name'" v-model="name" />
      <button class="bg-blue-400">Create project</button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import useProjects from '@/compositions/useProjects';
  import { ref } from 'vue';

  const { addProject, openProject, activateProject, availableProjects } = useProjects();
  const { replace } = useRouter();

  const host = ref('');
  const port = ref(9510); // 9520, 9500, default: 9200
  const name = ref('');

  const createProject = () => {
    if (name.value.length === 0) {
      name.value = host.value;
    }
    const id = addProject(host.value, port.value, name.value);
    handleOpenProject(id);
  };

  const handleOpenProject = (id: string) => {
    openProject(id);
    activateProject(id);
    replace('/');
  };
</script>
