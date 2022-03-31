//import {} from "";
import "./createOrEditProject.css";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createProject, indexOne, updateProject } from "../apiCalls/routes";
import jwt_decode from "jwt-decode";

const CreateOrEditProject = ({accessToken, create}) => {
    const [user, setUser] = useState({});
    const [project, setProject] = useState({
        name: '',
        description: '',
        teacher: {},
        users: []
    });
    const [setted, setSetted] = useState(false);
    const [projectSetted, setProjectSetted] = useState(false);

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if(accessToken?.accessToken && !setted){
            setSetted(true);
            const getDados = async () => {
                const decodedToken = jwt_decode(accessToken.accessToken);
                if(decodedToken.role === "TEACHER"){
                    setUser(decodedToken);
                } else {
                    history.push("/");
                }
            }
            getDados();
        }
      }, [accessToken, history, setted]);

    useEffect(()=>{
        if(user?.id && create && !projectSetted){
            setProject({
                ...project, teacher: user
            });
            setProjectSetted(true);
        }
    }, [user, project, create, projectSetted])

    useEffect(()=>{
        if(id && !create && !projectSetted){
            const getProject = async () => {
                const pjt = await indexOne(id);
                setProject(pjt);
            }
            getProject();
            setProjectSetted(true);
        }
    }, [id, create, projectSetted]);

    const handleChange = (e) => {
        setProject({
            ...project, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(create){
            if(project.name !== "" && project.description !== ""){
                await createProject(project);
                alert("PROJETO CADASTRADO!");
            } else{
                alert("CAMPOS OBRIGATÓRIOS NÃO PREENCHIDOS")
            }
        } else {
            await updateProject(project);
            alert("PROJETO ATUALIZADO!");
        }
        history.push("/");
    }

    return(
        <div className="coepContainer">
            <div className="coepWrapper">
                <h3>{create ? "CADASTRAR" : "EDITAR"}</h3>
                <div className="cadastroInputAux">
                    <span>Nome*</span>
                    <input 
                        required
                        placeholder="Nome do projeto"
                        name="name"
                        value={project.name}
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="cadastroInputAux">
                    <span>Descrição*</span>
                    <input 
                        required
                        placeholder="Descrição do projeto"
                        name="description"
                        value={project.description}
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="cadastroButtons">
                    <button>
                        <Link to="/"style={{textDecoration:'none', color:'black'}}>
                            Voltar
                        </Link>
                    </button>
                    <button type="submit" onClick={handleSubmit}>{ create ? "Cadastrar" : "Salvar" }</button>
                </div>
            </div>
        </div>
    )
}

export default CreateOrEditProject;