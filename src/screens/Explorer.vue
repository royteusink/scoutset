<template>
  <div>
    <Tabs>
      <Tab label="es.server.com" active />
      <Tab label="es1.server.com" />
      <Tab label="es2.server.com" />
    </Tabs>
  </div>
</template>

<script setup lang="ts">
  import Tabs from '@/components/Tabs.vue';
  import Tab from '@/components/Tab.vue';
</script>
