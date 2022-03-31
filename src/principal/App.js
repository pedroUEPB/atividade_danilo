//import Cadastro from '../pages/AtividadeYup.jsx';
import Cadastro from '../pages/Cadastro';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home';
import { useState } from 'react';
import Project from '../pages/Project';
import CreateOrEditProject from "../pages/CreateOrEditProject";
import About from '../pages/About';

const App = () => {
    const [accessToken, setAccessToken] = useState({})
    return(
        <>
            <Router>
                <Navbar accessToken={accessToken} setAccessToken={setAccessToken} />
                <Switch>
                    <Route exact path="/">
                        {
                            accessToken?.accessToken
                            ? <Redirect to={"/home"} />
                            : <Login setAccessToken={setAccessToken} />
                        }
                    </Route>
                    <Route path="/cadastro">
                        {
                            accessToken?.accessToken
                            ? <Redirect to={"/home"} />
                            : <Cadastro />
                        }
                    </Route>
                    <Route path="/home">
                        {
                            accessToken?.accessToken
                            ? <Home accessToken={accessToken} />
                            : <Redirect to={"/"} />
                        }
                    </Route>
                    <Route path="/project/:id">
                        {
                            accessToken?.accessToken
                            ? <Project accessToken={accessToken} />
                            : <Redirect to={"/"} />
                        }
                    </Route>
                    <Route path="/create">
                        {
                            accessToken?.accessToken
                            ? <CreateOrEditProject 
                                accessToken={accessToken}
                                create={true}
                            />
                            : <Redirect to="/" />
                        }
                    </Route>
                    <Route path="/editar_projeto/:id">
                        {
                            accessToken?.accessToken
                            ? <CreateOrEditProject
                                accessToken={accessToken}
                                create={false}
                            />
                            : <Redirect to="/" />
                        }
                    </Route>
                    <Route path="/sobre">
                        <About />
                    </Route>
                    <Route path="*">
                        <Redirect to={"/"} />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;