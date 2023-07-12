import {Link} from 'react-router-dom'
import styles from './ProjectCard.module.css'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ProjectCard({id, name, budget, category, handleRemove}) {
    const Remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    
    return (
    <div className={styles.ProjectCard}>
        <h4>{name}</h4>
        <p>
            <span>Orçamento:</span> R$ {budget}
        </p>
        <p className={styles.CategoryText}>
            <span className={`${styles[category]}`} ></span> {category}
        </p>
        <div className={styles.ProjectCardActions}>
            <Link to={`/project/${id}`}>
                <BsPencil/> Editar
            </Link>
            <button onClick={Remove}>
                <BsFillTrashFill/> Excluir
            </button>
        </div>
    </div>
    )
}

export default ProjectCard