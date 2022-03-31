import "./about.css";

function About() {
    return(
        <div className="aboutContainer">
            <div className="aboutTitle">
                <h1 className="text">Sobre</h1>
            </div>
            <div>
                <h2 className="text">
                    Desenvolvido para controle de alunos em projetos.
                </h2>
                <p className="team">Equipe: João Paulo, Maria Vanessa e Pedro Henrique</p>
            </div>
        </div>
    );
}

export default About;