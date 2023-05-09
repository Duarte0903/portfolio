import Navbar from './components/navbar.jsx'
import '../src/style/general.css'
import '../src/style/index.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectCard from './components/project_card.jsx';
import '../src/functions/age_calculator.js'
import { age_calculator } from '../src/functions/age_calculator.js'

AOS.init();

function App() {

  const my_age = age_calculator();

  return (
    <div className="App">
      <Navbar />
      
      <div className='hello-card-container' data-aos='fade'>
        <div className='hello-card'>
          <div className='profile-pic-container'>
            <img src="profile_pic.jpg" className='profile-pic' />
          </div>

          <div className='about-me-container'>
            <h2>Hello there 👋</h2>;

            <p className='about-me-text'>
              My name is <span style={{fontWeight: 'bold'}}>Duarte Leitão</span> and I'm a <span dangerouslySetInnerHTML={{__html: my_age}}/>
              year old software engineering student at the University of Minho.
            </p>
          </div>
        </div>
      </div>

      <div className='cv-container'>
          <div className='download-cv-button'>Download CV</div>
      </div>

      <div className='languages-container'>
          <h1>Top Languages</h1>

          <div className='language-logos-container'>
            <img className='language-logo' src='c_logo.png'/>
            <img className='language-logo' src='js_logo.png'/>
            <img className='language-logo' src='java_logo.png'/>
            <img className='language-logo' src='haskell_logo.png'/>
            <img className='language-logo' src='python_logo.png'/>
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
        </div>
      </div>
    </div>
  )
}

export default App
