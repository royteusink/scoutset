<template>
  <button @click="emit('click')" class="relative select-none bg-gray-200 hover:bg-gray-100 hover:z-10 focus:z-10 focus:outline-none h-8 transition-colors on:bg-white on:z-20 group" :class="{'on': active }">
      <svg viewBox="-1 0 16 34" class="h-8 fill-current text-gray-200 group-hover:text-gray-100 absolute bottom-0 right-full transition-colors on:!text-white">
          <path fill-rule="evenodd" d="M 15.299438 0c-4.970563 0-9 4.029437-9 9v15.981598c.048695 2.331788-.428313 4.284404-1.431024 5.85785C3.865703 32.412894 2.242899 33.466411.000001 34h15.299437V0Z"/>
      </svg>

      <span class="flex items-center justify-between gap-2 text-xs min-w-32 max-w-64">
          <img src="@/assets/vite.svg" class="flex-none h-4 w-4" />
          <span class="block w-full truncate text-left">
            {{ label }}
          </span>
          <span @click.stop="emit('close')" class="flex-none text-xs bg-transparent hover:bg-gray-200 focus:bg-gray-300 rounded-full w-4 flex justify-center items-center">
            &times;
          </span>
      </span>

      <svg viewBox="0 0 16 34" class="h-8 fill-current text-gray-200 group-hover:text-gray-100 absolute bottom-0 left-full transition-colors on:!text-white">
          <path fill-rule="evenodd" d="M0 0c4.970563 0 9 4.029437 9 9v15.981598c-.048695 2.331788.428313 4.284404 1.431024 5.85785C11.433735 32.412894 13.056539 33.466411 15.299437 34H0V0Z"/>
      </svg>
  </button>
</template>

<script lang="ts" setup>
  defineProps({
    label: String,
    active: Boolean,
  });

  const emit = defineEmits([
    'click',
    'close',
  ]);
</script>
