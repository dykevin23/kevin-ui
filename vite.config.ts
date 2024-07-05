import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import postcss from "rollup-plugin-postcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts(),
    postcss({
      extract: "global.css", // CSS 파일을 추출하여 별도로 저장
      minimize: true,
      sourceMap: true,
      inject: false, // inject 옵션을 false로 설정하여 CSS 파일을 별도로 추출
      // 다른 postcss 플러그인들 (예: tailwindcss, autoprefixer) 설정
      plugins: [require("tailwindcss"), require("autoprefixer")],
    }),
  ],
  // css: {
  //   postcss: {
  //     plugins: [require("tailwindcss"), require("autoprefixer")],
  //   },
  // },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "index",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
