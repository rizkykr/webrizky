<template>
  <div
    class="rounded-full last:rounded-bl-none transition-all bg-gray-200 w-fit leading-tight md:py-4 py-2 md:px-8 px-4 mb-1 md:text-2xl text-sm antialiased font-sans">
    <slot />
  </div>
</template>
<script>
export default {
  name: "Chat",
  props: {
    show: Boolean,
  },
};
</script>
