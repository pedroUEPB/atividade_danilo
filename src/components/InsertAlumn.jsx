import { useEffect, useState } from "react";
import { indexAlumns, insertUser, userInside } from "../apiCalls/routes";
import "./insertAlumn.css";

const InsertAlumn = ({project, id="insertAlumn", onClose= () => {}, setProject}) => {
    const [alumns, setAlumns] = useState([]);
    const [alumnsSetted, setAlumnsSetted] = useState(false);
    
    useEffect(()=>{
        if(!alumnsSetted){
            const getAlumns = async () => {
                const res = await indexAlumns();
                setAlumns(res);
                setAlumnsSetted(true);

            }
            getAlumns();
        }
    }, [alumnsSetted]);

    const handleOutsideClick = (e) => {
        if(e.target.id === id) onClose();
    }

    const handleAdd = async (u) => {
        try{
            const res = await userInside({
                project_id: project.id, 
                alumn_id: u.id
            });
            if(!res){
                let usrs = project.users;
                usrs.push({...u, function: "TRAINEE"});
                const pjt = {...project, users: usrs};
                const res2 = await insertUser(pjt);
                setProject(res2);
                alert("ALUNO INSERIDO!");
            } else {
                alert("ALUNO JÁ ESTA NO PROJETO!")
            }
        } catch(err){
            console.log(err)
        }
    }

    return(
        <div id={id} className="iaContainer" onClick={handleOutsideClick}>
            <div className="iaWrapper">
                <div className="iaAlumns">
                    <h3 style={{textAlign: "center"}}>Alunos</h3>
                    <div className="iaTableContainer">
                        <table className="projectTable">
                            <thead>
                                <tr className="tableHead">
                                    <th className="tableTH">#</th>
                                    <th className="tableTH">Nome</th>
                                    <th className="tableTH">Registro</th>
                                    <th className="tableTH">Tipo</th>
                                    <th className="tableTH">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="tableBody">
                                {
                                    alumns.length > 0
                                    ? alumns.map((a, index)=>(
                                        <tr 
                                            key={a.id} 
                                            className={
                                                index % 2 === 0 
                                                ? "iaTableRow"
                                                : "iaTableRowImpar"
                                            }
                                        >
                                            <td>{a.id}</td>
                                            <td>{a.username}</td>
                                            <td>{a.registration}</td>
                                            <td>{
                                                a.role === "TEACHER"
                                                ? "PROFESSOR"
                                                : "ALUNO"
                                            }</td>
                                            <td style={{
                                                display: "flex",
                                                justifyContent: "center"
                                            }}>
                                                <div 
                                                    className="iaButton"
                                                    onClick={()=>handleAdd(a)}
                                                >
                                                    Adicionar
                                                </div>
                                            </td>
                                        </tr>

                                    )) : <tr><td>Nenhum aluno encontrado</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="cadastroButtons">
                    <button onClick={onClose}>
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InsertAlumn;