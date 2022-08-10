<template>
  <div
    class="rounded-full last:rounded-bl-none transition-all bg-gray-200 w-fit md:py-4 py-3 md:px-8 px-6 mb-1 md:text-2xl text-lg antialiased font-sans">
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
