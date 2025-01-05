// FallingObject クラス
export class FallingObject {
    constructor(segment, segmentWidth) {
        // アニメーション設定
        const duration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--animation-duration"));

        // ランダムな位置に配置
        this.container = document.createElement("div");
        this.container.classList.add("falling-object-container");
        this.container.style.position = "absolute";
        this.container.style.left = `${this.getRandomX(segment)}px`;
        this.container.style.width = `${segmentWidth / 3}px`;

        // 画像を作成
        this.object = this.createObject();
        this.container.appendChild(this.object);
        this.objectName = this.object.id;

        // コライダーを作成
        // this.svg = this.createCollider();
        // this.container.appendChild(this.svg);

        // アニメーションを設定
        this.container.style.animation = `moveVertical ${duration}s linear`;
    }

    // 正規分布に基づいてランダムなx座標を計算する関数
    getRandomX(segment) {
        const segmentWidth = segment.offsetWidth;
        const sigma = segmentWidth / 6;  // 分散
        const mu = segmentWidth / 2;     // 平均

        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

        const x = Math.round(mu + sigma * z);
        return Math.max(0, Math.min(segmentWidth, x));
    }

    // 画像を作成
    createObject() {
        const svgs = [
            `
            <svg id="rocket" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 810">
                <g id="explosion" display="none">
                    <rect x="240" y="0" width="30" height="30" fill="#000000" />
                    <rect x="30" y="30" width="30" height="30" fill="#000000" />
                    <rect x="240" y="30" width="30" height="30" fill="#000000" />
                    <rect x="450" y="30" width="30" height="30" fill="#000000" />
                    <rect x="60" y="60" width="30" height="30" fill="#000000" />
                    <rect x="90" y="60" width="30" height="30" fill="#000000" />
                    <rect x="210" y="60" width="30" height="30" fill="#000000" />
                    <rect x="240" y="60" width="30" height="30" fill="#FDD835" />
                    <rect x="270" y="60" width="30" height="30" fill="#000000" />
                    <rect x="390" y="60" width="30" height="30" fill="#000000" />
                    <rect x="420" y="60" width="30" height="30" fill="#000000" />
                    <rect x="60" y="90" width="30" height="30" fill="#000000" />
                    <rect x="90" y="90" width="30" height="30" fill="#FDD835" />
                    <rect x="120" y="90" width="30" height="30" fill="#000000" />
                    <rect x="150" y="90" width="30" height="30" fill="#000000" />
                    <rect x="180" y="90" width="30" height="30" fill="#000000" />
                    <rect x="210" y="90" width="30" height="30" fill="#FDD835" />
                    <rect x="240" y="90" width="30" height="30" fill="#FDD835" />
                    <rect x="270" y="90" width="30" height="30" fill="#FDD835" />
                    <rect x="300" y="90" width="30" height="30" fill="#000000" />
                    <rect x="330" y="90" width="30" height="30" fill="#000000" />
                    <rect x="360" y="90" width="30" height="30" fill="#000000" />
                    <rect x="390" y="90" width="30" height="30" fill="#FDD835" />
                    <rect x="420" y="90" width="30" height="30" fill="#000000" />
                    <rect x="90" y="120" width="30" height="30" fill="#000000" />
                    <rect x="120" y="120" width="30" height="30" fill="#FDD835" />
                    <rect x="150" y="120" width="30" height="30" fill="#FDD835" />
                    <rect x="180" y="120" width="30" height="30" fill="#FDD835" />
                    <rect x="210" y="120" width="30" height="30" fill="#FDD835" />
                    <rect x="240" y="120" width="30" height="30" fill="#FFEE58" />
                    <rect x="270" y="120" width="30" height="30" fill="#FDD835" />
                    <rect x="300" y="120" width="30" height="30" fill="#FDD835" />
                    <rect x="330" y="120" width="30" height="30" fill="#FDD835" />
                    <rect x="360" y="120" width="30" height="30" fill="#FDD835" />
                    <rect x="390" y="120" width="30" height="30" fill="#000000" />
                    <rect x="90" y="150" width="30" height="30" fill="#000000" />
                    <rect x="120" y="150" width="30" height="30" fill="#FDD835" />
                    <rect x="150" y="150" width="30" height="30" fill="#FDD835" />
                    <rect x="180" y="150" width="30" height="30" fill="#FFEE58" />
                    <rect x="210" y="150" width="30" height="30" fill="#FFEE58" />
                    <rect x="240" y="150" width="30" height="30" fill="#FFEE58" />
                    <rect x="270" y="150" width="30" height="30" fill="#FFEE58" />
                    <rect x="300" y="150" width="30" height="30" fill="#FFEE58" />
                    <rect x="330" y="150" width="30" height="30" fill="#FDD835" />
                    <rect x="360" y="150" width="30" height="30" fill="#FDD835" />
                    <rect x="390" y="150" width="30" height="30" fill="#000000" />
                    <rect x="90" y="180" width="30" height="30" fill="#000000" />
                    <rect x="120" y="180" width="30" height="30" fill="#FDD835" />
                    <rect x="150" y="180" width="30" height="30" fill="#FFEE58" />
                    <rect x="180" y="180" width="30" height="30" fill="#FFEE58" />
                    <rect x="210" y="180" width="30" height="30" fill="#FFEE58" />
                    <rect x="240" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="180" width="30" height="30" fill="#FFEE58" />
                    <rect x="300" y="180" width="30" height="30" fill="#FFEE58" />
                    <rect x="330" y="180" width="30" height="30" fill="#FFEE58" />
                    <rect x="360" y="180" width="30" height="30" fill="#FDD835" />
                    <rect x="390" y="180" width="30" height="30" fill="#000000" />
                    <rect x="60" y="210" width="30" height="30" fill="#000000" />
                    <rect x="90" y="210" width="30" height="30" fill="#FDD835" />
                    <rect x="120" y="210" width="30" height="30" fill="#FDD835" />
                    <rect x="150" y="210" width="30" height="30" fill="#FFEE58" />
                    <rect x="180" y="210" width="30" height="30" fill="#FFEE58" />
                    <rect x="210" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="210" width="30" height="30" fill="#FFEE58" />
                    <rect x="330" y="210" width="30" height="30" fill="#FFEE58" />
                    <rect x="360" y="210" width="30" height="30" fill="#FDD835" />
                    <rect x="390" y="210" width="30" height="30" fill="#FDD835" />
                    <rect x="420" y="210" width="30" height="30" fill="#000000" />
                    <rect x="0" y="240" width="30" height="30" fill="#000000" />
                    <rect x="30" y="240" width="30" height="30" fill="#000000" />
                    <rect x="60" y="240" width="30" height="30" fill="#FDD835" />
                    <rect x="90" y="240" width="30" height="30" fill="#FDD835" />
                    <rect x="120" y="240" width="30" height="30" fill="#FFEE58" />
                    <rect x="150" y="240" width="30" height="30" fill="#FFEE58" />
                    <rect x="180" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="240" width="30" height="30" fill="#FFEE58" />
                    <rect x="360" y="240" width="30" height="30" fill="#FFEE58" />
                    <rect x="390" y="240" width="30" height="30" fill="#FDD835" />
                    <rect x="420" y="240" width="30" height="30" fill="#FDD835" />
                    <rect x="450" y="240" width="30" height="30" fill="#000000" />
                    <rect x="480" y="240" width="30" height="30" fill="#000000" />
                    <rect x="60" y="270" width="30" height="30" fill="#000000" />
                    <rect x="90" y="270" width="30" height="30" fill="#FDD835" />
                    <rect x="120" y="270" width="30" height="30" fill="#FDD835" />
                    <rect x="150" y="270" width="30" height="30" fill="#FFEE58" />
                    <rect x="180" y="270" width="30" height="30" fill="#FFEE58" />
                    <rect x="210" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="270" width="30" height="30" fill="#FFEE58" />
                    <rect x="330" y="270" width="30" height="30" fill="#FFEE58" />
                    <rect x="360" y="270" width="30" height="30" fill="#FDD835" />
                    <rect x="390" y="270" width="30" height="30" fill="#FDD835" />
                    <rect x="420" y="270" width="30" height="30" fill="#000000" />
                    <rect x="90" y="300" width="30" height="30" fill="#000000" />
                    <rect x="120" y="300" width="30" height="30" fill="#FDD835" />
                    <rect x="150" y="300" width="30" height="30" fill="#FFEE58" />
                    <rect x="180" y="300" width="30" height="30" fill="#FFEE58" />
                    <rect x="210" y="300" width="30" height="30" fill="#FFEE58" />
                    <rect x="240" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="300" width="30" height="30" fill="#FFEE58" />
                    <rect x="300" y="300" width="30" height="30" fill="#FFEE58" />
                    <rect x="330" y="300" width="30" height="30" fill="#FFEE58" />
                    <rect x="360" y="300" width="30" height="30" fill="#FDD835" />
                    <rect x="390" y="300" width="30" height="30" fill="#000000" />
                    <rect x="90" y="330" width="30" height="30" fill="#000000" />
                    <rect x="120" y="330" width="30" height="30" fill="#FDD835" />
                    <rect x="150" y="330" width="30" height="30" fill="#FDD835" />
                    <rect x="180" y="330" width="30" height="30" fill="#FFEE58" />
                    <rect x="210" y="330" width="30" height="30" fill="#FFEE58" />
                    <rect x="240" y="330" width="30" height="30" fill="#FFEE58" />
                    <rect x="270" y="330" width="30" height="30" fill="#FFEE58" />
                    <rect x="300" y="330" width="30" height="30" fill="#FFEE58" />
                    <rect x="330" y="330" width="30" height="30" fill="#FDD835" />
                    <rect x="360" y="330" width="30" height="30" fill="#FDD835" />
                    <rect x="390" y="330" width="30" height="30" fill="#000000" />
                    <rect x="90" y="360" width="30" height="30" fill="#000000" />
                    <rect x="120" y="360" width="30" height="30" fill="#FDD835" />
                    <rect x="150" y="360" width="30" height="30" fill="#FDD835" />
                    <rect x="180" y="360" width="30" height="30" fill="#FDD835" />
                    <rect x="210" y="360" width="30" height="30" fill="#FDD835" />
                    <rect x="240" y="360" width="30" height="30" fill="#FFEE58" />
                    <rect x="270" y="360" width="30" height="30" fill="#FDD835" />
                    <rect x="300" y="360" width="30" height="30" fill="#FDD835" />
                    <rect x="330" y="360" width="30" height="30" fill="#FDD835" />
                    <rect x="360" y="360" width="30" height="30" fill="#FDD835" />
                    <rect x="390" y="360" width="30" height="30" fill="#000000" />
                    <rect x="60" y="390" width="30" height="30" fill="#000000" />
                    <rect x="90" y="390" width="30" height="30" fill="#FDD835" />
                    <rect x="120" y="390" width="30" height="30" fill="#000000" />
                    <rect x="150" y="390" width="30" height="30" fill="#000000" />
                    <rect x="180" y="390" width="30" height="30" fill="#000000" />
                    <rect x="210" y="390" width="30" height="30" fill="#FDD835" />
                    <rect x="240" y="390" width="30" height="30" fill="#FDD835" />
                    <rect x="270" y="390" width="30" height="30" fill="#FDD835" />
                    <rect x="300" y="390" width="30" height="30" fill="#000000" />
                    <rect x="330" y="390" width="30" height="30" fill="#000000" />
                    <rect x="360" y="390" width="30" height="30" fill="#000000" />
                    <rect x="390" y="390" width="30" height="30" fill="#FDD835" />
                    <rect x="420" y="390" width="30" height="30" fill="#000000" />
                    <rect x="60" y="420" width="30" height="30" fill="#000000" />
                    <rect x="90" y="420" width="30" height="30" fill="#000000" />
                    <rect x="210" y="420" width="30" height="30" fill="#000000" />
                    <rect x="240" y="420" width="30" height="30" fill="#FDD835" />
                    <rect x="270" y="420" width="30" height="30" fill="#000000" />
                    <rect x="390" y="420" width="30" height="30" fill="#000000" />
                    <rect x="420" y="420" width="30" height="30" fill="#000000" />
                    <rect x="30" y="450" width="30" height="30" fill="#000000" />
                    <rect x="240" y="450" width="30" height="30" fill="#000000" />
                    <rect x="450" y="450" width="30" height="30" fill="#000000" />
                    <rect x="240" y="480" width="30" height="30" fill="#000000" />
                </g>
                <g id="under" display="none">
                    <rect x="90" y="0" width="30" height="30" fill="#000000" />
                    <rect x="120" y="0" width="30" height="30" fill="#000000" />
                    <rect x="150" y="0" width="30" height="30" fill="#000000" />
                    <rect x="180" y="0" width="30" height="30" fill="#000000" />
                    <rect x="210" y="0" width="30" height="30" fill="#000000" />
                    <rect x="240" y="0" width="30" height="30" fill="#000000" />
                    <rect x="270" y="0" width="30" height="30" fill="#000000" />
                    <rect x="300" y="0" width="30" height="30" fill="#000000" />
                    <rect x="60" y="30" width="30" height="30" fill="#000000" />
                    <rect x="90" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="30" width="30" height="30" fill="#000000" />
                    <rect x="30" y="60" width="30" height="30" fill="#000000" />
                    <rect x="60" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="60" width="30" height="30" fill="#000000" />
                    <rect x="0" y="90" width="30" height="30" fill="#000000" />
                    <rect x="30" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="90" width="30" height="30" fill="#000000" />
                    <rect x="240" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="90" width="30" height="30" fill="#000000" />
                    <rect x="0" y="120" width="30" height="30" fill="#000000" />
                    <rect x="30" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="120" width="30" height="30" fill="#000000" />
                    <rect x="240" y="120" width="30" height="30" fill="#000000" />
                    <rect x="270" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="120" width="30" height="30" fill="#000000" />
                    <rect x="0" y="150" width="30" height="30" fill="#000000" />
                    <rect x="30" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="150" width="30" height="30" fill="#000000" />
                    <rect x="240" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="150" width="30" height="30" fill="#000000" />
                    <rect x="300" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="150" width="30" height="30" fill="#000000" />
                    <rect x="0" y="180" width="30" height="30" fill="#000000" />
                    <rect x="30" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="180" width="30" height="30" fill="#000000" />
                    <rect x="180" y="180" width="30" height="30" fill="#000000" />
                    <rect x="210" y="180" width="30" height="30" fill="#000000" />
                    <rect x="240" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="180" width="30" height="30" fill="#000000" />
                    <rect x="300" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="180" width="30" height="30" fill="#000000" />
                    <rect x="0" y="210" width="30" height="30" fill="#000000" />
                    <rect x="30" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="210" width="30" height="30" fill="#000000" />
                    <rect x="150" y="210" width="30" height="30" fill="#212121" />
                    <rect x="180" y="210" width="30" height="30" fill="#212121" />
                    <rect x="210" y="210" width="30" height="30" fill="#000000" />
                    <rect x="240" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="210" width="30" height="30" fill="#000000" />
                    <rect x="0" y="240" width="30" height="30" fill="#000000" />
                    <rect x="30" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="240" width="30" height="30" fill="#000000" />
                    <rect x="180" y="240" width="30" height="30" fill="#000000" />
                    <rect x="210" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="240" width="30" height="30" fill="#000000" />
                    <rect x="30" y="270" width="30" height="30" fill="#000000" />
                    <rect x="60" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="270" width="30" height="30" fill="#000000" />
                    <rect x="60" y="300" width="30" height="30" fill="#000000" />
                    <rect x="90" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="300" width="30" height="30" fill="#000000" />
                    <rect x="90" y="330" width="30" height="30" fill="#000000" />
                    <rect x="120" y="330" width="30" height="30" fill="#000000" />
                    <rect x="150" y="330" width="30" height="30" fill="#000000" />
                    <rect x="180" y="330" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="330" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="330" width="30" height="30" fill="#000000" />
                    <rect x="270" y="330" width="30" height="30" fill="#000000" />
                    <rect x="300" y="330" width="30" height="30" fill="#000000" />
                    <rect x="180" y="360" width="30" height="30" fill="#000000" />
                    <rect x="210" y="360" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="360" width="30" height="30" fill="#000000" />
                    <rect x="210" y="390" width="30" height="30" fill="#000000" />
                </g>
                <g id="main" transform="rotate(180, 255, 405)" display="block">
                    <rect x="210" y="0" width="30" height="30" fill="#000000" />
                    <rect x="240" y="0" width="30" height="30" fill="#000000" />
                    <rect x="270" y="0" width="30" height="30" fill="#000000" />
                    <rect x="180" y="30" width="30" height="30" fill="#000000" />
                    <rect x="210" y="30" width="30" height="30" fill="#F69988" />
                    <rect x="240" y="30" width="30" height="30" fill="#F69988" />
                    <rect x="270" y="30" width="30" height="30" fill="#E51C23" />
                    <rect x="300" y="30" width="30" height="30" fill="#000000" />
                    <rect x="150" y="60" width="30" height="30" fill="#000000" />
                    <rect x="180" y="60" width="30" height="30" fill="#E51C23" />
                    <rect x="210" y="60" width="30" height="30" fill="#F69988" />
                    <rect x="240" y="60" width="30" height="30" fill="#F69988" />
                    <rect x="270" y="60" width="30" height="30" fill="#E51C23" />
                    <rect x="300" y="60" width="30" height="30" fill="#E51C23" />
                    <rect x="330" y="60" width="30" height="30" fill="#000000" />
                    <rect x="150" y="90" width="30" height="30" fill="#000000" />
                    <rect x="180" y="90" width="30" height="30" fill="#E51C23" />
                    <rect x="210" y="90" width="30" height="30" fill="#E51C23" />
                    <rect x="240" y="90" width="30" height="30" fill="#E51C23" />
                    <rect x="270" y="90" width="30" height="30" fill="#E51C23" />
                    <rect x="300" y="90" width="30" height="30" fill="#E51C23" />
                    <rect x="330" y="90" width="30" height="30" fill="#000000" />
                    <rect x="120" y="120" width="30" height="30" fill="#000000" />
                    <rect x="150" y="120" width="30" height="30" fill="#90A4AE" />
                    <rect x="180" y="120" width="30" height="30" fill="#000000" />
                    <rect x="210" y="120" width="30" height="30" fill="#000000" />
                    <rect x="240" y="120" width="30" height="30" fill="#000000" />
                    <rect x="270" y="120" width="30" height="30" fill="#000000" />
                    <rect x="300" y="120" width="30" height="30" fill="#000000" />
                    <rect x="330" y="120" width="30" height="30" fill="#90A4AE" />
                    <rect x="360" y="120" width="30" height="30" fill="#000000" />
                    <rect x="120" y="150" width="30" height="30" fill="#000000" />
                    <rect x="150" y="150" width="30" height="30" fill="#90A4AE" />
                    <rect x="180" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="150" width="30" height="30" fill="#B0BEC5" />
                    <rect x="270" y="150" width="30" height="30" fill="#B0BEC5" />
                    <rect x="300" y="150" width="30" height="30" fill="#B0BEC5" />
                    <rect x="330" y="150" width="30" height="30" fill="#90A4AE" />
                    <rect x="360" y="150" width="30" height="30" fill="#000000" />
                    <rect x="90" y="180" width="30" height="30" fill="#000000" />
                    <rect x="120" y="180" width="30" height="30" fill="#90A4AE" />
                    <rect x="150" y="180" width="30" height="30" fill="#000000" />
                    <rect x="180" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="180" width="30" height="30" fill="#000000" />
                    <rect x="240" y="180" width="30" height="30" fill="#B0BEC5" />
                    <rect x="270" y="180" width="30" height="30" fill="#000000" />
                    <rect x="300" y="180" width="30" height="30" fill="#B0BEC5" />
                    <rect x="330" y="180" width="30" height="30" fill="#000000" />
                    <rect x="360" y="180" width="30" height="30" fill="#90A4AE" />
                    <rect x="390" y="180" width="30" height="30" fill="#000000" />
                    <rect x="90" y="210" width="30" height="30" fill="#000000" />
                    <rect x="120" y="210" width="30" height="30" fill="#90A4AE" />
                    <rect x="150" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="210" width="30" height="30" fill="#B0BEC5" />
                    <rect x="240" y="210" width="30" height="30" fill="#B0BEC5" />
                    <rect x="270" y="210" width="30" height="30" fill="#B0BEC5" />
                    <rect x="300" y="210" width="30" height="30" fill="#B0BEC5" />
                    <rect x="330" y="210" width="30" height="30" fill="#90A4AE" />
                    <rect x="360" y="210" width="30" height="30" fill="#90A4AE" />
                    <rect x="390" y="210" width="30" height="30" fill="#000000" />
                    <rect x="90" y="240" width="30" height="30" fill="#000000" />
                    <rect x="120" y="240" width="30" height="30" fill="#90A4AE" />
                    <rect x="150" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="240" width="30" height="30" fill="#000000" />
                    <rect x="240" y="240" width="30" height="30" fill="#000000" />
                    <rect x="270" y="240" width="30" height="30" fill="#000000" />
                    <rect x="300" y="240" width="30" height="30" fill="#B0BEC5" />
                    <rect x="330" y="240" width="30" height="30" fill="#90A4AE" />
                    <rect x="360" y="240" width="30" height="30" fill="#90A4AE" />
                    <rect x="390" y="240" width="30" height="30" fill="#000000" />
                    <rect x="90" y="270" width="30" height="30" fill="#000000" />
                    <rect x="120" y="270" width="30" height="30" fill="#90A4AE" />
                    <rect x="150" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="270" width="30" height="30" fill="#000000" />
                    <rect x="210" y="270" width="30" height="30" fill="#E8F8FF" />
                    <rect x="240" y="270" width="30" height="30" fill="#E8F8FF" />
                    <rect x="270" y="270" width="30" height="30" fill="#BFE8FB" />
                    <rect x="300" y="270" width="30" height="30" fill="#000000" />
                    <rect x="330" y="270" width="30" height="30" fill="#90A4AE" />
                    <rect x="360" y="270" width="30" height="30" fill="#90A4AE" />
                    <rect x="390" y="270" width="30" height="30" fill="#000000" />
                    <rect x="60" y="300" width="30" height="30" fill="#000000" />
                    <rect x="90" y="300" width="30" height="30" fill="#000000" />
                    <rect x="120" y="300" width="30" height="30" fill="#90A4AE" />
                    <rect x="150" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="300" width="30" height="30" fill="#000000" />
                    <rect x="210" y="300" width="30" height="30" fill="#E8F8FF" />
                    <rect x="240" y="300" width="30" height="30" fill="#9EDEFB" />
                    <rect x="270" y="300" width="30" height="30" fill="#9EDEFB" />
                    <rect x="300" y="300" width="30" height="30" fill="#000000" />
                    <rect x="330" y="300" width="30" height="30" fill="#90A4AE" />
                    <rect x="360" y="300" width="30" height="30" fill="#90A4AE" />
                    <rect x="390" y="300" width="30" height="30" fill="#000000" />
                    <rect x="420" y="300" width="30" height="30" fill="#000000" />
                    <rect x="30" y="330" width="30" height="30" fill="#000000" />
                    <rect x="60" y="330" width="30" height="30" fill="#F69988" />
                    <rect x="90" y="330" width="30" height="30" fill="#000000" />
                    <rect x="120" y="330" width="30" height="30" fill="#90A4AE" />
                    <rect x="150" y="330" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="330" width="30" height="30" fill="#000000" />
                    <rect x="210" y="330" width="30" height="30" fill="#BFE8FB" />
                    <rect x="240" y="330" width="30" height="30" fill="#9EDEFB" />
                    <rect x="270" y="330" width="30" height="30" fill="#9EDEFB" />
                    <rect x="300" y="330" width="30" height="30" fill="#000000" />
                    <rect x="330" y="330" width="30" height="30" fill="#90A4AE" />
                    <rect x="360" y="330" width="30" height="30" fill="#90A4AE" />
                    <rect x="390" y="330" width="30" height="30" fill="#000000" />
                    <rect x="420" y="330" width="30" height="30" fill="#F69988" />
                    <rect x="450" y="330" width="30" height="30" fill="#000000" />
                    <rect x="0" y="360" width="30" height="30" fill="#000000" />
                    <rect x="30" y="360" width="30" height="30" fill="#F69988" />
                    <rect x="60" y="360" width="30" height="30" fill="#E51C23" />
                    <rect x="90" y="360" width="30" height="30" fill="#000000" />
                    <rect x="120" y="360" width="30" height="30" fill="#90A4AE" />
                    <rect x="150" y="360" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="360" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="360" width="30" height="30" fill="#000000" />
                    <rect x="240" y="360" width="30" height="30" fill="#000000" />
                    <rect x="270" y="360" width="30" height="30" fill="#000000" />
                    <rect x="300" y="360" width="30" height="30" fill="#B0BEC5" />
                    <rect x="330" y="360" width="30" height="30" fill="#90A4AE" />
                    <rect x="360" y="360" width="30" height="30" fill="#90A4AE" />
                    <rect x="390" y="360" width="30" height="30" fill="#000000" />
                    <rect x="420" y="360" width="30" height="30" fill="#E51C23" />
                    <rect x="450" y="360" width="30" height="30" fill="#F69988" />
                    <rect x="480" y="360" width="30" height="30" fill="#000000" />
                    <rect x="0" y="390" width="30" height="30" fill="#000000" />
                    <rect x="30" y="390" width="30" height="30" fill="#E51C23" />
                    <rect x="60" y="390" width="30" height="30" fill="#E51C23" />
                    <rect x="90" y="390" width="30" height="30" fill="#000000" />
                    <rect x="120" y="390" width="30" height="30" fill="#90A4AE" />
                    <rect x="150" y="390" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="390" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="390" width="30" height="30" fill="#B0BEC5" />
                    <rect x="240" y="390" width="30" height="30" fill="#B0BEC5" />
                    <rect x="270" y="390" width="30" height="30" fill="#B0BEC5" />
                    <rect x="300" y="390" width="30" height="30" fill="#B0BEC5" />
                    <rect x="330" y="390" width="30" height="30" fill="#90A4AE" />
                    <rect x="360" y="390" width="30" height="30" fill="#90A4AE" />
                    <rect x="390" y="390" width="30" height="30" fill="#000000" />
                    <rect x="420" y="390" width="30" height="30" fill="#E51C23" />
                    <rect x="450" y="390" width="30" height="30" fill="#E51C23" />
                    <rect x="480" y="390" width="30" height="30" fill="#000000" />
                    <rect x="0" y="420" width="30" height="30" fill="#000000" />
                    <rect x="30" y="420" width="30" height="30" fill="#E51C23" />
                    <rect x="60" y="420" width="30" height="30" fill="#E51C23" />
                    <rect x="90" y="420" width="30" height="30" fill="#000000" />
                    <rect x="120" y="420" width="30" height="30" fill="#90A4AE" />
                    <rect x="150" y="420" width="30" height="30" fill="#000000" />
                    <rect x="180" y="420" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="420" width="30" height="30" fill="#B0BEC5" />
                    <rect x="240" y="420" width="30" height="30" fill="#B0BEC5" />
                    <rect x="270" y="420" width="30" height="30" fill="#B0BEC5" />
                    <rect x="300" y="420" width="30" height="30" fill="#B0BEC5" />
                    <rect x="330" y="420" width="30" height="30" fill="#000000" />
                    <rect x="360" y="420" width="30" height="30" fill="#90A4AE" />
                    <rect x="390" y="420" width="30" height="30" fill="#000000" />
                    <rect x="420" y="420" width="30" height="30" fill="#E51C23" />
                    <rect x="450" y="420" width="30" height="30" fill="#E51C23" />
                    <rect x="480" y="420" width="30" height="30" fill="#000000" />
                    <rect x="0" y="450" width="30" height="30" fill="#000000" />
                    <rect x="30" y="450" width="30" height="30" fill="#E51C23" />
                    <rect x="60" y="450" width="30" height="30" fill="#E51C23" />
                    <rect x="90" y="450" width="30" height="30" fill="#000000" />
                    <rect x="120" y="450" width="30" height="30" fill="#90A4AE" />
                    <rect x="150" y="450" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="450" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="450" width="30" height="30" fill="#000000" />
                    <rect x="240" y="450" width="30" height="30" fill="#B0BEC5" />
                    <rect x="270" y="450" width="30" height="30" fill="#000000" />
                    <rect x="300" y="450" width="30" height="30" fill="#B0BEC5" />
                    <rect x="330" y="450" width="30" height="30" fill="#90A4AE" />
                    <rect x="360" y="450" width="30" height="30" fill="#90A4AE" />
                    <rect x="390" y="450" width="30" height="30" fill="#000000" />
                    <rect x="420" y="450" width="30" height="30" fill="#E51C23" />
                    <rect x="450" y="450" width="30" height="30" fill="#E51C23" />
                    <rect x="480" y="450" width="30" height="30" fill="#000000" />
                    <rect x="0" y="480" width="30" height="30" fill="#000000" />
                    <rect x="30" y="480" width="30" height="30" fill="#000000" />
                    <rect x="60" y="480" width="30" height="30" fill="#000000" />
                    <rect x="120" y="480" width="30" height="30" fill="#000000" />
                    <rect x="150" y="480" width="30" height="30" fill="#90A4AE" />
                    <rect x="180" y="480" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="480" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="480" width="30" height="30" fill="#B0BEC5" />
                    <rect x="270" y="480" width="30" height="30" fill="#B0BEC5" />
                    <rect x="300" y="480" width="30" height="30" fill="#90A4AE" />
                    <rect x="330" y="480" width="30" height="30" fill="#90A4AE" />
                    <rect x="360" y="480" width="30" height="30" fill="#000000" />
                    <rect x="420" y="480" width="30" height="30" fill="#000000" />
                    <rect x="450" y="480" width="30" height="30" fill="#000000" />
                    <rect x="480" y="480" width="30" height="30" fill="#000000" />
                    <rect x="150" y="510" width="30" height="30" fill="#000000" />
                    <rect x="180" y="510" width="30" height="30" fill="#000000" />
                    <rect x="210" y="510" width="30" height="30" fill="#000000" />
                    <rect x="240" y="510" width="30" height="30" fill="#000000" />
                    <rect x="270" y="510" width="30" height="30" fill="#000000" />
                    <rect x="300" y="510" width="30" height="30" fill="#000000" />
                    <rect x="330" y="510" width="30" height="30" fill="#000000" />
                    <rect x="150" y="540" width="30" height="30" fill="#000000" />
                    <rect x="180" y="540" width="30" height="30" fill="#90A4AE" />
                    <rect x="210" y="540" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="540" width="30" height="30" fill="#B0BEC5" />
                    <rect x="270" y="540" width="30" height="30" fill="#B0BEC5" />
                    <rect x="300" y="540" width="30" height="30" fill="#90A4AE" />
                    <rect x="330" y="540" width="30" height="30" fill="#000000" />
                    <rect x="180" y="570" width="30" height="30" fill="#000000" />
                    <rect x="210" y="570" width="30" height="30" fill="#000000" />
                    <rect x="240" y="570" width="30" height="30" fill="#000000" />
                    <rect x="270" y="570" width="30" height="30" fill="#000000" />
                    <rect x="300" y="570" width="30" height="30" fill="#000000" />
                    <rect x="180" y="600" width="30" height="30" fill="#000000" />
                    <rect x="210" y="600" width="30" height="30" fill="#E51C23" />
                    <rect x="240" y="600" width="30" height="30" fill="#FFEB3B" />
                    <rect x="270" y="600" width="30" height="30" fill="#E51C23" />
                    <rect x="300" y="600" width="30" height="30" fill="#000000" />
                    <rect x="150" y="630" width="30" height="30" fill="#000000" />
                    <rect x="180" y="630" width="30" height="30" fill="#E51C23" />
                    <rect x="210" y="630" width="30" height="30" fill="#F9A825" />
                    <rect x="240" y="630" width="30" height="30" fill="#FFEB3B" />
                    <rect x="270" y="630" width="30" height="30" fill="#F9A825" />
                    <rect x="300" y="630" width="30" height="30" fill="#E51C23" />
                    <rect x="330" y="630" width="30" height="30" fill="#000000" />
                    <rect x="150" y="660" width="30" height="30" fill="#000000" />
                    <rect x="180" y="660" width="30" height="30" fill="#E51C23" />
                    <rect x="210" y="660" width="30" height="30" fill="#F9A825" />
                    <rect x="240" y="660" width="30" height="30" fill="#F9A825" />
                    <rect x="270" y="660" width="30" height="30" fill="#F9A825" />
                    <rect x="300" y="660" width="30" height="30" fill="#E51C23" />
                    <rect x="330" y="660" width="30" height="30" fill="#000000" />
                    <rect x="180" y="690" width="30" height="30" fill="#000000" />
                    <rect x="210" y="690" width="30" height="30" fill="#E51C23" />
                    <rect x="240" y="690" width="30" height="30" fill="#F9A825" />
                    <rect x="270" y="690" width="30" height="30" fill="#E51C23" />
                    <rect x="300" y="690" width="30" height="30" fill="#000000" />
                    <rect x="180" y="720" width="30" height="30" fill="#000000" />
                    <rect x="210" y="720" width="30" height="30" fill="#E51C23" />
                    <rect x="240" y="720" width="30" height="30" fill="#E51C23" />
                    <rect x="270" y="720" width="30" height="30" fill="#E51C23" />
                    <rect x="300" y="720" width="30" height="30" fill="#000000" />
                    <rect x="210" y="750" width="30" height="30" fill="#000000" />
                    <rect x="240" y="750" width="30" height="30" fill="#E51C23" />
                    <rect x="270" y="750" width="30" height="30" fill="#000000" />
                    <rect x="240" y="780" width="30" height="30" fill="#000000" />
                </g>
            </svg>
            `,
            `
            <svg id="fire" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 480">
                <g id="explosion" display="none">
                    <rect x="240" y="0" width="30" height="30" fill="#000000" />
                    <rect x="30" y="30" width="30" height="30" fill="#000000" />
                    <rect x="240" y="30" width="30" height="30" fill="#000000" />
                    <rect x="450" y="30" width="30" height="30" fill="#000000" />
                    <rect x="60" y="60" width="30" height="30" fill="#000000" />
                    <rect x="90" y="60" width="30" height="30" fill="#000000" />
                    <rect x="210" y="60" width="30" height="30" fill="#000000" />
                    <rect x="240" y="60" width="30" height="30" fill="#E51C23" />
                    <rect x="270" y="60" width="30" height="30" fill="#000000" />
                    <rect x="390" y="60" width="30" height="30" fill="#000000" />
                    <rect x="420" y="60" width="30" height="30" fill="#000000" />
                    <rect x="60" y="90" width="30" height="30" fill="#000000" />
                    <rect x="90" y="90" width="30" height="30" fill="#E51C23" />
                    <rect x="120" y="90" width="30" height="30" fill="#000000" />
                    <rect x="150" y="90" width="30" height="30" fill="#000000" />
                    <rect x="180" y="90" width="30" height="30" fill="#000000" />
                    <rect x="210" y="90" width="30" height="30" fill="#E51C23" />
                    <rect x="240" y="90" width="30" height="30" fill="#E51C23" />
                    <rect x="270" y="90" width="30" height="30" fill="#E51C23" />
                    <rect x="300" y="90" width="30" height="30" fill="#000000" />
                    <rect x="330" y="90" width="30" height="30" fill="#000000" />
                    <rect x="360" y="90" width="30" height="30" fill="#000000" />
                    <rect x="390" y="90" width="30" height="30" fill="#E51C23" />
                    <rect x="420" y="90" width="30" height="30" fill="#000000" />
                    <rect x="90" y="120" width="30" height="30" fill="#000000" />
                    <rect x="120" y="120" width="30" height="30" fill="#E51C23" />
                    <rect x="150" y="120" width="30" height="30" fill="#E51C23" />
                    <rect x="180" y="120" width="30" height="30" fill="#E51C23" />
                    <rect x="210" y="120" width="30" height="30" fill="#E51C23" />
                    <rect x="240" y="120" width="30" height="30" fill="#F9A825" />
                    <rect x="270" y="120" width="30" height="30" fill="#E51C23" />
                    <rect x="300" y="120" width="30" height="30" fill="#E51C23" />
                    <rect x="330" y="120" width="30" height="30" fill="#E51C23" />
                    <rect x="360" y="120" width="30" height="30" fill="#E51C23" />
                    <rect x="390" y="120" width="30" height="30" fill="#000000" />
                    <rect x="90" y="150" width="30" height="30" fill="#000000" />
                    <rect x="120" y="150" width="30" height="30" fill="#E51C23" />
                    <rect x="150" y="150" width="30" height="30" fill="#E51C23" />
                    <rect x="180" y="150" width="30" height="30" fill="#F9A825" />
                    <rect x="210" y="150" width="30" height="30" fill="#F9A825" />
                    <rect x="240" y="150" width="30" height="30" fill="#F9A825" />
                    <rect x="270" y="150" width="30" height="30" fill="#F9A825" />
                    <rect x="300" y="150" width="30" height="30" fill="#F9A825" />
                    <rect x="330" y="150" width="30" height="30" fill="#E51C23" />
                    <rect x="360" y="150" width="30" height="30" fill="#E51C23" />
                    <rect x="390" y="150" width="30" height="30" fill="#000000" />
                    <rect x="90" y="180" width="30" height="30" fill="#000000" />
                    <rect x="120" y="180" width="30" height="30" fill="#E51C23" />
                    <rect x="150" y="180" width="30" height="30" fill="#F9A825" />
                    <rect x="180" y="180" width="30" height="30" fill="#F9A825" />
                    <rect x="210" y="180" width="30" height="30" fill="#F9A825" />
                    <rect x="240" y="180" width="30" height="30" fill="#FFEB3B" />
                    <rect x="270" y="180" width="30" height="30" fill="#F9A825" />
                    <rect x="300" y="180" width="30" height="30" fill="#F9A825" />
                    <rect x="330" y="180" width="30" height="30" fill="#F9A825" />
                    <rect x="360" y="180" width="30" height="30" fill="#E51C23" />
                    <rect x="390" y="180" width="30" height="30" fill="#000000" />
                    <rect x="60" y="210" width="30" height="30" fill="#000000" />
                    <rect x="90" y="210" width="30" height="30" fill="#E51C23" />
                    <rect x="120" y="210" width="30" height="30" fill="#E51C23" />
                    <rect x="150" y="210" width="30" height="30" fill="#F9A825" />
                    <rect x="180" y="210" width="30" height="30" fill="#F9A825" />
                    <rect x="210" y="210" width="30" height="30" fill="#FFEB3B" />
                    <rect x="240" y="210" width="30" height="30" fill="#FFEB3B" />
                    <rect x="270" y="210" width="30" height="30" fill="#FFEB3B" />
                    <rect x="300" y="210" width="30" height="30" fill="#F9A825" />
                    <rect x="330" y="210" width="30" height="30" fill="#F9A825" />
                    <rect x="360" y="210" width="30" height="30" fill="#E51C23" />
                    <rect x="390" y="210" width="30" height="30" fill="#E51C23" />
                    <rect x="420" y="210" width="30" height="30" fill="#000000" />
                    <rect x="0" y="240" width="30" height="30" fill="#000000" />
                    <rect x="30" y="240" width="30" height="30" fill="#000000" />
                    <rect x="60" y="240" width="30" height="30" fill="#E51C23" />
                    <rect x="90" y="240" width="30" height="30" fill="#E51C23" />
                    <rect x="120" y="240" width="30" height="30" fill="#F9A825" />
                    <rect x="150" y="240" width="30" height="30" fill="#F9A825" />
                    <rect x="180" y="240" width="30" height="30" fill="#FFEB3B" />
                    <rect x="210" y="240" width="30" height="30" fill="#FFEB3B" />
                    <rect x="240" y="240" width="30" height="30" fill="#FFEB3B" />
                    <rect x="270" y="240" width="30" height="30" fill="#FFEB3B" />
                    <rect x="300" y="240" width="30" height="30" fill="#FFEB3B" />
                    <rect x="330" y="240" width="30" height="30" fill="#F9A825" />
                    <rect x="360" y="240" width="30" height="30" fill="#F9A825" />
                    <rect x="390" y="240" width="30" height="30" fill="#E51C23" />
                    <rect x="420" y="240" width="30" height="30" fill="#E51C23" />
                    <rect x="450" y="240" width="30" height="30" fill="#000000" />
                    <rect x="480" y="240" width="30" height="30" fill="#000000" />
                    <rect x="60" y="270" width="30" height="30" fill="#000000" />
                    <rect x="90" y="270" width="30" height="30" fill="#E51C23" />
                    <rect x="120" y="270" width="30" height="30" fill="#E51C23" />
                    <rect x="150" y="270" width="30" height="30" fill="#F9A825" />
                    <rect x="180" y="270" width="30" height="30" fill="#F9A825" />
                    <rect x="210" y="270" width="30" height="30" fill="#FFEB3B" />
                    <rect x="240" y="270" width="30" height="30" fill="#FFEB3B" />
                    <rect x="270" y="270" width="30" height="30" fill="#FFEB3B" />
                    <rect x="300" y="270" width="30" height="30" fill="#F9A825" />
                    <rect x="330" y="270" width="30" height="30" fill="#F9A825" />
                    <rect x="360" y="270" width="30" height="30" fill="#E51C23" />
                    <rect x="390" y="270" width="30" height="30" fill="#E51C23" />
                    <rect x="420" y="270" width="30" height="30" fill="#000000" />
                    <rect x="90" y="300" width="30" height="30" fill="#000000" />
                    <rect x="120" y="300" width="30" height="30" fill="#E51C23" />
                    <rect x="150" y="300" width="30" height="30" fill="#F9A825" />
                    <rect x="180" y="300" width="30" height="30" fill="#F9A825" />
                    <rect x="210" y="300" width="30" height="30" fill="#F9A825" />
                    <rect x="240" y="300" width="30" height="30" fill="#FFEB3B" />
                    <rect x="270" y="300" width="30" height="30" fill="#F9A825" />
                    <rect x="300" y="300" width="30" height="30" fill="#F9A825" />
                    <rect x="330" y="300" width="30" height="30" fill="#F9A825" />
                    <rect x="360" y="300" width="30" height="30" fill="#E51C23" />
                    <rect x="390" y="300" width="30" height="30" fill="#000000" />
                    <rect x="90" y="330" width="30" height="30" fill="#000000" />
                    <rect x="120" y="330" width="30" height="30" fill="#E51C23" />
                    <rect x="150" y="330" width="30" height="30" fill="#E51C23" />
                    <rect x="180" y="330" width="30" height="30" fill="#F9A825" />
                    <rect x="210" y="330" width="30" height="30" fill="#F9A825" />
                    <rect x="240" y="330" width="30" height="30" fill="#F9A825" />
                    <rect x="270" y="330" width="30" height="30" fill="#F9A825" />
                    <rect x="300" y="330" width="30" height="30" fill="#F9A825" />
                    <rect x="330" y="330" width="30" height="30" fill="#E51C23" />
                    <rect x="360" y="330" width="30" height="30" fill="#E51C23" />
                    <rect x="390" y="330" width="30" height="30" fill="#000000" />
                    <rect x="90" y="360" width="30" height="30" fill="#000000" />
                    <rect x="120" y="360" width="30" height="30" fill="#E51C23" />
                    <rect x="150" y="360" width="30" height="30" fill="#E51C23" />
                    <rect x="180" y="360" width="30" height="30" fill="#E51C23" />
                    <rect x="210" y="360" width="30" height="30" fill="#E51C23" />
                    <rect x="240" y="360" width="30" height="30" fill="#F9A825" />
                    <rect x="270" y="360" width="30" height="30" fill="#E51C23" />
                    <rect x="300" y="360" width="30" height="30" fill="#E51C23" />
                    <rect x="330" y="360" width="30" height="30" fill="#E51C23" />
                    <rect x="360" y="360" width="30" height="30" fill="#E51C23" />
                    <rect x="390" y="360" width="30" height="30" fill="#000000" />
                    <rect x="60" y="390" width="30" height="30" fill="#000000" />
                    <rect x="90" y="390" width="30" height="30" fill="#E51C23" />
                    <rect x="120" y="390" width="30" height="30" fill="#000000" />
                    <rect x="150" y="390" width="30" height="30" fill="#000000" />
                    <rect x="180" y="390" width="30" height="30" fill="#000000" />
                    <rect x="210" y="390" width="30" height="30" fill="#E51C23" />
                    <rect x="240" y="390" width="30" height="30" fill="#E51C23" />
                    <rect x="270" y="390" width="30" height="30" fill="#E51C23" />
                    <rect x="300" y="390" width="30" height="30" fill="#000000" />
                    <rect x="330" y="390" width="30" height="30" fill="#000000" />
                    <rect x="360" y="390" width="30" height="30" fill="#000000" />
                    <rect x="390" y="390" width="30" height="30" fill="#E51C23" />
                    <rect x="420" y="390" width="30" height="30" fill="#000000" />
                    <rect x="60" y="420" width="30" height="30" fill="#000000" />
                    <rect x="90" y="420" width="30" height="30" fill="#000000" />
                    <rect x="210" y="420" width="30" height="30" fill="#000000" />
                    <rect x="240" y="420" width="30" height="30" fill="#E51C23" />
                    <rect x="270" y="420" width="30" height="30" fill="#000000" />
                    <rect x="390" y="420" width="30" height="30" fill="#000000" />
                    <rect x="420" y="420" width="30" height="30" fill="#000000" />
                    <rect x="30" y="450" width="30" height="30" fill="#000000" />
                    <rect x="240" y="450" width="30" height="30" fill="#000000" />
                    <rect x="450" y="450" width="30" height="30" fill="#000000" />
                    <rect x="240" y="480" width="30" height="30" fill="#000000" />
                </g>
                <g id="under" display="none">
                    <rect x="90" y="0" width="30" height="30" fill="#000000" />
                    <rect x="120" y="0" width="30" height="30" fill="#000000" />
                    <rect x="150" y="0" width="30" height="30" fill="#000000" />
                    <rect x="180" y="0" width="30" height="30" fill="#000000" />
                    <rect x="210" y="0" width="30" height="30" fill="#000000" />
                    <rect x="240" y="0" width="30" height="30" fill="#000000" />
                    <rect x="270" y="0" width="30" height="30" fill="#000000" />
                    <rect x="300" y="0" width="30" height="30" fill="#000000" />
                    <rect x="60" y="30" width="30" height="30" fill="#000000" />
                    <rect x="90" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="30" width="30" height="30" fill="#000000" />
                    <rect x="30" y="60" width="30" height="30" fill="#000000" />
                    <rect x="60" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="60" width="30" height="30" fill="#000000" />
                    <rect x="150" y="60" width="30" height="30" fill="#000000" />
                    <rect x="180" y="60" width="30" height="30" fill="#000000" />
                    <rect x="210" y="60" width="30" height="30" fill="#000000" />
                    <rect x="240" y="60" width="30" height="30" fill="#000000" />
                    <rect x="270" y="60" width="30" height="30" fill="#000000" />
                    <rect x="300" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="60" width="30" height="30" fill="#000000" />
                    <rect x="0" y="90" width="30" height="30" fill="#000000" />
                    <rect x="30" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="90" width="30" height="30" fill="#000000" />
                    <rect x="120" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="90" width="30" height="30" fill="#000000" />
                    <rect x="330" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="90" width="30" height="30" fill="#000000" />
                    <rect x="0" y="120" width="30" height="30" fill="#000000" />
                    <rect x="30" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="120" width="30" height="30" fill="#000000" />
                    <rect x="90" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="120" width="30" height="30" fill="#000000" />
                    <rect x="180" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="120" width="30" height="30" fill="#000000" />
                    <rect x="270" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="120" width="30" height="30" fill="#000000" />
                    <rect x="360" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="120" width="30" height="30" fill="#000000" />
                    <rect x="0" y="150" width="30" height="30" fill="#000000" />
                    <rect x="30" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="150" width="30" height="30" fill="#000000" />
                    <rect x="90" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="150" width="30" height="30" fill="#000000" />
                    <rect x="150" y="150" width="30" height="30" fill="#FF1F1F" />
                    <rect x="180" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="150" width="30" height="30" fill="#FF1F1F" />
                    <rect x="270" y="150" width="30" height="30" fill="#000000" />
                    <rect x="300" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="150" width="30" height="30" fill="#000000" />
                    <rect x="360" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="150" width="30" height="30" fill="#000000" />
                    <rect x="0" y="180" width="30" height="30" fill="#000000" />
                    <rect x="30" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="180" width="30" height="30" fill="#000000" />
                    <rect x="90" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="180" width="30" height="30" fill="#000000" />
                    <rect x="360" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="180" width="30" height="30" fill="#000000" />
                    <rect x="0" y="210" width="30" height="30" fill="#000000" />
                    <rect x="30" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="210" width="30" height="30" fill="#000000" />
                    <rect x="120" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="210" width="30" height="30" fill="#000000" />
                    <rect x="330" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="210" width="30" height="30" fill="#000000" />
                    <rect x="0" y="240" width="30" height="30" fill="#000000" />
                    <rect x="30" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="240" width="30" height="30" fill="#000000" />
                    <rect x="120" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="240" width="30" height="30" fill="#000000" />
                    <rect x="180" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="240" width="30" height="30" fill="#000000" />
                    <rect x="240" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="240" width="30" height="30" fill="#000000" />
                    <rect x="300" y="240" width="30" height="30" fill="#000000" />
                    <rect x="330" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="240" width="30" height="30" fill="#000000" />
                    <rect x="30" y="270" width="30" height="30" fill="#000000" />
                    <rect x="60" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="270" width="30" height="30" fill="#000000" />
                    <rect x="120" y="270" width="30" height="30" fill="#000000" />
                    <rect x="150" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="270" width="30" height="30" fill="#000000" />
                    <rect x="210" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="270" width="30" height="30" fill="#000000" />
                    <rect x="270" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="270" width="30" height="30" fill="#000000" />
                    <rect x="330" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="270" width="30" height="30" fill="#000000" />
                    <rect x="60" y="300" width="30" height="30" fill="#000000" />
                    <rect x="90" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="300" width="30" height="30" fill="#000000" />
                    <rect x="90" y="330" width="30" height="30" fill="#000000" />
                    <rect x="120" y="330" width="30" height="30" fill="#000000" />
                    <rect x="150" y="330" width="30" height="30" fill="#000000" />
                    <rect x="180" y="330" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="330" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="330" width="30" height="30" fill="#000000" />
                    <rect x="270" y="330" width="30" height="30" fill="#000000" />
                    <rect x="300" y="330" width="30" height="30" fill="#000000" />
                    <rect x="180" y="360" width="30" height="30" fill="#000000" />
                    <rect x="210" y="360" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="360" width="30" height="30" fill="#000000" />
                    <rect x="210" y="390" width="30" height="30" fill="#000000" />
                </g>
                <g id="main" display="block">
                    <rect x="180" y="0" width="30" height="30" fill="#000000" />
                    <rect x="180" y="30" width="30" height="30" fill="#000000" />
                    <rect x="150" y="60" width="30" height="30" fill="#000000" />
                    <rect x="180" y="60" width="30" height="30" fill="#00BCD4" />
                    <rect x="210" y="60" width="30" height="30" fill="#000000" />
                    <rect x="60" y="90" width="30" height="30" fill="#000000" />
                    <rect x="150" y="90" width="30" height="30" fill="#000000" />
                    <rect x="180" y="90" width="30" height="30" fill="#00BCD4" />
                    <rect x="210" y="90" width="30" height="30" fill="#000000" />
                    <rect x="300" y="90" width="30" height="30" fill="#000000" />
                    <rect x="60" y="120" width="30" height="30" fill="#000000" />
                    <rect x="120" y="120" width="30" height="30" fill="#000000" />
                    <rect x="150" y="120" width="30" height="30" fill="#00BCD4" />
                    <rect x="180" y="120" width="30" height="30" fill="#00BCD4" />
                    <rect x="210" y="120" width="30" height="30" fill="#00BCD4" />
                    <rect x="240" y="120" width="30" height="30" fill="#000000" />
                    <rect x="300" y="120" width="30" height="30" fill="#000000" />
                    <rect x="30" y="150" width="30" height="30" fill="#000000" />
                    <rect x="60" y="150" width="30" height="30" fill="#00BCD4" />
                    <rect x="90" y="150" width="30" height="30" fill="#000000" />
                    <rect x="120" y="150" width="30" height="30" fill="#00BCD4" />
                    <rect x="150" y="150" width="30" height="30" fill="#00BCD4" />
                    <rect x="180" y="150" width="30" height="30" fill="#80DEEA" />
                    <rect x="210" y="150" width="30" height="30" fill="#00BCD4" />
                    <rect x="240" y="150" width="30" height="30" fill="#00BCD4" />
                    <rect x="270" y="150" width="30" height="30" fill="#000000" />
                    <rect x="300" y="150" width="30" height="30" fill="#00BCD4" />
                    <rect x="330" y="150" width="30" height="30" fill="#000000" />
                    <rect x="30" y="180" width="30" height="30" fill="#000000" />
                    <rect x="60" y="180" width="30" height="30" fill="#00BCD4" />
                    <rect x="90" y="180" width="30" height="30" fill="#00BCD4" />
                    <rect x="120" y="180" width="30" height="30" fill="#00BCD4" />
                    <rect x="150" y="180" width="30" height="30" fill="#80DEEA" />
                    <rect x="180" y="180" width="30" height="30" fill="#80DEEA" />
                    <rect x="210" y="180" width="30" height="30" fill="#80DEEA" />
                    <rect x="240" y="180" width="30" height="30" fill="#00BCD4" />
                    <rect x="270" y="180" width="30" height="30" fill="#00BCD4" />
                    <rect x="300" y="180" width="30" height="30" fill="#00BCD4" />
                    <rect x="330" y="180" width="30" height="30" fill="#000000" />
                    <rect x="0" y="210" width="30" height="30" fill="#000000" />
                    <rect x="30" y="210" width="30" height="30" fill="#00BCD4" />
                    <rect x="60" y="210" width="30" height="30" fill="#00BCD4" />
                    <rect x="90" y="210" width="30" height="30" fill="#80DEEA" />
                    <rect x="120" y="210" width="30" height="30" fill="#00BCD4" />
                    <rect x="150" y="210" width="30" height="30" fill="#80DEEA" />
                    <rect x="180" y="210" width="30" height="30" fill="#80DEEA" />
                    <rect x="210" y="210" width="30" height="30" fill="#80DEEA" />
                    <rect x="240" y="210" width="30" height="30" fill="#00BCD4" />
                    <rect x="270" y="210" width="30" height="30" fill="#80DEEA" />
                    <rect x="300" y="210" width="30" height="30" fill="#00BCD4" />
                    <rect x="330" y="210" width="30" height="30" fill="#00BCD4" />
                    <rect x="360" y="210" width="30" height="30" fill="#000000" />
                    <rect x="0" y="240" width="30" height="30" fill="#000000" />
                    <rect x="30" y="240" width="30" height="30" fill="#00BCD4" />
                    <rect x="60" y="240" width="30" height="30" fill="#00BCD4" />
                    <rect x="90" y="240" width="30" height="30" fill="#80DEEA" />
                    <rect x="120" y="240" width="30" height="30" fill="#80DEEA" />
                    <rect x="150" y="240" width="30" height="30" fill="#80DEEA" />
                    <rect x="180" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="240" width="30" height="30" fill="#80DEEA" />
                    <rect x="240" y="240" width="30" height="30" fill="#80DEEA" />
                    <rect x="270" y="240" width="30" height="30" fill="#80DEEA" />
                    <rect x="300" y="240" width="30" height="30" fill="#00BCD4" />
                    <rect x="330" y="240" width="30" height="30" fill="#00BCD4" />
                    <rect x="360" y="240" width="30" height="30" fill="#000000" />
                    <rect x="0" y="270" width="30" height="30" fill="#000000" />
                    <rect x="30" y="270" width="30" height="30" fill="#00BCD4" />
                    <rect x="60" y="270" width="30" height="30" fill="#80DEEA" />
                    <rect x="90" y="270" width="30" height="30" fill="#80DEEA" />
                    <rect x="120" y="270" width="30" height="30" fill="#80DEEA" />
                    <rect x="150" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="270" width="30" height="30" fill="#80DEEA" />
                    <rect x="270" y="270" width="30" height="30" fill="#80DEEA" />
                    <rect x="300" y="270" width="30" height="30" fill="#80DEEA" />
                    <rect x="330" y="270" width="30" height="30" fill="#00BCD4" />
                    <rect x="360" y="270" width="30" height="30" fill="#000000" />
                    <rect x="0" y="300" width="30" height="30" fill="#000000" />
                    <rect x="30" y="300" width="30" height="30" fill="#00BCD4" />
                    <rect x="60" y="300" width="30" height="30" fill="#80DEEA" />
                    <rect x="90" y="300" width="30" height="30" fill="#80DEEA" />
                    <rect x="120" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="300" width="30" height="30" fill="#80DEEA" />
                    <rect x="300" y="300" width="30" height="30" fill="#80DEEA" />
                    <rect x="330" y="300" width="30" height="30" fill="#00BCD4" />
                    <rect x="360" y="300" width="30" height="30" fill="#000000" />
                    <rect x="0" y="330" width="30" height="30" fill="#000000" />
                    <rect x="30" y="330" width="30" height="30" fill="#00BCD4" />
                    <rect x="60" y="330" width="30" height="30" fill="#00BCD4" />
                    <rect x="90" y="330" width="30" height="30" fill="#80DEEA" />
                    <rect x="120" y="330" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="330" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="330" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="330" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="330" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="330" width="30" height="30" fill="#80DEEA" />
                    <rect x="300" y="330" width="30" height="30" fill="#00BCD4" />
                    <rect x="330" y="330" width="30" height="30" fill="#00BCD4" />
                    <rect x="360" y="330" width="30" height="30" fill="#000000" />
                    <rect x="30" y="360" width="30" height="30" fill="#000000" />
                    <rect x="60" y="360" width="30" height="30" fill="#00BCD4" />
                    <rect x="90" y="360" width="30" height="30" fill="#80DEEA" />
                    <rect x="120" y="360" width="30" height="30" fill="#80DEEA" />
                    <rect x="150" y="360" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="360" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="360" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="360" width="30" height="30" fill="#80DEEA" />
                    <rect x="270" y="360" width="30" height="30" fill="#80DEEA" />
                    <rect x="300" y="360" width="30" height="30" fill="#00BCD4" />
                    <rect x="330" y="360" width="30" height="30" fill="#000000" />
                    <rect x="30" y="390" width="30" height="30" fill="#000000" />
                    <rect x="60" y="390" width="30" height="30" fill="#00BCD4" />
                    <rect x="90" y="390" width="30" height="30" fill="#00BCD4" />
                    <rect x="120" y="390" width="30" height="30" fill="#80DEEA" />
                    <rect x="150" y="390" width="30" height="30" fill="#80DEEA" />
                    <rect x="180" y="390" width="30" height="30" fill="#80DEEA" />
                    <rect x="210" y="390" width="30" height="30" fill="#80DEEA" />
                    <rect x="240" y="390" width="30" height="30" fill="#80DEEA" />
                    <rect x="270" y="390" width="30" height="30" fill="#00BCD4" />
                    <rect x="300" y="390" width="30" height="30" fill="#00BCD4" />
                    <rect x="330" y="390" width="30" height="30" fill="#000000" />
                    <rect x="60" y="420" width="30" height="30" fill="#000000" />
                    <rect x="90" y="420" width="30" height="30" fill="#000000" />
                    <rect x="120" y="420" width="30" height="30" fill="#26C6DA" />
                    <rect x="150" y="420" width="30" height="30" fill="#26C6DA" />
                    <rect x="180" y="420" width="30" height="30" fill="#26C6DA" />
                    <rect x="210" y="420" width="30" height="30" fill="#26C6DA" />
                    <rect x="240" y="420" width="30" height="30" fill="#26C6DA" />
                    <rect x="270" y="420" width="30" height="30" fill="#000000" />
                    <rect x="300" y="420" width="30" height="30" fill="#000000" />
                    <rect x="120" y="450" width="30" height="30" fill="#000000" />
                    <rect x="150" y="450" width="30" height="30" fill="#000000" />
                    <rect x="180" y="450" width="30" height="30" fill="#000000" />
                    <rect x="210" y="450" width="30" height="30" fill="#000000" />
                    <rect x="240" y="450" width="30" height="30" fill="#000000" />
                </g>
            </svg>
            `
        ];

        const container = document.createElement("div");
        container.innerHTML = svgs[Math.floor(Math.random() * svgs.length)];
        // container.innerHTML = svgs[0];
        const svgElement = container.firstElementChild;
        svgElement.classList.add("falling-object");
        return svgElement;
    }

    // コライダーを作成
    createCollider() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add("collider");
        svg.innerHTML = `<rect x="50%" y="50%" width="5px" height="5px" fill="none"></rect>`;
        svg.style.position = "absolute"; // 画像と同じ位置で配置
        return svg;
    }

    // display 属性の反転
    toggleDisplayExplosion() {
        const svgElement = this.container.querySelector('.falling-object');
        const explosionGroup = svgElement.querySelector('#explosion');
        const mainGroup = svgElement.querySelector('#main');

        if (explosionGroup && mainGroup) {
            const explosionDisplay = getComputedStyle(explosionGroup).display;
            const mainDisplay = getComputedStyle(mainGroup).display;

            explosionGroup.style.display = explosionDisplay === 'none' ? 'block' : 'none';
            mainGroup.style.display = mainDisplay === 'none' ? 'block' : 'none';
        } else {
            console.error('Required <g> elements not found in SVG.');
        }
    }

    // display 属性の反転
    toggleDisplayGround() {
        const svgElement = this.container.querySelector('.falling-object');
        const groundGroup = svgElement.querySelector('#under');
        const mainGroup = svgElement.querySelector('#main');

        if (groundGroup && mainGroup) {
            const groundDisplay = getComputedStyle(groundGroup).display;
            const mainDisplay = getComputedStyle(mainGroup).display;

            groundGroup.style.display = groundDisplay === 'none' ? 'block' : 'none';
            mainGroup.style.display = mainDisplay === 'none' ? 'block' : 'none';
        } else {
            console.error('Required <g> elements not found in SVG.');
        }
    }

    // アニメーションを停止して、現在位置に留める
    pauseAnimation() {
        // アニメーションをポーズ
        this.container.style.animationPlayState = "paused";
        // 現在の位置でとどめる
        const currentTop = this.container.getBoundingClientRect().top;
        this.container.style.top = `${currentTop}px`;

        // フェードアウトアニメーション開始
        this.container.style.opacity = 0;
    }
}