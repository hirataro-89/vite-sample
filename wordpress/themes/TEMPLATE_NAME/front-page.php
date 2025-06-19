<?php get_header(); ?>
<main>
  <p>テスト</p>
  <p>背景画像</p>
  <div class="bg"></div>
  <p>静的画像</p>
  <img src="<?php echo get_template_directory_uri(); ?>/images/static.png" alt="" width="300" height="300">
  <p>JSで画像</p>
  <canvas id="canvas" width="300" height="300"></canvas>
</main>
<?php get_footer();
