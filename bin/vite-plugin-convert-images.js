import path from 'path';
import sharp from 'sharp';
import {
  watch
} from 'chokidar';

export default function convertImages(options = {format: 'webp'}) {
  // デフォルトはwebp形式に変換
  return {
    name: 'convert-images', // プラグイン名
    enforce: 'pre',
    buildStart() {
      const watcher = watch('src/public/images/**/*.{png,jpg,jpeg}', {
        persistent: true
      });
      watcher.on('add', async (filePath) => {
        if (/\.(png|jpe?g)$/.test(filePath)) {
          const dir = path.dirname(filePath);
          const base = path.basename(filePath, path.extname(filePath));
          const avifPath = path.resolve(dir, `${base}.avif`);
          const webpPath = path.resolve(dir, `${base}.webp`);

          if (options.format === 'webp') {
            // 画像をWEBP形式に変換
            await sharp(filePath)
              .webp()
              .toFile(webpPath)
              .catch(err => console.error('WEBP conversion error:', err));
          } else if (options.format === 'avif') {
            // 画像をAVIF形式に変換
            await sharp(filePath)
              .avif()
              .toFile(avifPath)
              .catch(err => console.error('AVIF conversion error:', err));
          }
        }
      });
    },
    async transform(src, id) {
      if (/\.(png|jpe?g)$/.test(id)) {
        const dir = path.dirname(id);
        const base = path.basename(id, path.extname(id));
        const avifPath = path.resolve(dir, `${base}.avif`);
        const webpPath = path.resolve(dir, `${base}.webp`);

        if (options.format === 'webp') {
          // 画像をWEBP形式に変換
          await sharp(id)
            .webp()
            .toFile(webpPath)
            .catch(err => console.error('WEBP conversion error:', err));
        } else if (options.format === 'avif') {
          // 画像をAVIF形式に変換
          await sharp(id)
            .avif()
            .toFile(avifPath)
            .catch(err => console.error('AVIF conversion error:', err));
        }

        return null; // 元の画像ファイルの処理は行わない
      }
    },
  };
}