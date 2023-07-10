<script>
import {
  useElementBounding,
  useToggle,
  useTimeoutFn,
  useIntervalFn,
  onClickOutside,
} from "@vueuse/core";
export default defineComponent({
  async setup() {
    useHead({
      title: `RizkyKR - Frontend Web Developer`,
      bodyAttrs: {
        class: "bg-slate-50 dark:bg-slate-900",
      },
    });
    const apiloc = `https://fetchnegara.rizkykr.workers.dev/`;
    const { data: lokasi } = await useFetch(apiloc);
    const [chatListState, toggleChatList] = useToggle();
    return {
      lokasi: useLowerCase(lokasi?.value?.negara),
      chatListState,
      toggleChatList,
    };
  },
  data() {
    const langloc = this.lokasi;
    const sambutan = {
      id: [
        { psn: "/img/hai.gif" },
        { psn: "Halo, Assalamualaikum 👋" },
        { psn: "Saya Rizky" },
        { psn: "Saya mendesain dan membuat kode apapun di web." },
        {
          psn: `Saya saat ini sedang menerima pekerjaan freelance. Bisa menghubungi saya pada tombol Kontak saya.`,
        },
        { psn: this.getCurTime() },
        { psn: "👀 R." },
        { psn: "/img/blink.gif" },
      ],
      en: [
        { psn: "/img/hai.gif" },
        { psn: "Hey there 👋" },
        { psn: "I'm Rizky" },
        { psn: "I design and code things on the web" },
        {
          psn: `I\'m currently accepting freelance work. You can contact me via the Contact me button.`,
        },
        { psn: this.getCurTime() },
        { psn: "👀 R." },
        { psn: "/img/blink.gif" },
      ],
    };
    return {
      startApp: false,
      stateApp: false,
      showDialog: false,
      teksType: "",
      sosmed: [
        ["E-mail", "mailto:me@rizkykr.com"],
        ["Github", "https://github.com/rizkykurniawanritonga"],
        ["Codepen", "https://codepen.io/rizkykurniawanritonga"],
      ],
      pesan: [],
      pesancur: 0,
      typingSpeed: 20,
      pbtmBtCht: 0,
      chatShortcut: [
        { title: "Greetings", cmd: "/start" },
        { title: "Lihat apa yang saya buat", cmd: "/portofolio" },
        { title: "Kontak Saya", cmd: "/kontak" },
        { title: "Donasi", cmd: "/donasi" },
        { title: "Lihat bantuan", cmd: "/help" },
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
          startApp: {
            id: "mulai",
            en: "start",
          },
        },
        greetings: sambutan,
      },
      aiBrain: {
        start: sambutan[langloc == "id" ? "id" : "en"],
        help: [
          {
            psn: "{BOT}Ini adalah Aplikasi Chat buatan RizkyKR yang merupakan aplikasi untuk menyanjikan informasi berupa portfolio, resume maupun artikel rizky, untuk memulai anda dapat menggunakan kolom chat yang telah dilengkapi AI sehingga Bot saya dapat membalas anda secara langsung atau anda dapat menggunakan tombol menu atau kontak untuk menghubungi saya, terima kasih!",
          },
        ],
        kontak: [{ psn: "function(bukaDialog)" }],
        portofolio: [
          {
            psn: "{BOT}Berikut adalah portofolio saya.",
            media: ["/img/web.jpg"],
          },
        ],
        pacar: [
          { psn: "Tentunya ada dongg." },
          {
            psn: "Ini diaaaa 💕💕",
            media: ["/img/ayang.jpg"],
          },
          {
            psn: "Doain yaa dalam waktu dekat ini semoga langkahnya dipermudah 😄",
          },
        ],
      },
      badWords: [
        "babi",
        "anjing",
        "anjeng",
        "kontol",
        "ngentot",
        "memek",
        "mmk",
        "ajg",
        "tol",
        "jembot",
        "jembut",
      ],
    };
  },
  watch: {
    pesan() {
      this.autoSkroll();
    },
    chatListState() {
      onClickOutside(this.$refs.balutinEntry, (event) => {
        this.toggleChatList();
      });
    },
  },
  methods: {
    bukaDialog: function () {
      this.showDialog = true;
    },
    initMessage(psn) {
      if (isArray(psn)) {
        var cur = 0;
        const { pause, resume } = useIntervalFn(() => {
          if (isObjectLike(psn[cur])) {
            this.kirimPesan(psn[cur]);
          } else {
            this.kirimPesan({ psn: useTrim(psn[cur]) });
          }
          pause();
          setTimeout(() => {
            cur <= psn.length + 1 && resume();
            cur++;
          }, useSize(psn[cur] && psn[cur].psn) * this.typingSpeed + 500);
        }, 1000);
      } else {
        this.kirimPesan({ psn: useTrim(psn) });
      }
    },
    kirimPesan({
      psn,
      pos = "left",
      media = [],
      color = "bg-white",
      icon = "",
    }) {
      this.autoSkroll();
      if (psn) {
        pos == "left" &&
          this.pesan.push({
            type: "loading",
            content: "loading",
            pos: pos,
          });
        const cur = useSize(this.pesan);
        setTimeout(() => {
          this.autoSkroll();
        }, useSize("loading"));
        useTimeoutFn(() => {
          const stateBadWords = useSome(this.badWords, function (o) {
            return useIncludes(useSplit(useLowerCase(psn), " "), o);
          });
          const psnFilter = stateBadWords ? useRepeat("*", useSize(psn)) : psn;
          const dt = {
            type:
              useIncludes(psn, ".gif") || useIncludes(psn, ".jpg")
                ? "img"
                : "txt",
            content: psnFilter,
            pos: pos,
            media: media,
            color: color,
            icon: icon,
          };
          this.pesan[cur - (pos == "left" ? 1 : 0)] = dt;
          this.autoSkroll();
          pos == "right" &&
            (this.AIChat(stateBadWords ? "{BadWord}" : useTrim(psn)),
            (this.teksType = ""));
        }, useSize(psn) * this.typingSpeed + (pos == "left" ? 500 : 50));
        setTimeout(() => {
          this.autoSkroll();
        }, useSize(psn) * this.typingSpeed + (pos == "left" ? 500 : 50));
      }
    },
    AIChat(vl) {
      const fnd = useReplace(vl, "/", "");
      this.autoSkroll();
      setTimeout(() => {
        const lsAi = this.aiBrain;
        const psnBdWrd = useIncludes(fnd, "{BadWord}");
        const aiThinkBrain = [];
        useForEach(useSplit(useLowerCase(vl), " "), function (vlf) {
          const idx = lsAi[vlf];
          if (idx) {
            aiThinkBrain.push(idx);
          }
        });
        const pesan =
          useSize(aiThinkBrain) > 0
            ? aiThinkBrain
            : [
                [
                  {
                    color: psnBdWrd
                      ? "bg-gradient-to-r from-red-500 to-pink-500 badword"
                      : "bg-white",
                    psn: psnBdWrd
                      ? "{BOT}Tolong jangan menggunakan kata seperti itu ya."
                      : "{BOT}Maaf Chat Bot saya belum memahami maksud anda. silahkan mengklik tombol menu dibawah.",
                  },
                ],
              ];
        let pi = 0;
        const plgth = [];
        const typspd = this.typingSpeed;
        useForEach(pesan, function (vl1) {
          var vl2l = 0;
          useForEach(vl1, function (vl2) {
            var clc = useSize(vl2.psn) * (typspd / useSize(pesan) - 2);
            vl2l = vl2l + clc - clc * 0.3;
          });
          plgth.push(vl2l);
        });
        const { pause, resume, isActive } = useIntervalFn(() => {
          if (pi < pesan.length) {
            if (useIncludes(pesan[pi][0].psn, "function(")) {
              const dt = useReplace(
                useReplace(pesan[pi][0].psn, "function(", ""),
                ")",
                ""
              );
              this.kirimPesan({
                psn: "{BOT}execute: " + dt,
                icon: "bx bx-chip",
              });
              setTimeout(() => {
                if (useIncludes(dt, "=")) {
                  const fnc = useSplit(dt, "=");
                  this[fnc[0]] = fnc[1];
                } else {
                  this[dt]();
                }
              }, 1400);
            } else {
              this.initMessage(pesan[pi]);
            }
          }
          pause();
          pi < pesan.length &&
            setTimeout(() => {
              resume();
            }, plgth[pi] * typspd + 500);
          if (pi < pesan.length) {
            pi = pi + 1;
          }
        }, 1000);
      }, useSize(vl) * this.typingSpeed + 500);
    },
    getCurTime() {
      var date = new Date(),
        current = date.getHours() + date.getMinutes() * 0.01;
      return current >= 5 && current < 22
        ? "Have a nice day"
        : "Have a good night";
    },
    startAplikasi() {
      this.initMessage([
        {
          psn: "Memulai aplikasi",
          pos: "info",
          icon: "bx bxs-bolt",
        },
        { psn: "/start", pos: "right" },
      ]);
      this.startApp = true;
    },
    autoSkroll() {
      const messages = this.$refs.outeerapp;
      if (messages) {
        messages.scrollTop = messages.scrollHeight;
      }
    },
  },
  mounted() {
    const { height } = useElementBounding(this.$refs.chatEntry);
    this.pbtmBtCht = height;
  },
});
</script>
<template>
  <div
    class="outeerapp flex flex-col fixed top-0 h-full w-screen overflow-auto scroll-smooth"
    ref="outeerapp"
  >
    <div
      class="pesanApp flex items-center justify-center h-full mx-auto lg:w-2/4 w-full select-none"
    >
      <div
        class="bg-white dark:bg-slate-800 text-slate-900 dark:text-white my-5 shadow rounded-xl p-3 md:max-w-md max-w-xs md:text-base text-sm"
      >
        <span class="font-semibold">Apa yang dapat dilakukan disini?</span>
        <p>
          Hai, saya adalah Aplikasi Chat yang didesain khusus untuk Rizky.<br /><br />dan
          juga aplikasi ini berperan untuk menampilkan informasi penting berupa
          Portofolio dan informasi lainnya.<br /><br />Untuk memulai silahkan
          klik tombol Mulai dibawah atau klik link berikut
          <span @click="startAplikasi" class="text-blue-500">/start</span>
        </p>
      </div>
    </div>
    <div
      class="apppesan flex flex-1 flex-col md:justify-start mx-auto lg:w-2/4 w-full justify-end mb-14"
      ref="apppesan"
    >
      <LazyBubbleChat
        v-for="(dt, i) in pesan"
        :type="dt.type"
        :content="dt.content"
        :pos="dt.pos"
        :media="dt.media"
        :color="dt.color"
        :icon="dt.icon"
      />
    </div>
    <div ref="balutinEntry">
      <div
        ref="chatEntry"
        class="fixed inset-x-0 mx-auto z-20 flex items-center gap-3 transition-all md:rounded-full md:bottom-3 bottom-0 lg:w-2/4 w-full md:left-3 backdrop-blur-md bg-white/60 dark:bg-slate-800 md:!p-0 px-2 py-1 md:mt-0 mt-1 md:border border-t dark:border-gray-300/30 border-gray-300 overflow-hidden"
      >
        <button
          v-if="!startApp"
          class="uppercase text-blue-500 font-semibold py-2 text-center flex-1"
          @click="startAplikasi"
        >
          {{ lang.btn.startApp[lokasi] }}
        </button>
        <button
          v-if="startApp"
          @click="bukaDialog"
          class="text-sky-600 text-center px-3 py-2 rounded-full text-sm flex-none"
        >
          <i class="bx bx-envelope align-middle text-2xl"></i>
          <span class="hidden">{{ lang.ks[lokasi] }}</span>
        </button>
        <form
          v-if="startApp"
          class="flex flex-1 content-center"
          @submit.prevent="
            autoSkroll(),
              kirimPesan({ psn: teksType, pos: 'right' }),
              this.$refs.isiteksny.focus(),
              autoSkroll()
          "
        >
          <input
            type="text"
            class="bg-transparent focus:outline-0 py-1 text-base flex-1 dark:text-white"
            placeholder="Ketikkan pesan"
            v-model="teksType"
            ref="isiteksny"
            @click="autoSkroll()"
            @focus="autoSkroll()"
          />
          <button
            v-if="teksType"
            type="submit"
            class="text-sky-600 md:shadow-l md:mr-2 text-center px-3 py-2 rounded-full text-sm flex-none w-10 h-10"
          >
            <i class="bx bxs-send align-middle text-2xl"></i>
          </button>
          <button
            @click="toggleChatList(), (stateApp = true)"
            v-else
            class="dark:text-white bottom-0 relative md:mr-2 text-center py-1 px-2 rounded-full text-2xl flex-none justify-center"
          >
            <i
              class="bx bx-menu"
              :class="chatListState ? 'bx-x' : 'bx-menu'"
            ></i>
          </button>
        </form>
      </div>
      <div
        v-if="stateApp"
        class="menuChat fixed inset-x-0 mx-auto z-10 md:left-3 backdrop-blur-md bg-white/80 dark:bg-slate-800 md:bottom-4 bottom-0 md:w-3/12 w-full md:rounded-t-xl dark:text-white animate__animated animate__faster shadow border-t"
        :class="[
          chatListState ? 'animate__slideInUp' : 'animate__slideOutDown',
        ]"
        :style="[`padding-bottom:${pbtmBtCht + 10}px`]"
      >
        <ul class="mt-2">
          <li
            v-for="dt in chatShortcut"
            class="flex px-4 py-1.5 border-b border-white/10 last:border-b-0 cursor-pointer dark:hover:bg-slate-900 hover:border-white/5 select-none"
            @click="kirimPesan({ psn: dt.cmd, pos: 'right' }), toggleChatList()"
          >
            <span class="flex-1">{{ dt.title }}</span>
            <span class="dark:text-white/30 text-black/30">{{ dt.cmd }}</span>
          </li>
        </ul>
      </div>
    </div>
    <LazyDialogSosmed
      :lang="lang"
      :show="showDialog"
      :sosmed="sosmed"
      :lokasi="lokasi"
      @tutup="showDialog = false"
    />
  </div>
</template>
