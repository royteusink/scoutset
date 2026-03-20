<template>
  <nav aria-label="tabs" class="flex flex-none bg-gray-100 h-10 items-end gap-4 px-4 overflow-auto">
    <slot />

    <button v-if="allowNewTab" type="button" @click="emit('clickNewTab')" class="flex-none rounded-tl-lg rounded-br-lg w-6 h-5 flex justify-center items-center self-center outline:none bg-gray-200 hover:bg-gray-50 hover:z-10 focus:bg-gray-50">
      <svg viewBox="0 0 48 48" class="text-black w-4 h-4">
        <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" />
      </svg>
    </button>
  </nav>
</template>

<script lang="ts" setup>
  defineProps<{
    allowNewTab?: boolean
  }>();

  const emit = defineEmits([
    'clickNewTab',
  ]);
</script>
