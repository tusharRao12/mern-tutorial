import Container from "./components/Container";
import ErrorMessage from "./components/ErrorMessage";
import FoodItems from "./components/FoodItems";

function App() {
  let foodItems = ["Apple", "Salad", "Milk", "Dal"]; 
  return (
    <>
      <Container>
      <h1 className="food-heading">Healthy Food</h1>
      <ErrorMessage items={foodItems} />
      <FoodItems items={foodItems} />
    </Container>
    <Container>
        <p>Above are the list of healthy foods</p>
    </Container>
    </>
  );
}

export default App;
