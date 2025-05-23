import styles from './Buttons.module.css'

const ButtonsContainer = ({ onButtonClick }) => {
    const buttonNames = [
        'C','1','2','+','3','4','-','5','6','*','7','8','/','=','9','0','.'
    ]
  return (
    <div className={styles.buttonsContainer}>
        {buttonNames.map((buttonName)=>(
            <button onClick={()=>onButtonClick(buttonName)}>{buttonName}</button>
        ))}
      </div>
  )
}

export default ButtonsContainer;