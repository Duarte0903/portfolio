import '../style/navbar.css'

function Navbar({ toggleTheme }) {
  return (
    <div className='navbar'>
        <a className='nav-branding' href='index.html'>
            <div className='logo'>&lt; D L /&gt;</div>
        </a>

        <ul className='nav-links'>
            <li className='nav-item'>
                <div className='dark-mode-switch' onClick={toggleTheme}>
                    <img src='sun.png' className='switch-icon sun'/>
                    <div className='switch-indicator' id='switch'/>
                    <img src='moon.png' className='switch-icon moon'/>
                </div>
            </li>

            <li className='nav-item nav-link'>
                <a href='https://www.linkedin.com/in/duarte-leit%C3%A3o-7b0a6624b/'>LinkedIn</a>
            </li>

            <li className='nav-item nav-link'>
                <a href='https://github.com/Duarte0903'>GitHub</a>
            </li>
        </ul>

        <div className='hamburger'>
            <span className='bar'/>
            <span className='bar'/>
            <span className='bar'/>
        </div>
    </div>
  );
}

export default Navbar;