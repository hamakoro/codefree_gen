/* ハンバーガーメニュー開閉
***************************************************************/
// メニュー開閉
document.querySelector('.toggle_menu').addEventListener('click', function () {
  this.classList.toggle('open');
  document.querySelector('header').classList.toggle('open');
});

// 選択状態の切り替え & メニュー閉じる処理を追加
document.querySelectorAll('.header_item a').forEach(link => {
  link.addEventListener('click', function () {
    // 選択状態切り替え
    document.querySelectorAll('.header_item a').forEach(l => l.classList.remove('selected'));
    this.classList.add('selected');

    // ハンバーガーメニューを閉じる
    document.querySelector('.toggle_menu').classList.remove('open');
    document.querySelector('header').classList.remove('open');
  });
});



//ファーストビュースライダー
$(function(){
  $(".fv").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 3000,
    arrows: false,
  });
});


// モーダル関連の要素
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalText1 = document.getElementById('modalText1');
const modalText2 = document.getElementById('modalText2');
const closeBtn = document.getElementById('closeModal');

const modalItems = document.querySelectorAll('.modal_item');

// body要素を取得しておく
const body = document.body;

modalItems.forEach(item => {
    item.addEventListener('click', () => {
        // HTML内のdata属性から取得
        const fullSrc = item.getAttribute('data-full');
        const title = item.getAttribute('data-title');
        const price = item.getAttribute('data-price');

        // モーダルにセット
        modalImage.src = fullSrc;
        modalImage.alt = title;
        modalText1.textContent = title;
        modalText2.textContent = price;

        // モーダルを表示
        modal.classList.add('active');

        // ★追加: モーダル表示時にbodyにno-scrollクラスを追加
        body.classList.add('no-scroll');
    });
});

// 閉じるボタン
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    // ★追加: モーダル非表示時にbodyからno-scrollクラスを削除
    body.classList.remove('no-scroll');
});

// 背景クリックでも閉じる
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        // ★追加: モーダル非表示時にbodyからno-scrollクラスを削除
        body.classList.remove('no-scroll');
    }
});

$("a.scroll-link").on("click", function (e) {
  e.preventDefault(); // デフォルトのリンク動作をキャンセル

  // 現在のウィンドウ幅を取得
  const windowWidth = $(window).width();

  // PCとスマホのブレイクポイントを定義（例: 767px以下をスマホ、768px以上をPC）
  const breakpoint = 767;

  let headerHeight; // ヘッダーの高さ（スクロールオフセット）を格納する変数

  if (windowWidth > breakpoint) {
    // PCの場合（768px以上）
    headerHeight = 80; // PCのオフセットは80px
  } else {
    // スマホの場合（767px以下）
    headerHeight = 50; // スマホのオフセットは50px
  }

  // リンクのhref属性からターゲットとなる要素を取得
  var target = $($(this).attr("href"));

  // ターゲット要素が存在する場合のみ処理を実行
  if (target.length) {
    $("html, body").animate(
      {
        // ターゲット要素のトップ位置からheaderHeightを引いてスクロール
        scrollTop: target.offset().top - headerHeight,
      },
      300 // スクロールアニメーションの速度（ミリ秒）
    );
  }
});

//ヘッダー背景
$(window).on("scroll", function () {
  const aboutOffset = $("#about").offset().top;
  const triggerPosition = aboutOffset - 130;

  const scroll = $(window).scrollTop();

  if (scroll >= triggerPosition) {
    $("header").addClass("scrolled");
  } else {
    $("header").removeClass("scrolled");
  }
});


//セクションスクロール
$(window).on("scroll", function () {
  $(".fade-in-up").each(function () {
    const elemTop = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll > elemTop - windowHeight + 100) {
      $(this).addClass("active");
    }
  });
});

// トップに戻るボタン
// トップに戻るボタン
let isToTopVisible = false; // 現在の表示状態を記録

$(window).on('scroll', function () {
  const scrollY = $(this).scrollTop();
  const fvHeight = $('.fv_sec1').outerHeight(); // ファーストビューセクションの高さ

  // スクロール位置がファーストビューの高さより大きければ表示、そうでなければ非表示
  const shouldShow = scrollY > fvHeight;

  if (shouldShow && !isToTopVisible) {
    $('.to-top').stop(true, true).fadeIn(400);
    isToTopVisible = true;
  } else if (!shouldShow && isToTopVisible) {
    $('.to-top').stop(true, true).fadeOut(400);
    isToTopVisible = false;
  }
});

$('.to-top').on('click', function (e) {
  e.preventDefault();
  // isBackClicked のフラグは不要になるため削除
  isToTopVisible = false; // クリックで隠すのでfalseにする
  $(this).fadeOut(400); // ボタン自体を隠す
  $('html, body').animate({ scrollTop: 0 }, 1200, function () {
    // スクロール完了後に再度スクロールイベントをトリガーし、表示条件を再評価させる
    $(window).trigger('scroll');
  });
});


