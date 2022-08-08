module.exports = {
  apps: [
    {
      name: "Web Rizky",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
