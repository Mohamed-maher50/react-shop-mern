import React, { useContext, useState } from "react";
import { storage } from "../../firebase/Firebase";
import { deleteObject, ref } from "firebase/storage";
import ProductsContext from "../../context/ProductsContext";
import axios from "axios";
function DeleteProduct() {
  const products = useContext(ProductsContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const filter = (e) => {
    const findProducts = products.filter((product) => {
      return product.title
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase());
    });

    setFilterProducts(findProducts);
    console.log(filterProducts);
  };
  const Delete = async (item) => {
    const desertRef = ref(storage, `/Products/${item.imgName}`);
    const { _id } = item;
    console.log(_id);
    await axios
      .delete("http://localhost:5000/products", {
        withCredentials: true,

        data: { id: item._id },
      })
      .then((res) => {
        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
          });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div>
        <label className="form-label mt-5 fs-3">Search</label>
        <input
          className="m-auto d-block  form-control"
          placeholder="Search.."
          type={"text"}
          onChange={(e) => {
            filter(e);
          }}
        />
      </div>

      <div className="row d-flex p-5">
        {filterProducts.map((item, index) => {
          return (
            <div
              className="card mb-3 mx-3 p-1"
              style={{ width: "18rem" }}
              key={item._id}
            >
              <img
                src={item.imgurl}
                className="card-img-top"
                alt={item.desc}
                height="200px"
              />
              <div className="card-body">
                <h5 className="card-title m-0 text-uppercase">{item.title}</h5>
                <p className="card-text my-2">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => Delete(item)}
                >
                  Delete
                </button>
                <span className=" ms-5  btn text-bg-dark">
                  $<span className="disabled"> {item.price}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeleteProduct;
