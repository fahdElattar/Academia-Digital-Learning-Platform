import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import './assets/css/style.min.css'
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Courses from './Pages/Courses'
import CourseDetails from './Pages/CourseDetails'
import Professors from './Pages/Professors'
import Students from './Pages/Students'
import Departements from './Pages/Departements'
import Sectors from './Pages/Sectors'
import MyCourses from './Pages/MyCourses';
import MyLikes from './Pages/MyLikes';
import Specialties from './Pages/Specialties';
import CourseCharts from './Pages/CourseCharts';
import Register from './Pages/Register';
import CourseTest from './Pages/CourseTest';

function App() {

  return (
    <div className='w-100 min-vh-100 p-0 m-0 border' style={{backgroundColor: 'white', boxSizing: 'border-box'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Courses />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/courses' element={<Courses />}/>
          <Route path='/coursetest' element={<CourseTest />}/>
          <Route path='/courses/:id' element={<CourseDetails />}/>
          <Route path='/courseCharts' element={<CourseCharts />}/>
          <Route path='/professors' element={<Professors />}/>
          <Route path='/students' element={<Students />}/>
          <Route path='/departements' element={<Departements />}/>
          <Route path='/sectors' element={<Sectors />}/>
          <Route path='/myCourses' element={<MyCourses />}/>
          <Route path='/myLikes' element={<MyLikes />}/>
          <Route path='/specialties' element={<Specialties />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
