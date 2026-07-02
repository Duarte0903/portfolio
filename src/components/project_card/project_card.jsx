import "./project_card.css"

function ProjectCard(props) {
    const {project_name, 
           project_description, 
           repo_link} = props;

    return(
        <div className='project-card-container'>
            <div className='top-row'>
                <h4 className='project-name'>{project_name}</h4>

                <a className='link-button' href={repo_link} target="_blank" rel="noreferrer" aria-label={`${project_name} on GitHub`}>
                    <img src="github.png" className="card-icon" alt="" />
                </a>
            </div>

            <p className='project-description'>{project_description}</p>
        </div>
    );
}

export default ProjectCard;