import styles from './Loading.module.css'
import LoadingIcon from '../../img/loading.svg'

function Loading(){
    return(
        <div className={styles.LoaderContainer} >
           <img src={LoadingIcon} alt="Loading" className={styles.Loader}/> 
        </div>
    )
}

export default Loading