import $ from 'jquery';
import EventEmitter from 'events';
import velocity from 'velocity-animate';

export default class ModalAnimation extends EventEmitter {
  constructor() {
    super();

    this.$slideList = $('.slide__item');
    this.$animationModal = $('.animation__modal');
    this.$modalInner1 = $('.animation__modal__inner1');
    this.$modalInner1Caption = $('.animation__modal__inner1 .caption');
    this.$modalInner1Bottle = $('.animation__modal__inner1 .bottle');
    this.$modalInner1Text = $('.animation__modal__inner1 .text');
    this.$modalInner2 = $('.animation__modal__inner2');
    this.$cancel = $('.animation__modal__cancel');
    this.$overlay = $('.overlay');

    this.emitter = new EventEmitter();

    this.addEvent();
  }

  /**
   * イベントまとめたやつ
   */
  addEvent() {
    this.$slideList.on('click', ()=> {
      console.log('click');
      this.reset();
      this.openModal();
      this.animation$modalInner1();
    });
    this.$cancel.on('click', ()=> {
      this.closeModal();
    });
    this.emitter.on('animated$modalInner1', ()=> {
      this.hide$modalInner1();
      this.show$modalInner2();
    });
  }


  /**
   * モーダルを開く
   */
  openModal() {
    this.$overlay.show();
    this.$animationModal.show();
  }

  /**
   * モーダルを閉じる
   */
  closeModal() {
    this.$overlay.hide();
    this.$animationModal.hide();
  }

  /**
   * modalInner1を開く
   */
  show$modalInner1() {
    console.log('show$modalInner1');
    this.$modalInner1.css('display', 'block');
  }

  /**
   * modalInner1を閉じる
   */
  hide$modalInner1() {
    this.$modalInner1.hide();
    this.emit('hide$modalInner1');
  }

  /**
   * modalInner2を開く
   */
  show$modalInner2() {
    velocity(this.$modalInner2, {
      opacity: [1, 0],
      duration: 600,
    }, {
      delay: 600,
      display: 'block'
    });
  }

  /**
   * modalInner2を閉じる
   */
  hide$modalInner2() {
    this.$modalInner2.hide();
  }

  /**
   * modalInner1のアニメーション
   */
  animation$modalInner1() {
    velocity(this.$modalInner1Caption, {
      opacity: [1, 0],
      duration: 600
    });
    velocity(this.$modalInner1Bottle, {
      opacity: [1, 0],
      duration: 600
    }, {
      delay: 600
    });
    velocity(this.$modalInner1Text, {
      opacity: [1, 0],
      duration: 600
    }, {
      delay: 1200,
      complete: ()=> {
        console.log(3);
        this.emitter.emit('animated$modalInner1');
      }
    });
  }

  /**
   * modalInner1のアニメーションを解除
   */
  resetAnimation$modalInner1() {
    this.$modalInner1Caption.css('opacity', 0);
    this.$modalInner1Bottle.css('opacity', 0);
    this.$modalInner1Text.css('opacity', 0);
  }

  /**
   * 表示非表示のリセット
   */
  reset() {
    this.show$modalInner1();
    this.hide$modalInner2();
    this.resetAnimation$modalInner1();
  }

}