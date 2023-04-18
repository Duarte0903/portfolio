import "../style/project_card.css"

function ProjectCard(props) {
    const {project_name, 
           project_description, 
           repo_link} = props;

    return(
        <div className='project-card-container'>
            <div className='top-row'>
                <h4 className='project-name'>{props.project_name}</h4>

                <div className='link-button'>
                    <a href={props.repo_link}>Link</a>
                </div>
            </div>

            <div className='project-description'>
                <p className='project-description'>{props.project_description}</p>
            </div>
        </div>
    );
}

export default ProjectCard;