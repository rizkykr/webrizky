<template>
  <div
    class="outeerapp flex flex-col fixed top-0 h-full w-screen overflow-auto"
  >
    <div
      class="apppesan flex flex-1 flex-col md:justify-start justify-end mb-14"
      ref="apppesan"
    >
      <LazyBubbleChat
        v-for="(dt, i) in pesan"
        :type="dt.type"
        :content="dt.content"
        :pos="dt.pos"
      />
    </div>
    <div
      ref="chatEntry"
      class="fixed z-20 flex gap-3 md:rounded-full md:bottom-3 bottom-0 md:w-1/4 w-full md:left-3 backdrop-blur-md bg-white/60 dark:bg-slate-800 md:p-0 p-2 md:mt-0 mt-1 md:border border-t dark:border-gray-300/30 border-gray-300"
    >
      <button
        @click="bukaDialog"
        class="bg-sky-600 dark:bg-sky-900 text-white text-center px-3 py-2 rounded-full text-sm flex-none"
      >
        <i class="bx bx-envelope text-xl align-middle"></i>
        <span class="hidden">{{ lang.ks[loc] }}</span>
      </button>
      <form
        class="flex flex-1 content-center"
        @submit.prevent="kirimPesan(teksType, 'right')"
      >
        <input
          type="text"
          class="bg-transparent focus:outline-0 py-1 text-base flex-1 dark:text-white"
          placeholder="Ketikkan pesan"
          v-model="teksType"
        />
        <button
          v-if="showSendBtn"
          :class="showSendBtnAnim ? 'animate__fadeIn' : 'opacity-0'"
          type="submit"
          class="text-sky-600 md:shadow-l md:mr-2 text-center px-3 py-2 rounded-full text-sm flex-none w-10 h-10 animate__animated animate__faster opacity-0"
        >
          <i class="bx bxs-send align-middle text-2xl"></i>
        </button>
        <button
          @click="toggleChatList()"
          v-else
          :class="!showSendBtnAnim ? 'animate__fadeIn' : 'animate__fadeOut'"
          class="dark:text-white md:-bottom-0 -bottom-1 relative md:mr-2 text-center py-1 px-2 rounded-full text-2xl flex-none animate__animated animate__faster justify-center"
        >
          <i class="bx bx-menu" :class="chatListState ? 'bx-x' : 'bx-menu'"></i>
        </button>
      </form>
    </div>
    <div
      class="menuChat fixed z-10 md:left-3 backdrop-blur-md bg-white/80 dark:bg-slate-800 bottom-0 md:w-3/12 w-full rounded-t-xl dark:text-white animate__animated animate__faster shadow md:border-t-none border-t border-gray-300"
      :class="[chatListState ? 'animate__slideInUp' : 'animate__slideOutDown']"
      :style="[`padding-bottom:${pbtmBtCht + 25}px`]"
    >
      <ul class="mt-2">
        <li
          v-for="dt in chatShortcut"
          class="flex px-4 py-1.5 border-b border-white/10 last:border-b-0 cursor-pointer dark:hover:bg-slate-900 hover:border-white/5 select-none"
          @click="kirimPesan(dt.cmd, 'right'), toggleChatList()"
        >
          <span class="flex-1">{{ dt.title }}</span>
          <span class="dark:text-white/30 text-black/30">{{ dt.cmd }}</span>
        </li>
      </ul>
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
import { useElementSize, useToggle } from "@vueuse/core";
export default defineComponent({
  async setup() {
    const [{ data: lokasi }] = await Promise.all([
      useFetch(`/?token=${useRuntimeConfig().apiSecret}`, {
        baseURL: useRuntimeConfig().apiBase,
        pick: ["city", "region", "country", "loc", "org", "timezone"],
        parseResponse: JSON.parse,
      }),
    ]);
    const [chatListState, toggleChatList] = useToggle();
    return { lokasi, chatListState, toggleChatList };
  },
  head: {
    title: `RizkyKR - Web Fullstack Developer`,
    bodyAttrs: {
      class: "bg-slate-50 dark:bg-slate-900",
    },
  },
  watch: {
    teksType(vl) {
      if (vl) {
        this.showSendBtn = true;
        _.delay(
          function (f) {
            f.showSendBtnAnim = true;
          },
          50,
          this
        );
      } else {
        this.showSendBtnAnim = false;
        _.delay(
          function (f) {
            f.showSendBtn = false;
          },
          50,
          this
        );
      }
    },
  },
  data() {
    return {
      showDialog: false,
      showSendBtn: false,
      showSendBtnAnim: false,
      teksType: "",
      sosmed: [
        ["E-mail", "mailto:me@rizkykr.com"],
        ["Github", "https://github.com/rizkykurniawanritonga"],
        ["Codepen", "https://codepen.io/rizkykurniawanritonga"],
      ],
      pesan: [],
      loc: "en",
      pesancur: 0,
      typingSpeed: 20,
      pbtmBtCht: 0,
      chatShortcut: [
        { title: "Kontak", cmd: "/start" },
        { title: "Lihat apa yang saya buat", cmd: "/portofolio" },
        { title: "Lihat bantuan", cmd: "/help" },
        { title: "Donasi", cmd: "/donasi" },
      ],
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
    chatPerkenalanAwal() {
      const datapesan = this.lang.messages[this.loc];
      if (_.lt(this.pesancur, datapesan.length)) {
        this.pesan.push({
          type: "loading",
          content: "loading",
          pos: "left",
        });
        _.delay(
          function (e) {
            const dt = {
              type: _.includes(datapesan[e.pesancur], ".gif") ? "img" : "txt",
              content: datapesan[e.pesancur],
              pos: "left",
            };
            e.pesan[e.pesancur] = dt;
            // console.log(dt);
            e.pesancur++;
            _.delay(
              function (f) {
                f.chatPerkenalanAwal();
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
    kirimPesan(psn, chtdir = "left") {
      if (psn) {
        chtdir == "left" &&
          this.pesan.push({
            type: "loading",
            content: "loading",
            pos: chtdir,
          });
        const cur = _.size(this.pesan);
        _.delay(
          function (e) {
            const dt = {
              type: _.includes(psn, ".gif") ? "img" : "txt",
              content: psn,
              pos: chtdir,
            };
            e.pesan[cur - (chtdir == "left" ? 1 : 0)] = dt;
            chtdir != "left" && (e.AIChat(psn), (e.teksType = ""));
            document.body.scrollTop = document.body.scrollHeight;
          },
          _.size(psn) * this.typingSpeed + (chtdir == "left" ? 500 : 100),
          this
        );
      }
    },
    AIChat(vl) {
      _.delay(
        function (e) {
          e.kirimPesan(
            `Maaf Chat Bot saya belum memahami maksud anda. silahkan mengklik tombol menu dibawah.`
          );
        },
        _.size(vl) * this.typingSpeed + 500,
        this
      );
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
    const { width, height } = useElementSize(this.$refs.chatEntry);
    this.pbtmBtCht = height;
    this.loc = _.lowerCase(this.lokasi.country);
    _.defer(function (e) {
      e.chatPerkenalanAwal();
    }, this);
  },
});
</script>
