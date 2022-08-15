<template>
  <span
    class="relative animate__animated rounded-full last-of-type:rounded-bl-none transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white ring-1 ring-slate-900/5 shadow w-fit !leading-5 mb-2 md:mx-4 mx-3 first:mt-4 last:mb-4 md:text-base text-sm antialiased font-sans"
    :class="
      type == 'loading'
        ? 'md:py-3 py-2 md:px-6 px-4 animate__fadeInUp'
        : 'md:py-3 py-2 md:pl-6 pl-4 pr-14'
    "
    v-if="type != 'img'"
  >
    <span v-html="type == 'txt' ? content : loadingText"></span
    ><span
      class="ml-4 absolute right-5 bottom-1 opacity-50 text-xs"
      v-show="type != 'loading'"
      >{{ waktu }}</span
    >
  </span>
  <div
    class="stikernye text-right w-fit animate__animated animate__fadeInUp"
    v-else
  >
    <nuxt-img
      :src="content"
      loading="lazy"
      class="lazy mb-2 md:mx-4 mx-3 first:mt-4 last:mb-4 md:w-44 w-36"
    />
    <span
      class="bg-black py-1 px-3 relative -top-4 rounded-full text-white opacity-20 text-xs"
      v-show="type != 'loading'"
      >{{ waktu }}</span
    >
  </div>
</template>
<script>
export default {
  name: "Chat",
  data() {
    return {
      waktu: "00:00",
      loadingText:
        '<span class="flex gap-2 px-1 py-2"><span class="flex md:h-2 md:w-2 h-1 w-1 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full md:h-2 md:w-2 h-1 w-1 bg-gray-500"></span></span><span class="flex md:h-2 md:w-2 h-1 w-1 relative"><span class="animate-ping animation-delay-200 absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full md:h-2 md:w-2 h-1 w-1 bg-gray-500"></span></span><span class="flex md:h-2 md:w-2 h-1 w-1 relative"><span class="animate-ping animation-delay-400 absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full md:h-2 md:w-2 h-1 w-1 bg-gray-500"></span></span></span>',
    };
  },
  props: {
    type: String,
    content: String,
  },
  methods: {
    waktuahh() {
      const checkTime = function (i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      };
      const d = new Date();
      this.waktu = checkTime(d.getHours()) + ":" + checkTime(d.getMinutes());
    },
  },
  mounted() {
    this.waktuahh();
  },
};
</script>
