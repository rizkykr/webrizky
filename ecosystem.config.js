module.exports = {
  apps: [
    {
      name: "Web Rizky",
      exec_mode: "fork",
      instances: "1",
      script: "./.output/server/index.mjs",
      args: "start",
    },
  ],
};
