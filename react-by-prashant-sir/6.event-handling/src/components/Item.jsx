import React from 'react'
import styles from "./Item.module.css";

const Item = ({ foodItem }) => {
  const handleBuyButtonClicked = () => {
    alert(`${foodItem} item being bought`)
  }
  return (
    <li className={`${styles["kg-item"]} list-group-item `}>
      <span>{foodItem}</span>
      <button
        className="btn btn-sm btn-info"
        onClick={handleBuyButtonClicked}
      >Buy</button>
    </li>
  );
};

export default Item;