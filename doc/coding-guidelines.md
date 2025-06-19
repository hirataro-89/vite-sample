# コーディングガイドライン

## HTML

- BEM or FLOCSSにて記述する
- imgタグには'width'と'height', mv以外の画像には'loading="lazy"'を指定する
- class名は省略しない
  - NG: `.ttl`
  - OK: `.title`
- サイト内リソースへのパス表記はルート相対パス('/'で始まる表記)で記述する
  - NG: `./images/sample.png`
  - OK: `/images/sample.png`
- 文字参照（数値文字参照 / 文字実体参照）は使用しない。
  - UTF-8でエンコードされたファイルであれば&copy;、&#9312;のような文字参照を使用する必要はない
  - NG: `&copy;`
  - OK: `©`

## style

- 可能な限り妥当性のあるCSSを使用する
  - [参考：CSS Validator](https://jigsaw.w3.org/css-validator/)
- inlineでstyle指定しない
- marginやpaddingを使う時は基本的に上方向もしくは左方向に指定する
  ```css
  margin-block-start: 10px; // 上方向
  margin-inline-start: 10px; // 左方向
  ```
- 等間隔レイアウトの時はgapを使用する
- 画像の比率管理には'aspect-ratio'を使用する
- ネストはしない
- font-sizeは原則remを使用する


## images
- **アルファベット小文字・数字・ハイフン・アンダースコアのみ**をファイル名に使い、
- **`カテゴリ[_名前][_連番][_状態].拡張子`** のファイル名形式で、
- `/public/images` フォルダに入れる（**使用ページで分けない**）
- [参考記事](https://webnaut.jp/technology/20210910-3953/)


## JavaScript
- 変数は基本的に'let', 'const'を使用する
  - 'var'は使用しない