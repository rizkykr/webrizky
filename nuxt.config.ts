import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  dev: false,
  nitro: {
    preset: "node-server",
  },
  app: {
    buildAssetsDir: "/apps/",
    head: {
      viewport:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "I design and code things on the web.",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
      ],
      noscript: [
        // <noscript>Javascript is required</noscript>
        { children: "Javascript is required" },
      ],
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image-edge"],
});
