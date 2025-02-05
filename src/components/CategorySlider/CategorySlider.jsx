import axios from 'axios';
import React, { useEffect, useState } from 'react'; // Only import React once
import Slider from 'react-slick';
import style from './CategorySlider.module.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2,
        initialSlide: 1
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


export default function CategorySlider() {
  const [categories, setCategories] = useState({})

  async function getCategories() {
    await axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((res) => {
      setCategories(res.data.data);

    }).catch((err) => {
      console.log(err);

    })
  }

  useEffect(() => {

    getCategories()

  }, [])


  return (
    <div className="my-8">
      <Slider {...settings}>
        {Array.isArray(categories) && categories.map((category, index) => (
          <div key={category._id}>
           
            {console.log(category)}
            <img src={category.image} className='w-full h-[400px]' alt={category.name} />
            <h4 className='mx-3 font-semibold'>{category.name}</h4> 

           
          </div>
        ))}
      </Slider>
    </div>
  );
  
}
