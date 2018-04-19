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
  }

  addEvent() {
    this.$slideList.slick('setPosition');
  }
}
