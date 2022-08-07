import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardContext from "../../context/CardContext";
import ProductsContext from "../../context/ProductsContext";

function CheckProduct() {
  const { id } = useParams();
  const { addToCard, card } = useContext(CardContext);
  const products = useContext(ProductsContext);
  const product = products.find((product) => {
    return product._id == id;
  });

  return (
    <>
      {product && (
        <div className="container">
          <div
            className=" d-flex mx-3 m-10 bg-white p-4 row justify-content-start"
            style={{ width: "40rem", height: "250px" }}
          >
            <img
              src={product.imgurl}
              alt={product.desc}
              className="col-md-6 h-100"
            />
            <div className="card-body col-md-3 p-0 m-0">
              <h5 className="card-title m-0 text-uppercase fw-bolder fs-2">
                {product.title}
              </h5>
              <p className="card-text my-2 py-4">
                Some quick example texdd to build on the card title and make up
                the bulk of the card's content.
              </p>

              <span className="mt-2 d-inline-block col-4  btn text-bg-dark">
                $<span className="disabled"> {product.price}</span>
              </span>
              <span className="mt-2 d-inline-block col-6 mx-1  btn btn-primary">
                <span className="disabled" onClick={() => addToCard(product)}>
                  {" "}
                  Add To Card
                </span>
              </span>
            </div>
          </div>
          <div>
            total:
            {card.reduce((total, Obj) => {
              return total + Obj.qty * Obj.price;
            }, 0)}
          </div>
        </div>
      )}
    </>
  );
}

export default CheckProduct;
