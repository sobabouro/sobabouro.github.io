import { PixelObject } from "./PixelObject/PixelObject.js";

/**
 * @class ThreeDScrollObject
 * @description スクロールに連動してカメラがオブジェクトの周りを周回し、ズームとフェードアウトを行う3Dアニメーションを生成します。
 */
export class ThreeDScrollObject {
    constructor(container, THREE) {
        if (!container || !THREE) {
            console.error('Container or THREE.js is not provided.');
            return;
        }
        this._container = container;
        this._scrollContainer = container.parentElement;
        this._THREE = THREE;

        this._scene = new this._THREE.Scene();
        this._camera = new this._THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._renderer = new this._THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        /** @private @description カメラの最大周回半径 */
        this._maxCameraRadius = 200;
        /** @private @description カメラの最小周回半径 */
        this._minCameraRadius = 20;
        
        /** @private @description オブジェクト共有マテリアル */
        this._material = null;

        this._pixelObjects = [];
        this._templateObjects = [];

        this._planetsGroup = new this._THREE.Group();
        this._scene.add(this._planetsGroup);

        this._polyhedrons = [];
        this._init();
    }

    _init() {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._container.appendChild(this._renderer.domElement);

        // カメラの初期位置を設定
        this._camera.position.set(0, 0, this._maxCameraRadius);

        this._addEventListeners();
        this._onScroll();

        // this._createPolyhedrons();

        this._loadTemplateObjects(() => {
            this._createPixelObjects();
        });

        // コンテナの描画中のみアニメーションを行うための IntersectionObserver を設定する
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.01,
        };

        this._observer = new IntersectionObserver(this._handleIntersection.bind(this), observerOptions);
        this._observer.observe(this._scrollContainer);
    }

    _loadTemplateObjects(onComplete) {
        const scaleFactor = 1.2;
        const specialScaleFactor = 0.05;

        const svgFolder = './svgs/';
        const svgPathList = [
            { path: `${svgFolder}rocket_02.svg`, weight: 5, scale: 0.3 * scaleFactor },
            { path: `${svgFolder}bakuhatsu_01.svg`, weight: 5, scale: 0.3 * scaleFactor },
            { path: `${svgFolder}mark_heart_pink_02.svg`, weight: 5, scale: 0.2 * scaleFactor },
            { path: `${svgFolder}object_jupiter.svg`, weight: 6, scale: 11.21 * scaleFactor * specialScaleFactor },
            { path: `${svgFolder}object_mars.svg`, weight: 10, scale: 0.53 * scaleFactor },
            { path: `${svgFolder}object_moon_yellow.svg`, weight: 10, scale: 0.27 * scaleFactor },
            { path: `${svgFolder}object_neptune.svg`, weight: 10, scale: 3.88 * scaleFactor * specialScaleFactor },
            { path: `${svgFolder}object_saturn.svg`, weight: 6, scale: 9.45 * scaleFactor * specialScaleFactor },
            // { path: `${svgFolder}object_venus.svg`, weight: 8, scale: 0.95 * scaleFactor}
        ];
        
        let loadedCount = 0;
        const totalToLoad = svgPathList.length;

        svgPathList.forEach(item => {
            const pixelObject = new PixelObject(this._THREE, item.path, item.scale, 1);
            pixelObject.load(() => {
                this._templateObjects.push({
                    object: pixelObject,
                    weight: item.weight
                });
                loadedCount++;
                if (loadedCount === totalToLoad) {
                    onComplete();
                }
            });
        });
    }

    // --- オブジェクトを生成・配置する新しいメソッドを追加 ---
    _createPixelObjects() {
        const numObjects = 20;
        const totalWeight = this._templateObjects.reduce((sum, item) => sum + item.weight, 0);
        
        const ambientLight = new this._THREE.AmbientLight(0x404040, 2);
        this._scene.add(ambientLight);
        const directionalLight = new this._THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(1, 1, 1);
        this._scene.add(directionalLight);

        const sunSvg = './svgs/object_sun.svg';
        const sunObject = new PixelObject(this._THREE, sunSvg, 3, 1);
        sunObject.load((group) => {
            group.position.set(0, 0, 0);
            this._scene.add(group);
            this._pixelObjects.push(sunObject);
        });

        for (let i = 0; i < numObjects; i++) {
            let randomWeight = Math.random() * totalWeight;
            let randomTemplate;

            for (const item of this._templateObjects) {
                randomWeight -= item.weight;
                if (randomWeight <= 0) {
                    randomTemplate = item.object;
                    break;
                }
            }
            
            // テンプレートから新しいPixelObjectのインスタンスを作成
            const newPixelObject = new PixelObject(this._THREE, randomTemplate.svgUrl, randomTemplate.scale, randomTemplate.pixelSize);
            
            // テンプレートオブジェクトのグループをクローン
            newPixelObject.group = randomTemplate.group.clone();
            newPixelObject.isLoaded = true;
            
            // ランダムな自転速度を設定
            newPixelObject.rotationSpeed = {
                x: Math.random() * 0.005,
                y: Math.random() * 0.005,
                z: Math.random() * 0.005,
            };

            const minRadius = 40;
            const maxRadius = 60;
            const radiusRange = maxRadius - minRadius;

            const goldenAngle = Math.PI * (3 - Math.sqrt(5));
            const angle = i * goldenAngle;
            
            // 半径を均等に配置
            const radius = minRadius + (i / (numObjects - 1)) * radiusRange;
            
            // y座標も均等に配置
            const yPosition = - 1 + (i / (numObjects - 1)) * 7;
            // --- 変更箇所終わり ---

            newPixelObject.group.position.x = Math.cos(angle) * radius;
            newPixelObject.group.position.z = Math.sin(angle) * radius;
            newPixelObject.group.position.y = yPosition;

            this._planetsGroup.add(newPixelObject.group);
            this._pixelObjects.push(newPixelObject);
        }
    }

    _addEventListeners() {
        window.addEventListener('scroll', this._onScroll.bind(this));
        window.addEventListener('resize', this._onWindowResize.bind(this));
    }

    /**
     * IntersectionObserverのコールバック
     * @param {Array} entries
     */
    _handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.startAnimation();
            } else {
                this.stopAnimation();
            }
        });
    }

    /**
     * アニメーションを開始
     */
    startAnimation() {
        if (!this._animationFrameId) {
            this._animate();
        }
    }

    /**
     * アニメーションを停止
     */
    stopAnimation() {
        if (this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }
    }

    /**
     * @private
     * @description スクロールイベントを処理し、カメラの位置とオブジェクトの透明度を更新します。
     * アニメーションは、コンテナの上端が画面上端に達したときから、コンテナの下端が画面下端に達するまで行われます。
     */
    _onScroll() {
        if (!this._scrollContainer) return;

        const rect = this._scrollContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const startPoint = 0;
        const endPoint = rect.height - viewportHeight;

        const currentScroll = -rect.top;

        let progress = (currentScroll - startPoint) / (endPoint - startPoint);
        progress = Math.max(0, Math.min(1, progress));

        // --- ここから修正 ---
        // イージング関数を適用して、スクロールの進行度を非線形に変化させる
        // `Math.pow(progress, 2)` は、初めは緩やかで徐々に急になる効果を持つ
        const easedProgress = Math.pow(progress, 1.2);
        // --- ここまで修正 ---

        // カメラの角度を計算
        // 初期状態：真上 (0度)
        // 最終状態：真下 (180度)
        const startAngle = 0;
        const endAngle = Math.PI; // 180度をラジアンで表現
        const currentAngle = startAngle + (easedProgress * (endAngle - startAngle));

        // 半径を計算（初期100 -> 最終50）
        const startRadius = this._maxCameraRadius;
        const endRadius = this._minCameraRadius;
        const radiusRange = startRadius - endRadius;
        const currentRadius = startRadius - (easedProgress * radiusRange);

        // カメラの座標を更新
        this._camera.position.x = 0;
        this._camera.position.y = currentRadius * Math.cos(currentAngle);
        this._camera.position.z = currentRadius * Math.sin(currentAngle);

        // オブジェクトの透明度を更新
        const opacity = 1.0 - easedProgress;
        this._pixelObjects.forEach(pixelObject => {
            if (pixelObject.isLoaded) {
                pixelObject.group.children.forEach(mesh => {
                    mesh.material.opacity = opacity;
                    mesh.material.transparent = true; // 透明度を有効にする
                });
            }
        });

        // カメラは常に中心(0, 0, 0)を向くように設定
        this._camera.lookAt(0, 0, 0);
    }
    
    _onWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }

    _animate() {
        requestAnimationFrame(this._animate.bind(this));

        this._planetsGroup.rotation.y += 0.001

        this._pixelObjects.forEach(pixelObject => {
            if (pixelObject.isLoaded) {
                pixelObject.group.rotation.x += pixelObject.rotationSpeed.x;
                pixelObject.group.rotation.y += pixelObject.rotationSpeed.y;
                pixelObject.group.rotation.z += pixelObject.rotationSpeed.z;
            }
        });

        this._renderer.render(this._scene, this._camera);
    }
}