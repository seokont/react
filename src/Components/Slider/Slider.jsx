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
        centerMode: false,
        className: "slider variable-width",
        responsive: [

            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
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
        <div style={{margin: '0 auto',  width: '100%', overflow: 'hidden'}}>
            <Slider {...settings}>
               <img src={slide1}/>
                <img src={slide2}/>
                <img src={slide3}/>
                <img src={slide4}/>
            </Slider>
        </div>
    );
}
