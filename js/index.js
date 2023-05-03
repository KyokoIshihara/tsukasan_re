document.addEventListener('DOMContentLoaded', function () {
    
    // /* =================================================== */
    // // http→httpsへのリダイレクト
    // /* =================================================== */
    // var url = location.href

    // if(url.indexOf('http:') >= 0) { // 判定方法の修正
    // // url文字列の書き換え
    // var newUrl = url.replace('http:', 'https:'); // 書き換え方法の修正

    // // リダイレクト
    // location.replace(newUrl);
    // }

    /* =================================================== */
    // スクロールのon,off切り替えの関数
    /* =================================================== */
    // スクロール禁止のファンクション
    function disableScroll(event) {
        event.preventDefault();
    }
    function scrollSet() {
        header.classList.toggle('is-active');
        //ハンバーガーメニューが開いている時はスクロール不可
        if (header.classList.contains('is-active')) {
            document.addEventListener('touchmove', disableScroll, { passive: false });
            document.addEventListener('mousewheel', disableScroll, { passive: false });
        } else {
            // 閉じている時はスクロール可
            document.removeEventListener('touchmove', disableScroll, { passive: false });
            document.removeEventListener('mousewheel', disableScroll, { passive: false });
        };
    };


    /* =================================================== */
    // ハンバーガーボタンのトグルクラス
    /* =================================================== */
    const hamburgerBtn = document.querySelector('.js-hamburger');
    const header = document.querySelector('.js-header-toggle');

    //ハンバーガーメニューがクリックされた時、ナビが開いている時はスクロール不可
    hamburgerBtn.addEventListener('click', scrollSet);

    /* =================================================== */
    // スムーススクロール
    /* =================================================== */
    // headerの高さを取得し、headerHeightに代入
    const headerHeight = document.querySelector('.header').offsetHeight;
    //querySelectorAllメソッドを使用してページ内のhref属性が#で始まるものを選択
    //forEachメソッドを使って、各アンカータグにクリックされた時の処理
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {

            // クリックされたときのデフォルトの挙動を防ぐ
            e.preventDefault();

            // ナビを閉じてスクロール不可を解除
            if (header.classList.contains('is-active')) {
                header.classList.remove('is-active');
                // スクロール不可を解除
                document.removeEventListener('touchmove', disableScroll, { passive: false });
                document.removeEventListener('mousewheel', disableScroll, { passive: false });
            };
            // クリックされたアンカータグのhref属性を取得
            const href = anchor.getAttribute('href');

            // href属性の#を取り除いた部分と一致するIDを取得
            const target = document.getElementById(href.replace('#', ''));
            //targetが空ではない場合
            if (target !== null) {
                //取得した要素の位置を取得するために、getBoundingClientRect()を呼び出し、ページ上の位置を計算。
                //headerの高さを引いて、スクロール位置がヘッダーの下になるように調整します。
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                // window.scrollTo()を呼び出して、スクロール位置を設定します。behaviorオプションをsmoothに設定することで、スムーズなスクロールを実現します。
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                //targetが空の場合(hrefが#のみだった場合)
            } else {
                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });
            };
        });
    });


    /* =================================================== */
    // ウィンドウ幅が可変した時is-activeを外すイベント 
    /* =================================================== */
    function resizeWindow() {
        const windowWidth = window.innerWidth;
        if (windowWidth > 768 && header.classList.contains('is-active')) {
            header.classList.remove('is-active');
            // スクロール不可を解除
            document.removeEventListener('touchmove', disableScroll, { passive: false });
            document.removeEventListener('mousewheel', disableScroll, { passive: false });
        };
    };
    window.addEventListener('resize', resizeWindow);


    /* =================================================== */
    // 【スライダー】ファーストビュー
    /* =================================================== */
    const slider1 = new Splide('.js-splide1', {
        type: 'fade',
        rewind: true,
        autoplay: true,
        arrows: false,
        interval: 3000,
        speed: 2000,
        classes: {
            page: 'splide__pagination__page fv__pagination--custom-page',
        },
    })
    slider1.mount();


    /* =================================================== */
    // 【スライダー】先輩の声
    /* =================================================== */
        const slider2 = new Splide('.js-splide2', {
        type: 'loop',
        rewind: true,
        pagination: false,
        arrows: false,
        perPage: 5,
        autoScroll: {
            speed: 1,
        },
        breakpoints: {
            767: {
                arrows: true,
                perPage: 1,
            },
        },
        classes: {
            arrows: 'splide__arrows voice__slide-arrows',
            arrow : 'splide__arrow voice__slide-arrow',
            prev  : 'splide__arrow--prev voice__slide-prev',
            next  : 'splide__arrow--next voice__slide-next',
        },
    
    })
    slider2.mount( window.splide.Extensions );


    /* =================================================== */
    // slideUp, slideDown, slideToggle関数を定義
    /* =================================================== */

    // 要素をスライドしながら非表示にする関数(jQueryのslideUpと同じ)
    const slideUp = (el, duration = 500) => {
        el.style.height = el.offsetHeight + "px";
        el.offsetHeight;
        el.style.transitionProperty = "height, margin, padding";
        el.style.transitionDuration = duration + "ms";
        el.style.transitionTimingFunction = "ease";
        el.style.overflow = "hidden";
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
        el.style.marginTop = 0;
        el.style.marginBottom = 0;
        setTimeout(() => {
        el.style.display = "none";
        el.style.removeProperty("height");
        el.style.removeProperty("padding-top");
        el.style.removeProperty("padding-bottom");
        el.style.removeProperty("margin-top");
        el.style.removeProperty("margin-bottom");
        el.style.removeProperty("overflow");
        el.style.removeProperty("transition-duration");
        el.style.removeProperty("transition-property");
        el.style.removeProperty("transition-timing-function");
        el.classList.remove("is-open");
        }, duration);
    };

    // 要素をスライドしながら表示する関数(jQueryのslideDownと同じ)
    const slideDown = (el, duration = 500) => {
        el.classList.add("is-open");
        el.style.removeProperty("display");
        let display = window.getComputedStyle(el).display;
        if (display === "none") {
            display = "block";
        }
        el.style.display = display;
        let height = el.offsetHeight;
        el.style.overflow = "hidden";
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
        el.style.marginTop = 0;
        el.style.marginBottom = 0;
        el.offsetHeight;
        el.style.transitionProperty = "height, margin, padding";
        el.style.transitionDuration = duration + "ms";
        el.style.transitionTimingFunction = "ease";
        el.style.height = height + "px";
        el.style.removeProperty("padding-top");
        el.style.removeProperty("padding-bottom");
        el.style.removeProperty("margin-top");
        el.style.removeProperty("margin-bottom");
        setTimeout(() => {
            el.style.removeProperty("height");
            el.style.removeProperty("overflow");
            el.style.removeProperty("transition-duration");
            el.style.removeProperty("transition-property");
            el.style.removeProperty("transition-timing-function");
        }, duration);
    };

    // 要素をスライドしながら交互に表示/非表示にする関数(jQueryのslideToggleと同じ)
    const slideToggle = (el, duration = 500) => {
        if (window.getComputedStyle(el).display === "none") {
            return slideDown(el, duration);
        } else {
            return slideUp(el, duration);
        }
    };

    
    /* =================================================== */
    // アコーディオンメニューの設定
    /* =================================================== */

    // アコーディオンを全て取得
    const accordions = document.querySelectorAll(".js-accordion");
    // 取得したアコーディオンをArrayに変換(IE対策)
    const accordionsArr = Array.prototype.slice.call(accordions);

    accordionsArr.forEach((accordion) => {
    // Triggerを全て取得
    const accordionTriggers = accordion.querySelectorAll(".js-accordion-trigger");
    // TriggerをArrayに変換(IE対策)
    const accordionTriggersArr = Array.prototype.slice.call(accordionTriggers);

        accordionTriggersArr.forEach((trigger) => {
        // Triggerにクリックイベントを付与
            trigger.addEventListener("click", () => {
            // '.is-active'クラスを付与or削除
            trigger.classList.toggle("is-active");
            // 開閉させる要素を取得
            const content = trigger.querySelector(".js-accordion-content");
            // 要素を展開or閉じる
            slideToggle(content);
            });
        });
    });


    /* =================================================== */
    // プライバシーポリシーチェックボックスの設定
    /* =================================================== */
    const consent_chk = document.querySelector('#privacy_checkbox');
    const submit_btn = document.querySelector('button[type=submit]');
    // const submit_btn_container = document.querySelector('.submit-button__container');

    consent_chk.addEventListener('change', () => {
        
        if (consent_chk.checked === true) {
            submit_btn.disabled = false;
            // submit_btn_container.disabled = false;
        } else {
            submit_btn.disabled = true;
            // submit_btn_container.disabled = true;
        }
    });

    /* =================================================== */
    // モーダルの設定
    /* =================================================== */
    MicroModal.init({
        disableScroll: true,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true
    });

});
