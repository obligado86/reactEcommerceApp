import {Carousel, Container, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
import Slider1 from '../assets/media/Sliders/01-slide-1.jpg'
import Slider2 from '../assets/media/Sliders/01-slide-3.jpg'
import Slider3 from '../assets/media/Sliders/Untitled_design_9.png'

export default function Slider() {
  return (
    <Carousel className="w-100 mb-4">
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 banner-carosel"
          src={Slider1}
          alt="First slide"
        />
        <Carousel.Caption className="text-start slider mb-3">
          <span className="bg-light slider-tag my-4 pb-1">Free Shipping</span>
          <h3 className="mt-3">Shop More Save More!</h3>
          <p>Free Shipping min &#8369;1000 Order</p>
        </Carousel.Caption>
        <Button as={NavLink} to="/collection/allproducts" className="btn btn-warning px-4 body-text banner slider">Shop Now</Button>
      </Carousel.Item>

      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 banner-carosel"
          src={Slider2}
          alt="Second slide"
        />
        <Carousel.Caption className="text-start slider mb-3">
          <span className="bg-light slider-tag my-4 pb-1">New!</span>
          <h3 className="mt-3">Whats New?</h3>
          <p>Shop Smart Home gadgets</p>
        </Carousel.Caption>
        <Button as={NavLink} to="/collection/allproducts" className="btn btn-warning px-4 body-text banner slider">Shop Now</Button>
      </Carousel.Item>

      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 banner-carosel"
          src={Slider3}
          alt="Third slide"
        />
        <Carousel.Caption className="text-start slider mb-3">
          <span className="bg-light slider-tag my-4 pb-1">Best Deals!</span>
          <h3 className="mt-3">Lowest Price deals!</h3>
          <p>Shop Acccessories for your Gadgets</p>
        </Carousel.Caption>
        <Button as={NavLink} to="/collection/Accessories" className="btn btn-warning px-4 body-text banner slider">Shop Now</Button>
      </Carousel.Item>
    </Carousel>
  );
}

