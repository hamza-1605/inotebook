import './App.css';
import Navbar from './Components/Navbar.js'
import Home from './Components/Home.js'
import About from './Components/About.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteState from './Context/Notes/noteState.js' ;
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import AlertState from './Context/Alert/alertState.js';

function App() {
  return (
    <>
    <AlertState>
    <NoteState>

      <Router>
        <Navbar />
          <Routes>  
            <Route path='/' element={ <Home/> } />
            <Route path='/about' element={ <About/> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/signup' element={ <Signup /> } />
          </Routes>
      </Router>

    </NoteState>
    </AlertState>
    </>
  );
}

export default App;
