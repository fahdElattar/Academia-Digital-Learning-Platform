import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Courses from './Pages/Courses'
import CourseDetails from './Pages/CourseDetails'
import Professors from './Pages/Professors'
import Students from './Pages/Students'
import Departements from './Pages/Departements'
import Sectors from './Pages/Sectors'

function App() {

  return (
    <div className='w-100 min-vh-100 p-0 m-0 border' style={{backgroundColor: 'white', boxSizing: 'border-box'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/courses' element={<Courses />}/>
          <Route path='/courseDetails' element={<CourseDetails />}/>
          <Route path='/professors' element={<Professors />}/>
          <Route path='/students' element={<Students />}/>
          <Route path='/departements' element={<Departements />}/>
          <Route path='/sectors' element={<Sectors />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
