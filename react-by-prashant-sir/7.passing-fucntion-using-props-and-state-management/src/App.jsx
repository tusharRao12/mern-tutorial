import { useState } from "react";
import Container from "./components/Container";
import ErrorMessage from "./components/ErrorMessage";
import FoodInput from "./components/FoodInput";
import FoodItems from "./components/FoodItems";

function App() {
  let [textToShow, setTextState] = useState();

  let [foodItems, setFoodItems] = useState(["Apple", "Salad", "Milk", "Dal"])

  const onKeyDown = (event) => {
    if(event.key === 'Enter'){
      let newFoodItem = event.target.value;
      event.target.value = "";
      let newItems = [...foodItems, newFoodItem];
      setFoodItems(newItems);
    };
  }
  // const handleOnChange = (event) => {
  //   setTextState(event.target.value);
  // }
  return (
    <>
      <Container>
        <h1 className="food-heading">Healthy Food</h1>
        <FoodInput handleKeyDown={onKeyDown} />
        <ErrorMessage items={foodItems} />
        {/* <p>{textToShow}</p> */}
        <FoodItems items={foodItems} />
      </Container>
      <Container>
        <p>Above are the list of healthy foods</p>
      </Container>
    </>
  );
}

export default App;
