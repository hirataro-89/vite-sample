#!/bin/bash

# エラーが発生した場合にスクリプトを停止
set -e

# スクリプトのディレクトリを取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 出力ファイルのパス
OUTPUT_FILE="$SCRIPT_DIR/src/assets/js/script.js"

# 出力ファイルを初期化
echo "// 自動生成されたインポートファイル" > "$OUTPUT_FILE"
echo "// このファイルは直接編集しないでください" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# jsディレクトリのフルパス
JS_DIR="$SCRIPT_DIR/src/assets/js"

# ディレクトリ内のJSファイルをインポート
find "$JS_DIR" -name "*.js" | sort | while read -r file; do
    # 相対パスを取得（src/assets/js/を除く）
    relative_path="${file#$JS_DIR/}"
    # 自身をインポートしない
    if [[ "$relative_path" != "script.js" ]]; then
        echo "import './$relative_path';" >> "$OUTPUT_FILE"
    fi
done

echo "インポートファイルの生成が完了しました: $OUTPUT_FILE"

# SCSSディレクトリのリスト
SCSS_DIRS=(
    "src/assets/style/components"
    "src/assets/style/foundation"
    "src/assets/style/layouts"
)

# 各ディレクトリに対して_index.scssファイルを生成
for dir in "${SCSS_DIRS[@]}"; do
    OUTPUT_FILE="$SCRIPT_DIR/$dir/_index.scss"
    
    # 出力ファイルを初期化
    echo "// 自動生成されたインポートファイル" > "$OUTPUT_FILE"
    echo "// このファイルは直接編集しないでください" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    # ディレクトリ内のSCSSファイルをインポート
    find "$SCRIPT_DIR/$dir" -name "*.scss" | sort | while read -r file; do
        # 相対パスを取得（ディレクトリパスを除く）
        relative_path="${file#$SCRIPT_DIR/$dir/}"
        # 自身をインポートしない
        if [[ "$relative_path" != "_index.scss" ]]; then
            echo "@use '$relative_path';" >> "$OUTPUT_FILE"
        fi
    done

done

echo "SCSSインポートファイルの生成が完了しました。"