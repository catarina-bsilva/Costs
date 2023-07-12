import styles from './Projects.module.css'
import { useLocation } from "react-router-dom"
import Message from "../layout/Message"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'

function Projects() {

    const [projects, setProjects] = useState([])
    const [RemoveLoading, setRemoveLoading] = useState(false)
    const [ProjectMessage, setProjectMessage] = useState(null)
    const [type, setType] = useState()

    const location = useLocation()
    let Mensagem = ''
    if(location.state) {
        Mensagem = location.state.Mensagem
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
          setProjectMessage(null)
          setType(null)
        }, 3000)
      
        return () => clearTimeout(timeout)
      }, [ProjectMessage])
    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
        
                }).then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setProjects(data)  
                    setRemoveLoading(true)
                })
                .catch(err => console.log(err))
        }, 400)
    },[])

    function RemoveProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(data =>{
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projecto removido com sucesso!')
            setType('Success')
        }) 
        .catch(err => console.log(err))

    }

    return (
        <div className={styles.ProjectContainer}>
            <div className={styles.TitleContainer}>
                <h1>Meus Projectos</h1>
                <LinkButton to="/NewProject" text="Criar Projecto" />
            </div>
            {Mensagem && <Message type={"Success"} msg={Mensagem} />}
            {ProjectMessage && <Message type="Success" msg={ProjectMessage} />}
            <Container customClass="Start">
               {projects.length > 0 && 
               projects.map((project) =>(
                <ProjectCard 
                name={project.name}
                id={project.id}
                budget={project.budget}
                category={project.category.name}
                key={project.id}
                handleRemove={RemoveProject}
                 />
               ))} 
               {!RemoveLoading && <Loading/>}
               {RemoveLoading && projects.length === 0 && (
                <p>Não há projectos cadastrados!</p>
               )}
            </Container>
        </div>
    )
}

export default Projects