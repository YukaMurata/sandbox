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
  }

  addEvent() {
    this.$slideList.slick('setPosition');

  }
}