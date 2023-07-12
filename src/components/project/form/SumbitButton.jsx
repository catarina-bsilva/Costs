import styles from './SumbitButton.module.css'

function SubmitButton({text}) {
    return (
        <div>
           <button className={styles.Btn}>{text}</button>
        </div>
    )

}

export default SubmitButton