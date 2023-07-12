import {Link} from 'react-router-dom'
import Container from './Container'

import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'

function Navbar() {
    return (
        <nav className={styles.Navbar}>
            <Container>
                <Link to="/"><img src={logo} alt="costs"></img></Link>
                <ul className={styles.List}>
                    <li className={styles.Item}><Link to ="/">Home</Link></li>
                    <li className={styles.Item}><Link to ="/Projects">Projects</Link></li>
                    <li className={styles.Item}><Link to ="/Company">Company</Link></li>  
                    <li className={styles.Item}><Link to ="/Contact">Contact</Link></li>             
                </ul>
    
            </Container>
        </nav>
    )
}

export default Navbar