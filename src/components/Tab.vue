<template>
  <button type="button" @click="emit('click')" :class="{
    'relative select-none focus:outline-none h-8 transition-colors group': true,
    'bg-gray-200 hover:bg-gray-50 hover:z-10 focus:bg-gray-50 focus:z-10': !active,
    'bg-white z-20': active,
  }">
    <svg viewBox="-1 0 16 34" :class="{
      'h-8 fill-current absolute bottom-0 right-full transition-colors': true,
      'text-gray-200 group-hover:text-gray-50 group-focus:text-gray-50': !active,
      'text-white': active
    }">
      <path fill-rule="evenodd" d="M 15.299438 0c-4.970563 0-9 4.029437-9 9v15.981598c.048695 2.331788-.428313 4.284404-1.431024 5.85785C3.865703 32.412894 2.242899 33.466411.000001 34h15.299437V0Z" />
    </svg>

    <span class="relative flex items-center justify-between gap-2 text-xs min-w-32 max-w-64 z-[1]">
      <img src="@/assets/vite.svg" class="flex-none h-4 w-4" />
      <span class="block w-full truncate text-left font-medium text-gray-700 group-focus:text-black">
        {{ name }}
      </span>
      <span @click.stop="emit('close')" :title="`Close tab ${name}`" tabindex="0" class="outline-none w-4 h-4 flex-none text-xs bg-transparent hover:bg-gray-200 focus:bg-gray-300 rounded-full flex justify-center items-center">
        <svg viewBox="0 0 48 48" class="pointer-events-none w-3">
          <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
        </svg>
      </span>
    </span>

    <svg viewBox="0 0 16 34" :class="{
      'h-8 fill-current absolute bottom-0 left-full transition-colors': true,
      'text-gray-200 group-hover:text-gray-50 group-focus:text-gray-50': !active,
      'text-white': active,
    }">
      <path fill-rule="evenodd" d="M0 0c4.970563 0 9 4.029437 9 9v15.981598c-.048695 2.331788.428313 4.284404 1.431024 5.85785C11.433735 32.412894 13.056539 33.466411 15.299437 34H0V0Z" />
    </svg>
  </button>
</template>

<script lang="ts" setup>
  defineProps({
    name: String,
    active: Boolean,
  });

  const emit = defineEmits([
    'click',
    'close',
  ]);
</script>
