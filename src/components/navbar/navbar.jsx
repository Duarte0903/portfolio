import { React, useState, useEffect, useRef } from 'react';
import { getgit } from '../../javascript/download_cv.js';
import './navbar.css'

function Navbar({ toggleTheme }) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const menuHandler = () => {
        setMenuOpen(!isMenuOpen);
    }

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
    <div className='nav-container'>
        <header className={`navbar ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
            <a className='nav-branding' href='index.html'>
                <div className='logo'>&lt; D L /&gt;</div>
            </a>

            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <li className='nav-item'>
                    <div className='dark-mode-switch' onClick={toggleTheme}>
                        <img src='sun.png' className='switch-icon sun'/>
                        <div className='switch-indicator' id='switch'/>
                        <img src='moon.png' className='switch-icon moon'/>
                    </div>
                </li>

                <li className='nav-item nav-link'>
                    <a href='https://www.linkedin.com/in/duarte-leit%C3%A3o-7b0a6624b/'>
                        <img src='linkedin.png' className='nav-icon' />
                    </a>
                </li>

                <li className='nav-item nav-link'>
                    <a href='https://github.com/Duarte0903'>
                        <img src='github.png' className='nav-icon' />
                    </a>
                </li>

                <li className='nav-item nav-link'>
                    <img className='nav-icon' onClick={handleDownload} src='cv.png' />
                </li>
            </ul>

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