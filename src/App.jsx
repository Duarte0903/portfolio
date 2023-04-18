import Navbar from './components/navbar.jsx'
import '../src/style/general.css'
import '../src/style/index.css'
import LanguageCard from './components/language_card.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectCard from './components/project_card.jsx';

AOS.init();

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <div className='hello-card-container' data-aos='fade'>
        <div className='hello-card'>
          <div className='profile-pic-container'>
            <img src="profile_pic.jpg" className='profile-pic' />
          </div>

          <div className='about-me-container'>
            <h2>Hello there 👋</h2>

            <p className='about-me-text'>
              My name is <span style={{fontWeight: 'bold'}}>Duarte Leitão</span> and I'm a 20 year old software 
              engineering student at the University of Minho.
            </p>
          </div>
        </div>
      </div>

      <div className='cv-container'>
          <div className='download-cv-button'>Download CV</div>
      </div>

      <div className='languages-container'>
          <h1>Top Languages</h1>

          <div className='language-cards-container'>
            <LanguageCard imagePath='c_logo.png'
                          bp1='Estruras de dados'
                          bp2='loops'/>

            <LanguageCard imagePath='js_logo.png'
                          bp1='DOM manipulation'
                          bp2=''/>

            <LanguageCard imagePath='java_logo.png'
                          bp1=''/>
          </div>
      </div>

      <div className='top-projects-container'>
        <h1>Top Projects</h1>

        <div className='project-cards-container'>
          <ProjectCard project_name='FSUMinho Website'
                       repo_link='https://github.com/FSUMinho/website'
                       project_description="Website for FSUMinho Formula Student Team.
                                            Made with HTML, CSS and Javascript."/>
        </div>
      </div>
    </div>
  )
}

export default App
