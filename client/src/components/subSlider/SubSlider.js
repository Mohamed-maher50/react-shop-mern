import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { useContext } from "react";
import { Navigation } from "swiper";
import ProductsContext from "../../context/ProductsContext";
import "./SubSlider.css";
import "swiper/css/navigation";
import "swiper/css";
function SubSlider() {
  const Products = useContext(ProductsContext);

  return (
    <Swiper
      id="subSwiper"
      slidesPerView={4}
      modules={[Navigation]}
      navigation={true}
      spaceBetween={20}
    >
      {Products.map((item) => {
        return (
          <SwiperSlide className="subSwiper-sub" key={item.__id}>
            <div className="card w-100" style={{ width: "18rem" }}>
              <img
                src={item.imgurl}
                className="card-img-top"
                style={{ height: "250px" }}
                alt={item.desc}
              />
              <div className="card-body text-start w-100">
                <h5 className="card-title w-75 text-nowrap d-block m-0 overflow-hidden">
                  {item.title}
                </h5>

                <span className=" btn ms-auto text-bg-dark d-inline-block">
                  $<span className="disabled"> {item.price}</span>
                </span>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SubSlider;
