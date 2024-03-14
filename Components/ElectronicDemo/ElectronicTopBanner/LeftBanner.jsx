import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from './Product';

class ProductSlider extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      slidesToShow: 4 // Default number of slides
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize(); // Call it initially
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const screenWidth = window.innerWidth;
    let slidesToShow = 4;

    if (screenWidth <= 576) {
      slidesToShow = 1; // Show 1 slide on mobile
    } else if (screenWidth <= 992) {
      slidesToShow = 2; // Show 2 slides on tablet
    }

    this.setState({ slidesToShow });
  }

  render() {
    const { bannerData } = this.props;
    const { slidesToShow } = this.state;

    const settings = {  
      dots: false,
      infinite: true,
      speed: 500,
      transition: 0.01,
      autoplay: true,
      onmouseover:false,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1630,
          settings: {
            slidesToShow: 4,
            
          },
        },
        {
          breakpoint: 1399,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '30px',
          },
        },
      ],           
    };


    return (
      <div >
        <Slider {...settings}>
          {bannerData?.map((slide, index) => (
            <div key={index} >
              <ProductCard imgSrc={slide}  />
            </div>
          ))}
          {/* <img src="smallBanner1.jpeg"/>
          <img src="smallBanner2.jpeg"/>
          <img src="smallBanner3.jpeg"/>
          <img src="smallBanner4.jpeg"/>
          <img src="smallBanner5.jpeg"/>
          <img src="smallBanner6.png"/>
          <img src="smallBanner7.jpg"/> */}
        </Slider>
      </div>
    );
  }
}

export default ProductSlider;


