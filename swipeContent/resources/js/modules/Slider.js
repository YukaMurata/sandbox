import $ from 'jquery';
import 'slick-carousel';

export default class Slider {
  constructor() {
    this.$slideList = $('.slide');
  }

  init() {
    this.$slideList.slick({
      dots: false,
      centerMode: true,
      centerPadding: '10%',
      rows: 0
    });
    this.$slideList.css(height, '432px');
    console.log('slick');
  }

  addEvent() {
    this.$slideList.slick('setPosition');
  }
}
