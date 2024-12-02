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
        const scaleFactor = 0.03125; // 増加率を調整する係数

        // ビューポート幅が400px以上であればフォントサイズを増加させる
        let calculatedFontSize = minFontSize;

        if (maxWidth > minWidth) {
            // フォントサイズを (幅 - 320) * scaleFactor に比例して増加
            calculatedFontSize = minFontSize + (maxWidth - minWidth) * scaleFactor;
        }

        // --font-size-title に計算されたフォントサイズを設定
        document.documentElement.style.setProperty('--font-size-base', `${calculatedFontSize}px`);

        document.querySelectorAll('.sentence').forEach((el) => {
            const fontSizeMultiplier = parseFloat(el.getAttribute('data-font-size'));
            if (!isNaN(fontSizeMultiplier)) {
                el.style.fontSize = `${baseFontSize * fontSizeMultiplier}px`;
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
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const aspectRatio = containerWidth / containerHeight;
    
        const isPortrait = aspectRatio >= 1;
    
        // Calculate optimal columns and rows
        const sqrtN = Math.floor(Math.sqrt(boxCount));
        let optimalCols = 1, optimalRows = boxCount, minAspectDiff = Infinity;
    
        for (let q = sqrtN; q <= boxCount; q++) {
            const rows = isPortrait ? Math.ceil(boxCount / q) : q;
            const cols = isPortrait ? q : Math.ceil(boxCount / q);
    
            const gridAspectRatio = cols / rows;
            const aspectDiff = Math.abs(gridAspectRatio - aspectRatio);
    
            if (aspectDiff < minAspectDiff) {
                minAspectDiff = aspectDiff;
                optimalCols = cols;
                optimalRows = rows;
            }
        }
    
        const gridLineCount = optimalCols * 2 + 1; // グリッドライン数
        const remainder = boxCount % optimalCols;
    
        container.style.display = "grid";
        container.style.gridTemplateColumns = `repeat(${gridLineCount - 1}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${optimalRows}, 1fr)`;
    
        // Create grid items
        for (let i = 0; i < boxCount; i++) {
            const col = Math.floor(i % optimalCols);
            const row = Math.floor(i / optimalCols);
    
            const gridStartCol = col * 2;
            const gridEndCol = gridStartCol + 2;
            const gridStartRow = row;
            const gridEndRow = row + 1;
    
            const gridItem = document.createElement("div");
            gridItem.className = "grid-item";
            gridItem.style.gridColumnStart = gridStartCol;
            gridItem.style.gridColumnEnd = gridEndCol;
            gridItem.style.gridRowStart = gridStartRow;
            gridItem.style.gridRowEnd = gridEndRow;
            container.appendChild(gridItem);
        }
    
        // Handle empty spaces for the last row if necessary
        if (remainder > 0) {
            // Left empty space
            const leftEmpty = document.createElement("div");
            leftEmpty.className = "grid-left-empty";
            leftEmpty.style.gridColumnStart = 0;
            leftEmpty.style.gridColumnEnd = (gridLineCount - 1 - remainder * 2);
            leftEmpty.style.gridRowStart = optimalRows - 1;
            leftEmpty.style.gridRowEnd = optimalRows;
            container.appendChild(leftEmpty);
    
            // Right empty space
            const rightEmpty = document.createElement("div");
            rightEmpty.className = "grid-right-empty";
            rightEmpty.style.gridColumnStart = (gridLineCount - 1 - (remainder - 1) * 2);
            rightEmpty.style.gridColumnEnd = gridLineCount - 1;
            rightEmpty.style.gridRowStart = optimalRows - 1;
            rightEmpty.style.gridRowEnd = optimalRows;
            container.appendChild(rightEmpty);
        }
    }    

    // 画像のオーバーレイを更新する
    function updateOverlayHalf() {
        document.querySelectorAll('.image-container').forEach(container => {
            // aspect 属性の処理（画像比率の設定）
            const aspect = container.getAttribute('aspect');
            if (aspect) {
                const [width, height] = aspect.split('x').map(Number); // "710x973" を分割
                const aspectRatio = (height / width) * 100; // 比率を計算
                container.style.paddingTop = `${aspectRatio}%`; // 比率を padding-top に設定
            }

            // overlay-half の動的設定
            const overlayHalf = container.querySelector('.overlay-half');
            if (overlayHalf) {
                const imageHeight = container.offsetHeight; // container の高さを取得

                // data-height と data-top の値を取得
                const heightRatio = parseFloat(overlayHalf.dataset.height) || 0.8; // デフォルト値 0.8
                const topRatio = parseFloat(overlayHalf.dataset.top) || 0.4; // デフォルト値 0.4
                const boxWidth = overlayHalf.getAttribute('boxwidth') || "60%"; // デフォルト値 "60%"
                const angle = overlayHalf.dataset.angle || "0deg"; // デフォルト値 "0deg"

                // 高さ、幅、位置を画像の高さを基に計算
                overlayHalf.style.height = `${imageHeight * heightRatio}px`;
                overlayHalf.style.top = `${imageHeight * topRatio}px`;
                overlayHalf.style.width = boxWidth; // 幅の設定
                overlayHalf.style.transform = `translate(-50%, 0) rotate(${angle})`; // 角度の設定
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
            waveSvg.style.width = `${svgWidth}px`;
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
            updateOverlayHalf();
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

    // CSS カスタムプロパティの値を取得
    const popupBarHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--popup-bar-height")
    );

    const windowMinVp = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--window-min-vp")
    );

    if (window.scrollY > 100) {
        // スクロールが一定量を超えたらポップアップバーを表示
        popupBar.style.top = "0";
    } else {
        // スクロール位置が戻ったら隠す
        popupBar.style.top = `-${popupBarHeight * windowMinVp}vh`; // 計算した値を適用
    }
});

// トップへ戻るボタンのクリックイベント
document.getElementById("scrollTopButton").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

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
