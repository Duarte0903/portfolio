import Navbar from './components/navbar.jsx'
import '../src/style/general.css'
import '../src/style/index.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectCard from './components/project_card.jsx';
import { age_calculator } from './javascript/age_calculator.js'
import { createContext, useState } from 'react';
import { toggleSwitch } from '../src/javascript/toggleSwitch.js';
import { getgit } from '../src/javascript/download_cv.js';

export const ThemeContext = createContext(null);

AOS.init();

function App() {

  const my_age = age_calculator();
  
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toggleSwitch(newTheme);
  };

  const owner = 'Duarte0903';
    const repo = 'resume';
    const filePath = 'template/resume.pdf';

    const handleDownload = async () => {
        try {
            await getgit(owner, repo, filePath);
            console.log('File downloaded successfully');
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className='App' id={theme}>
        <Navbar toggleTheme={toggleTheme}/>
        
        <div className='hello-card-container'>
          <div className='hello-card'>
            <div className='profile-pic-container'>
              <img src="profile_pic.jpg" className='profile-pic' />
            </div>

            <div className='about-me-container'>
              <h2>Hello there 👋</h2>

              <p className='about-me-text'>
                My name is <span style={{fontWeight: 'bold'}}>Duarte Leitão</span> and I'm a <span dangerouslySetInnerHTML={{__html: my_age}}/>
                year old software engineering student at the University of Minho.
              </p>
            </div>
          </div>
        </div>

        <div className='cv-container'>
            <div className='download-cv-button' onClick={handleDownload}>Download CV</div>
        </div>

        <div className='languages-container'>
            <h1>Top Languages</h1>

            <div className='language-logos-container'>
              <img className='language-logo' src='c_logo.png' alt='C'/>
              <img className='language-logo' src='js_logo.png' alt='JavaScript'/>
              <img className='language-logo' src='java_logo.png' alt='Java'/>
              <img className='language-logo' src='haskell_logo.png' alt='Haskell'/>
              <img className='language-logo' src='python_logo.png' alt='Python'/>
            </div>
        </div>

        <div className='top-projects-container'>
          <h1>Top Projects</h1>

          <div className='project-cards-container'>
            <ProjectCard project_name='FSUMinho Website'
                        repo_link='https://github.com/FSUMinho/website'
                        project_description="Website for FSUMinho Formula Student Team.
                                              Made with HTML, CSS and Javascript. Responsive elements,
                                              e-mail contact form and multi-language support"/>

            <ProjectCard project_name='Personal Web Portfolio'
                        repo_link='https://github.com/Duarte0903/portfolio'
                        project_description='Personal web portfolio made with React and Vite. 
                        My first contact with the framework. Code recycling with components. 
                        Build and deployment automated with GitHub Actions'/>

            <ProjectCard project_name='Online Auctions'
                         repo_link='https://github.com/Pedrosilva03/li4-online-auctions'
                         project_description='University project made with Blazor. Online auctions
                         platform for Counter-Strike skins. Uses MS SQL server for the data layer.'/>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App