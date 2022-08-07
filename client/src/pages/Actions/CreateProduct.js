import React, { useState } from "react";
import axios from "axios";

import { storage } from "../../firebase/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function CreateProduct() {
  const initData = {
    title: "",
    desc: "",
    price: "",
  };
  const [dataForm, setDataForm] = useState(initData);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [progress, setProgrss] = useState(false);

  const handleValues = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };
  const postData = async function (imgurl, imgName) {
    if (!imgurl) return;
    const postProduct = await axios
      .post("http://localhost:5000/products", {
        title: dataForm.title,
        desc: dataForm.desc,
        price: dataForm.price,
        imgurl,
        imgName,
      })
      .then((res) => {
        if (res.status == 200) {
          setAlertSuccess(true);
          setTimeout(() => {
            setAlertSuccess(false);
          }, 2000);
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    if (!file) return;
    const storageRef = ref(storage, `/Products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgrss(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          postData(url, file.name);
          setProgrss(false);
        });
      }
    );
  };

  return (
    <>
      {progress == false ? (
        ""
      ) : (
        <div
          className="circleProgress text-center"
          style={{
            "background-image": `conic-gradient( #198754 ${progress}%,#fff 0deg)`,
          }}
        >
          {progress == false ? "" : `${progress}%`}
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e)} className="w-50 p-5 m-auto">
        <div className={`alert ${alertSuccess ? "alert-success" : ""}`}>
          {alertSuccess ? "created successfully" : ""}
        </div>
        <div className="mb-3">
          <label className="form-labal">upload image</label>
          <input type={"file"} accept="image/*" />
        </div>
        <div className="mb-3">
          <label className="form-labal">Name Of Product</label>
          <input
            className="form-control"
            type={"text"}
            placeholder={"enter the product"}
            name="title"
            value={dataForm.title}
            onChange={(e) => handleValues(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-lable">Enter Description</label>
          <textarea
            className="form-control"
            name="desc"
            value={dataForm.desc}
            onChange={(e) => handleValues(e)}
          ></textarea>
        </div>

        <div className="my-3">
          <label className="form-label">Enter price</label>
          <input
            className="form-control"
            type={"number"}
            placeholder={"enter prise"}
            name="price"
            value={dataForm.price}
            onChange={(e) => handleValues(e)}
          />
        </div>

        <button type="submit" className="btn btn-outline-success">
          Create
        </button>
      </form>
    </>
  );
}

export default CreateProduct;
