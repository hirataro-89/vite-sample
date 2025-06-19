// ハンバーガーメニュー
window.addEventListener('DOMContentLoaded', function () {
    // ハンバーガーメニューの開閉
    document.querySelectorAll('.js-hamburger').forEach(function (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('is-open');
            document.querySelectorAll('.js-drawer').forEach(function (drawer) {
                if (drawer.style.display === 'block') {
                    drawer.style.display = 'none';
                } else {
                    drawer.style.display = 'block';
                }
            });
        });
    });

    // ドロワーナビのaタグをクリックで閉じる
    document.querySelectorAll('.js-drawer a[href]').forEach(function (link) {
        link.addEventListener('click', function () {
            document.querySelectorAll('.js-hamburger').forEach(function (hamburger) {
                hamburger.classList.remove('is-open');
            });
            document.querySelectorAll('.js-drawer').forEach(function (drawer) {
                drawer.style.display = 'none';
            });
        });
    });

    // resizeイベント
    window.addEventListener('resize', function () {
        if (window.matchMedia('(min-width: 768px)').matches) {
            document.querySelectorAll('.js-hamburger').forEach(function (hamburger) {
                hamburger.classList.remove('is-open');
            });
            document.querySelectorAll('.js-drawer').forEach(function (drawer) {
                drawer.style.display = 'none';
            });
        }
    });

    // アコーディオン
    document.querySelectorAll('.js-drawer-accordion').forEach(function (accordion) {
        accordion.addEventListener('click', function () {
            var next = accordion.nextElementSibling;
            if (next) {
                if (next.style.display === 'block') {
                    next.style.display = 'none';
                } else {
                    next.style.display = 'block';
                }
            }
            accordion.classList.toggle('is-open');
        });
    });
});