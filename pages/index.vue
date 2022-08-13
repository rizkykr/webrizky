<template>
  <div
    ref="message"
    class="apppesan fixed top-0 h-full w-screen flex flex-col md:justify-start justify-end"
  >
    <Head>
      <Meta property="og:site_name" content="rizkykr.com" />
      <Meta property="og:title" content="RizkyKR" />
      <Meta
        property="og:description"
        content="I design and code things on the web."
      />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://www.rizkykr.com" />
      <Meta property="og:image" content="/img/og-image.png" />
      <Meta property="og:image:type" content="image/png" />
      <Meta property="og:image:width" content="768" />
      <Meta property="og:image:height" content="416" />
    </Head>
    <BubbleChat v-for="txt in pesan" v-html="txt" />
    <div
      class="md:fixed md:bottom-3 md:right-3 dark:bg-slate-800 md:p-0 p-2 md:mt-0 mt-1 md:shadow-none shadow-2xl"
    >
      <button
        @click="open1 = true"
        class="bg-sky-500 md:shadow-lg dark:bg-slate-900 text-white w-full block text-center md:px-3 py-2 rounded-full md:text-sm"
      >
        {{ lang.ks[lokasi] }}
      </button>
    </div>
    <!-- Modal Social -->
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      :class="open1 ? 'block' : 'hidden'"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity delay-100"
        :class="
          open
            ? 'opacity-100 ease-out duration-300'
            : 'opacity-0 ease-in duration-200'
        "
      ></div>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
        >
          <div
            class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full delay-100"
            :class="
              open
                ? 'opacity-100 translate-y-0 sm:scale-100 ease-out duration-300'
                : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 ease-in duration-200'
            "
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                    class="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    {{ lang.ks[lokasi] }}
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      {{ lang.ucan[lokasi] }}
                    </p>
                  </div>
                  <div class="mt-4 flex gap-3 justify-center">
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
              class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                type="button"
                @click="open1 = false"
                class="mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {{ lang.btn.close[lokasi] }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default defineComponent({
  async setup() {
    function hanyaCode(txt) {
      return txt
        .split(",")[2]
        .replace("}", "")
        .split(":")[1]
        .split('"')
        .join("")
        .toLocaleLowerCase();
    }
    const [{ data: lokasi }] = await Promise.all([
      useFetch(`https://api.myip.com`, {
        parseResponse: (txt) => hanyaCode(txt),
      }),
    ]);

    return { lokasi };
  },
  head: {
    title: "RizkyKR - Web Fullstack Developer",
    bodyAttrs: {
      class: "bg-slate-50 dark:bg-slate-900",
    },
  },
  data() {
    return {
      open: false,
      open1: false,
      sosmed: [
        ["E-mail", "mailto:me@rizkykr"],
        ["Github", "https://github.com/rizkykurniawanritonga"],
        ["Codepen", "https://codepen.io/rizkykurniawanritonga"],
      ],
      pesan: [],
      pesancur: 0,
      typingSpeed: 20,
      loadingText:
        '<span class="flex gap-2 px-1 py-2"><span class="flex md:h-2 md:w-2 h-1 w-1 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full md:h-2 md:w-2 h-1 w-1 bg-gray-500"></span></span><span class="flex md:h-2 md:w-2 h-1 w-1 relative"><span class="animate-ping animation-delay-200 absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full md:h-2 md:w-2 h-1 w-1 bg-gray-500"></span></span><span class="flex md:h-2 md:w-2 h-1 w-1 relative"><span class="animate-ping animation-delay-400 absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full md:h-2 md:w-2 h-1 w-1 bg-gray-500"></span></span></span>',
      lang: {
        ks: {
          id: "Kontak Saya",
          en: "Contact me",
        },
        ucan: {
          id: "Anda dapat menghubungi saya dengan cara berikut:",
          en: "You can contact me in the following way:",
        },
        btn: {
          close: {
            id: "Tutup",
            en: "Close",
          },
        },
        messages: {
          id: [
            "Halo, Assalamualaikum 👋",
            "Saya Rizky",
            "Saya mendesain dan membuat kode apapun di web.",
            `Saya saat ini sedang menerima pekerjaan freelance.<br> Bisa menghubungi saya pada tombol Kontak saya.`,
            this.getCurTime(),
            "👀 R.",
          ],
          en: [
            "Hey there 👋",
            "I'm Rizky",
            "I design and code things on the web",
            `I\'m currently accepting freelance work.<br> You can contact me via the Contact me button.`,
            this.getCurTime(),
            "👀 R.",
          ],
        },
      },
    };
  },
  watch:{
    open1(bl){
      setTimeout(() => {
        this.open = bl
      }, bl ? 200 : 300);
    }
  },
  methods: {
    kirimPesan() {
      const lg = this.lokasi;
      const datapesan = this.lang.messages[lg == "id" ? lg : "en"];
      if (this.pesancur < datapesan.length) {
        this.pesan.push(this.loadingText);
        setTimeout(() => {
          this.pesan[this.pesancur] = datapesan[this.pesancur];
          this.pesancur = this.pesancur + 1;
          setTimeout(() => {
            this.kirimPesan();
          }, 1000);
        }, datapesan[this.pesancur].replace(/<(?:.|\n)*?>/gm, "").length * this.typingSpeed + 500);
      }
    },
    getCurTime() {
      var date = new Date(),
        current = date.getHours() + date.getMinutes() * 0.01;
      return current >= 5 && current < 22
        ? "Have a nice day"
        : "Have a good night";
    },
  },
  mounted() {
    this.kirimPesan();
  },
});
</script>
