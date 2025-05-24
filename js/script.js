/* ハンバーガーメニュー開閉
***************************************************************/
// メニュー開閉
document.querySelector('.toggle_menu').addEventListener('click', function () {
  this.classList.toggle('open');
  document.querySelector('header').classList.toggle('open');
});

// 選択状態の切り替え
document.querySelectorAll('.header_item a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.header_item a').forEach(l => l.classList.remove('selected'));
    this.classList.add('selected');
  });
});

//ファーストビュースライダー
$(".fv").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 6000, //画像が切り替わるまでの時間 今回の場合は難病で1枚分動くか
  arrows: false, //左右に出る矢印を非表示
});


//モーダル
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalText1 = document.getElementById('modalText1');
const modalText2 = document.getElementById('modalText2');
const closeBtn = document.getElementById('closeModal');

const modalItems = document.querySelectorAll('.modal_item');

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
  });
});

// 閉じるボタン
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

// 背景クリックでも閉じる
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

$("a.scroll-link").on("click", function (e) {
  e.preventDefault();
  var target = $($(this).attr("href"));
  if (target.length) {
    $("html, body").animate(
      {
        scrollTop: target.offset().top,
      },
      300
    ); // スクロール時間（ミリ秒）
  }
});

//ヘッダー背景
$(window).on("scroll", function () {
  const aboutOffset = $("#about").offset().top;
  const scroll = $(window).scrollTop();

  if (scroll >= aboutOffset) {
    $(".header_container").addClass("scrolled");
  } else {
    $(".header_container").removeClass("scrolled");
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


//トップに戻るボタン
let isBackClicked = false;

$(window).on('scroll', function () {
  const scrollY = $(this).scrollTop();
  const footerOffset = $('footer').offset().top;
  const windowHeight = $(window).height();
  const scrollBottom = scrollY + windowHeight;

  if (isBackClicked) {
    // トップに戻ったあと：フッターに来たときだけ表示
    if (scrollBottom >= footerOffset) {
      $('.to-top').fadeIn();
    } else {
      $('.to-top').fadeOut();
    }
  } else {
    // 通常時：FVを超えたら表示
    const fvHeight = $('.fv_sec1').outerHeight();
    if (scrollY > fvHeight) {
      $('.to-top').fadeIn();
    } else {
      $('.to-top').fadeOut();
    }
  }
});

$('.to-top').on('click', function (e) {
  e.preventDefault();
  isBackClicked = true; // フラグON
  $(this).fadeOut();
  $('html, body').animate({ scrollTop: 0 }, 1200, function () {
    $(window).trigger('scroll');
  });
});




