<template>
  <div class="overflow-auto bg-white text-black text-xs">
    <div class="table min-w-full">
      <div class="table-header-group sticky top-0">
        <div class="table-row from-white to-gray-50 bg-gradient-to-b">
          <div v-for="(column, coldex) in columns" :key="column" class="table-cell py-1 pl-4 pr-4 text-gray-600 border-b border-gray-200 border-r last:border-r-0" @click="emit('clickColumn', column)">
            {{ column }}
          </div>
        </div>
      </div>

      <div class="table-row-group">
        <div v-for="row in rows" :key="row.id" :class="{ 'table-row odd:bg-gray-50 hover:bg-blue-500 hover:text-white cursor-default': true }" @click="emit('clickRow', row)">
          <div v-for="column in columns" :key="`${row.id}_${column}`" :class="{ 'table-cell py-1 pl-4 pr-4 truncate max-w-64': true }">
            <span v-if="row.data[column] === null" class="text-gray-400">NULL</span>
            <template v-else>{{ row.data[column] }}</template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    rows: { id: string, data: Record<string, string> }[],
    columns: string[],
  }>();

  const emit = defineEmits([
    'clickRow',
    'clickColumn',
  ]);
</script>
