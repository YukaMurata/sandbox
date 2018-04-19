import SwipeContent from './modules/SwipeContent';
import ModalAnimation from './modules/ModalAnimation';
import Slider from './modules/Slider';

const swipeContent = new SwipeContent();
new ModalAnimation();
const slider = new Slider();

swipeContent.on('openModal', ()=> {
  // slider.init();
  // slider.addEvent();
});
