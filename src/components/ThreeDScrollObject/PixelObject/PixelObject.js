// PixelObject.js
import { FileLoader, BoxGeometry, MeshBasicMaterial, Mesh, Group, Color } from 'three';

/**
 * @class PixelObject
 * @description SVGドット絵の<rect>タグを直接解析し、各タグを3Dのボックス（ボクセル）として描画するクラス。
 */
export class PixelObject {
    constructor(THREE, svgUrl, scale = 1, pixelSize = 1) {
        this._THREE = THREE;
        this.svgUrl = svgUrl;
        this.scale = scale;
        this.pixelSize = pixelSize;
        this.group = new this._THREE.Group();
        this.isLoaded = false;
        
        this.rotationSpeed = {
            x: Math.random() * 0.005,
            y: Math.random() * 0.005,
            z: Math.random() * 0.005,
        };
    }

    load(onComplete) {
        const loader = new FileLoader();
        loader.load(this.svgUrl, (svgText) => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const rects = svgDoc.querySelectorAll('rect');

            const geometry = new this._THREE.BoxGeometry(this.pixelSize, this.pixelSize, this.pixelSize);

            // SVGのサイズ情報を取得
            const svgElement = svgDoc.querySelector('svg');
            const svgWidth = parseInt(svgElement.getAttribute('width'));
            const svgHeight = parseInt(svgElement.getAttribute('height'));

            // SVGのグリッドサイズを定義（今回は30）
            const gridUnit = 30;
            // メッシュの中心を合わせるためのオフセットを計算
            const halfWidth = (svgWidth / gridUnit) / 2;
            const halfHeight = (svgHeight / gridUnit) / 2;

            rects.forEach(rect => {
                // rectの座標とサイズを1/30して、1x1グリッドにマッピング
                const x = parseFloat(rect.getAttribute('x')) / gridUnit;
                const y = parseFloat(rect.getAttribute('y')) / gridUnit;
                const fill = rect.getAttribute('fill');
                
                const material = new this._THREE.MeshBasicMaterial({
                    color: new this._THREE.Color(fill),
                    transparent: true,
                    opacity: 1.0,
                });

                const voxel = new this._THREE.Mesh(geometry, material);

                // 計算した1x1グリッドの座標を基に位置を設定
                voxel.position.set(
                    (x + 0.5) - halfWidth,
                    -(y + 0.5) + halfHeight,
                    0
                );
                this.group.add(voxel);
            });
            
            this.group.scale.set(this.scale, this.scale, this.scale);
            this.isLoaded = true;
            if (onComplete) onComplete(this.group);
        }, undefined, (error) => {
            console.error('Failed to load SVG:', error);
        });
    }
}