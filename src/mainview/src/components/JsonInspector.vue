<template>
  <div class="overflow-auto whitespace-nowrap font-mono text-xs h-full">
    <div class="p-4">
      <JsonValue :jsonValue="jsonValue" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import JsonValue from '@/components/JsonValue.vue';

  defineProps<{
    jsonValue: object,
  }>();
</script>
