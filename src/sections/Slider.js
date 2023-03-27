import {Carousel, Container} from 'react-bootstrap';
import Slider1 from '../assets/media/Sliders/01-slide-1.jpg'
import Slider2 from '../assets/media/Sliders/01-slide-3.jpg'
import Slider3 from '../assets/media/Sliders/Untitled_design_9.png'

export default function Slider() {
  return (
    <Carousel className="w-100">
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={Slider1}
          alt="First slide"
        />
        {/*<Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>*/}
      </Carousel.Item>

      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={Slider2}
          alt="Second slide"
        />
        {/*<Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>*/}
      </Carousel.Item>

      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={Slider3}
          alt="Third slide"
        />
       {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>*/}
      </Carousel.Item>
    </Carousel>
  );
}

