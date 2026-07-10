import { React, useState, useEffect, useRef } from 'react';
import { getgit } from '../../javascript/download_cv.js';
import { GitHubIcon, LinkedInIcon, DownloadIcon } from '../icons.jsx';
import './navbar.css'

const NAV_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
];

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const menuHandler = () => {
        setMenuOpen(!isMenuOpen);
    }

    const closeMenu = () => setMenuOpen(false);

    const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuOpen(false);
        }
      };

      useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []);

      const scrollToTop = (event) => {
          event.preventDefault();
          closeMenu();
          window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      const owner = 'Duarte0903';
      const repo = 'resume';
      const filePath = 'template/resume_pt.pdf';

      const handleDownload = async () => {
          try {
              await getgit(owner, repo, filePath);
              console.log('File downloaded successfully');
          } catch (error) {
              console.error('Error downloading file:', error);
          }
      };

  return (
    <div className='nav-container'>
        <header className={`navbar ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
            <a className='nav-branding' href='#' onClick={scrollToTop}>
                <div className='logo'>&lt; DL /&gt;</div>
            </a>

            <nav className={`nav-collapse ${isMenuOpen ? 'active' : ''}`}>
                <ul className='nav-links'>
                    {NAV_LINKS.map((link) => (
                        <li className='nav-item' key={link.href}>
                            <a className='nav-link' href={link.href} onClick={closeMenu}>{link.label}</a>
                        </li>
                    ))}
                </ul>

                <div className='nav-actions'>
                    <a className='nav-action' href='https://www.linkedin.com/in/duarte-leit%C3%A3o-7b0a6624b/' target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                        <LinkedInIcon size={16} />
                    </a>

                    <a className='nav-action' href='https://github.com/Duarte0903' target='_blank' rel='noreferrer' aria-label='GitHub'>
                        <GitHubIcon size={16} />
                    </a>

                    <button className='nav-action' onClick={handleDownload} aria-label='Download CV'>
                        <DownloadIcon size={16} />
                    </button>
                </div>
            </nav>

            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={menuHandler}>
                <span className='bar'/>
                <span className='bar'/>
                <span className='bar'/>
            </div>
        </header>
    </div>
  );
}

export default Navbar;
