import axios from "axios";
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign({ 
        id: user.id,
        username: user.username,
        role: user.role
    }, "CHAVE_SECRETA");
};

// user routes
//login
const API = "http://localhost:5000/"
export const login = async (user) => {
    try{
        const res = await axios.get(API + `users?username=${user.username}`);
        const usr = res.data
        if(usr.length > 0){
            if(usr[0].password === user.password){
                const accessToken = generateAccessToken({
                    id: usr[0].id,
                    username: usr[0].username,
                    role: usr[0].role
                })
                return {accessToken};
            }
        }
        return false;
    } catch(err){}
}

//all alumns
export const indexAlumns = async () => {
    try{
        const res = await axios.get(API + "users?role=ALUMN");
        return res.data;
    } catch(err){}
}

//create
export const create = async(user) => {
    try{
        const res = await axios.post(API + "users", {...user});
        return res.data;
    } catch(err){}
}

// project routes
//all projects
export const index = async () => {
    try{
        const res = await axios.get(API + "projects");
        return res.data;
    } catch(err){}
}

//index one project
export const indexOne = async (id) => {
    try{
        const res = await axios.get(API + `projects/${id}`);
        return res.data;
    } catch(err){}
}

//create
export const createProject = async (project) => {
    try{
        const res = await axios.post(API + "projects", {...project});
        return res.data;
    } catch(err){}
}

//update
export const updateProject = async (project) => {
    try{
        const { id, name, description} = project;
        const res = await axios.patch(API + `projects/${id}`, {
            name: name, 
            description: description
        });
        return res.data;
    } catch(err){}
}

//check if the user is already in the list
export const userInside = async (params) => {
    try{
        const { project_id, alumn_id } = params;
        const project = await indexOne(project_id);
        if(project){
            const isInside = project.users.some(a=>a.id === alumn_id);
            return isInside;
        }
        return false;
    } catch(err){}
}

//insert alumn
export const insertUser = async (project) => {
    try{
        const { id } = project;
        const res = await axios.put(API + `projects/${id}`, {...project});
        return res.data;
    } catch(err){}
}

//delete alumn from the project
export const removeAlumn = async (params) => {
    try{
        const { project_id, user } = params;
        const res = await indexOne(project_id);
        if(res){
            const aux = res.users.filter(u=>u.id !== user.id);
            const res2 = await axios.put(API + `projects/${project_id}`, {...res, users: aux});
            return res2.data;
        }
        return false;
    } catch(err){}
}

//delete project
export const deleteProject = async (id) => {
    try{
        const res = await axios.delete(API + `projects/${id}`);
        return res.data;
    } catch(err){}
}