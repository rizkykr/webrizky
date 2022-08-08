<template>
  <div ref="message" class="apppesan md:m-4 m-2">
    <Head>
      <Meta property="og:site_name" content="rizkykr.com" />
      <Meta property="og:title" content="RizkyKR" />
      <Meta
        property="og:description"
        content="I design and code things on the web."
      />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://www.rizkykr.com" />
      <Meta property="og:image" content="img/og-image.png" />
      <Meta property="og:image:type" content="image/png" />
      <Meta property="og:image:width" content="768" />
      <Meta property="og:image:height" content="416" />
    </Head>
    <Chat v-for="(txt, idx) in pesan" v-html="txt"></Chat>
  </div>
</template>
<script>
import Chat from "~~/components/Chat.vue";
export default {
  head: {
    title: "RizkyKR - Web Fullstack Developer",
  },
  data() {
    return {
      pesan: [],
      pesancur: 0,
      typingSpeed: 20,
      loadingText:
        '<span class="flex md:gap-2 gap-1 md:py-2 py-1"><span class="flex h-3 w-3 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span></span><span class="flex h-3 w-3 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span></span><span class="flex h-3 w-3 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span></span></span>',
      messages: [
        "Halo, Assalamualaikum 👋",
        "Saya Rizky",
        "Saya mendesain dan membuat kode apapun di web.",
        'Saya saat ini sedang menerima pekerjaan freelance.<br> Bisa menghubungi saya di <a href="mailto:me@rizkykr.com">me@rizkykr.com</a>',
        '<a target="_blank" href="https://codepen.io/rizkykurniawanritonga">codepen.io/rizkykurniawanritonga</a><br><a target="_blank" href="https://github.com/rizkykurniawanritonga">github.com/rizkykurniawanritonga</a>',
        this.getCurTime(),
        "👀 R.",
      ],
    };
  },
  methods: {
    kirimPesan() {
      if (this.pesancur < this.messages.length) {
        this.pesan.push(this.loadingText);
        setTimeout(() => {
          this.pesan[this.pesancur] = this.messages[this.pesancur];
          this.pesancur = this.pesancur + 1;
          setTimeout(() => {
            this.kirimPesan();
          }, 1000);
        }, this.messages[this.pesancur].replace(/<(?:.|\n)*?>/gm, "").length * this.typingSpeed + 500);
      }
    },
    getCurTime() {
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var current = hours + minutes * 0.01;
      if (current >= 5 && current < 19) return "Have a nice day";
      if (current >= 19 && current < 22) return "Have a nice evening";
      if (current >= 22 || current < 5) return "Have a good night";
    },
  },
  mounted() {
    this.kirimPesan();
  },
  components: { Chat },
};
</script>
