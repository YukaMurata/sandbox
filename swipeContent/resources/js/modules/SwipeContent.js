import $ from 'jquery';
import velocity from 'velocity-animate';
import EventEmitter from 'events';

export default class LineAnimation extends EventEmitter {
  constructor() {
    super();
    this.$window = $(window);
    this.$modal = $('.modal');
    this.$overlay = $('.overlay');
    this.document = $(document);

    this.windowHeight = this.$window.height();
    this.documentHeight = this.document.height();
    this.pageHeight = this.documentHeight - this.windowHeight;
    this.scroll = 0;
    this.touchStartY = 0;
    this.touchMoveY = 0;
    this.isShowModal = false;
    this.index = 0;
    this.lastY = 0;
    this.isReset = false;
    this.addEvent();
    this.setModalHeight();

  }

  /**
   * イベントまとめたもの
   */
  addEvent() {
    this.$window.on('scroll', ()=> {
      this.scroll = this.$window.scrollTop();
      if (this.scroll >= this.pageHeight) {
        console.log('いちばんした');
        this.swipeEvent();
      } else {
        // this.resetSwipeEvent();
      }
    });

    $('.arrow').on('click', () => {
      console.log('arrowClick');
      this.showVendingModal();
      this.swipeEvent();
    });
  }

  /**
   * スワイプイベント
   */
  swipeEvent() {
    console.log('swipeEvent');
    this.$window.on('touchstart', (event)=> {
      // event.preventDefault();
      this.touchStartY = event.originalEvent.touches[0].clientY;
    });


    this.$window.on('touchmove', (event)=> {
      // event.preventDefault();
      this.touchMoveY = event.originalEvent.touches[0].clientY;
      this.diff = this.touchStartY - this.touchMoveY;
    });

    this.$window.on('touchend', ()=> {
      // event.preventDefault();
      console.log(this.touchStartY);
      console.log(this.touchMoveY);

      if (this.lastY !== this.touchMoveY) {
        if (this.diff > 30) {
          if (this.touchStartY > this.touchMoveY) {
            console.log('した');
            this.showVendingModal();
          }
        }
        if (this.diff < -50) {
          if (this.touchStartY < this.touchMoveY) {
            this.hideVendingModal();
          }
        }
      } else {
      }
      this.lastY = this.touchMoveY;
    });
    this.isReset = false;
  }

  /**
   * スワイプイベントの解除
   */
  resetSwipeEvent() {
    if (!this.isReset) {
      console.log('resetEvent');
      this.$window.off('touchstart');
      this.$window.off('touchmove');
      this.$window.off('touchend');
      this.isReset = true;
    }
  }

  /**
   * モーダル開く
   */
  showVendingModal() {
    console.log('showVendingModal');
    if (this.index === 0) {
      console.log('first');
      this.emit('openModal');
    }
    if (!this.isShowModal) {
      velocity(this.$modal, {
        translateY: [0, 60],
        translateX: ['-50%', '-50%'],
        opacity: [1, 0]
      }, {
        display: 'block'
      });
      this.isShowModal = true;
      this.index++;
    }
    $('body,html').css({height: this.windowHeight, overflow: 'hidden'});
  }

  /**
   * モーダル閉じる
   */
  hideVendingModal() {
    if (this.isShowModal) {
      velocity(this.$modal, {
        translateY: [60, 0],
        translateX: ['-50%', '-50%'],
        opacity: [0, 1]
      }, {
        display: 'none'
      });
      $('body,html').css({height: 'auto', overflow: 'auto'});
      this.isShowModal = false;
    }
  }

  /**
   * モーダルの高さを設定
   */
  setModalHeight() {
    this.windowHeight = this.$window.height();
    this.$modal.css('height', this.windowHeight);
  }

}
