// SlideObject クラス
export class SlideObject {
    static percent = 100;

    constructor(_slide_element) {
        this.slide = _slide_element.root;
    }

    slideAheadFromLeftToCenter() {
        setTimeout(() => {
            if (!this.slide.classList.contains('is-slideActive') && !this.slide.classList.contains('is-slideVisible')) {
                this.slide.classList.add('is-slideActive', 'is-slideVisible');
            }
            this.slide.classList.add('center');
            this.slide.style.setProperty('--scale', '1');
            this.slide.style.setProperty('--translate-x', '0%');
        }, 500);
    }

    slideBackFromRightToCenter() {
        setTimeout(() => {
            if (!this.slide.classList.contains('is-slideActive') && !this.slide.classList.contains('is-slideVisible')) {
                this.slide.classList.add('is-slideActive', 'is-slideVisible');
            }
            this.slide.classList.add('center');
            this.slide.style.setProperty('--scale', '1');
            this.slide.style.setProperty('--translate-x', '0%');
        }, 500);
    }

    slideAheadFromCenterToRight() {
        setTimeout(() => {
            if (this.slide.classList.contains('center')) {
                this.slide.classList.remove('center');
            }
            if (!this.slide.classList.contains('is-slideActive') && !this.slide.classList.contains('is-slideVisible')) {
                this.slide.classList.add('is-slideActive', 'is-slideVisible');
            }
            this.slide.style.setProperty('--scale', '0.8');
            this.slide.style.setProperty('--translate-x', `${1 * SlideObject.percent}%`);
        }, 500);
    }

    slideBackFromCenterToLeft() {
        setTimeout(() => {
            if (this.slide.classList.contains('center')) {
                this.slide.classList.remove('center');
            }
            if (!this.slide.classList.contains('is-slideActive') && !this.slide.classList.contains('is-slideVisible')) {
                this.slide.classList.add('is-slideActive', 'is-slideVisible');
            }
            this.slide.style.setProperty('--scale', '0.8');
            this.slide.style.setProperty('--translate-x', `${-1 * SlideObject.percent}%`);
        }, 500);
    }

    slideInToLeftPosition() {
        this.slide.style.setProperty('--scale', '0.5');
        this.slide.style.setProperty('--translate-x', `${-2.5 * SlideObject.percent}%`);
        setTimeout(() => {
            this.slide.classList.add('is-slideActive', 'is-slideVisible');
            this.slide.style.setProperty('--scale', '0.8');
            this.slide.style.setProperty('--translate-x', `${-2 * SlideObject.percent}%`);
        }, 500);
    }

    slideInToRightPosition() {
        this.slide.style.setProperty('--scale', '0.5');
        this.slide.style.setProperty('--translate-x', `${2.5 * SlideObject.percent}%`);
        setTimeout(() => {
            this.slide.classList.add('is-slideActive', 'is-slideVisible');
            this.slide.style.setProperty('--scale', '0.8');
            this.slide.style.setProperty('--translate-x', `${2 * SlideObject.percent}%`);
        }, 500);
    }

    slideOutGoAhead() {
        this.slide.classList.remove('is-slideActive');
        this.slide.style.setProperty('--scale', '0.5');
        this.slide.style.setProperty('--translate-x', `${2.5 * SlideObject.percent}%`);
        setTimeout(() => {
            this.slide.classList.remove('is-slideVisible');
            this.slide.style.setProperty('--translate-x', '0%');
        }, 500);
    }

    slideOutGoBack() {
        this.slide.classList.remove('is-slideActive');
        this.slide.style.setProperty('--scale', '0.5');
        this.slide.style.setProperty('--translate-x', `${-2.5 * SlideObject.percent}%`);
        setTimeout(() => {
            this.slide.classList.remove('is-slideVisible');
            this.slide.style.setProperty('--translate-x', '0%');
        }, 500);
    }
}