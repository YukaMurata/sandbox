import $ from 'jquery';
import SwipeContent from './modules/SwipeContent';
import ModalAnimation from './modules/ModalAnimation';
import Slider from './modules/Slider';

const swipeContent = new SwipeContent();
new ModalAnimation();

const slider = new Slider();

$(window).on('load', ()=> {

  swipeContent.on('openModal', ()=> {
    console.log('openModal');
    slider.init();
    slider.addEvent();
  });
});