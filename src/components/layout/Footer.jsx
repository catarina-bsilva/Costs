import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer() {
    return (
<footer className={styles.Footer}>
    <ul className={styles.SocialList}>
        <li>
            <FaFacebook/>
        </li>
        <li>
            <FaInstagram/>
        </li>
        <li>
            <FaLinkedin/>
        </li>
    </ul>
    <p className={styles.CopyRight}><span>Costs</span> &copy; 2021</p>
</footer>
    )
}

export default Footer