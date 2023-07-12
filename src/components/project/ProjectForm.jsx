import { useEffect, useState } from 'react'
import styles from './ProjectForm.module.css'
import Input from './form/Input'
import Select from './form/Select'
import SubmitButton from './form/SumbitButton'


function ProjectForm({handleSubmit, BtnText, projectData}) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => resp.json())
      .then((data) => setCategories(data))
      .catch((err)=> console.log(err))
    },[])

    const submit = (e) => {
        e.preventDefault()
      //  console.log(project)
       handleSubmit(project)
    } 

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
        
    }

    function handleCategory(e){
        setProject({
            ...project, 
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
        },
    })
    }


    return (
        <form onSubmit={submit} className={styles.Form}>
            <Input 
            type="text" 
            text="Nome do Projecto" 
            name="name" 
            placeholder="Insira nome do Projecto "
            handleOnChange={handleChange}
            value={project.name ? project.name : ''} />

            <Input 
            type="number" 
            text="Orçamento do Projecto" 
            name="budget" 
            placeholder="Insira o orçamento total " 
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ''}/>
            
            <Select 
            name="CategoryId"
            text="Seleccione a categoria"
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}/>
            
            <SubmitButton text={BtnText}/>
        </form>
        
        )
    
}

export default ProjectForm