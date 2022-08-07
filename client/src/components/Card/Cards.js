import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Card.css";
import { Link } from "react-router-dom";
import Filter from "../filter/Filter";
function Cards() {
  const [product, SetProduct] = useState([]);
  const [filter, setFilter] = useState([]);
  const getProducts = async () => {
    const products = await axios.get("http://localhost:5000/products");
    SetProduct(products.data);
    setFilter(products.data);
  };
  const handleFilter = (value) => {
    switch (value.target.value) {
      case "all":
        setFilter(product);
        break;
      case "hight":
        const cloneHigth = product.sort((a, b) => b.price - a.price);
        console.log(cloneHigth);
        setFilter(cloneHigth);
        break;
      case "low":
        const clonelow = product.sort((a, b) => a.price - b.price);
        console.log(clonelow);
        setFilter([...clonelow]);
        break;
    }
  };
  useEffect(() => {
    getProducts();
    setFilter([...product]);
  }, []);
  const ReadyCards = () => {
    return (
      <div className="row">
        <div className="flex d-flex flex-wrap  col-md-10 ">
          {filter.map((item, index) => {
            return (
              <div className="card mb-3 mx-2 mx" style={{ width: "18rem" }}>
                <img
                  src={item.imgurl}
                  className="h-50 card-img-top"
                  alt={item.desc}
                />
                <div className="card-body">
                  <h5 className="card-title m-0 text-uppercase">
                    {item.title}
                  </h5>
                  <p className="card-text my-2">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>

                  <Link
                    to={`/checkProduct/${item._id}`}
                    className="btn d-flex w-75 btn-outline-primary"
                  >
                    check product
                  </Link>
                  <span className="mt-2 d-inline-block  btn text-bg-dark">
                    $<span className="disabled"> {item.price}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <Filter handleFilter={handleFilter} />
      </div>
    );
  };
  return (
    <div>
      {product.length == 0 ? (
        <div className="container position-relative min">
          <div className="looding">
            <span className="ProgressLoodin"></span>
          </div>
        </div>
      ) : (
        <ReadyCards />
      )}
    </div>
  );
}

export default Cards;
