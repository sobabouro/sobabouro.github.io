import { FallingObject } from "./components/FallingObject/FallingObject.js";
import { HealthParameterObject } from "./components/HealthParameterObject/HealthParameterObject.js";
import { SliderBarObject} from "./components/SliderBarObject/SliderBarObject.js";

// ロードイベント後 DOM が生成されてからもろもろ実行する
(function () {
    // カーソルを作成する関数
    function makeCursor() {
        // カーソル要素を取得
        const mouseOverlay = document.querySelector('.mouse-overlay');

        // `[data-block-object]` を持つ要素を取得
        const clickableElements = document.querySelectorAll('[data-block-object]');

        document.addEventListener('mousemove', (e) => {
            const popupBarHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bar-font-size"));
            const x = e.clientX;
            const y = e.clientY;
            const radius = 20; // 通常時の円の半径
            let hoverSize = radius;

            // `[data-block-object]` の要素を検出し、ホバー時にサイズを変える
            clickableElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const scaling = element.getAttribute('data-block-object');
                if (
                    x >= rect.left &&
                    x <= rect.right &&
                    y >= rect.top &&
                    y <= rect.bottom
                ) {
                    hoverSize = radius * scaling; // ホバー時にサイズを拡大
                }
            });

            // `clip-path` を動的に設定
            if (y < popupBarHeight + radius && document.documentElement.classList.contains('is-barActive')) {
                const size = Math.max(y - popupBarHeight, radius / 5);

                if (y < popupBarHeight + radius / 5) {
                    mouseOverlay.style.zIndex = 10000;
                } else {
                    mouseOverlay.style.zIndex = 1000;
                }
                mouseOverlay.style.clipPath = `circle(${size}px at ${x}px ${y}px)`;
                mouseOverlay.style.webkitClipPath = `circle(${size}px at ${x}px ${y}px)`;
            } else {
                mouseOverlay.style.zIndex = 1000;
                mouseOverlay.style.clipPath = `circle(${hoverSize}px at ${x}px ${y}px)`;
                mouseOverlay.style.webkitClipPath = `circle(${hoverSize}px at ${x}px ${y}px)`;
            }
        });
    }

    // game-field 管理
    function gameFieldAdministrator() {
        const frameRate = 1000 / parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--frame-rate"));
        const segments = ["segmentA", "segmentB", "segmentC"];
        const animationDelayTime = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--animation-delay-time"));

        let currentSegmentIndex = 0;
        let activeImages = []; // アニメーション中の画像を追跡するための配列
        let isAnimating = false; // アニメーション進行中のフラグ

        // ブロックオブジェクトを取得
        const blockObject = document.querySelectorAll('[data-block-object]');

        // 体力オブジェクトを生成
        const healthContainer = document.getElementsByClassName("health-container")[0];
        const healthParameterObject = new HealthParameterObject();
        healthParameterObject.resetHealth();
        healthContainer.appendChild(healthParameterObject.container);

        // マウスを監視する
        mouseObserver();
        // ポップアップバーを監視する
        popupBarObserve(handleBarActiveChange);

        // 衝突判定を行う関数
        function checkCollision(objectRect, targetRect) {
            return !(
                targetRect.bottom < objectRect.top ||
                targetRect.left > objectRect.right ||
                targetRect.right < objectRect.left ||
                targetRect.top > objectRect.bottom
            );
        }

        // ブロック要素を監視する関数
        function watchBlockObject(segmentId) {
            const segment = document.getElementById(segmentId);
            const segmentRect = segment.getBoundingClientRect();
            const segmentLeft = segmentRect.left;
            const segmentRight = segmentRect.right;

            const blockObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const elementRect = entry.target.getBoundingClientRect();
                    const elementLeft = elementRect.left;
                    const elementRight = elementRect.right;
        
                    // 要素がセグメントの領域内にいるかチェック
                    const isInSegmentRange = elementRight > segmentLeft && elementLeft < segmentRight;
                    
                    if (entry.isIntersecting && isInSegmentRange) {
                        // 要素が画面内に入り、かつセグメント領域内にある場合
                        entry.target.setAttribute('collision-enabled', '');
                    }
                    else {
                        // それ以外の場合
                        entry.target.removeAttribute('collision-enabled');
                    }
                });
            }, {
                threshold: 0 // 要素が一部でも画面内に入ったら発火
            });

            // 各要素を監視対象に追加
            blockObject.forEach(element => blockObserver.observe(element));
        }

        // アニメーションオブジェクトを生成する関数
        function startAnimation(segmentId) {
            // ゲーム開始条件を満たしてなければ中止
            if (!document.documentElement.classList.contains('is-barActive') || document.documentElement.classList.contains('is-drawerActive') || isAnimating || activeImages.length > 0) return;
            isAnimating = true;

            const segment = document.getElementById(segmentId);
            const segmentWidth = segment.getBoundingClientRect().width;
            const fallingObject = new FallingObject(segment, segmentWidth);

            // FallingObject クラス内で生成した要素をセグメントに追加
            segment.appendChild(fallingObject.container);
            activeImages.push(fallingObject); // 進行中の画像を追跡
            watchBlockObject(segmentId);

            const collisionCheckInterval = setInterval(() => {
                // コライダー取得
                const objectRect = fallingObject.container.getBoundingClientRect();
                const fallingObjectRect = {
                    bottom: objectRect.y + objectRect.width,
                    left: (objectRect.right + objectRect.left) / 2,
                    right: (objectRect.right + objectRect.left) / 2,
                    top: objectRect.y + objectRect.width,
                };
                const collisionTargets = document.querySelectorAll('[collision-enabled]:not([mouse-through])');

                collisionTargets.forEach(target => {
                    const targetRect = target.getBoundingClientRect();
                    if (checkCollision(fallingObjectRect, targetRect)) {

                        // カスタムイベントを発火
                        const collisionEvent = new CustomEvent('collision', {
                            detail: {
                                object: fallingObject.objectName,
                                target: target.className,
                            },
                        });
                        fallingObject.container.dispatchEvent(collisionEvent);

                        clearInterval(collisionCheckInterval); // 衝突判定を停止
                    }
                });
            }, frameRate);

            // 衝突時のイベント
            fallingObject.container.addEventListener("collision", (event) => {
                executeEvent(segment, fallingObject, healthParameterObject, event.detail);
            });

            // オブジェクトが削除され次第，次のオブジェクトを生成する
            fallingObject.container.addEventListener("animationend", () => {
                nextAnimation(segment, fallingObject);
            });
        }

        // startAnimation() の補助関数
        function nextAnimation(segment, fallingObject) {
            if (segment.contains(fallingObject.container)) {
                segment.removeChild(fallingObject.container);
            }
            activeImages = activeImages.filter(activeObj => activeObj !== fallingObject);
            isAnimating = false;
        
            setTimeout(() => {
                currentSegmentIndex = (currentSegmentIndex + 1) % segments.length;
                startAnimation(segments[currentSegmentIndex]);
            }, animationDelayTime);
        }

        // オブジェクト同士の衝突時のイベントを実行する関数
        function executeEvent(segment, fallingObject, healthParameterObject, eventDetail) {
            // 共通の消滅処理
            const handleDestruction = (delayTime) => {
                // 消滅を待ってから次のオブジェクトを生成する
                setTimeout(() => {
                    // フェードアウト後にオブジェクトを削除して次のアニメーションを開始
                    nextAnimation(segment, fallingObject);
                }, delayTime);
            };

            // ground オブジェクトの場合
            if (eventDetail.target === "ground") {
                if (eventDetail.object === "rocket") {
                    fallingObject.pauseAnimation();
                    fallingObject.toggleDisplayGround();
                    handleDestruction(isHealed());
                }
                else if (eventDetail.object === "fire") {
                    fallingObject.pauseAnimation();
                    fallingObject.toggleDisplayGround();
                    handleDestruction(isDamaged());
                }
            }
            // その他のオブジェクト場合
            else {
                if (eventDetail.object === "rocket") {
                    fallingObject.pauseAnimation();
                    fallingObject.toggleDisplayExplosion();
                    handleDestruction(isDamaged());
                }
                else if (eventDetail.object === "fire") {
                    fallingObject.pauseAnimation();
                    fallingObject.toggleDisplayExplosion();
                    handleDestruction(2000);
                }
            }

            // ダメージを与える
            function isDamaged() {
                let displayTime = 2000;
                if (healthParameterObject.life == 1) {
                    displayTime = 4000;
                    healthParameterObject.decreaseHealth();
                    // ゲームオーバーテキストを表示
                    healthContainer.querySelector(".game-over").classList.add("is-gameOver");
                    setTimeout(() => {
                        healthContainer.querySelector(".game-over").classList.remove('is-gameOver');
                        // 体力をリセット
                        healthParameterObject.resetHealth();
                    }, displayTime);
                }
                else {
                    healthParameterObject.decreaseHealth();
                }
                return displayTime;
            }

            // 体力を回復させる
            function isHealed() {
                healthParameterObject.increaseHealth();
                return 2000;
            }
        }

        // マウスイベントを監視する
        function mouseObserver() {
            // ホバー状態を保存するためのMap
            const hoverState = new Map();

            // MutationObserver で属性追加処理を監視
            const collisionEnabledObserver = new MutationObserver((mutationsList) => {
                mutationsList.forEach(mutation => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'collision-enabled') {
                        const target = mutation.target;

                        // collision-enabled が追加されたオブジェクトに対してマウスイベントを監視
                        if (target.hasAttribute('collision-enabled')) {

                            // マウスイベントの監視を開始
                            if (!hoverState.has(target)) {
                                // 初期状態として false を設定
                                hoverState.set(target, false);

                                // マウスが入ったとき
                                target.addEventListener('mouseenter', () => {
                                    hoverState.set(target, true);
                                    target.setAttribute('mouse-through', '');
                                });

                                // マウスが離れたとき
                                target.addEventListener('mouseleave', () => {
                                    hoverState.set(target, false);
                                    target.removeAttribute('mouse-through');
                                });
                            }
                        }
                        else {
                            // collision-enabled が削除されたオブジェクトの監視を停止
                            if (hoverState.has(target)) {
                                hoverState.delete(target);

                                // イベントリスナーを削除
                                target.removeEventListener('mouseenter', () => {
                                    hoverState.set(target, true);
                                });
                                target.removeEventListener('mouseleave', () => {
                                    hoverState.set(target, false);
                                });
                            }
                        }
                    }
                });
            });

            // 要素の属性変更を監視
            const config = { attributes: true }; // attributes変更のみ監視
            const elements = document.querySelectorAll('[data-block-object]'); // 最初に監視する要素を取得

            // 各要素に対して監視を開始
            elements.forEach(element => collisionEnabledObserver.observe(element, config));
        }

        // ポップアップバーの監視
        function popupBarObserve(handleBarActiveChange) {
            const barObserver = new MutationObserver((mutationsList) => {
                mutationsList.forEach(mutation => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const target = mutation.target;
                        const classList = target.classList;

                        // クラスが追加された場合
                        if (classList.contains('is-barActive') && !mutation.oldValue?.includes('is-barActive')) {
                            handleBarActiveChange();
                        }

                        // クラスが削除された場合
                        if (!classList.contains('is-barActive') && mutation.oldValue?.includes('is-barActive')) {
                            handleBarActiveChange();
                        }
                    }
                });
            });

            // 監視対象とオプションを設定
            barObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class'],
                attributeOldValue: true // 変更前の値を取得
            });
        }

        function handleBarActiveChange() {
            if (document.documentElement.classList.contains('is-barActive') && !document.documentElement.classList.contains('is-drawerActive') && activeImages.length == 0) {
                // アニメーション初期化
                activeImages.forEach(fallingObj => {
                    fallingObj.container.remove();
                });
                activeImages = [];
                // アニメーションを開始
                startAnimation(segments[currentSegmentIndex])
            // is-barActive が削除された場合
            } 
            else {
                // 画像を即座に削除
                activeImages.forEach(fallingObj => {
                    fallingObj.container.remove();
                });
                isAnimating = false;
                activeImages = [];
            }
        }
    }

    // テキストを一文字ずつフェードインする関数
    function waveFadeIn() {
        // waveFadeIn() 補助関数
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

        const animatedElements = document.querySelectorAll('.top-in, .bottom-in, .right-in, .left-in, .top-fade-text, .right-fade-text');

        const waveTextObserver = new IntersectionObserver((entries, waveTextObserver) => {
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
                    waveTextObserver.unobserve(entry.target);
                }
            });
        }, {
            // 要素の10%が画面に表示されたら発火
            threshold: 0.1,
        });

        animatedElements.forEach(element => {
            waveTextObserver.observe(element); // 監視対象に追加
        });
    }

    function initialize() {
        makeCursor();
        gameFieldAdministrator();

        setTimeout(function () {
            waveFadeIn();
        }, 3000);
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();

// ウィンドウの拡大率やサイズ変更イベント時にもろもろを更新する
(function () {
    let timer = null;

    // ウィンドウのリサイズイベントを監視
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

        const barHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--popup-bar-height"));

        document.documentElement.style.setProperty("--bar-font-size", `${barHeight * minDimension}px`);
        document.documentElement.style.setProperty("--solid-line-weight", `${barHeight * minDimension * 0.08}px`);
    }

    // フォントサイズを動的に変更する
    function updateFontSize() {
        const maxWidth = window.innerWidth; // ビューポートの幅
        const minWidth = 320; // フォントサイズを調整し始める最小幅
        const minFontSize = 10; // 最小フォントサイズ
        const maxFontSize = 70; // 最大フォントサイズ
        const scaleFactor = 0.03125; // 増加率を調整する係数

        // ビューポート幅が400px以上であればフォントサイズを増加させる
        let calculatedFontSize = minFontSize;

        if (maxWidth > minWidth) {
            // フォントサイズを (幅 - 320) * scaleFactor に比例して増加
            calculatedFontSize = Math.min(maxFontSize, minFontSize + (maxWidth - minWidth) * scaleFactor);
        }

        // フォントサイズを設定
        document.documentElement.style.setProperty('--font-size-base', `${calculatedFontSize}px`);
        console.log(calculatedFontSize);

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
        if (!summaries) return;
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
                if (subText) subText.style.fontSize = `${summaryWidth * 0.06}px`;
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

            const bgmedia = container.querySelector('.background-image');
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
                overlayHalf.style.fontSize = `${imageWidth * 0.038}px`;
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

// スクロールイベント時にもろもろを更新する
(function () {
    // ポップアップバーの表示切り替え
    function switchingPopupBar() {
        const popupBar = document.getElementById("popupBar");

        const popupBarHeight = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--popup-bar-height")
        );

        const windowMinVp = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--window-min-vp")
        );

        if (window.scrollY > 40) {
            // スクロールが一定量を超えたらポップアップバーを表示
            document.documentElement.classList.add('is-barActive');
            popupBar.style.top = "0";
        } else {
            // スクロール位置が戻ったら隠す
            document.documentElement.classList.remove('is-barActive');
            popupBar.style.top = `-${popupBarHeight * windowMinVp}vh`;
        }
    }

    function initialize() {
        switchingPopupBar();
    }

    window.addEventListener("scroll", initialize);
})();

// メニューボタンのクリックイベント時にヘッダー関連を更新する
(function () {
    // メニューボタン
    const menuButton = document.getElementById('menuButton');
    // const menuText = menuButton.querySelector('.menu-text');
    const backdrop = document.querySelector('.backdrop');
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);

        // 親要素のHTMLタグに `is-drawerActive` クラスをトグル
        document.documentElement.classList.toggle('is-drawerActive');
        document.body.style.overflowY = isExpanded ? 'auto' : 'hidden';
        document.body.style.paddingRight = isExpanded ? '0' : `${scrollbarWidth}px`;

        // テキストの切り替え
        // menuText.textContent = isExpanded ? 'MENU' : 'CLOSE';
    });

    // バックドロップクリックでドロワーを閉じる
    backdrop.addEventListener('click', () => {
        // 親要素からクラスを削除
        document.documentElement.classList.remove('is-drawerActive');
        menuButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0';
        // menuText.textContent = 'MENU';
    });

    // トップへ戻るボタンのクリックイベント
    document.getElementById("scrollTopButton").addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
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

// icon フォルダ オブジェクトのアニメーション
function animatedElement(sectionId) {
    const section = document.getElementById(sectionId);
    const backPlate = section.closest('.back-plate');
    
    if (sectionId === 'close') {
        backPlate.classList.add("is-closed");
        setTimeout(() => {
            backPlate.classList.remove("is-closed");
        }, 600);
    } else if (sectionId === 'minimize') {
        backPlate.classList.add("is-minimized");
        setTimeout(() => {
            setTimeout(() => {
                backPlate.classList.remove("is-minimized");
                backPlate.classList.remove("is-hidden");
            }, 1700);
            backPlate.classList.add("is-hidden");
        }, 300);
    }
}

// シーン遷移
function openMainPage() {
    const startScene = document.querySelector("start-scene");
    const mainScene = document.querySelector("main-scene");

    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");

    // ページがロードされた後にスタートシーンをフェードイン
    setTimeout(() => {
        startScene.classList.add("fade-in");

        // スタートシーン生存時間
        setTimeout(() => {
            // スタートシーンをフェードアウト
            startScene.classList.add("fade-out");

            // メインシーンをフェードイン
            setTimeout(() => {
                startScene.style.display = "none";
                document.documentElement.classList.remove("no-scroll");
                document.body.classList.remove("no-scroll");

                window.scrollTo(0, 0);
                mainScene.classList.add("active");
                
                // スライダーバーを生成
                const sliderBarObject = new SliderBarObject('slider1');
                sliderBarObject.initSlideContainer();
            }, 1000);
        }, 2000);
    }, 500);
}

// シーン遷移
function openSubPage() {
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
    document.body.style.overflowY = "auto";
    setTimeout(() => {
        document.body.classList.add("fade-in");
    }, 100);
}

window.scrollToSection = scrollToSection;
window.animatedElement = animatedElement;
window.openMainPage = openMainPage;
window.openSubPage = openSubPage;