import $ from 'jquery';
import velocity from 'velocity-animate';

export default class LineAnimation {
  constructor() {
    this.$window = $(window);
    this.$modal = $('.modal');
    this.$overlay = $('.overlay');

    this.windowHeight = this.$window.height();
    this.documentHeight = $(document).height();
    this.pageHeight = this.documentHeight - this.windowHeight;
    this.scroll = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchMoveX = 0;
    this.touchMoveY = 0;
    this.isShowModal = false;

    this.addEvent();
  }

  addEvent() {
    this.$window.on('scroll', ()=> {
      this.scroll = this.$window.scrollTop();
      if (this.scroll >= this.pageHeight) {
        this.swipeEvent();
      }
    });
  }

  swipeEvent() {
    $(document).on('touchstart', (event)=> {
      event.preventDefault();
      this.touchStartX = event.touches[0].pageX;
      this.touchStartY = event.touches[0].pageY;
      console.log('start' + this.touchStartY);
    });


    $(document).on('touchmove', (event)=> {
      event.preventDefault();
      this.touchMoveY = event.changedTouches[0].pageY;
      console.log('move' + this.touchMoveY);
      // const diff = this.touchMoveY - this.touchStartY;

    });

    $(document).on('touchend', (event)=> {
      const moveDiff = this.touchMoveY - this.touchStartY;
      if (this.touchStartY > this.touchMoveY) {
        console.log('うえ');

        this.showVendingModal();
      } else if (this.touchStartY < this.touchMoveY) {
        console.log('した');
        this.hideVendingModal();
      }
    });
  }

  /**
   * モーダル開く
   */
  showVendingModal() {
    if (!this.isShowModal) {
      velocity($('.modal'), {
        translateY: [0, 60],
        translateX: ['-50%', '-50%'],
        opacity: [1, 0]
      }, {
        display: 'block',
        complete: ()=> {
          this.isShowModal = true;
        }
      });
      $('body,html').css({height: 'auto', overflow: 'hidden'});
    }
  }

  /**
   * モーダル閉じる
   */
  hideVendingModal() {
    if (this.isShowModal) {
      velocity($('.modal'), {
        translateY: [60, 0],
        translateX: ['-50%', '-50%'],
        opacity: [0, 1]
      }, {
        display: 'none',
        complete: ()=> {
          this.isShowModal = false;
          $('body,html').css({height: 'auto', overflow: 'auto'});
        }
      });
    }
  }

}
