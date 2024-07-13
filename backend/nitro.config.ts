//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  experimental: {
    database: true,
  },
  database: {
    default: {
      connector: "sqlite",
      options: { name: "db" },
    },
  },
});
