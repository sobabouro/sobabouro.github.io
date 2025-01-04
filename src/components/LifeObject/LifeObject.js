// LifeObject クラス
export class LifeObject {
    static idCounter = 0;

    constructor() {
        this.id = LifeObject.idCounter++;
        this.name = `life-${this.id}`;
        this.object = this.createLife(this.id);
    }

    createLife(idNum) {
        const svg = 
            `
            <svg id="life" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 360">
                <g id="left-side" display="block">
                    <rect x="60" y="30" width="30" height="30" fill="#E91E63" />
                    <rect x="90" y="30" width="30" height="30" fill="#E91E63" />
                    <rect x="120" y="30" width="30" height="30" fill="#E91E63" />
                    <rect x="30" y="60" width="30" height="30" fill="#E91E63" />
                    <rect x="60" y="60" width="30" height="30" fill="#E91E63" />
                    <rect x="90" y="60" width="30" height="30" fill="#E91E63" />
                    <rect x="120" y="60" width="30" height="30" fill="#E91E63" />
                    <rect x="150" y="60" width="30" height="30" fill="#E91E63" />
                    <rect x="30" y="90" width="30" height="30" fill="#E91E63" />
                    <rect x="60" y="90" width="30" height="30" fill="#E91E63" />
                    <rect x="90" y="90" width="30" height="30" fill="#E91E63" />
                    <rect x="120" y="90" width="30" height="30" fill="#E91E63" />
                    <rect x="150" y="90" width="30" height="30" fill="#E91E63" />
                    <rect x="180" y="90" width="30" height="30" fill="#E91E63" />
                    <rect x="30" y="120" width="30" height="30" fill="#E91E63" />
                    <rect x="60" y="120" width="30" height="30" fill="#E91E63" />
                    <rect x="90" y="120" width="30" height="30" fill="#E91E63" />
                    <rect x="120" y="120" width="30" height="30" fill="#E91E63" />
                    <rect x="150" y="120" width="30" height="30" fill="#E91E63" />
                    <rect x="30" y="150" width="30" height="30" fill="#E91E63" />
                    <rect x="60" y="150" width="30" height="30" fill="#E91E63" />
                    <rect x="90" y="150" width="30" height="30" fill="#E91E63" />
                    <rect x="120" y="150" width="30" height="30" fill="#E91E63" />
                    <rect x="150" y="150" width="30" height="30" fill="#E91E63" />
                    <rect x="180" y="150" width="30" height="30" fill="#E91E63" />
                    <rect x="60" y="180" width="30" height="30" fill="#E91E63" />
                    <rect x="90" y="180" width="30" height="30" fill="#E91E63" />
                    <rect x="120" y="180" width="30" height="30" fill="#E91E63" />
                    <rect x="150" y="180" width="30" height="30" fill="#E91E63" />
                    <rect x="90" y="210" width="30" height="30" fill="#E91E63" />
                    <rect x="120" y="210" width="30" height="30" fill="#E91E63" />
                    <rect x="150" y="210" width="30" height="30" fill="#E91E63" />
                    <rect x="180" y="210" width="30" height="30" fill="#E91E63" />
                    <rect x="120" y="240" width="30" height="30" fill="#E91E63" />
                    <rect x="150" y="240" width="30" height="30" fill="#E91E63" />
                    <rect x="150" y="270" width="30" height="30" fill="#E91E63" />
                    <rect x="180" y="270" width="30" height="30" fill="#E91E63" />
                </g>
                <g id="right-side" display="block">
                    <rect x="270" y="30" width="30" height="30" fill="#E91E63" />
                    <rect x="300" y="30" width="30" height="30" fill="#E91E63" />
                    <rect x="330" y="30" width="30" height="30" fill="#E91E63" />
                    <rect x="240" y="60" width="30" height="30" fill="#E91E63" />
                    <rect x="270" y="60" width="30" height="30" fill="#E91E63" />
                    <rect x="300" y="60" width="30" height="30" fill="#E91E63" />
                    <rect x="330" y="60" width="30" height="30" fill="#E91E63" />
                    <rect x="360" y="60" width="30" height="30" fill="#E91E63" />
                    <rect x="240" y="90" width="30" height="30" fill="#E91E63" />
                    <rect x="270" y="90" width="30" height="30" fill="#E91E63" />
                    <rect x="300" y="90" width="30" height="30" fill="#E91E63" />
                    <rect x="330" y="90" width="30" height="30" fill="#E91E63" />
                    <rect x="360" y="90" width="30" height="30" fill="#E91E63" />
                    <rect x="210" y="120" width="30" height="30" fill="#E91E63" />
                    <rect x="240" y="120" width="30" height="30" fill="#E91E63" />
                    <rect x="270" y="120" width="30" height="30" fill="#E91E63" />
                    <rect x="300" y="120" width="30" height="30" fill="#E91E63" />
                    <rect x="330" y="120" width="30" height="30" fill="#E91E63" />
                    <rect x="360" y="120" width="30" height="30" fill="#E91E63" />
                    <rect x="240" y="150" width="30" height="30" fill="#E91E63" />
                    <rect x="270" y="150" width="30" height="30" fill="#E91E63" />
                    <rect x="300" y="150" width="30" height="30" fill="#E91E63" />
                    <rect x="330" y="150" width="30" height="30" fill="#E91E63" />
                    <rect x="360" y="150" width="30" height="30" fill="#E91E63" />
                    <rect x="210" y="180" width="30" height="30" fill="#E91E63" />
                    <rect x="240" y="180" width="30" height="30" fill="#E91E63" />
                    <rect x="270" y="180" width="30" height="30" fill="#E91E63" />
                    <rect x="300" y="180" width="30" height="30" fill="#E91E63" />
                    <rect x="330" y="180" width="30" height="30" fill="#E91E63" />
                    <rect x="240" y="210" width="30" height="30" fill="#E91E63" />
                    <rect x="270" y="210" width="30" height="30" fill="#E91E63" />
                    <rect x="300" y="210" width="30" height="30" fill="#E91E63" />
                    <rect x="210" y="240" width="30" height="30" fill="#E91E63" />
                    <rect x="240" y="240" width="30" height="30" fill="#E91E63" />
                    <rect x="270" y="240" width="30" height="30" fill="#E91E63" />
                    <rect x="240" y="270" width="30" height="30" fill="#E91E63" />
                    <rect x="210" y="300" width="30" height="30" fill="#E91E63" />
                </g>
                <g id="flame">
                    <rect x="60" y="0" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="0" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="0" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="0" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="0" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="0" width="30" height="30" fill="#FFFFFF" />
                    <rect x="30" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="30" width="30" height="30" fill="#FFFFFF" />
                    <rect x="0" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="60" width="30" height="30" fill="#FFFFFF" />
                    <rect x="0" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="90" width="30" height="30" fill="#FFFFFF" />
                    <rect x="0" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="120" width="30" height="30" fill="#FFFFFF" />
                    <rect x="0" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="390" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="30" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="360" y="180" width="30" height="30" fill="#FFFFFF" />
                    <rect x="60" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="330" y="210" width="30" height="30" fill="#FFFFFF" />
                    <rect x="90" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="300" y="240" width="30" height="30" fill="#FFFFFF" />
                    <rect x="120" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="270" y="270" width="30" height="30" fill="#FFFFFF" />
                    <rect x="150" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="240" y="300" width="30" height="30" fill="#FFFFFF" />
                    <rect x="180" y="330" width="30" height="30" fill="#FFFFFF" />
                    <rect x="210" y="330" width="30" height="30" fill="#FFFFFF" />
                </g>
            </svg>
            `
        ;

        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = svg.trim();
        const svgElement = tempContainer.firstElementChild;
        svgElement.id = `life-${idNum}`;
        svgElement.classList.add("life");
        return svgElement;
    }

    // ライフを減らす
    decreaseLife() {
        const leftGroup = this.object.querySelector('#left-side');
        const rightGroup = this.object.querySelector('#right-side');
        const leftDisplay = getComputedStyle(leftGroup).display;
        const rightDisplay = getComputedStyle(rightGroup).display;

        if (rightDisplay === 'block' && leftDisplay === 'block') {
            this.object.classList.add('is-damaged');
            setTimeout(() => {
                this.object.classList.remove('is-damaged');
            }, 600);
            rightGroup.style.display = 'none';
        }
        else if (rightDisplay === 'none' && leftDisplay === 'block'){
            this.object.classList.add('is-damaged');
            setTimeout(() => {
                this.object.classList.remove('is-damaged');
            }, 600);
            leftGroup.style.display = 'none';
        }
        else {
            // 何もしない
        }
    }

    // ライフを増やす
    increaseLife() {
        const leftGroup = this.object.querySelector('#left-side');
        const rightGroup = this.object.querySelector('#right-side');
        const leftDisplay = getComputedStyle(leftGroup).display;
        const rightDisplay = getComputedStyle(rightGroup).display;

        if (rightDisplay === 'none' && leftDisplay === 'none') {
            leftGroup.style.display = 'block';
            this.object.classList.add('is-healed');
            setTimeout(() => {
                this.object.classList.remove('is-healed');
            }, 600);
        }
        else if (rightDisplay === 'none' && leftDisplay === 'block') {
            rightGroup.style.display = 'block';
            this.object.classList.add('is-healed');
            setTimeout(() => {
                this.object.classList.remove('is-healed');
            }, 600);
        }
        else {
            // 何もしない
        }
    }

    // display 属性のリセット
    resetLife() {
        const leftGroup = this.object.querySelector('#left-side');
        const rightGroup = this.object.querySelector('#right-side');
        leftGroup.style.display = 'block';
        rightGroup.style.display = 'block';
    }

    initID() {
        LifeObject.idCounter = 0;
    }
}