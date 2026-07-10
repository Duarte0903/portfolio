import { GitHubIcon, ArrowUpRightIcon } from '../icons.jsx';
import './project_card.css'

function ProjectCard(props) {
    const {project_name,
           project_description,
           repo_link,
           index} = props;

    const number = String((index ?? 0) + 1).padStart(2, '0');

    return(
        <a className='project-card-container' href={repo_link} target='_blank' rel='noreferrer' aria-label={`${project_name} on GitHub`}>
            <div className='top-row'>
                <span className='project-number'>{number}</span>
                <span className='project-arrow'>
                    <ArrowUpRightIcon size={18} />
                </span>
            </div>

            <h4 className='project-name'>{project_name}</h4>
            <p className='project-description'>{project_description}</p>

            <span className='project-repo'>
                <GitHubIcon size={14} />
                View on GitHub
            </span>
        </a>
    );
}

export default ProjectCard;
