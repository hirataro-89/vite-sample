import '@splidejs/splide/css';
import Splide from '@splidejs/splide';


new Splide( '.splide', {
  type: 'fade',
  perMove: 1,
  pagination: false,
  arrows: false,
  drag: false,
  loop: true,
  autoplay: true,
} ).mount();