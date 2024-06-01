import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Courses from './Pages/Courses'
import Professors from './Pages/Professors'
import Students from './Pages/Students'

function App() {

  return (
    <div className='w-100 min-vh-100 p-0 m-0 border' style={{backgroundColor: 'white', boxSizing: 'border-box'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/courses' element={<Courses />}/>
          <Route path='/professors' element={<Professors />}/>
          <Route path='/students' element={<Students />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
