import Navbar from './components/navbar/navbar.jsx';
import '../src/style/general.css';
import '../src/style/index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectCard from './components/project_card/project_card.jsx';
import { createContext, useState, useEffect } from 'react';
import { toggleSwitch } from '../src/javascript/toggleSwitch.js';
import { PieChart } from '@mui/x-charts/PieChart';
import data from './data.json';

export const ThemeContext = createContext(null);

AOS.init();

function App() {
  const [theme, setTheme] = useState('dark');
  const [languageData, setLanguageData] = useState(null);

  // Language data for the PieChart
  const fillColor = theme === 'dark' ? 'white' : 'black';
  const IGNORE_LANGUAGES = ['Pug', 'Roff', 'CMake', 'Shell', 'Nix'];

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toggleSwitch(newTheme);
  };

  // Fetch language percentages from GitHub
  const fetchLanguageData = async () => {
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; 
    const GITHUB_USERNAME = data.github_name; 

    if (GITHUB_USERNAME !== "" || GITHUB_USERNAME !== null) {
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
          value: ((count / totalBytes) * 100).toFixed(2), 
          label: lang 
        }));
    
        setLanguageData(pieChartData);
      } catch (error) {
        console.error("Error fetching language data:", error);
      }
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
              <p className='about-me-text'>{data['hello-card'].text}</p>
            </div>
          </div>
        </div>

        {data.education &&
        <div className='education-container'>
          <h1>Education</h1>
          <div className='education-cards-container'>
            {data.education.map((education, index) => (
              <div className='education-card' key={index}>
                <h2>{education.title}</h2>
                <p className='edu-institution'>{education.school}</p>
                <p>{education.date}</p>
              </div>
            ))}
          </div>
        </div>}

        {(data.github !== "" || data.github !== null) &&
          <div className='languages-container'>
          <h1>Top Languages</h1>

          <div className='pie-chart-container'>
            {languageData ? (
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
            ) : (
              <div className="spinner"></div>
            )}
          </div>
        </div>}

        <div className='top-projects-container'>
          <h1>Top Projects</h1>
          <div className='project-cards-container'>
            {data.projects.map((project, index) => (
              <ProjectCard 
                key={index}
                project_name={project.title}
                repo_link={project.link}
                project_description={project.description}
              />
            ))}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;