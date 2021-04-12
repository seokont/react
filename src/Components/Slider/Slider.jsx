import React from "react";
import "./styles.css";
import slide1 from '../../img/Slider1.png'
import slide2 from '../../img/Slider2.png'
import slide3 from '../../img/Slider3.png'
import slide4 from '../../img/Slider4.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

export default function SSlider() {


    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        variableWidth: true,
        centerMode: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]





    };

    return (
        <div style={{margin: '0 auto', height: '400px', width: '100%', overflow: 'hidden'}}>
            <Slider {...settings}>
                <div style={{width: 'auto'}}><img src={slide1}/></div>
                <div style={{width: 'auto'}}><img src={slide2}/></div>
                <div style={{width: 'auto'}}><img src={slide3}/></div>
                <div style={{width: 'auto'}}><img src={slide4}/></div>


            </Slider>
        </div>
    );
}
