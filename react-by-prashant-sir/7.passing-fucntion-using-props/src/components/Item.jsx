import React from 'react'
import styles from "./Item.module.css";

const Item = ({ foodItem, handleBuyButton }) => {
  return (
    <li className={`${styles["kg-item"]} list-group-item `}>
      <span>{foodItem}</span>
      <button
        className="btn btn-sm btn-info"
        onClick={handleBuyButton}
      >Buy</button>
    </li>
  );
};

export default Item;