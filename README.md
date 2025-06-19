# 開発環境に関するDOC

## 各種ガイドライン
[案件概要はこちら](./doc/coding-guidelines.md)

[コーディングガイドラインはこちら](./doc/coding-guidelines.md)

[PRやissueに関するガイドラインはこちら](./doc/pr-issue-guidelines.md)

## 説明動画
[こちら](https://defiant-crow-3a6.notion.site/1cd5a20fea11451aa4c16f1490afeea8?pvs=4)

## 必要環境
- Node.js （18系以上推奨）

## 開発環境立ち上げ
- `yarn`とたたいて`node_module`をインストール

## 静的制作時
- `yarn dev`
  - ローカルサーバー`localhost:5173`が立ち上がる
- 静的資材は基本`src`フォルダ内で作成。
- CSSやJavaScriptは直接`.scss`ファイルや`.js`を参照すれば、Viteがいい感じにしてくれます。

```html
<link rel="stylesheet" href="/assets/style/style.scss" />
<script src="/assets/js/script.js" type="module"></script>
```

- header等の共通パーツは`includes`フォルダ内で作成し、再利用できるようにしています。
  - `handlebars`というプラグインを使用
  - [使い方参考記事](https://zenn.dev/tamon_kondo/articles/e6aceb1ea15f4b)

```html
{{> header}} // includes/header.htmlを呼び出す
```

あとは通常の手順でHTML・CSS・JavaScriptを開発していけばOK。

## 画像の格納先、読み込み方について
画像は`src/public/images/`に格納してください。<br>
なお、`webp`もしくは`avif`形式に自動で変換するようなscript入れてるので、<br>
画像を読み込む際は基本 `webp`もしくは`avif`でお願いします<br>
(画像の変換は`vite.config.js`で設定可能)

フォルダ構造
```
└includes // コンポーネントフォルダ
  └hoge.html
  └fuga.html
└src
  └assets
    └styles
      └style.scss
    └js
      └script.js
  └public
    └images
      └background.png
      └js.png
      └static.png
```

▼HTML
```html
<picture>
  <source srcset="/images/static.webp" type="image/webp">
  <img src="/images/static.png" loading="lazy" width="512" height="512" alt="">
</picture>
```

▼CSS
```css
background-image: image-set(
  url("/images/background.webp") type("image/webp"),
  url("/images/background.png") type("image/png")
);
```
jsで画像ファイルを読み込む場合はViteにビルド時にパス解決されるよう`import`文で読み込んでください。

▼JS
```js
import imgsrc from "/assets/images/js.png";
// jsから画像を読み込むサンプル
const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
const context = canvas!.getContext("2d");
const image = new Image(300, 300);
image.src = imgsrc;
image.addEventListener("load", () => {
  context?.drawImage(image, 0, 0, 300, 300);
})
```

## 静的資材ビルドについて
- 静的資材をビルドする場合は`yarn build`を実行
- `dist`フォルダに一式出力される

## 自動インポートファイル生成機能

このプロジェクトには、JavaScriptおよびSCSSファイルのインポートを自動化するためのシェルスクリプト`generate-imports.sh`が含まれています。このスクリプトは、指定されたディレクトリ内のすべてのJavaScriptおよびSCSSファイルを自動的にインポートするファイルを生成します。

### 使用方法

1. スクリプトに実行権限を付与します。
   ```bash
   chmod +x generate-imports.sh
   ```

2. スクリプトを実行します。
   ```bash
   ./generate-imports.sh
   ```

### 機能

- `src/assets/js/script.js`に、`src/assets/js`ディレクトリ内のすべてのJavaScriptファイルをインポートします。ただし、`script.js`自身はインポートしません。
- 各`src/assets/style`内のディレクトリに`_index.scss`ファイルを生成し、そのディレクトリ内のすべてのSCSSファイルをインポートします。ただし、`_index.scss`自身はインポートしません。
- `src/assets/style/style.scss`に、各`_index.scss`ファイルをインポートします。

この機能により、手動でインポート文を追加する手間を省き、プロジェクトの管理を容易にします。
