import { SlideObject } from "../SlideObject/SlideObject.js";

export class SliderBarObject {
    constructor(_slider_container_id) {
        this.slider_container = document.getElementById(_slider_container_id);
        this.slide_contents = [];
        this.media_contents = [];
        this.current_slide_index = 0;
        this.interval = null;

        // main display に表示するメディア
        const media_elements = this.slider_container.querySelector('.main-display').querySelectorAll('.media');
        media_elements.forEach(_media => {
            this.media_contents.push({
                root: _media,
                children: Array.from(_media.querySelectorAll('*'))
            });
        });

        // スライダー上に表示するスライド
        const slides = this.slider_container.querySelector('.slider').querySelector('.display-point').querySelectorAll('.slide');
        slides.forEach((slide) => {
            const slideData = {
                root: slide,
                children: Array.from(slide.querySelectorAll('*'))
            };

            const _slide_object = new SlideObject(slideData);
            this.slide_contents.push({
                slide_object: _slide_object,
            });
        });

        // スライダーのボタン作成
        const slider_buttons = document.createElement('div');
        slider_buttons.classList.add('slider-buttons');

        const prev_button = document.createElement('button');
        prev_button.classList.add('prev-button');
        prev_button.textContent = '←';

        const next_button = document.createElement('button');
        next_button.classList.add('next-button');
        next_button.textContent = '→';

        // イベントリスナーを追加
        prev_button.addEventListener('click', () => {
            this.previousSlide();
        });
        next_button.addEventListener('click', () => {
            this.nextSlide();
        });

        slider_buttons.appendChild(prev_button);
        slider_buttons.appendChild(next_button);

        // スライダーのボタンを追加
        this.slider_container.appendChild(slider_buttons);
    }

    // コンテナの初期化
    initSlideContainer() {
        this.setSlide();
        this.startAutoSlide();

        // 'slider' にマウスがホバーしていない限り，三秒おきにスライドを切り替える
        this.slider_container.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });
        this.slider_container.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }

    // スライドの初期配置
    setSlide() {
        // スライドの初期配置
        this.nextSlide();
        // メインスライドの初期化
        this.media_contents[this.current_slide_index].root.classList.add('is-main');
    }

    // 自動スライドを開始
    startAutoSlide() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    // 自動スライドを停止
    stopAutoSlide() {
        clearInterval(this.interval);
    }

    // 右にスライド
    nextSlide() {
        const next_slide_index = (this.current_slide_index - 1 + this.slide_contents.length) % this.slide_contents.length;
        this.slide_contents[(this.current_slide_index - 2 + this.slide_contents.length) % this.slide_contents.length].slide_object.slideInToLeftPosition();
        this.slide_contents[next_slide_index].slide_object.slideAheadFromLeftToCenter();
        this.slide_contents[this.current_slide_index].slide_object.slideAheadFromCenterToRight();
        this.slide_contents[(this.current_slide_index + 1) % this.slide_contents.length].slide_object.slideOutGoAhead();
        this.toggleMainContent(this.current_slide_index, next_index);
        this.current_slide_index = next_slide_index;
    }

    // 左にスライド
    previousSlide() {
        const previous_slide_index = (this.current_slide_index + 1) % this.slide_contents.length;
        this.slide_contents[(this.current_slide_index + 2) % this.slide_contents.length].slide_object.slideInToRightPosition();
        this.slide_contents[previous_slide_index].slide_object.slideBackFromRightToCenter();
        this.slide_contents[this.current_slide_index].slide_object.slideBackFromCenterToLeft();
        this.slide_contents[(this.current_slide_index - 1 + this.slide_contents.length) % this.slide_contents.length].slide_object.slideOutGoBack();
        this.toggleMainContent(this.current_slide_index, previous_index);
        this.current_slide_index = previous_slide_index;
    }

    // メインコンテンツの表示を切り替える
    toggleMainContent(hidden_index, visible_index) {
        if (this.media_contents[hidden_index].root.classList.contains('is-main')) {
            this.media_contents[hidden_index].root.classList.remove('is-main');
        }
        if (!this.media_contents[visible_index].root.classList.contains('is-main')) {
            this.media_contents[visible_index].root.classList.add('is-main');
        }
    }
}