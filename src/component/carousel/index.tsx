import React from 'react';
import Slider, {Settings} from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.less';

export interface CarouselComponentProps {
    images: string[];
    height?: number;
}

/**
 * 轮播图组件
 * @param images    图片地址数组
 * @param height    图片高度
 * @constructor Carousel
 */
const Carousel: React.FC<CarouselComponentProps> = ({images, height = 180}) => {
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                }
            }
        ]
    };

    return (
        <Slider {...settings} className="carousel">
            {images.map((image, index) => (
                <div key={index} className="carousel-item">
                    <img className="carousel-image" src={image} alt={`Slide ${index}`}
                         style={{width: '100%', height: `${height}px`}}/>
                </div>
            ))}
        </Slider>
    );
};

export default Carousel;