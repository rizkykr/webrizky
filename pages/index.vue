<template>
  <div ref="message" class="apppesan md:m-4 m-2">

    <Head>
      <Meta property="og:site_name" content="rizkykr.com" />
      <Meta property="og:title" content="RizkyKR" />
      <Meta property="og:description" content="I design and code things on the web." />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://www.rizkykr.com" />
      <Meta property="og:image" content="/img/og-image.png" />
      <Meta property="og:image:type" content="image/png" />
      <Meta property="og:image:width" content="768" />
      <Meta property="og:image:height" content="416" />
    </Head>
    <BubbleChat v-for="txt in pesan" v-html="txt" />
  </div>
</template>
<script>
export default defineComponent({
  async setup() {
    function hanyaCode(txt) {
      return txt.split(",")[2].replace('}', '').split(":")[1].split('"').join('').toLocaleLowerCase();
    }
    const [{ data: lokasi }] = await Promise.all([
      useFetch(`https://api.myip.com`, { parseResponse: txt => hanyaCode(txt) }),
    ])

    return { lokasi }
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
        '<span class="flex md:gap-2 gap-1 md:py-2 py-1"><span class="flex md:h-3 md:w-3 h-2 w-2 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full md:h-3 md:w-3 h-2 w-2 bg-gray-500"></span></span><span class="flex md:h-3 md:w-3 h-2 w-2 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full md:h-3 md:w-3 h-2 w-2 bg-gray-500"></span></span><span class="flex md:h-3 md:w-3 h-2 w-2 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span><span class="relative inline-flex rounded-full md:h-3 md:w-3 h-2 w-2 bg-gray-500"></span></span></span>',
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
  methods: {
    kirimPesan() {
      const lg = this.lokasi;
      const datapesan = this.messages[(lg == 'id' ? lg : 'en')];
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
      var date = new Date(), current = date.getHours() + date.getMinutes() * 0.01;
      return (current >= 5 && current < 22) ? "Have a nice day" : "Have a good night";
    },
  },
  mounted() {
    this.kirimPesan()
  },
});
</script>
