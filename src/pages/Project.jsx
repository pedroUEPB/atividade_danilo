import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { indexOne, removeAlumn } from "../apiCalls/routes";
import InsertAlumn from "../components/InsertAlumn";
import jwt_decode from "jwt-decode";

import "./project.css"

const Project = ({accessToken}) => {
    const [user, setUser] = useState({});
    const [project, setProject] = useState({});
    const [show, setShow] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if(accessToken?.accessToken){
          const getDados = async () => {
            const decodedToken = jwt_decode(accessToken.accessToken);
            setUser(decodedToken);
          }
          getDados();
        }
      }, [accessToken]);

    useEffect(()=>{
        if(id){
            const getProject = async () => {
                const res = await indexOne(id);
                setProject(res);
            }
            getProject();
        }
    }, [id]);

    const handleDelete = async (u) => {
        try{
            const res = await removeAlumn({ project_id: id, user: u });
            setProject(res);
            alert("ALUNO REMOVIDO!");
        } catch(err){}
    }

    return(
        <div className="projectContainer">
            {
                show
                && <InsertAlumn 
                    project={project}  
                    setProject={setProject} 
                    onClose={() => setShow(false)}
                />
            }
            {
                project?.id
                && <div className="projectWrapper">
                    <div className="projectHeader">
                        <h3 style={{textAlign: "center"}}>{project.name}</h3>
                        <span>{project.description}</span>
                    </div>
                    <h4 style={{fontSize: "18px"}}>
                        Participantes
                    </h4>
                    {
                        user?.role === "TEACHER"
                        && <div className="projectButtons">
                            <button onClick={()=>setShow(true)}>Adicionar aluno</button>
                            <button>
                                <Link to={`/editar_projeto/${id}`}style={{textDecoration:'none', color:'black'}}>
                                    Editar Projeto
                                </Link>
                            </button>
                        </div>
                    }
                    <div className="projectParticipants">
                        <table className="projectTable">
                            <thead>
                                <tr className="tableHead">
                                    <th className="tableTH">#</th>
                                    <th className="tableTH">Nome</th>
                                    <th className="tableTH">Função</th>
                                    <th className="tableTH">Registro</th>
                                    <th className="tableTH">Tipo</th>
                                    <th className="tableTH">Formação</th>
                                    {
                                        user?.role === "TEACHER"
                                        && <th className="tableTH">Ações</th>
                                    }
                                </tr>
                            </thead>
                            <tbody className="tableBody">
                                {
                                    project.users.length > 0
                                    ? project.users.map((u, index)=>(
                                        <tr 
                                            key={u.id} 
                                            className={
                                                index % 2 === 0 
                                                ? "tableRow"
                                                : "tableRowImpar"
                                            }
                                        >
                                            <td>{u.id}</td>
                                            <td>{u.username}</td>
                                            <td>{u.function}</td>
                                            <td>{u.registration}</td>
                                            <td>{
                                                u.role === "TEACHER"
                                                ? "PROFESSOR"
                                                : "ALUNO"
                                            }</td>
                                            <td>{u.formation}</td>
                                            {
                                                user?.role === "TEACHER"
                                                && <td style={{
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}>
                                                    <div 
                                                        className="iaButton"
                                                        onClick={()=>handleDelete(u)}
                                                    >
                                                        Excluir
                                                    </div>
                                                </td>
                                            }
                                        </tr>

                                    )) : <tr><td>Nenhum aluno encontrado</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default Project