import $ from 'jquery';
import 'slick-carousel';

export default class Slider {
  constructor() {
    this.$slideList = $('.slide');
    console.log('slick');
  }

  init() {
    this.$slideList.not('.slick-initialized').slick({
      dots: false,
      centerMode: true,
      centerPadding: '10%',
      rows: 0
    });
  }

  addEvent() {
    this.$slideList.slick('setPosition');
  }
}
