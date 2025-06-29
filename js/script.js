/* ハンバーガーメニュー開閉
 ***************************************************************/
// メニュー開閉
document.querySelector(".toggle_menu").addEventListener("click", function () {
  this.classList.toggle("open");
  document.querySelector("header").classList.toggle("open");
});

// 選択状態の切り替え & メニュー閉じる処理を追加
document.querySelectorAll(".header_item a").forEach((link) => {
  link.addEventListener("click", function () {
    // 選択状態切り替え
    document
      .querySelectorAll(".header_item a")
      .forEach((l) => l.classList.remove("selected"));
    this.classList.add("selected");

    // ハンバーガーメニューを閉じる
    document.querySelector(".toggle_menu").classList.remove("open");
    document.querySelector("header").classList.remove("open");
  });
});

//ファーストビュースライダー
$(function () {
  $(".fv").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 3000,
    arrows: false,
    pauseOnHover: false,
  });
});

// モーダル関連の要素
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalText1 = document.getElementById("modalText1");
const modalText2 = document.getElementById("modalText2");
const closeBtn = document.getElementById("closeModal");

const modalItems = document.querySelectorAll(".modal_item");

// body要素を取得しておく
const body = document.body;

modalItems.forEach((item) => {
  item.addEventListener("click", () => {
    // HTML内のdata属性から取得
    const fullSrc = item.getAttribute("data-full");
    const title = item.getAttribute("data-title");
    const price = item.getAttribute("data-price");

    // モーダルにセット
    modalImage.src = fullSrc;
    modalImage.alt = title;
    modalText1.textContent = title;
    modalText2.textContent = price;

    // モーダルを表示
    modal.classList.add("active");

    // ★追加: モーダル表示時にbodyにno-scrollクラスを追加
    body.classList.add("no-scroll");
  });
});

// 閉じるボタン
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  // ★追加: モーダル非表示時にbodyからno-scrollクラスを削除
  body.classList.remove("no-scroll");
});

// 背景クリックでも閉じる
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    // ★追加: モーダル非表示時にbodyからno-scrollクラスを削除
    body.classList.remove("no-scroll");
  }
});

//スクロールリンク
$("a.scroll-link[href^='#']").on("click", function (e) {
  e.preventDefault();

  const windowWidth = $(window).width();

  const breakpoint = 767;

  let headerHeight;

  if (windowWidth > breakpoint) {
    headerHeight = 80;
  } else {
    headerHeight = 50;
  }

  var target = $($(this).attr("href"));

  if (target.length) {
    $("html, body").animate(
      {
        scrollTop: target.offset().top - headerHeight,
      },
      300
    );
  }
});

//ヘッダー背景
$(function () {
  $("body").addClass("js-enabled");

  function updateHeaderOnScroll() {
    const $about = $("#about");
    if ($about.length === 0) return;

    const aboutOffset = $about.offset().top;
    const triggerPosition = aboutOffset - 130;
    const scroll = $(window).scrollTop();

    if (scroll >= triggerPosition) {
      $("header").addClass("scrolled");
    } else {
      $("header").removeClass("scrolled");
    }
  }

  // スクロールイベントで随時判定
  $(window).on("scroll", updateHeaderOnScroll);

  // ページ完全読み込み後に初回判定（環境依存防止）
  $(window).on("load", function () {
    // 初期で hash が #about の場合、誤スクロール防止（開発用）
    if (location.hash === "#about") {
      history.replaceState(null, null, " ");
      $(window).scrollTop(0);
    }

    // レイアウト描画完了後に安全に実行
    requestAnimationFrame(updateHeaderOnScroll);
  });
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
$(document).ready(function () {
  $(".to-top").removeClass("to-top--visible"); // 初期状態で非表示に
  $(window).trigger("scroll");
});

let isToTopVisible = false;

$(window).on("scroll", function () {
  const scrollY = $(this).scrollTop();
  const fvHeight = $(".fv_sec1").outerHeight();
  const shouldShow = scrollY > fvHeight;

  if (shouldShow && !isToTopVisible) {
    $(".to-top").addClass("to-top--visible");
    isToTopVisible = true;
  } else if (!shouldShow && isToTopVisible) {
    $(".to-top").removeClass("to-top--visible");
    isToTopVisible = false;
  }
});

$(".to-top").on("click", function (e) {
  e.preventDefault();
  isToTopVisible = false;
  $(this).removeClass("to-top--visible");
  $("html, body").animate({ scrollTop: 0 }, 500, function () {
    $(window).trigger("scroll");
  });
});
new SimpleBar(document.querySelector('.privacy_textbox'), {
  autoHide: false,
  scrollbarMinSize: 30,
  scrollbarMaxSize: 30
});