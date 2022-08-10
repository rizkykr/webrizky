<template>
  <div ref="message" class="apppesan md:m-4 m-2">
    <Head>
      <Meta property="og:site_name" content="rizkykr.com" />
      <Meta property="og:title" content="RizkyKR" />
      <Meta property="og:description" content="I design and code things on the web." />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://www.rizkykr.com" />
      <Meta property="og:image" content="img/og-image.png" />
      <Meta property="og:image:type" content="image/png" />
      <Meta property="og:image:width" content="768" />
      <Meta property="og:image:height" content="416" />
    </Head>
    <Chat v-for="txt in pesan" v-html="txt"></Chat>
  </div>
</template>
<script>
import Chat from "~~/components/Chat.vue";
export default defineComponent({
  async setup() {
    const { geoUrl } = useRuntimeConfig();
    const [{ data: fetchLokasi }] = await Promise.all([
      useFetch(`${geoUrl}/json/`),
      // useFetch(`https://api.github.com/orgs/nuxt/repos`)
    ])

    return { fetchLokasi }
  },
  head: {
    title: "RizkyKR - Web Fullstack Developer",
  },
  data() {
    return {
      pesan: [],
      loc: null,
      pesancur: 0,
      typingSpeed: 20,
      loadingText:
        '<span class="flex md:gap-2 gap-1 md:py-2 py-1"><span class="flex h-3 w-3 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span></span><span class="flex h-3 w-3 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span></span><span class="flex h-3 w-3 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span></span></span>',
      messages: {
        id: [
          "Halo, Assalamualaikum 👋",
          "Saya Rizky",
          "Saya mendesain dan membuat kode apapun di web.",
          'Saya saat ini sedang menerima pekerjaan freelance.<br> Bisa menghubungi saya di <a href="mailto:me@rizkykr.com" class="underline text-sky-500">me@rizkykr.com</a>',
          '<a target="_blank" class="underline text-sky-500" href="https://codepen.io/rizkykurniawanritonga">codepen.io/rizkykurniawanritonga</a><br><a target="_blank" class="underline text-sky-500" href="https://github.com/rizkykurniawanritonga">github.com/rizkykurniawanritonga</a>',
          this.getCurTime(),
          "👀 R."
        ],
        en: [
          "Hey there 👋",
          "I'm Rizky",
          "I design and code things on the web",
          'I\'m currently accepting freelance work.<br> You can contact me at <a class="underline text-sky-500" href="mailto:me@rizkykr.com">me@rizkykr.com</a>',
          '<a target="_blank" class="underline text-sky-500" href="https://codepen.io/rizkykurniawanritonga">codepen.io/rizkykurniawanritonga</a><br><a class="underline text-sky-500" target="_blank" href="https://github.com/rizkykurniawanritonga">github.com/rizkykurniawanritonga</a>',
          this.getCurTime(),
          "👀 R."
        ]
      },
    };
  },
  watch: {
    // whenever question changes, this function will run
    loc(dt) {
      this.kirimPesan(dt);
    }
  },
  methods: {
    kirimPesan(lg) {
      const datapesan = this.messages[(lg=='id'?lg:'en')];
      if (this.pesancur < datapesan.length) {
        this.pesan.push(this.loadingText);
        setTimeout(() => {
          this.pesan[this.pesancur] = datapesan[this.pesancur];
          this.pesancur = this.pesancur + 1;
          setTimeout(() => {
            this.kirimPesan(this.loc);
          }, 1000);
        }, datapesan[this.pesancur].replace(/<(?:.|\n)*?>/gm, "").length * this.typingSpeed + 500);
      }
    },
    getCurTime() {
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var current = hours + minutes * 0.01;
      // if (current >= 5 && current < 19) return "Have a nice day";
      // if (current >= 19 && current < 22) return "Have a nice evening";
      // if (current >= 5 && current < 22) return "Have a nice day";
      // if (current >= 22 || current < 5) return "Have a good night";
      return (current >= 5 && current < 22) ? "Have a nice day" : "Have a good night";
    },
  },
  mounted() {
    this.loc = (this.fetchLokasi).country_code.toLowerCase();
    console.log(this.loc);
  },
  components: { Chat },
});
</script>
