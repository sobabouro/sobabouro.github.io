// ウィンドウの拡大率やサイズ変更が起きたときにもろもろを更新する
(function () {
    let timer = null;

    function updateZoomFactor() {
        // ブラウザの倍率を取得
        let zoomFactor = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
        // 倍率補正
        zoomFactor = Math.floor(zoomFactor * zoomFactor * 100);
        
        document.documentElement.style.setProperty("--zoom-factor", zoomFactor);

        // ウィンドウの縦横の小さい方を取得
        const minDimension = Math.min(window.innerWidth, window.innerHeight);
        // ウィンドウの縦横の大きい方を取得
        const maxDimension = Math.max(window.innerWidth, window.innerHeight);
        // 正方形類似度???的な感じで
        const squareSimilarity = minDimension / maxDimension;

        document.documentElement.style.setProperty("--window-min-vp", `${minDimension}px`);
        document.documentElement.style.setProperty("--square-similarity", squareSimilarity);
    }

    // フォントサイズを動的に変更する
    function updateFontSize() {
        const maxWidth = window.innerWidth; // ビューポートの幅
        const minWidth = 320; // フォントサイズを調整し始める最小幅
        const minFontSize = 10; // 最小フォントサイズ
        const maxFontSize = 30; // 最大フォントサイズ
        const scaleFactor = 0.03125; // 増加率を調整する係数

        // ビューポート幅が400px以上であればフォントサイズを増加させる
        let calculatedFontSize = minFontSize;

        if (maxWidth > minWidth) {
            // フォントサイズを (幅 - 320) * scaleFactor に比例して増加
            calculatedFontSize = Math.min(maxFontSize, minFontSize + (maxWidth - minWidth) * scaleFactor);
        }

        // フォントサイズを設定
        document.documentElement.style.setProperty('--font-size-base', `${calculatedFontSize}px`);

        document.querySelectorAll('.sentence').forEach((el) => {
            const fontSizeMultiplier = parseFloat(el.getAttribute('data-font-size'));
            if (!isNaN(fontSizeMultiplier)) {
                el.style.fontSize = `${calculatedFontSize * fontSizeMultiplier}px`;
            }
        });
    }

    // zoom-square のレイアウトを調整する
    function updateZoomBoxes() {
        const zoomFactor = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--zoom-factor"));
    
        // すべての .vertical-zoom-box (vbox) を処理
        document.querySelectorAll(".vertical-zoom-box").forEach((vbox) => {    

            const minHeight = parseFloat(getComputedStyle(vbox).getPropertyValue("min-height"));
            const maxHeight = parseFloat(getComputedStyle(vbox).getPropertyValue("max-height"));

            const defaultHeight = vbox.getAttribute("default-height");
            const newHeight = `calc(${defaultHeight} * ${zoomFactor / 100})`;

            if (newHeight < minHeight) {
                newHeight = minHeight;
            } else if (newHeight > maxHeight) {
                newHeight = maxHeight;
            }

            // スタイルを適用
            vbox.style.height = newHeight;
        });

        // すべての .horizon-zoom-box (hbox) を処理
        document.querySelectorAll(".horizon-zoom-box").forEach((hbox) => {

            const minWidth = parseFloat(getComputedStyle(hbox).getPropertyValue("min-width"));
            const maxWidth = parseFloat(getComputedStyle(hbox).getPropertyValue("max-width"));

            const defaultWidth = hbox.getAttribute("default-width");
            const newWidth = `calc(${defaultWidth} * ${zoomFactor / 100})`;

            if (newWidth < minWidth) {
                newWidth = minWidth;
            } else if (newWidth > maxWidth) {
                newWidth = maxWidth;
            }

            // スタイルを適用
            hbox.style.width = newWidth;
        });
    }

    // pythagoras-container のレイアウトを調整する
    function updatePythagoras() {
        const containers = document.querySelectorAll(".pythagoras-container");

        containers.forEach(container => {
            const boxCount = container.children.length;
            calculatePythagorasLayout(container, boxCount);
        });
    }

    // pythagoras-container のレイアウトを計算する
    function calculatePythagorasLayout(container, boxCount) {
        const parentWidth = container.offsetWidth;
        const parentHeight = container.offsetHeight;
        const aspectRatio = parentWidth / parentHeight;
    
        // 縦横の比率を確認
        const isPortrait = aspectRatio >= 1;
    
        // 初期値
        let optimalRows = 1, optimalCols = boxCount;
        let minAspectDiff = Infinity;
    
        // グリッドの探索
        const sqrtN = Math.floor(Math.sqrt(boxCount));

        for (let q = sqrtN; q <= boxCount; q++) {
            const rows = isPortrait ? Math.ceil(boxCount / q) : q;
            const cols = isPortrait ? q : Math.ceil(boxCount / q);

            // アスペクト比
            const gridAspectRatio = cols / rows;
            const aspectDiff = Math.abs(gridAspectRatio - aspectRatio);

             // \( n \% q > q / 2 \) の条件を確認
            const remainder = boxCount % q;
            if (remainder > 0 && remainder <= q / 2) {
                continue; // 条件を満たさない場合スキップ
            }

            // 最適な配置を選択
            if (aspectDiff < minAspectDiff) {
                minAspectDiff = aspectDiff;
                optimalRows = rows;
                optimalCols = cols;
            }
        }

        // グリッドのセルサイズを計算 (親要素の幅に基づく)
        const cellWidthPercent = 100 / optimalCols;
        const cellHeightPercent = 100 / optimalRows;
    
        // グリッドスタイルを設定
        container.style.display = "grid";
        container.style.gridTemplateColumns = `repeat(${optimalCols}, ${cellWidthPercent}%)`;
        container.style.gridTemplateRows = `repeat(${optimalRows}, ${cellHeightPercent}%)`;
        container.style.alignItems = "center";
        container.style.justifyItems = "center";

        // グリッドの行数と列数を取得（計算時に保存している optimalRows, optimalCols を使用）
        const cellWidth = parentWidth / optimalCols;
        const cellHeight = parentHeight / optimalRows;

        const summaries = container.querySelectorAll('.summary-box');
        summaries.forEach(summary => {
            // summary-box のサイズを設定
            if (cellWidth < cellHeight) {
                summary.style.width = `${cellWidth}px`;
                summary.style.height = `${cellWidth * 0.8}px`;
            }
            else {
                summary.style.width = `${cellHeight * 1.25}px`;
                summary.style.height = `${cellHeight}px`;
            }
        
            // summary-box 内のボタンサイズを設定
            const button = summary.querySelector('.button');
            if (button) {
                const summaryWidth = summary.offsetWidth;
                const summaryHeight = summary.offsetHeight;
                const buttonSize = Math.min(summaryWidth, summaryHeight);
                button.style.width = `${buttonSize}px`;
                button.style.height = `${buttonSize * 0.8}px`;

                const mainText = button.querySelector('.text-main');
                const subText = button.querySelector('.text-sub');
                if (mainText) mainText.style.fontSize = `${summaryWidth * 0.1}px`;
                if (subText) subText.style.fontSize = `${summaryWidth * 0.05}px`;
            }
        });
    }

    // 画像のオーバーレイを更新する
    function updateImgContainer() {
        const zoomFactor = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--zoom-factor"));
        // const newHeight = `calc(${defaultHeight} * ${zoomFactor / 100})`;

        document.querySelectorAll('.image-container').forEach(container => {
            const aspect = container.getAttribute('aspect');

            if (aspect) {
                const [width, height] = aspect.split('x').map(Number);
                const aspectRatio = height / width;
                const containerWidth = container.offsetWidth;
                if (containerWidth < width) {
                    container.style.paddingTop = `${containerWidth * aspectRatio}px`;
                }
                else {
                    container.style.paddingTop = `${height}px`;
                }
            }

            const img = container.querySelector('img');
            if (img) {
                img.style.width = img.offsetWidth * zoomFactor / 100;
                img.style.height = img.offsetHeight * zoomFactor / 100;
            }

            const bgmedia = container.querySelector('.background-media');
            const overlayHalf = container.querySelector('.overlay-half');
            if (bgmedia && overlayHalf) {
                const imageHeight = bgmedia.offsetHeight;
                const imageWidth = bgmedia.offsetWidth;

                // data-height と data-top の値を取得
                const heightRatio = parseFloat(overlayHalf.dataset.height) || 0.8;
                const widthRatio = parseFloat(overlayHalf.dataset.width) || 0.6;
                const topRatio = parseFloat(overlayHalf.dataset.top) || 0.4;
                const angle = overlayHalf.dataset.angle || "0deg";

                // 高さ、幅、位置を画像の高さを基に計算
                overlayHalf.style.height = `${imageHeight * heightRatio}px`;
                overlayHalf.style.width = `${imageWidth * widthRatio}px`;
                overlayHalf.style.top = `${imageHeight * topRatio}px`;
                overlayHalf.style.transform = `translate(-50%, 0) rotate(${angle})`;
                overlayHalf.style.fontSize = `${imageWidth * 0.02}px`;
            }
        });
    }

    // SVGを更新する関数
    function updateAllWaves() {
        const waveSvgs = document.querySelectorAll('.wave-svg'); // すべてのSVGを取得
        const wavePaths = document.querySelectorAll('.wave-path'); // すべてのパスを取得

        waveSvgs.forEach((waveSvg, index) => {
            const wavePath = wavePaths[index]; // 対応するパスを取得

            const frequency = 1 / 12; // 波の周波数
            const svgWidth = window.innerWidth; // ウィンドウ幅を取得
            const svgHeight = window.innerWidth / 3; // SVGの高さを動的に設定

            // 新しいカーブを計算
            const newPath = `
                M0,${svgHeight * 0.2}
                C${svgWidth * frequency * 1},${svgHeight * 0} ${svgWidth * frequency * 2},${svgHeight * 0.4} ${svgWidth * frequency * 3},${svgHeight * 0.2}
                C${svgWidth * frequency * 4},${svgHeight * 0} ${svgWidth * frequency * 5},${svgHeight * 0.4} ${svgWidth * frequency * 6},${svgHeight * 0.2}
                C${svgWidth * frequency * 7},${svgHeight * 0} ${svgWidth * frequency * 8},${svgHeight * 0.4} ${svgWidth * frequency * 9},${svgHeight * 0.2}
                C${svgWidth * frequency * 10},${svgHeight * 0} ${svgWidth * frequency * 11},${svgHeight * 0.4} ${svgWidth * frequency * 12},${svgHeight * 0.2}
                L${svgWidth},${svgHeight} L0,${svgHeight} Z
            `;

            // d 属性を更新
            wavePath.setAttribute('d', newPath);

            // SVGのviewBoxとサイズを更新
            waveSvg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
            waveSvg.style.width = `${svgWidth * 2}px`;
            waveSvg.style.height = `${svgHeight}px`;
        });
    }

    function initialize() {
        if (timer) {
            clearTimeout(timer); // 前回のタイマーをクリア
        }
        timer = setTimeout(function () {
            console.log("Resize event triggered.");
            updateZoomFactor();
            updateFontSize();
            updateZoomBoxes();
            updatePythagoras();
            updateImgContainer();
            updateAllWaves();
        }, 200);
    }

    // ページ読み込み後とウィンドウリサイズ時に関数を呼び出す
    window.addEventListener("resize", initialize);
    document.addEventListener("DOMContentLoaded", initialize);
})();

// スクロール時のイベント
window.addEventListener("scroll", () => {
    const popupBar = document.getElementById("popupBar");

    const popupBarHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--popup-bar-height"));

    const windowMinVp = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--window-min-vp"));

    if (window.scrollY > 40) {
        // スクロールが一定量を超えたらポップアップバーを表示
        popupBar.style.top = "0";
    } else {
        // スクロール位置が戻ったら隠す
        popupBar.style.top = `-${popupBarHeight * windowMinVp}vh`;
    }
});

// フェードボックス関連
(function () {
    function textAnimate(ft) {
        const textContent = ft.textContent.trim();
        
        // 元のテキストを空にして、文字を1つずつ<span>で囲んで追加
        ft.innerHTML = textContent.split('').map(char => `<span>${char}</span>`).join('');

        const spans = ft.querySelectorAll('span'); // <span>要素をすべて取得
        let delay = 0;

        // 各文字に対して順番にアニメーションを適用
        spans.forEach(span => {
            setTimeout(() => {
                span.classList.add('is-animated');
            }, delay);
            // 次の文字がアニメーションするタイミングをずらす
            delay += 100;
        });
    }

    function initialize() {
        const animatedElements = document.querySelectorAll('.top-in, .bottom-in, .right-in, .left-in, .top-fade-text, .right-fade-text');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delayTime = entry.target.dataset.delayTime || 0;

                    setTimeout(() => {
                        // 画面に入ったら 'is-animated' クラスを追加
                        entry.target.classList.add('is-animated');

                        // もし対象がテキスト要素の場合、textAnimateを呼び出して文字ごとのアニメーションを適用
                        if (entry.target.classList.contains('top-fade-text') || entry.target.classList.contains('right-fade-text')) {
                            textAnimate(entry.target);
                        }
                    }, delayTime);

                    // 1度アニメーションが実行されたら監視を停止
                    observer.unobserve(entry.target);
                }
            });
        }, {
            // 要素の10%が画面に表示されたら発火
            threshold: 0.1,
        });

        animatedElements.forEach(element => {
            observer.observe(element); // 監視対象に追加
        });
    }

    // ページ読み込み時に関数を呼び出す
    document.addEventListener("DOMContentLoaded", initialize);
})();

// スクロールをスムーズにする
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 100; // 上に追加する余白の高さ（px）
        const elementPosition = section.getBoundingClientRect().top + window.pageYOffset; // 要素の位置を取得
        const offsetPosition = elementPosition - offset; // 余白を引いたスクロール位置
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth' // スムーズスクロール
        });
    }
}

// ヘッダー関連
(function () {
    // メニューボタン
    const menuButton = document.getElementById('menuButton');
    const menuText = menuButton.querySelector('.menu-text');
    const backdrop = document.querySelector('.backdrop');

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);

        // 親要素のHTMLタグに `is-drawerActive` クラスをトグル
        document.documentElement.classList.toggle('is-drawerActive');

        // テキストの切り替え
        menuText.textContent = isExpanded ? 'MENU' : 'CLOSE';
    });

    // バックドロップクリックでドロワーを閉じる
    backdrop.addEventListener('click', () => {
        // 親要素からクラスを削除
        document.documentElement.classList.remove('is-drawerActive');
        menuButton.setAttribute('aria-expanded', 'false');
        menuText.textContent = 'MENU';
    });

    // トップへ戻るボタンのクリックイベント
    document.getElementById("scrollTopButton").addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
})();