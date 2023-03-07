import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Carousel = (props) => {
  const { setSearchTerm } = props;

  const [silderData, setSliderData] = useState([])

  useEffect(() => {
    fetch('https://g.tenor.com/v1/categories?key=LIVDSRZULELA')
    .then(res => res.json())
    .then(data => setSliderData(data.tags))
  }, [])

  const getSelectedItem = (value) => {
    setSearchTerm(value)
  }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        autoplay : true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return ( 
        <div className="slider">
            <Slider {...settings}>
            {silderData.map((item, i) => (
                <div className="card" key={i} onClick={() => getSelectedItem(item.searchterm)}>
                    <div className="card_top">
                        <img src= {item.image} alt ={item.searchterm || ""} />
                    </div>
                    <div className="card_bottom">
                        <h3>{item.searchterm}</h3>
                    </div>
                </div>
            ))}
            </Slider>
        </div>
    );
}
 
export default Carousel;