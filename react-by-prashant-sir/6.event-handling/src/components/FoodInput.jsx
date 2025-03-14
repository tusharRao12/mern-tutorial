import styles from './FoodInput.module.css'

const FoodInput = () => {

    const handleOnChange = (event) => {
        console.log(event.target.value)
    }

    return (
        <input type="text" className={styles.foodInput} placeholder='Enter Food Item Here'
            onChange={handleOnChange}
        />
    )
}

export default FoodInput;