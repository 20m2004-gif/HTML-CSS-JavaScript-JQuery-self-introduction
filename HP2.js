// jQueryの基本形
$(function () {
  // ① ナビのリンクをクリックしたら、なめらかにスクロール
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    const targetId = $(this).attr('href');
    const $target = $(targetId);
    if ($target.length) {
      const headerHeight = $('.site-header').outerHeight() || 0;
      const position = $target.offset().top - headerHeight - 8;

      $('html, body').animate(
        { scrollTop: position },
        400
      );
    }
  });

  // ② 「詳しく見る」ボタンで自己紹介の詳細開閉
  $('.js-toggle-detail').on('click', function () {
    const $btn = $(this);
    const $detail = $btn.next('.detail');

    $detail.slideToggle(200);

    if ($btn.text().includes('詳しく見る')) {
      $btn.text('閉じる ▲');
    } else {
      $btn.text('詳しく見る ▼');
    }
  });

  // ③ アコーディオン（スキル・趣味）
  $('.js-accordion-toggle').on('click', function () {
    const $title = $(this);
    const $content = $title.next('.accordion-content');

    $content.slideToggle(200);
    $title.toggleClass('is-open');
  });

  // ④ 作品スライダー（PCボタン＋スマホスワイプ）
  const $slider = $('#workSlider');
  const $slideFigure = $slider.find('.work-slide');
  const $slideImg = $slideFigure.find('img');
  const $slideCaption = $slideFigure.find('figcaption');

  // ★ここに表示したい作品を配列で定義
  const slides = [
    {
      image: '作品1_猫のイラスト.png',
      alt:   '作品1：猫のイラスト',
      caption: '作品1：【色鉛筆】猫のイラスト'
    },
    {
      image: '作品2_羊毛フェルト.png',
      alt:   '作品2：羊毛フェルト',
      caption: '作品2：【羊毛フェルト】動物と食べ物の作品'
    },
    {
      image: '作品3_ハムスターのイラスト.JPG',
      alt:   '作品3：ハムスターのイラスト',
      caption: '作品3：【透明水彩+色鉛筆】ハムスターのイラスト'
    },
    {
      image: '作品4_クレパスで描いた星月夜.JPG',
      alt:   '作品4：クレパスの星月夜',
      caption: '作品4:【クレパス】星月夜のイラスト'
    }
  ];

  let currentIndex = 0;

  function showSlide(index) {
    if (!slides.length) return;

    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    currentIndex = index;

    const slide = slides[index];
    $slideImg.attr('src', slide.image).attr('alt', slide.alt);
    $slideCaption.text(slide.caption);
  }

  // 初期表示
  showSlide(0);

  // PC用：左右ボタン
  $('.work-prev').on('click', function () {
    showSlide(currentIndex - 1);
  });

  $('.work-next').on('click', function () {
    showSlide(currentIndex + 1);
  });

  // スマホ用：スワイプ（左右）
  let startX = null;

  $slider.on('touchstart', function (e) {
    const t = e.originalEvent.touches[0];
    startX = t.clientX;
  });

  $slider.on('touchend', function (e) {
    if (startX === null) return;

    const t = e.originalEvent.changedTouches[0];
    const diffX = t.clientX - startX;
    const threshold = 50; // これ以上動いたらスワイプとみなす

    if (Math.abs(diffX) > threshold) {
      if (diffX < 0) {
        // 左にスワイプ → 次
        showSlide(currentIndex + 1);
      } else {
        // 右にスワイプ → 前
        showSlide(currentIndex - 1);
      }
    }

    startX = null;
  });

  // ⑤ ページトップボタン表示・非表示
  const $backToTop = $('#backToTop');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      $backToTop.fadeIn(200);
    } else {
      $backToTop.fadeOut(200);
    }
  });

  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

  // ⑥ ダークモード切り替え
  $('#themeToggle').on('click', function () {
    $('body').toggleClass('is-dark');
  });
});
