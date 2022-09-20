<template>
  <div
    class="bg-black flex-shrink-0 mx-auto text-white !opacity-20 rounded-2xl px-3 my-3 text-sm animate__animated animate__faster animate__fadeInUp"
    v-if="pos == 'info'"
  >
    {{ content }}
  </div>
  <div
    class="chat-list flex last:md:mb-3"
    :class="pos == 'left' ? 'justify-start mr-14' : 'ml-14 justify-end'"
    v-else-if="type != 'img'"
  >
    <span
      class="relative select-none animate__animated animate__faster rounded-2xl ring-1 ring-slate-900/5 shadow w-fit max-w-full mb-2 md:mx-4 mx-3 md:text-base text-sm antialiased font-sans break-words"
      :class="[
        type == 'loading'
          ? 'md:py-3 py-2 md:px-6 px-4 animate__fadeInUp'
          : `md:py-3 py-2 md:pl-6 pl-4 ${
              isBot(content, `bolean`) ? 'pr-16' : 'pr-14'
            } animate__bounceIn`,
        pos == 'right'
          ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white'
          : `${color} ${
              kontain(color, 'badword') && '!text-white'
            } dark:bg-slate-800 text-slate-900 dark:text-white`,
      ]"
    >
      <div
        class="mediachat -ml-2 md:mb-3 mb-2 gap-2"
        :class="
          media.length == 1
            ? '-mr-12 md:-ml-3 grid-cols-1'
            : 'md:-mr-12 -mr-14 grid-cols-2'
        "
        v-if="media.length > 0 && pos == 'left' && type != 'loading'"
      >
        <div v-for="dti in media" class="galery relative overflow-hidden">
          <a
            :href="dti"
            target="_blank"
            class="hoverzoom rounded-xl absolute inset-0 flex justify-center items-center bg-black text-white md:text-3xl text-2xl z-10 opacity-0 hover:opacity-80 transition-opacity cursor-pointer"
            ><i class="bx bx-search-alt"></i
          ></a>
          <img
            :data-src="dti"
            class="lazyload rounded-xl w-full h-full max-w-xs"
            alt=""
          />
        </div>
      </div>
      <span v-html="type == 'txt' ? isBot(content) : loadingText"></span
      ><span
        class="absolute right-4 bottom-1 opacity-50 text-xs"
        v-show="type != 'loading'"
        ><i class="bx bx-bot mr-0.5" v-if="isBot(content, `bolean`)"></i
        >{{ waktu }}</span
      >
    </span>
  </div>
  <div
    class="stikernye flex"
    :class="pos == 'left' ? 'justify-start' : 'justify-end'"
    v-else
  >
    <div
      class="stikernye w-fit animate__animated animate__faster animate__bounceIn"
      :class="pos == 'left' ? 'text-right' : 'text-left'"
    >
      <img
        :data-src="content"
        class="lazyload mb-2 md:mx-4 mx-3 md:w-44 w-36"
      />
      <span
        class="bg-black py-1 px-3 relative -top-4 rounded-full text-white opacity-20 text-xs"
        v-show="type != 'loading'"
        >{{ waktu }}</span
      >
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
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
    pos: {
      type: String,
      default: "left",
    },
    media: {
      type: Array,
      default: [],
    },
    color: {
      type: String,
      default: "bg-white",
    },
  },
  methods: {
    isBot(vl, st = "text") {
      return st == "text" ? _.replace(vl, "{BOT}", "") : kontain(vl, "{BOT}");
    },
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
