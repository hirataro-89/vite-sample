<!DOCTYPE html>
<html <?php language_attributes(); //html要素のlang属性を出力 
			?>>

<head>
	<meta charset="<?php bloginfo('charset'); //文字エンコーディング情報を出力 
									?>" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta description="" />
	<meta name="robots" content="noindex" />
	<title>
		<?php wp_title('|', true, 'right'); //ページタイトルを出力?>
		<?php bloginfo('name'); //サイト名を表示?>
	</title>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<header class="header js-header">
		<div class="header__inner">
			<h1 class="header__logo"><a href="/"><img src="<?php echo get_template_directory_uri() ?>/images/vite.png" alt="vite"></a></h1>

			<!-- ハンバーガーメニュー -->
			<button type="button" class="hg-btn js-btn" aria-label="メニュー">
				<span class="hg-btn__line js-line"></span>
				<span class="hg-btn__line js-line"></span>
				<span class="hg-btn__line js-line"></span>
			</button>
		</div>

	</header>