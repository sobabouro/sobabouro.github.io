/**
 * @class ThreeDScrollAnimation
 * @description スクロールに連動してカメラアングルが変わる3Dアニメーションを生成します。
 */
export class ThreeDScrollAnimation {
    /**
     * @constructor
     * @param {HTMLElement} container - 3Dコンテンツを描画するコンテナ要素。
     * @param {object} THREE - three.jsライブラリのインスタンス。
     */
    constructor(container, THREE) {
        if (!container || !THREE) {
            console.error('Container or THREE.js is not provided.');
            return;
        }
        this._container = container;
        this._THREE = THREE;

        this._scene = new this._THREE.Scene();
        this._camera = new this._THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._renderer = new this._THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        this._polyhedrons = [];
        this._init();
    }

    /**
     * @private
     * @description 3Dシーンの初期化処理を行います。
     */
    _init() {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._container.appendChild(this._renderer.domElement);

        this._camera.position.z = 30;

        this._createPolyhedrons();
        this._addEventListeners();
        this._animate();
        this._onScroll(); // 初期位置を設定
    }

    /**
     * @private
     * @description シーンに表示する正多面体を生成します。
     */
    _createPolyhedrons() {
        const geometries = [
            new this._THREE.TetrahedronGeometry(2.5, 0),   // 正四面体
            new this._THREE.OctahedronGeometry(2.5, 0),    // 正八面体
            new this._THREE.DodecahedronGeometry(2.5, 0), // 正十二面体
            new this._THREE.IcosahedronGeometry(2.5, 0)    // 正二十面体
        ];

        const material = new this._THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.7,
            roughness: 0.4,
            wireframe: true
        });

        // ライトを追加して立体感を出す
        const ambientLight = new this._THREE.AmbientLight(0x404040, 2);
        this._scene.add(ambientLight);
        const directionalLight = new this._THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(1, 1, 1);
        this._scene.add(directionalLight);


        for (let i = 0; i < 80; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const polyhedron = new this._THREE.Mesh(geometry, material);

            // 球状に配置
            const phi = Math.acos(-1 + (2 * i) / 80);
            const theta = Math.sqrt(80 * Math.PI) * phi;

            polyhedron.position.setFromSphericalCoords(
                20 + Math.random() * 20, // 半径
                phi,
                theta
            );

            polyhedron.rotation.x = Math.random() * 2 * Math.PI;
            polyhedron.rotation.y = Math.random() * 2 * Math.PI;

            this._polyhedrons.push(polyhedron);
            this._scene.add(polyhedron);
        }
    }

    /**
     * @private
     * @description イベントリスナーを設定します。
     */
    _addEventListeners() {
        window.addEventListener('scroll', this._onScroll.bind(this));
        window.addEventListener('resize', this._onWindowResize.bind(this));
    }

    /**
     * @private
     * @description スクロールイベントを処理し、カメラの角度を更新します。
     */
    _onScroll() {
        // スクロール可能な最大値
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        // 現在のスクロール進捗 (0.0 ~ 1.0)
        const scrollProgress = window.scrollY / scrollableHeight;

        // +90度から-70度までの範囲 (合計160度)
        const angleRange = 160;
        const startAngle = 90;
        const currentAngle = startAngle - (scrollProgress * angleRange);

        // カメラのX軸回転を更新 (ラジアンに変換)
        this._camera.rotation.x = this._THREE.MathUtils.degToRad(currentAngle);
    }


    /**
     * @private
     * @description ウィンドウリサイズイベントを処理します。
     */
    _onWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * @private
     * @description アニメーションループを実行します。
     */
    _animate() {
        requestAnimationFrame(this._animate.bind(this));

        // オブジェクトをゆっくり回転させる
        this._polyhedrons.forEach(polyhedron => {
            polyhedron.rotation.x += 0.001;
            polyhedron.rotation.y += 0.002;
        });

        this._renderer.render(this._scene, this._camera);
    }
}
