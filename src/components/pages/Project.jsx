import { parse, v4 as uuidv4 } from  'uuid'

import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [ShowProjectForm, setShowProjectForm] = useState(false)
    const [ShowServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [services, setServices] = useState([])
    
    useEffect(() => {
        const timeout = setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 3000)
      
        return () => clearTimeout(timeout)
      }, [message])
    

    useEffect(()=> {
      setTimeout(()=> {
        fetch(`http://localhost:5000/projects/${id}`, {
      
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
      }).then((resp) => resp.json()) 
      .then((data) => {
        setProject(data)
        setServices(data.services)
      })
      .catch(err => console.log(err))  
      },1400)
    }, [id])

    function editPost(project) {
        // budget validation
        if (project.budget < project.cost) {
          setMessage('O Orçamento não pode ser menor que o custo do projeto!')
          setType('Error')
          return false
        }
    
        fetch(`http://localhost:5000/projects/${project.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            setShowProjectForm(!ShowProjectForm)
            setMessage('Projeto atualizado!')
            setType('Success')
          })
      }

    function createService(project) {

        //last service
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
       
        //maximum value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado. Verifique o valor do serviço!')
            setType('Error')
            project.services.pop()
            return false }

        // add service cost to project cost total
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data.services)
        setShowServiceForm(false)
        setMessage('Serviço adicionado!')
        setType('Success')
    
      })
      .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!ShowProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!ShowServiceForm)
    }

    function removeService(id, cost) {

        const servicesUpdated = project.services.filter((service) => service.id !== id)

        const projectUpdated = project
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso!')
        setType('Success')
    
      })
      .catch(err => console.log(err))
    }

    

    return (
        <> 
            {project && project.name ? (
                <div className={styles.ProjectDetails}>
                    <Container customClass="Column">
                        {message && <Message type={type} msg={message}/> }
                        <div className={styles.DetailsContainer}>
                            <h1>Projecto: {project.name}</h1>
                            <button className={styles.Btn} onClick={toggleProjectForm}>
                                {!ShowProjectForm ? 'Editar Projecto' : 'Fechar'}
                            </button>
                            {!ShowProjectForm ? (
                                <div className={styles.ProjectInfo}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de orçamento:</span> R$ {project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span>R$ {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.ProjectInfo}>
                                    <ProjectForm BtnText="Concluir Edição" projectData={project} 
                                    handleSubmit={editPost}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.ServiceFormContainer}>
                             <h2>Adicione um serviço:</h2>       
                             <button className={styles.Btn} onClick={toggleServiceForm}>
                                {!ShowServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            <div className={styles.ProjectInfo}>
                                {ShowServiceForm && (<ServiceForm
                                    handleSubmit={createService}
                                    btnText="Adicionar Serviço"
                                    projectData={project}
                                />)}
                            </div>
                        </div>
                        <h2 className={styles.H2}>Serviços:</h2>
                        <Container customClass="Start">
                            {services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService}
                                />
                            ))
                            
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados!</p>}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading/>
            )}
       </>
    )   
}

export default Project