<template>
  <!-- Modal Social -->
  <div
    class="relative z-30"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    :class="open1 ? 'block' : 'hidden'"
  >
    <div
      class="fixed inset-0 bg-black bg-opacity-75 transition-opacity delay-100"
      :class="
        open
          ? 'opacity-100 ease-out duration-300'
          : 'opacity-0 ease-in duration-200'
      "
    ></div>

    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-full p-4 text-center sm:p-0"
      >
        <div
          ref="modals"
          class="relative bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full delay-100"
          :class="
            open
              ? 'opacity-100 translate-y-0 sm:scale-100 ease-out duration-300'
              : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 ease-in duration-200'
          "
        >
          <div class="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-sky-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  {{ lang.ks[lokasi] }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-white">
                    {{ lang.ucan[lokasi] }}
                  </p>
                </div>
                <div
                  class="mt-4 flex md:flex-row flex-col gap-3 md:justify-start justify-center"
                >
                  <a
                    v-for="dt in sosmed"
                    :href="dt[1]"
                    target="_blank"
                    class="bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 active:bg-gray-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
                  >
                    {{ dt[0] }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 dark:bg-slate-900 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              type="button"
              @click="tutupmodal"
              class="w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-slate-800 text-base font-medium text-gray-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ lang.btn.close[lokasi] }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onClickOutside } from "@vueuse/core";
import _ from "lodash";
export default {
  data() {
    return {
      open: false,
      open1: false,
    };
  },
  props: {
    show: Boolean,
    lang: Object,
    lokasi: String,
    sosmed: Object,
  },
  watch: {
    show(bl) {
      bl ? this.bukamodal() : this.tutupmodal();
    },
  },
  methods: {
    bukamodal() {
      this.open1 = true;
      _.delay(
        function (e) {
          e.open = true;
        },
        100,
        this
      );
    },
    tutupmodal() {
      this.open = false;
      _.delay(
        function (e) {
          e.open1 = false;
          e.$emit("tutup");
        },
        300,
        this
      );
    },
  },
  mounted() {
    onClickOutside(this.$refs.modals, (event) => {
      this.$emit("tutup");
    });
  },
};
</script>
