import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { index } from "../apiCalls/routes";
import jwt_decode from "jwt-decode";
import "./home.css";

const Home = ({accessToken}) => {
    const [projects, setProjects] = useState([]);
    const history = useHistory();
    const [user, setUser] = useState({});

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
        if(user?.id){
            const getProjects = async () => {
                const res = await index();
                const data = res;
                if(user.role === "TEACHER"){
                    setProjects(data.filter(p=>p.teacher.id === user.id));
                } else {
                    setProjects(data.filter(p=>p.users.find(u=>u.id === user.id)));
                }
            }
            getProjects();
        }
    }, [user]);

    const handleCreate = (e) => {
        history.push("/create");
    }

    const handleClick = (project) => {
        history.push(`/project/${project.id}`)
    }

    return(
        <div className="homeContainer">
            <div className="homeTableContainer">
                {
                    user?.role === "TEACHER"
                    && <div className="tableBar">
                        <button onClick={handleCreate}>Cadastrar projeto</button>
                    </div>
                }
                <h3>MEUS PROJETOS</h3>
                <table className="homeTable">
                    <thead>
                        <tr className="tableHead">
                            <th className="tableTH">#</th>
                            <th className="tableTH">Nome</th>
                            <th className="tableTH">Descrição</th>
                        </tr>
                    </thead>
                    <tbody className="tableBody">
                        {
                            projects.length > 0
                            ? projects.map((p, index)=>(
                                <tr 
                                    key={p.id} 
                                    className={
                                        index % 2 === 0 
                                        ? "tableRow"
                                        : "tableRowImpar"
                                    }
                                    onClick={()=>handleClick(p)}
                                >
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.description}</td>
                                </tr>

                            )) : <tr><td>Nenhum projeto encontrado</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;