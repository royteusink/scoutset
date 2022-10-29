<template>
  <div class="flex-1 max-h-screen bg-green-400 flex flex-col">
    <Tabs @clickNewTab="createNewProject">
      <Tab
        v-for="project in openProjects.values()"
        :key="project.id"
        :name="project.name"
        :active="project.id === activeProject?.id"
        @click="activateProject(project.id)"
        @close="closeProject(project.id)"
      />
    </Tabs>

    <div class="bg-white flex flex-1 h-full overflow-clip">
      <aside class="flex-none w-72 border-r border-gray-200">
        <div>
          <button v-for="record in indices" :key="record.uuid" type="button" @click="loadIndex(record.index)" :class="{
            'text-xs flex justify-between text-left py-1 px-2 w-full': true,
            'bg-blue-500 text-white': record.index === activeIndex,
            'odd:bg-gray-50 hover:bg-blue-500 hover:text-white': record.index !== activeIndex,
          }">
            <span class="block truncate flex-1">
            {{ record.index }}
            </span>
            <span class="flex-none block pl-2 text-gray-400">{{ record['docs.count'] }}</span>
          </button>
        </div>
      </aside>

      <section class="flex-1 relative flex min-w-0">
        <Table :columns="columns" :rows="rows" class="min-w-full" @clickRow="handleClickRow" />
      </section>

      <JsonInspector v-if="mapping" :jsonValue="mapping" class="w-96 border-l border-gray-200" />
      <JsonInspector v-if="source" :jsonValue="source" class="w-96 border-l border-gray-200" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import useProjects from '@/compositions/useProjects';
  import useClient from '@/compositions/useClient';
  import Tabs from '@/components/Tabs.vue';
  import Tab from '@/components/Tab.vue';
  import Table from '@/components/Table.vue';
  import Client from '@/models/Client';
  import JsonInspector from '@/components/JsonInspector.vue';

  const { openProjects, activeProject, activateProject, closeProject } = useProjects();
  const { getClient } = useClient();
  const { replace } = useRouter();

  const client = ref<Client>();
  const indices = ref<Record<string, string>[] | undefined>([]);
  const columns = ref<string[]>([]);
  const rows = ref<{ id: string, data: Record<string, string> }[]>([]);

  const activeIndex = ref();
  const source = ref();
  const mapping = ref();

  watch(activeProject, async () => {
    client.value = activeProject.value ? getClient(activeProject.value) : undefined;
  }, { immediate: true });

  watch(client, async () => {
    indices.value = client.value ? await client.value.indices() : undefined;
  }, { immediate: true });

  const loadIndex = async (index: string) => {
    activeIndex.value = index;

    if (!client.value) return;

    const records = await client.value.documents(index, 0);

    columns.value = Object.keys(records.hits.hits[0]._source);

    rows.value = records.hits.hits.map(hit => ({
      id: hit._id,
      data: hit._source,
    }));

    mapping.value = await client.value.mappings(index);
  };

  const createNewProject = () => {
    replace({ path: '/settings' });
  };

  const handleClickRow = (data: unknown) => {
    source.value = data;
  };
</script>
