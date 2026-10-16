import { defineConfig } from "@neondatabase/config/v1";

export default defineConfig({
  functions: {
    armstats: {
      name: "ARM Job Scout Analytics Collector",
      source: "./functions/armstats.ts",
    },
  },
});
