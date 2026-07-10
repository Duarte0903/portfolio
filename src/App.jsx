import Navbar from './components/navbar/navbar.jsx';
import '../src/style/general.css';
import '../src/style/index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectCard from './components/project_card/project_card.jsx';
import { GitHubIcon, LinkedInIcon, ArrowUpIcon } from './components/icons.jsx';
import { useEffect } from 'react';
import { getgit } from './javascript/download_cv.js';
import data from './data.json';

function App() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
  }, []);

  const handleDownloadCV = async () => {
    try {
      await getgit('Duarte0903', 'resume', 'template/resume_pt.pdf');
    } catch (error) {
      console.error('Error downloading CV:', error);
    }
  };

  return (
      <div className='App'>
        <Navbar />

        {/* ===== HERO ===== */}
        <section className='hero'>
          <div className='hero-inner'>
            <div className='hero-text' data-aos='fade-up'>
              <span className='hero-status'>
                <span className='status-dot' />
                Tech Analyst at Deloitte
              </span>
              <span className='hero-eyebrow'>{data.hero.greeting}</span>
              <h1 className='hero-name'>
                <span className='gradient-text'>{data.hero.name}</span>
              </h1>
              <h2 className='hero-role'>{data.hero.role}</h2>
              <p className='hero-tagline'>{data.hero.tagline}</p>

              <div className='hero-cta'>
                <a className='btn btn-primary' href='#projects'>View Projects</a>
                <button className='btn btn-ghost' onClick={handleDownloadCV}>Download CV</button>

                <div className='hero-socials'>
                  <a className='social-link' href={data.github_profile} target='_blank' rel='noreferrer' aria-label='GitHub'>
                    <GitHubIcon size={19} />
                  </a>
                  <a className='social-link' href={data.linkedin} target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                    <LinkedInIcon size={19} />
                  </a>
                </div>
              </div>
            </div>

            <div className='hero-portrait' data-aos='fade-left' data-aos-delay='150'>
              <div className='portrait-frame'>
                <img src='profile_pic_web.jpg' alt='Duarte Leitão' />
              </div>
            </div>
          </div>

          <a className='scroll-hint' href='#about'>scroll</a>
        </section>

        {/* ===== ABOUT ===== */}
        <section className='section' id='about'>
          <div className='section-head' data-aos='fade-up'>
            <span className='section-kicker'>01 — About</span>
            <h2 className='section-title'>Who I am</h2>
          </div>

          <div className='about-inner'>
            <p className='about-text' data-aos='fade-up'>{data['hello-card'].text}</p>

            <div className='facts-row'>
              {data.facts.map((fact, index) => (
                <div className='fact-card' key={index} data-aos='fade-up' data-aos-delay={index * 100}>
                  <div className='fact-label'>{fact.label}</div>
                  <div className='fact-value'>{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SKILLS ===== */}
        <section className='section' id='skills'>
          <div className='section-head' data-aos='fade-up'>
            <span className='section-kicker'>02 — Skills</span>
            <h2 className='section-title'>What I work with</h2>
          </div>

          <div className='skills-groups'>
            {data.skills.map((group, index) => (
              <div className='skill-group' key={index} data-aos='fade-up' data-aos-delay={index * 100}>
                <div className='skill-group-label'>{group.category}</div>
                <div className='skill-pills'>
                  {group.items.map((item, i) => (
                    <span className='skill-pill' key={i}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== EXPERIENCE ===== */}
        {data.experience &&
        <section className='section' id='experience'>
          <div className='section-head' data-aos='fade-up'>
            <span className='section-kicker'>03 — Experience</span>
            <h2 className='section-title'>Where I've worked</h2>
          </div>

          <div className='timeline'>
            {data.experience.map((job, index) => (
              <div className='timeline-item' key={index} data-aos='fade-up' data-aos-delay={index * 100}>
                <div className='timeline-card'>
                  <div className='timeline-top'>
                    <h3 className='timeline-role'>{job.role}</h3>
                    {job.type && <span className='timeline-type'>{job.type}</span>}
                  </div>

                  <div className='timeline-meta'>
                    {job.brandColor &&
                      <span className='timeline-mark' style={{ background: job.brandColor }} />}
                    <span className='timeline-company'>{job.company}</span>
                    <span className='timeline-dot'>·</span>
                    <span className='timeline-date'>{job.date}</span>
                    {job.location &&
                      <>
                        <span className='timeline-dot'>·</span>
                        <span className='timeline-location'>{job.location}</span>
                      </>}
                  </div>

                  <p className='timeline-desc'>{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>}

        {/* ===== EDUCATION ===== */}
        {data.education &&
        <section className='section' id='education'>
          <div className='section-head' data-aos='fade-up'>
            <span className='section-kicker'>04 — Education</span>
            <h2 className='section-title'>Education</h2>
          </div>

          <div className='education-cards-container'>
            {data.education.map((education, index) => (
              <div className='education-card' key={index} data-aos='fade-up' data-aos-delay={index * 100}>
                <h3>{education.title}</h3>
                <p className='edu-institution'>{education.school}</p>
                <p className='edu-date'>{education.date}</p>
              </div>
            ))}
          </div>
        </section>}

        {/* ===== PROJECTS ===== */}
        <section className='section' id='projects'>
          <div className='section-head' data-aos='fade-up'>
            <span className='section-kicker'>05 — Work</span>
            <h2 className='section-title'>Top Projects</h2>
          </div>

          <div className='project-cards-container'>
            {data.projects.map((project, index) => (
              <div className='project-cell' key={index} data-aos='fade-up' data-aos-delay={(index % 3) * 100}>
                <ProjectCard
                  project_name={project.title}
                  repo_link={project.link}
                  project_description={project.description}
                  index={index}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className='footer'>
          <div className='footer-left'>
            <div className='footer-name gradient-text'>{data.hero.name}</div>
            <p className='footer-copy'>© {new Date().getFullYear()} · Built with React &amp; Vite</p>
          </div>

          <div className='footer-right'>
            <a className='footer-top' href='#' onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <ArrowUpIcon size={13} />
              Top
            </a>
            <a className='social-link' href={data.github_profile} target='_blank' rel='noreferrer' aria-label='GitHub'>
              <GitHubIcon size={18} />
            </a>
            <a className='social-link' href={data.linkedin} target='_blank' rel='noreferrer' aria-label='LinkedIn'>
              <LinkedInIcon size={18} />
            </a>
          </div>
        </footer>
      </div>
  );
}

export default App;
