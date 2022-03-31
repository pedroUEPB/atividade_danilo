import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./login.css";
import { login } from '../apiCalls/routes';


const Login = ({setAccessToken}) => {

    const [newUser, setNewUser] = useState({ username: '', password: '' });
    

    const handleChange = (e) => {
        setNewUser({
            ...newUser, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newUser.username !== "" && newUser.password.length > 6){
            try{
                const access = await login(newUser);
                if(!access){
                    alert("CREDENCIAIS INCORRETAS!");
                } else {
                    setAccessToken(access);
                }
            } catch(err){}
        } else {
            alert("Username ou senha inválido!")
        }
    }

    return(
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="loginHeader">
                    <h4>LOGIN</h4>
                </div>
                <input 
                    placeholder='Username' 
                    name='username' 
                    value={newUser.username} 
                    onChange={(e)=>handleChange(e)}
                />
                <input 
                    type="password" 
                    min={6} 
                    placeholder='Senha' 
                    name='password' 
                    value={newUser.password} 
                    onChange={(e)=>handleChange(e)}
                />
                <div className="loginButtons">
                    <button className="loginButton" onClick={handleSubmit}>Entrar</button>
                    <button className="loginButton">
                        <Link to="/cadastro"style={{textDecoration:'none', color:'black'}}>
                            Cadastrar
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;