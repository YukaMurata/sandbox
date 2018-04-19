import $ from 'jquery';
import 'slick-carousel';

export default class Slider {
  constructor() {
    this.$slideList = $('.slide');
  }

  init() {
    this.$slideList.not('.slick-initialized').slick({
      dots: false,
      centerMode: true,
      centerPadding: '10%',
      rows: 0
    });
    console.log('slick');
  }

  addEvent() {
    this.$slideList.slick('setPosition');
  }
}
