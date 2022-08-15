<template>
  <div
    class="outeerapp flex flex-col fixed top-0 h-full w-screen overflow-auto"
  >
    <div
      class="apppesan flex flex-1 flex-col md:justify-start justify-end mb-14"
    >
      <LazyBubbleChat
        v-for="(dt, i) in pesan"
        :type="dt.type"
        :content="dt.content"
      />
    </div>
    <div
      class="fixed md:bottom-3 bottom-0 md:w-auto w-full md:left-3 backdrop-blur-md bg-white/30 dark:bg-slate-800 md:p-0 p-3 md:mt-0 mt-1 md:shadow-none shadow-2xl md:border-t-0 border-t border-gray-300/30"
    >
      <button
        @click="bukaDialog"
        class="bg-sky-600 dark:bg-sky-900 md:shadow-lg text-white w-full block text-center md:px-3 py-2 rounded-full text-sm"
      >
        {{ lang.ks[loc] }}
      </button>
    </div>
    <LazyDialogSosmed
      :lang="lang"
      :show="showDialog"
      :sosmed="sosmed"
      :lokasi="loc"
      @tutup="showDialog = false"
    />
  </div>
</template>
<script>
import _ from "lodash";
export default defineComponent({
  async setup() {
    const [{ data: lokasi }] = await Promise.all([
      useFetch(`https://api.myip.com`, {
        parseResponse: (txt) => _.lowerCase(_.last(_.toArray(JSON.parse(txt)))),
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
      showDialog: false,
      sosmed: [
        ["E-mail", "mailto:me@rizkykr.com"],
        ["Github", "https://github.com/rizkykurniawanritonga"],
        ["Codepen", "https://codepen.io/rizkykurniawanritonga"],
      ],
      pesan: [],
      loc: "en",
      pesancur: 0,
      typingSpeed: 20,
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
            "/img/hai.gif",
            "Halo, Assalamualaikum 👋",
            "Saya Rizky",
            "Saya mendesain dan membuat kode apapun di web.",
            `Saya saat ini sedang menerima pekerjaan freelance. Bisa menghubungi saya pada tombol Kontak saya.`,
            this.getCurTime(),
            "👀 R.",
            "/img/blink.gif",
          ],
          en: [
            "/img/hai.gif",
            "Hey there 👋",
            "I'm Rizky",
            "I design and code things on the web",
            `I\'m currently accepting freelance work. You can contact me via the Contact me button.`,
            this.getCurTime(),
            "👀 R.",
            "/img/blink.gif",
          ],
        },
      },
    };
  },
  methods: {
    bukaDialog: function (event) {
      this.showDialog = true;
    },
    kirimPesan() {
      const datapesan = this.lang.messages[this.loc];
      if (_.lt(this.pesancur, datapesan.length)) {
        this.pesan.push({
          type: "loading",
          content: "loading",
        });
        _.delay(
          function (e) {
            const dt = {
              type: _.includes(datapesan[e.pesancur], ".gif") ? "img" : "txt",
              content: datapesan[e.pesancur],
            };
            e.pesan[e.pesancur] = dt;
            // console.log(dt);
            e.pesancur++;
            _.delay(
              function (f) {
                f.kirimPesan();
              },
              1000,
              e
            );
          },
          _.size(datapesan[this.pesancur]) * this.typingSpeed + 500,
          this
        );
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
    this.loc = this.lokasi;
    _.defer(function (e) {
      e.kirimPesan();
    }, this);
  },
});
</script>
