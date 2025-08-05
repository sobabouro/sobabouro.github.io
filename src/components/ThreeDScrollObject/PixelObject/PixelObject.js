

/**
 * @class PixelObject
 * @description SVGドット絵を読み込み、各ピクセルを3Dのボックス（ボクセル）として描画するクラス。
 */
export class PixelObject {
    /**
     * @param {string} svgUrl - SVGファイルのパス
     * @param {number} scale - オブジェクト全体のスケール
     * @param {number} pixelSize - 1ピクセルに対応するボクセルのサイズ
     */
    constructor(THREE, svgUrl, scale = 1, pixelSize = 1) {
        this.svgUrl = svgUrl;
        this.scale = scale;
        this.pixelSize = pixelSize;
        this._THREE = THREE;
        this.group = new this._THREE.Group();
        this.isLoaded = false;
        
        // オブジェクトの自転速度を格納するプロパティ
        this.rotationSpeed = {
            x: Math.random() * 0.005,
            y: Math.random() * 0.005,
            z: Math.random() * 0.005,
        };
    }

    /**
     * SVGを読み込み、ボクセルオブジェクトを生成してグループに格納します。
     * @param {function} onComplete - ロード完了時に実行されるコールバック関数
     */
    load(onComplete) {
        const loader = new this._THREE.TextureLoader();
        loader.load(this.svgUrl, (texture) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            const imgWidth = texture.image.width;
            const imgHeight = texture.image.height;

            canvas.width = imgWidth;
            canvas.height = imgHeight;
            context.drawImage(texture.image, 0, 0);

            const imageData = context.getImageData(0, 0, imgWidth, imgHeight);
            const data = imageData.data;

            const geometry = new this._THREE.BoxGeometry(this.pixelSize, this.pixelSize, this.pixelSize);
            const halfWidth = imgWidth / 2;
            const halfHeight = imgHeight / 2;

            for (let y = 0; y < imgHeight; y++) {
                for (let x = 0; x < imgWidth; x++) {
                    const index = (y * imgWidth + x) * 4;
                    const a = data[index + 3];

                    if (a > 0) {
                        const r = data[index];
                        const g = data[index + 1];
                        const b = data[index + 2];
                        const material = new this._THREE.MeshBasicMaterial({ color: `rgb(${r}, ${g}, ${b})` });
                        const voxel = new this._THREE.Mesh(geometry, material);

                        voxel.position.set(
                            (x - halfWidth) * this.pixelSize,
                            (halfHeight - y) * this.pixelSize,
                            0
                        );
                        
                        this.group.add(voxel);
                    }
                }
            }

            this.group.scale.set(this.scale, this.scale, this.scale);
            this.isLoaded = true;
            if (onComplete) onComplete(this.group);
        }, undefined, (error) => {
            console.error('Failed to load SVG:', error);
        });
    }

    /**
     * 生成されたオブジェクトのグループを返します。
     * @returns {Group}
     */
    get object() {
        return this.group;
    }
}