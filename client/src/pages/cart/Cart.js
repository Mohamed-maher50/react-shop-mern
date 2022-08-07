import React, { useContext } from "react";
import CardContext from "../../context/CardContext";

function Cart() {
  const { card } = useContext(CardContext);

  return (
    <div className="row d-flex justify-content-between md:mx-20 mt-20 ">
      <div className="col-md-7">
        <div className=" bg-white">
          {card.map((item) => {
            return (
              <div className="row p-3" key={item._id}>
                <div className="img col-2 h-100  overflow-hidden">
                  <img src={item.imgurl} width={"100%"} height={"100%"} />
                </div>
                <div className="col-md-6 fs-3 text-uppercase">
                  {item.title}
                  <span className=" w-25 d-block btn text-bg-dark">
                    ${item.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-md-4 bg-white pt-2">
        <div className="bg-primary fs-3 fw-bold text-white text-center">
          Total:
          {card.reduce((total, obj) => {
            return total + obj.qty * obj.price;
          }, 0)}
        </div>
      </div>
    </div>
  );
}

export default Cart;
