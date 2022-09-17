module.exports = {
  apps: [
    {
      name: "Web Rizky:3020",
      exec_mode: "fork",
      instances: "1",
      script: "./.output/server/index.mjs",
      args: "start",
    },
  ],
};
