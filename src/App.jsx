import Navbar from './components/navbar.jsx'
import '../src/style/general.css'
import '../src/style/index.css'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      
      <div className='hello-card-container'>
        <div className='hello-card'>
          <div className='profile-pic-container'>
            <img src='./profile_pic.jpg' className='profile-pic'></img>
          </div>

          <div className='about-me-container'>
            <h2>Hello there 👋</h2>

            <p className='about-me-text'>
              My name is Duarte Leitão and I'm a 20 year old software engineering student
              at the University of Minho.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
