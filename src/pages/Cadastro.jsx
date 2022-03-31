import { useState } from "react"
import "./cadastro.css";
import { Link, useHistory } from "react-router-dom";
import { create } from "../apiCalls/routes";

const Cadastro = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        registration: '',
        role: 'ALUMN',
        occupation_area: '',
        formation: ''
    })
    const[teacher, setTeacher] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    const changeType = (type) => {
        if(type === 0){
            setTeacher(false);
            setUser({
                ...user, role: "ALUMN"
            })
        } else {
            setTeacher(true);
            setUser({
                ...user, role: "TEACHER"
            })
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await create(user);
        if(res?.id){
            history.push("/");
        } else {
            alert("USUÁRIO NÃO CADASTRADO!");
        }
    }

    return(
        <div className="cadastroContainer">
            <form className="cadastroWrapper" onSubmit={handleSubmit}>
                <div className="cadastroHeader">
                    <h4>CADASTRO</h4>
                </div>
                <div className="cadastroTabs">
                    <div 
                        className={teacher ? "cadastroTab" : "cadastroTab selected"} 
                        onClick={()=>changeType(0)}
                    >
                        ALUNO
                    </div>
                    <div 
                        className={!teacher ? "cadastroTab" : "cadastroTab selected"}
                        onClick={()=>changeType(1)}
                    >
                        PROFESSOR
                    </div>
                </div>
                <div className="cadastroInputAux">
                    <span>Username</span>
                    <input 
                        required
                        placeholder="Username*"
                        name="username"
                        value={user.username}
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="cadastroInputAux">
                    <span>Registro</span>
                    <input 
                        required 
                        placeholder="Registration*"
                        name="registration"
                        value={user.registration}
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="cadastroInputAux">
                    <span>Senha</span>
                    <input 
                        required 
                        placeholder="password*"
                        name="password"
                        type="password"
                        min={6}
                        value={user.password}
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                {
                    teacher
                    && <div className="cadastroInputAux">
                        <span>Área de atuação</span>
                        <input 
                            required={teacher}
                            placeholder="Area de atuação*"
                            name="occupation_area"
                            value={user.occupation_area}
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                }
                {
                    teacher
                    && <div className="cadastroInputAux">
                        <span>Formação</span>
                        <input 
                            required={teacher}
                            placeholder="Formação*"
                            name="formation"
                            value={user.formation}
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                }
                <div className="cadastroButtons">
                    <button>
                        <Link to="/"style={{textDecoration:'none', color:'black'}}>
                            Voltar
                        </Link>
                    </button>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}

export default Cadastro;