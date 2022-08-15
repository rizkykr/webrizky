<template>
  <ClientOnly>
    <div class="outeerapp flex flex-col fixed top-0 h-full w-screen">
      <div class="apppesan flex flex-1 flex-col md:justify-start justify-end">
        <LazyBubbleChat
          v-for="(dt, i) in pesan"
          :type="dt.type"
          :content="dt.content"
        />
      </div>
      <div
        class="md:fixed md:bottom-3 md:left-3 dark:bg-slate-800 md:p-0 p-3 md:mt-0 mt-1 md:shadow-none shadow-2xl md:border-t-0 border-t border-gray-300/30"
      >
        <button
          @click="bukaDialog"
          class="bg-sky-600 dark:bg-sky-900 md:shadow-lg text-white w-full block text-center md:px-3 py-2 rounded-full text-sm"
        >
          {{ lang.ks[lokasi] }}
        </button>
      </div>
      <LazyDialogSosmed
        :lang="lang"
        :show="showDialog"
        :sosmed="sosmed"
        :lokasi="lokasi"
        @tutup="showDialog = false"
      />
    </div>
  </ClientOnly>
</template>
<script>
import _ from "lodash";
export default defineComponent({
  async setup() {
    function hanyaCode(txt) {
      return _.lowerCase(_.last(_.toArray(JSON.parse(txt))));
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
      showDialog: false,
      sosmed: [
        ["E-mail", "mailto:me@rizkykr"],
        ["Github", "https://github.com/rizkykurniawanritonga"],
        ["Codepen", "https://codepen.io/rizkykurniawanritonga"],
      ],
      pesan: [],
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
            `Saya saat ini sedang menerima pekerjaan freelance.<br> Bisa menghubungi saya pada tombol Kontak saya.`,
            this.getCurTime(),
            "👀 R.",
            "/img/blink.gif",
          ],
          en: [
            "/img/hai.gif",
            "Hey there 👋",
            "I'm Rizky",
            "I design and code things on the web",
            `I\'m currently accepting freelance work.<br> You can contact me via the Contact me button.`,
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
      const lg = this.lokasi;
      const datapesan = this.lang.messages[lg == "id" ? lg : "en"];
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
            console.log(dt);
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
    _.defer(function (e) {
      e.kirimPesan();
    }, this);
  },
});
</script>
