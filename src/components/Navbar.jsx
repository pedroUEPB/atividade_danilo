import "./navbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const Navbar = ({accessToken, setAccessToken}) => {
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

    return(
        <div className="navbarContainer">
            <div className="left">
                <div className="item">
                    <Link to = "/" style={{textDecoration:'none', color:'white'}}>
                        Início
                    </Link>
                </div>
                <div className="item">
                    <Link to = "/sobre" style={{textDecoration:'none', color:'white'}}>
                        Sobre
                    </Link>
                </div>
            </div>
            <div className="right">
                {
                    user?.id
                    && <div className="item" onClick={()=>setAccessToken({})}>
                        Sair
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar