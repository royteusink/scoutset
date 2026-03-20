<template>
  <div class="h-screen flex flex-col justify-between p-4">
    <header class="flex-none flex justify-between border-b border-gray-200 pb-4 mb-6">
      <h1 class="text-4xl font-light">Settings</h1>
      <RouterLink to="/" class="bg-gray-100 rounded-full overflow-clip flex-none inline-flex justify-center items-center w-10 h-10 focus:bg-gray-200 hover:bg-gray-200 outline-none">
        <svg viewBox="0 0 48 48" class="pointer-events-none w-5">
          <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
        </svg>
      </RouterLink>
    </header>

    <section class="overflow-auto flex-1">
      <h3 class="text-2xl font-light mb-2">Projects</h3>
      <ul class="flex flex-col gap-4">
        <li v-for="project in availableProjects.values()" :key="project.id" class="group flex items-start gap-4">
          <button type="button" title="Open project" @click="handleOpenProject(project.id)" class="block text-left outline-none leading-none overflow-clip max-w-full">
            <div class="truncate w-full group-focus:underline group-hover:underline">{{ project.name }}</div>
            <div class="text-gray-600 text-xs mt-1">{{ project.host }}:{{ project.port }}</div>
          </button>

          <button type="button" title="Delete project" @click="deleteProject(project.id)" class="invisible group-hover:visible group-focus-within:visible bg-gray-100 rounded-full overflow-clip flex-none inline-flex justify-center items-center w-5 h-5 focus:bg-gray-200 hover:bg-gray-200 outline-none">
            <svg viewBox="0 0 48 48" class="pointer-events-none w-4">
              <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
            </svg>
          </button>
        </li>
      </ul>
    </section>

    <section class="flex-none pt-4">
      <h3 class="text-2xl font-light mb-2">Create a project</h3>
      <form @submit.prevent="handleSubmit" class="bg-gray-100 p-4 flex flex-wrap gap-4">
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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import useProjects from '@/compositions/useProjects';

  const { createProject, openProject, activateProject, availableProjects, deleteProject } = useProjects();
  const { replace } = useRouter();

  const host = ref('localhost');
  const port = ref(9200);
  const name = ref('');

  const handleSubmit = () => {
    if (name.value.length === 0) {
      name.value = host.value;
    }

    createProject(host.value, port.value, name.value);

    host.value = 'localhost';
    port.value = 9200;
    name.value = '';
  };

  const handleOpenProject = (id: string) => {
    openProject(id);
    activateProject(id);
    replace('/');
  };
</script>
