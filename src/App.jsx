import Navbar from './components/navbar/navbar.jsx';
import '../src/style/general.css';
import '../src/style/index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectCard from './components/project_card/project_card.jsx';
import { age_calculator } from './javascript/age_calculator.js';
import { createContext, useState, useEffect } from 'react';
import { toggleSwitch } from '../src/javascript/toggleSwitch.js';
import { PieChart } from '@mui/x-charts/PieChart';

export const ThemeContext = createContext(null);

AOS.init();

function App() {
  const my_age = age_calculator();
  
  const [theme, setTheme] = useState('dark');
  const [languageData, setLanguageData] = useState([]);

  // Language data for the PieChart
  const fillColor = theme === 'dark' ? 'white' : 'black'
  const IGNORE_LANGUAGES = ['Pug', 'Roff', 'CMake', 'Shell', 'Nix'];

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toggleSwitch(newTheme);
  };

  // Fetch language percentages from GitHub
  const fetchLanguageData = async () => {
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; 
    const GITHUB_USERNAME = 'Duarte0903'; 
    const reposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
    const headers = { Authorization: `token ${GITHUB_TOKEN}` };
  
    try {
      const reposResponse = await fetch(reposUrl, { headers });
      const repos = await reposResponse.json();
      
      const languageCounts = {};
  
      for (const repo of repos) {
        const langUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`;
        const langResponse = await fetch(langUrl, { headers });
        const languages = await langResponse.json();
  
        for (const [lang, bytes] of Object.entries(languages)) {
          if (!IGNORE_LANGUAGES.includes(lang)) {
            languageCounts[lang] = (languageCounts[lang] || 0) + bytes;
          }
        }
      }
  
      const totalBytes = Object.values(languageCounts).reduce((a, b) => a + b, 0);
      
      const pieChartData = Object.entries(languageCounts).map(([lang, count], index) => ({
        id: index, 
        value: (count / totalBytes) * 100, 
        label: lang 
      }));
  
      setLanguageData(pieChartData);
    } catch (error) {
      console.error("Error fetching language data:", error);
    }
  };

  useEffect(() => {
    fetchLanguageData();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className='App' id={theme}>
        <Navbar className="navbar" toggleTheme={toggleTheme} />
        
        <div className='hello-card-container'>
          <div className='hello-card'>
            <div className='profile-pic-container'>
              <img src="profile_pic.png" className='profile-pic' />
            </div>

            <div className='about-me-container'>
              <h2>Hello there 👋</h2>
              <p className='about-me-text'>
                My name is <span style={{fontWeight: 'bold'}}>Duarte Leitão</span> and I'm a <span dangerouslySetInnerHTML={{__html: my_age}} />
                year old software engineering student at the University of Minho.
              </p>
            </div>
          </div>
        </div>

        <div className='education-container'>
          <h1>Education</h1>
          <div className='education-cards-container'>
            <div className='education-card'>
              <h2>BSc in Software Engineering</h2>
              <p className='edu-institution'>University of Minho</p>
              <p>2021 - 2024</p>
            </div>

            <div className='education-card'>
              <h2>MSc in Software Engineering</h2>
              <p className='edu-institution'>University of Minho</p>
              <p>2024 - Present</p>
            </div>
          </div>
        </div>

        <div className='languages-container'>
          <h1>Top Languages</h1>

          <div className='pie-chart-container'>
            <PieChart
              className="pie-chart" 
              margin={{ bottom: 100, right: 0, left: 0, top: 0 }}
              series={[
                {
                  data: languageData,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'grey' },
                  label: {
                    position: 'outside',
                    color: 'grey',
                    fontSize: '12px',
                  }
                },
              ]}
              height={400}
              width={600}
              slotProps={{
                legend: {
                  itemMarkWidth: 10,
                  direction: 'row',
                  position: {
                    vertical: 'bottom',
                    horizontal: 'middle',
                  },
                  labelStyle: {
                    fill: fillColor,
                  }
                }
              }}
            />
          </div>
        </div>

        <div className='top-projects-container'>
          <h1>Top Projects</h1>
          <div className='project-cards-container'>
            <ProjectCard 
              project_name='FSUMinho Website'
              repo_link='https://github.com/FSUMinho/website_v2'
              project_description="Website for FSUMinho Formula Student Team. Made with React and Vite. Responsive elements, e-mail contact form and multi-language support."
            />
            <ProjectCard 
              project_name='Personal Web Portfolio'
              repo_link='https://github.com/Duarte0903/portfolio'
              project_description='Personal web portfolio made with React and Vite. My first contact with the framework. Code recycling with components. Build and deployment automated with GitHub Actions.'
            />
            <ProjectCard 
              project_name='Online Auctions'
              repo_link='https://github.com/Pedrosilva03/li4-online-auctions'
              project_description='University project made with Blazor. Online auctions platform for Counter-Strike skins. Uses MS SQL server for the data layer.'
            />
            <ProjectCard 
              project_name='Subject webpages platform'
              repo_link='https://github.com/Duarte0903/EngWeb2024-Projeto'
              project_description='Platform that allows the creation of webpages for uni subjects for professors to post related content and for students to access it. Made with Express.js and MongoDB.'
            />
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
