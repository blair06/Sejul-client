import React, {ReactNode} from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Logo, Card ,RoundedCard } from '../../components';
import './scss/MainCommon.scss';
import {ISummary } from '../../api/interfaces/ISummary';
interface MainSliderProps {
    children?: ReactNode;
    className?: string;
    onClick?: Function;
    deviceType?:string;
    article: any;
    user: any;
    
}
const MainSlider = (props:MainSliderProps) => {
  const { user, article, deviceType, className, onClick} = props;
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

      return(
        <>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className="main-slider"
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass="main-slider-item"
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 3,
                partialVisibilityGutter: 40
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 2,
                partialVisibilityGutter: 30
              }
            }}
            showDots={true}
            sliderClass="main-slider-track"
            slidesToSlide={1}
            swipeable
          >
        <Card>{article.title}{user}</Card>
        


      </Carousel>
      
        </>
      
    );
}

export default MainSlider;
