import $ from 'jquery';
import 'slick-carousel';

export default class Slider {
  constructor() {
    this.$slideList = $('.slide');

  }

  init() {
    this.$slideList.slick({
      dots: false,
      rows: 0
    });
    this.$slideList.css('height', '432px');
    this.addEvent();
  }

  addEvent() {
    $('.modal__inner').on('click', ()=> {
      this.$slideList.slick('setPosition');
      console.log('slick');
    });

  }
}
