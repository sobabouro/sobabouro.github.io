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
        this._maxCameraRadius = 80;
        /** @private @description カメラの最小周回半径 */
        this._minCameraRadius = 20;
        
        /** @private @description オブジェクト共有マテリアル */
        this._material = null;

        this._polyhedrons = [];
        this._init();
    }

    _init() {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._container.appendChild(this._renderer.domElement);

        // カメラの初期位置を設定
        this._camera.position.set(0, 0, this._maxCameraRadius);

        this._createPolyhedrons();
        this._addEventListeners();
        this._animate();
        this._onScroll();
    }

    _createPolyhedrons() {
        const geometries = [
            new this._THREE.TetrahedronGeometry(2.5, 0),
            new this._THREE.OctahedronGeometry(2.5, 0),
            new this._THREE.DodecahedronGeometry(2.5, 0),
            new this._THREE.IcosahedronGeometry(2.5, 0)
        ];

        this._material = new this._THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.7,
            roughness: 0.4,
            wireframe: true,
            transparent: true,
            opacity: 0.0
        });

        const ambientLight = new this._THREE.AmbientLight(0x404040, 2);
        this._scene.add(ambientLight);
        const directionalLight = new this._THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(1, 1, 1);
        this._scene.add(directionalLight);

        for (let i = 0; i < 80; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const polyhedron = new this._THREE.Mesh(geometry, this._material);

            const phi = Math.acos(-1 + (2 * i) / 80);
            const theta = Math.sqrt(80 * Math.PI) * phi;

            polyhedron.position.setFromSphericalCoords(
                20 + Math.random() * 20,
                phi,
                theta
            );

            polyhedron.rotation.x = Math.random() * 2 * Math.PI;
            polyhedron.rotation.y = Math.random() * 2 * Math.PI;

            this._polyhedrons.push(polyhedron);
            this._scene.add(polyhedron);
        }
    }

    _addEventListeners() {
        window.addEventListener('scroll', this._onScroll.bind(this));
        window.addEventListener('resize', this._onWindowResize.bind(this));
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
        const easedProgress = Math.pow(progress, 2);
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
        if (this._material) {
            this._material.opacity = 1 - easedProgress;
        }

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

        this._polyhedrons.forEach(polyhedron => {
            polyhedron.rotation.x += 0.001;
            polyhedron.rotation.y += 0.002;
        });

        this._renderer.render(this._scene, this._camera);
    }
}