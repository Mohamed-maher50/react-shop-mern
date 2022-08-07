import { createContext, useState } from "react";
import React from "react";
const CardContext = createContext();

function CardContextProvider(props) {
  const [card, setCard] = useState([]);

  const addToCard = (item) => {
    const cloneCard = [...card];
    let indexItem = cloneCard.findIndex((ele) => ele._id == item._id);
    if (indexItem == -1) {
      setCard([...card, { ...item, qty: 1 }]);
    } else {
      cloneCard[indexItem].qty += 1;
      setCard(cloneCard);
    }
  };
  return (
    <CardContext.Provider value={{ card, addToCard }}>
      {props.children}
    </CardContext.Provider>
  );
}

export { CardContextProvider };
export default CardContext;
