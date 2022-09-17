module.exports = {
  apps: [
    {
      name: "Web Rizky:3020",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      args: "start",
    },
  ],
};
