import { LifeObject } from "../LifeObject/LifeObject.js";

// HealthObject クラス
export class HealthParameterObject {
    static lifeCounter = 0;
    constructor() {
        // アニメーション設定
        const heart = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--count-health-hearts"));

        this.lifeInstances = [];

        this.life = heart * 2;
        this.container = document.createElement("div");
        this.container.classList.add("health");
        this.container.style.position = "absolute";
        this.container.style.left = 0;

        // 残機を追加
        for (let i = heart; i > 0; i--) {
            let lifeObject = new LifeObject();
            lifeObject.resetLife();
            this.lifeInstances.push(lifeObject);
            this.container.appendChild(lifeObject.object);
        }
    }

    // ダメージを受けた時の処理
    decreaseHealth() {
        if (this.life <= 0) {
            return;
        }

        this.life--;
        const target = this.lifeInstances[Math.floor(this.life / 2)];

        target.decreaseLife();
        // 体力が0になった時に死亡アニメーションを再生
        if (this.life == 0) {
            if (!this.container.classList.contains('is-dead')) {
                this.container.classList.add('is-dead');
            }
        }
    }

    //体力を回復する
    increaseHealth() {
        if (this.life >= this.lifeInstances.length * 2) {
            // 体力が最大値に達している場合は回復アニメーションのみ再生
            const tmp = this.lifeInstances[this.lifeInstances.length - 1];
            tmp.increaseLife();
            return;
        }

        const target = this.lifeInstances[Math.floor(this.life / 2)];
        this.life++;

        target.increaseLife();
        // 念のため死亡フラグを折っておく
        if (this.container.classList.contains('is-dead')) {
            this.container.classList.remove('is-dead');
        }
    }

    //体力をリセットする
    resetHealth() {
        this.life = this.lifeInstances.length * 2;
        if (this.container.classList.contains('is-dead')) {
            this.container.classList.remove('is-dead');
        }
        this.lifeInstances.forEach((life) => {
            life.resetLife();
            life.initID();
        });
    }

    getLifeCounter() {
        return HealthParameterObject.lifeCounter;
    }

    getLifeObject(idNum) {
        return this.container.querySelector(`#life-${idNum}`);
    }
}