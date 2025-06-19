import {
  defineConfig
} from "vite";
import {
  resolve,
  relative,
  extname,
  basename
} from "path";
import {
  globSync
} from "glob";
import autoprefixer from "autoprefixer";
import handlebars from "vite-plugin-handlebars";
import {
  ViteImageOptimizer
} from "vite-plugin-image-optimizer";
import convertImages from './bin/vite-plugin-convert-images.js';

// サイトのルートを決定
const root = resolve(__dirname, "src");

// 環境編集を取得
const isDev = process.env.NODE_ENV === "development";

// 静的開発用のinput設定。静的資材用にはhtmlファイルを経由してscss,jsなどをビルドする
const inputsForStatic = {
  style: resolve(root, "assets", "style", "style.scss"),
  ...Object.fromEntries(
    globSync("src/**/*.html")
    .filter((file) => !basename(file).startsWith("_"))
    .map((file) => [
      relative("src", file.slice(0, file.length - extname(file).length)),
      resolve(__dirname, file),
    ]),
  ),
};

export default defineConfig(({
  mode
}) => ({
  root,
  base: "./",
  server: {
    port: 5173,
    origin: "http://localhost:5173",
  },
  build: {
    minify: false,
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: inputsForStatic,
      output: {
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].js",
        assetFileNames: (assetsInfo) => {
          if (assetsInfo.name.endsWith(".css")) {
            return "assets/style/[name].[ext]";
          } else {
            return "assets/[name].[ext]";
          }
        },
      },
    },
    css: {
      // devSourcemap: true, // SCSSのソースマップを生成（ビルド時には自動的に無効になる）
      postcss: {
        plugins: [autoprefixer()]
      },
    },
  },
  plugins: [
    // 画像最適化
    ViteImageOptimizer({
      include: '**/*.{png,jpg,jpeg,webp,avif}', // 最適化する画像の形式を指定
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
      avif: {
        quality: 80,
      },
    }),
    // 開発環境では画像をwebpに変換
    // format: 'webp' or 'avif'で画像の変換形式を指定
    isDev ? convertImages({
      format: 'webp'
    }) : null,

    // コンポーネントのディレクトリを読み込む
    handlebars({
      partialDirectory: resolve(__dirname, "includes"),
      helpers: {
        br: (contents) => {
          return contents ? contents.replace(/\r?\n/g, "<br>") : "";
        },
      },
      context: (pagePath) => ({
        brTxt: "これはテスト文章です。\nこれはテスト文章です。",
      }),
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/assets/style"),
      "@js": resolve(__dirname, "src/assets/js"),
    },
  },
}));