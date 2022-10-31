<template>
  <div class="flex-1 max-h-screen bg-green-400 flex flex-col">
    <Tabs :allowNewTab="true" @clickNewTab="createNewProject">
      <Tab
        v-for="project in openProjects"
        :key="project.id"
        :name="project.name"
        :active="project.id === activeProject?.id"
        :isClosable="true"
        :icon="true"
        @click="activateProject(project.id)"
        @close="closeProject(project.id)"
      />
    </Tabs>

    <div class="bg-white flex flex-1 h-full overflow-clip">
      <aside class="flex-none w-72 border-r border-gray-200">
        <div>
          <button v-for="record in indices" :key="record.id" type="button" @click="loadIndex(record.name)" :class="{
            'text-xs flex justify-between text-left py-1 px-2 w-full': true,
            'bg-blue-500 text-white': record.name === activeIndex,
            'odd:bg-gray-50 hover:bg-blue-500 hover:text-white': record.name !== activeIndex,
          }">
            <span class="block truncate flex-1">
            {{ record.name }}
            </span>
            <span class="flex-none block pl-2 text-gray-400">{{ record.total }}</span>
          </button>
        </div>
      </aside>

      <section class="flex-1 relative flex min-w-0">
        <Table :columns="columns" :rows="rows" class="min-w-full" @clickRow="handleClickRow" />
      </section>

      <section v-if="source" class="w-full flex flex-col max-w-[30vw] border-l border-gray-200">
        <Tabs>
          <Tab name="Record" :wrap="true" :active="inspectionTab === 'source'" @click="inspectionTab = 'source'" />
          <Tab name="Mapping" :wrap="true" :active="inspectionTab === 'mapping'" @click="inspectionTab = 'mapping'" />
        </Tabs>
        <JsonInspector v-if="source && inspectionTab === 'source'" :jsonValue="source" />
        <JsonInspector v-if="mapping && inspectionTab === 'mapping'" :jsonValue="mapping" />
      </section>
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
  import type { IndicesData, DocumentsData } from '@/models/Client';

  const { openProjects, activeProject, activateProject, closeProject } = useProjects();
  const { getClient } = useClient();
  const { replace } = useRouter();

  const client = ref<Client>();
  const indices = ref<IndicesData>([]);
  const columns = ref<string[]>([]);
  const rows = ref<DocumentsData>([]);

  const inspectionTab = ref('source');
  const activeIndex = ref();
  const source = ref();
  const mapping = ref();

  watch(activeProject, async () => {
    client.value = activeProject.value ? getClient(activeProject.value) : undefined;
  }, { immediate: true });

  watch(client, async () => {
    indices.value = client.value ? await client.value.indices() : [];
  }, { immediate: true });

  const loadIndex = async (index: string) => {
    activeIndex.value = index;

    if (!client.value) return;

    const records = await client.value.documents(index, 0);

    if (records.length > 0) {
      columns.value = Object.keys(records[0].data);
      rows.value = records;
    }

    source.value = null;
    mapping.value = await client.value.mappings(index);
  };

  const createNewProject = () => {
    replace({ path: '/settings' });
  };

  const handleClickRow = (row: { id: string, data: Record<string, string> }) => {
    source.value = row.data;
    inspectionTab.value = 'source';
  };
</script>
