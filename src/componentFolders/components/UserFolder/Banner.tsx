import React from 'react'
import Slider from 'react-slick'
import { images,image } from '../imagesFolder/Images'

const Banner = () => {
  
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  return (
  <div className='col-12'>
    <div className='col-10 m-auto'>
      <Slider {...settings}>
        {images.map((item)=>{
          return (
            <img src={item} alt='' className='m-1 p-1'/>
          )
        })}
      </Slider>
    </div>
    <img className='col-12 p-2' src='https://assets.ajio.com/cms/AJIO/WEB/D-UHP-Urgency-72Hrs-LiveNow.jpg' alt=''/>
    <div className='col-10 m-auto'>
      <Slider {...settings}>
        {image.map((item)=>{
          return (
            <img src={item} alt='' className='m-1 p-1'/>
          )
        })}
      </Slider>
    </div>
    <img src='https://assets.ajio.com/cms/AJIO/WEB/D-UHP-Trendswithbenefits-Sectionheader.jpg' className='col-12' alt=''/>
  </div>
  )
}

export default Banner