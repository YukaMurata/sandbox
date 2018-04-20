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
    this.$slideList.slick('setPosition');
  }

  addEvent() {
    console.log(2222);
    this.$slideList.on('setPosition', (event, slick) => {
      console.log(event);
      console.log(slick);
    });
  }
}