import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";
import "./slider.css";
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
function Slider() {
  const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <>
      <Swiper
        effect={"Coverflow"}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          stopOnLastSlide: false,
        }}
        controller={{ control: controlledSwiper }}
        navigation={true}
        pagination={{
          paginationDisabledClass: true,
          clickable: true,
        }}
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide className="main">
          <img src={"/imgs/glary1.png"} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/imgs/blog_1.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src={"/imgs/portfolio_big_4.jpg"} />
        </SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </>
  );
}

export default Slider;
