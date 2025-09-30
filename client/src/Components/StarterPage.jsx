import Navbar from './Navbar'
import Sidebar from './Sidebar'
import '../Css/StarterPage.css'

const StarterPage = ({ children }) => {
  return (
    <div className='min-vh-100 w-100 p-0 m-0 d-flex'>
        <div className="sidebar-space fixed-top">
          <Sidebar />
        </div>
          <div className="content-space">
              <Navbar />
              {children}
          </div>
    </div>
  )
}

export default StarterPage