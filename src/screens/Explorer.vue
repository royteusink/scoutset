<template>
  <div class="flex-1 max-h-screen flex flex-col">
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
      <aside class="flex-none w-72 border-r border-gray-200 overflow-auto">
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

      <section class="flex-1 relative flex flex-col min-w-0">
        <div v-if="activeIndex" class="flex justify-between border-b border-gray-200">
          <nav class="flex divide-x divide-gray-100 border-r border-gray-100">
            <button :disabled="!canNavigateBack" @click="gotoPreviousPage" type="button" title="Previous page" class="w-10 h-10 flex justify-center items-center bg-white focus:bg-gray-50 hover:bg-gray-100 active:bg-gray-300 outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="fill-current w-5 h-5">
                <path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z" />
              </svg>
            </button>
            <button :disabled="!canNavigateForward" @click="gotoNextPage" type="button" title="Next page" class="w-10 h-10 flex justify-center items-center bg-white focus:bg-gray-50 hover:bg-gray-100 active:bg-gray-300 outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="fill-current w-5 h-5">
                <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
              </svg>
            </button>
          </nav>
          <input type="text" v-model="query" @input="updateRecords" placeholder="Search documents" title="Enter keywords to search within documents" class="p-2 outline-none w-full" />
        </div>
        <div v-if="activeIndex" class="p-2 text-xs bg-white">
          <span class="text-gray-500">{{ activeProject?.name}}</span> / {{ activeIndexInfo?.name }}
        </div>
        <Table v-if="activeIndex" :columns="columns" :rows="rows" class="min-w-full flex-1" @clickRow="handleClickRow" />
      </section>

      <aside v-if="activeIndex" :class="{
        'relative flex flex-col max-w-[30vw] border-l border-gray-200': true,
        'w-full': inspectionPanelOpen,
        'w-0': !inspectionPanelOpen
      }">
        <button type="button" title="Toggle inspection panel" @click="inspectionPanelOpen = !inspectionPanelOpen" class="absolute right-full top-1/2 -translate-y-1/2 rounded-l-md w-5 h-24 text-gray-500 bg-gray-50 border border-gray-200 hover:bg-gray-100 focus:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="fill-current">
            <path d="M17.5 40q-1.45 0-2.475-1.025Q14 37.95 14 36.5q0-1.45 1.025-2.475Q16.05 33 17.5 33q1.45 0 2.475 1.025Q21 35.05 21 36.5q0 1.45-1.025 2.475Q18.95 40 17.5 40Zm13 0q-1.45 0-2.475-1.025Q27 37.95 27 36.5q0-1.45 1.025-2.475Q29.05 33 30.5 33q1.45 0 2.475 1.025Q34 35.05 34 36.5q0 1.45-1.025 2.475Q31.95 40 30.5 40Zm-13-12.5q-1.45 0-2.475-1.025Q14 25.45 14 24q0-1.45 1.025-2.475Q16.05 20.5 17.5 20.5q1.45 0 2.475 1.025Q21 22.55 21 24q0 1.45-1.025 2.475Q18.95 27.5 17.5 27.5Zm13 0q-1.45 0-2.475-1.025Q27 25.45 27 24q0-1.45 1.025-2.475Q29.05 20.5 30.5 20.5q1.45 0 2.475 1.025Q34 22.55 34 24q0 1.45-1.025 2.475Q31.95 27.5 30.5 27.5ZM17.5 15q-1.45 0-2.475-1.025Q14 12.95 14 11.5q0-1.45 1.025-2.475Q16.05 8 17.5 8q1.45 0 2.475 1.025Q21 10.05 21 11.5q0 1.45-1.025 2.475Q18.95 15 17.5 15Zm13 0q-1.45 0-2.475-1.025Q27 12.95 27 11.5q0-1.45 1.025-2.475Q29.05 8 30.5 8q1.45 0 2.475 1.025Q34 10.05 34 11.5q0 1.45-1.025 2.475Q31.95 15 30.5 15Z"/>
          </svg>
        </button>
        <div class="flex flex-col h-full">
          <Tabs>
            <Tab v-if="mapping" name="Mapping" :wrap="true" :active="inspectionTab === 'mapping'" @click="inspectionTab = 'mapping'" />
            <Tab v-if="source" name="Record" :wrap="true" :active="inspectionTab === 'source'" @click="inspectionTab = 'source'" />
          </Tabs>
          <JsonInspector v-if="source && inspectionTab === 'source'" :jsonValue="source" />
          <JsonInspector v-if="mapping && inspectionTab === 'mapping'" :jsonValue="mapping" />
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import useProjects from '@/compositions/useProjects';
  import useClient from '@/compositions/useClient';
  import Tabs from '@/components/Tabs.vue';
  import Tab from '@/components/Tab.vue';
  import Table from '@/components/Table.vue';
  import Client from '@/models/Client';
  import JsonInspector from '@/components/JsonInspector.vue';
  import type { IndicesData, DocumentsData, DocumentInfo } from '@/models/Client';

  const { openProjects, activeProject, activateProject, closeProject } = useProjects();
  const { getClient } = useClient();
  const { replace } = useRouter();

  const client = ref<Client>();
  const indices = ref<IndicesData>([]);
  const columns = ref<string[]>([]);
  const rows = ref<DocumentsData>([]);

  const inspectionTab = ref('mapping');
  const activeIndex = ref();
  const source = ref();
  const mapping = ref();
  const query = ref();
  const page = ref(0);
  const inspectionPanelOpen = ref(false);

  watch(activeProject, async () => {
    client.value = activeProject.value ? await getClient(activeProject.value) : undefined;
    indices.value = client.value ? await client.value.indices() : [];
    activeIndex.value = null;
    rows.value = [];
    columns.value = [];
    source.value = null;
    mapping.value = null;
    inspectionPanelOpen.value = false;
  }, { immediate: true });

  /**
   * Get index info of the active index.
   */
  const activeIndexInfo = computed(() => {
    return indices.value.find((entry) => entry.name === activeIndex.value);
  });

  /**
   * Detect if we can navigate backwards (pagination).
   */
  const canNavigateBack = computed(() => page.value > 0);

  /**
   * Detect if we can navigate forwards (pagination).
   */
  const canNavigateForward = computed(() => {
    const pageSize = 30; // TODO
    const total = activeIndexInfo.value?.total ?? 0;
    return page.value < Math.round(total / pageSize);
  });

  /**
   * Navigate to the previous page of the records.
   * @todo
   */
  const gotoPreviousPage = () => {
    page.value -= 1;
    updateRecords();
  };

  /**
   * Navigate to the next page of the records.
   * @todo
   */
  const gotoNextPage = () => {
    page.value += 1;
    updateRecords();
  };

  /**
   * Load a given index in memory.
   * @param index
   */
  const loadIndex = async (index: string) => {
    activeIndex.value = index;

    if (!client.value) return;

    page.value = 0;
    query.value = null;
    source.value = null;
    mapping.value = null;
    inspectionTab.value = 'mapping';
    inspectionPanelOpen.value = false;

    updateRecords();

    mapping.value = await client.value.mappings(index);
  };

  /**
   * Update the records of the active index.
   */
  const updateRecords = async () => {
    if (!client.value) return;

    const records = await client.value.documents(activeIndex.value, page.value, query.value);

    if (records.length > 0) {
      columns.value = Object.keys(records[0].data);
      rows.value = records;
    } else {
      rows.value = [];
    }
  };

  /**
   * When we click on the add project button in the projects tab bar.
   */
  const createNewProject = () => {
    replace({ path: '/settings' });
  };

  /**
   * When we click on a records table row.
   * @param row
   */
  const handleClickRow = (row: DocumentInfo) => {
    source.value = row.data;
    inspectionTab.value = 'source';
    inspectionPanelOpen.value = true;
  };

</script>
