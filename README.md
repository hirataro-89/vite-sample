# 開発環境に関するDOC

## 各種ガイドライン
[案件概要はこちら](./doc/coding-guidelines.md)

[コーディングガイドラインはこちら](./doc/coding-guidelines.md)

[PRやissueに関するガイドラインはこちら](./doc/pr-issue-guidelines.md)

## 説明動画
[こちら](https://defiant-crow-3a6.notion.site/1cd5a20fea11451aa4c16f1490afeea8?pvs=4)

## 必要環境
- Node.js （18系以上推奨）
- Docker(WordPress化する場合のみ)
  - [こちら](https://matsuand.github.io/docs.docker.jp.onthefly/get-docker/)からDockerをインストール
  - アプリを立ち上げ、アカウント登録し起動しておく
  - ※WordPress化しないならこの工程は不要

## 開発環境立ち上げ
- Dockerを立ち上げる(WordPress化する場合のみ)
   - macの場合、ステータスバーにDockerのアイコンが表示されていて`running`となっていればOK
- `yarn`とたたいて`node_module`をインストール


## 静的制作時
- `yarn dev`
  - ローカルサーバー`localhost:5173`が立ち上がる
- 静的資材は基本`src`フォルダ内で作成。
- CSSやJavaScriptは直接`.scss`ファイルや`.js`を参照すれば、Viteがいい感じにしてくれます。
- ※WordPress化しない場合、`wordpress`ディレクトリは不要なので削除でOK
  - gitignoreに記載されているコメントアウトも消す（監視対象外にするため）

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

## WordPressテーマ開発時
- `yarn wp-start`
  - 初回は色々ダウンロードするので時間かかる
- `wp-start`が立ち上がると`localhost:8888`にアクセスできるようになる
  - ここがWordPressのローカル環境
  - 初回ログイン時は別テーマがアクティブになっているので、「TEMPLATE NAME」をアクティブにしてください
- 静的制作時と同様に`yarn dev`
- 開発時(`WP_DEBUG=true`時(後述します))、CSSやJavaScriptは静的作成時と同じように`src`フォルダ内のファイルを操作してください
  - Viteのローカルサーバーのものを参照しているので
- 仕様上viteのホットリロードは止めているので手動でリロードしてください
- 終了時は`wp-stop`でDockerのコンテナを停止

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

▼PHP
```php
<img src="<?php echo get_template_directory_uri();?>/images/static.png" alt="" width="300" height="300" />
```

上記のように静的資材HTMLのコードの頭に`<?php echo get_template_directory_uri();?>`を付与することでうまく読み込めるようになります。

## 静的資材ビルドについて
- 静的資材をビルドする場合は`yarn build`を実行
- `dist`フォルダに一式出力される

## WordPress用ビルドについて
- WordPress用にCSSやJavaScriptをビルドする場合は`yarn buid:wp`コマンドを実行
- `wordpress/themes/TEMPLATE_NAME/`内に`assets`フォルダと`images`フォルダが出力される
  - `assets`フォルダにはビルドした各種CSSやJavaScriptが出力される
  - `images`には画像が出力される

## ビルドファイルでのWordPressの確認方法
`functions.php`に下記のデバッグ用のコマンドを仕込んでいます

```php
if (WP_DEBUG) {
    $root = "http://localhost:5173";
    $css_ext = "scss";
    $js_ext = "js";
    wp_enqueue_script('vite-client', $root . '/@vite/client', array(), null, true);
} else {
    $root = get_template_directory_uri();
    $css_ext = "css";
    $js_ext = "js";
}
```

この`WP_DEBUG`を`false`に変えることでWordPressがビルドファイルを読み込むようになります。（.wp-env.jsonの設定で`WP_DEBUG`は常に`true`になっています。こちらの値を変更するとDockerのコンテナが再構築され時間がかかるのでオススメしません）

**※納品時には上記デバッグ用の記述を削除するのが望ましい。**

## WordPressのログイン方法
- `http://localhost:8888/wp-admin/`にアクセス
- ID: `admin`
- パスワード: `password`
  - 初回は言語設定が英語なので日本語に変えておくと良い。

## WordPressコンテンツの同期方法
WordPress内で作成した記事やページ、その他設定などはNPM Scriptsの`wp-contents export`コマンドでバックアップファイルを出力できます。このバックアップファイルをGitなどで管理し、`wp-contents import`でそのバックアップファイルをインポートして開発者間でのWordPressコンテンツを同期できます。あくまで単一のバックアップファイルなので差分管理などはできず、頻繁な更新には向きません。（コンフリクトしてもどちらかのファイルしか採用できません）

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
