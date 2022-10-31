<template>
  <div class="p-4">
    <header class="flex justify-between border-b border-gray-200 pb-4 mb-6">
      <h1 class="text-4xl font-light">Settings</h1>
      <RouterLink to="/" class="bg-gray-100 rounded-full overflow-clip flex-none inline-flex justify-center items-center w-10 h-10 focus:bg-gray-200 hover:bg-gray-200 outline-none">
        <svg viewBox="0 0 48 48" class="pointer-events-none w-5">
          <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
        </svg>
      </RouterLink>
    </header>

    <section class="mb-10">
      <h3 class="text-2xl font-light mb-2">Projects</h3>
      <ul class="flex flex-col gap-2">
        <li v-for="project in availableProjects.values()" :key="project.id" >
          <button type="button" @click="handleOpenProject(project.id)" class="block text-left focus:underline hover:underline outline-none">
            {{ project.name }}
            <div class="text-gray-600 text-xs">{{ project.host }}:{{ project.port }}</div>
          </button>
        </li>
      </ul>
    </section>

    <section class="mb-10">
      <h3 class="text-2xl font-light mb-2">Create a project</h3>
      <form @submit.prevent="createProject" class="bg-gray-100 p-4 flex flex-wrap gap-4">
        <div>
          <label class="block mb-1 text-sm">Hostname</label>
          <input type="text" placeholder="host" v-model="host" class="p-2 border border-gray-200" />
        </div>
        <div>
          <label class="block mb-1 text-sm">Port</label>
          <input type="number" placeholder="port" v-model="port" class="p-2 border border-gray-200" />
        </div>
        <div>
          <label class="block mb-1 text-sm">Projectname</label>
          <input type="text" :placeholder="host ? host : 'name'" v-model="name" class="p-2 border border-gray-200" />
        </div>
        <button class="self-end bg-blue-600 px-4 text-sm text-white rounded shadow outline-none focus:bg-blue-800 hover:bg-blue-800 flex-none h-10">Create project</button>
      </form>
    </section>
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
