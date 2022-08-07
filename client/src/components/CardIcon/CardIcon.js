import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CardContext from "../../context/CardContext";

function CardIcon() {
  const { card } = useContext(CardContext);
  console.log(card);
  return (
    <li className="nav-item fs-6">
      <Link to={"/cart"} className="nab-link position-relative">
        <i class="fa-solid fa-cart-arrow-down pt-2"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {card.length}
        </span>
      </Link>
    </li>
  );
}

export default CardIcon;
