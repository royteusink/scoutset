<template>
  <Transition name="modal-fade">
    <div v-if="show" class="fixed z-50 inset-0 flex justify-center items-center bg-gray-500/30">
      <div role="dialog" class="flex flex-col overflow-auto bg-white shadow-xl p-4">
        <header>
          <slot name="header">
            This is the default tile!
          </slot>
          <button type="button" @click.stop="emit('close')" title="lose" class="outline-none w-4 h-4 flex-none text-xs bg-transparent hover:bg-gray-200 focus:bg-gray-300 rounded-full flex justify-center items-center">
            <svg viewBox="0 0 48 48" class="pointer-events-none w-3">
              <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
            </svg>
          </button>
        </header>
        <section>
          <slot name="body">
            This is the default body!
          </slot>
        </section>
        <footer>
          <slot name="footer">
            This is the default footer!
          </slot>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
  defineProps({
    show: Boolean,
  });

  const emit = defineEmits([
    'close',
  ]);
</script>

<style>
  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>
