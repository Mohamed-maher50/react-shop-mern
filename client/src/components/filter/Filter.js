import React from "react";

function Filter({ handleFilter }) {
  return (
    <div className="col-md-2">
      <h2 className="fs-2  border-4 border-primary px-2 fw-bold">Filter</h2>
      <select
        onChange={(e) => handleFilter(e)}
        className="w-100 mt-3 fs-5 text-uppercase"
        style={{ height: "40px", cursor: "pointer" }}
      >
        <option value={"all"}>all</option>
        <option value={"hight"}>hight</option>
        <option value={"low"}>low</option>
      </select>
    </div>
  );
}

export default Filter;
