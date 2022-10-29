<template>
  <div class="overflow-auto whitespace-nowrap font-mono text-xs">
    <JsonValue :jsonValue="jsonValue"></JsonValue>
  </div>
</template>

<script lang="ts" setup>
  import JsonValue from '@/components/JsonValue.vue';

  const props = defineProps<{
    jsonValue: object,
  }>();
</script>
