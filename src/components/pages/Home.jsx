import styles from './Home.module.css'

import Savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

function Home() {
    return(
        <section className={styles.HomeContainer}>
            <h1>Bem-Vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus Projectos agora mesmo!</p>
            <LinkButton to="/NewProject" text="Criar Projecto" />
            <img src={Savings} alt="Costs"/> 
        </section>
    

    )
}
export default Home