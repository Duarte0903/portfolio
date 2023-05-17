import '../style/navbar.css'

function Navbar({ toggleTheme }) {
  return (
    <div className='navbar'>
        <a className='nav-branding' href='index.html'>
            <div className='logo'>&lt; D L /&gt;</div>
        </a>

        <ul className='nav-links'>
            <li>
                <div className='dark-mode-switch' onClick={toggleTheme}>
                    <div className='switch-indicator' id='switch'/>
                </div>
            </li>

            <li className='nav-item'>
                <a href='https://www.linkedin.com/in/duarte-leit%C3%A3o-7b0a6624b/'>LinkedIn</a>
            </li>

            <li className='nav-item'>
                <a href='https://github.com/Duarte0903'>GitHub</a>
            </li>
        </ul>
    </div>
  );
}

export default Navbar;