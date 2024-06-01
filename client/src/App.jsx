import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Index from './Pages/Index'

function App() {

  return (
    <div className='w-100 min-vh-100 p-0 m-0 border' style={{backgroundColor: 'white', boxSizing: 'border-box'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/index' element={<Index />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
