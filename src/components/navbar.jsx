import '../style/navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
        <a className='nav-branding' href='index.html'>
            <h1>&lt; D L /&gt;</h1>
        </a>

        <ul className='nav-links'>
            <li className='nav-item'>
                <a href='https://www.linkedin.com/in/duarte-leit%C3%A3o-7b0a6624b/'>Linkedin</a>
            </li>

            <li className='nav-item'>
                <a href='https://github.com/Duarte0903'>GitHub</a>
            </li>
        </ul>
    </div>
  );
}

export default Navbar;