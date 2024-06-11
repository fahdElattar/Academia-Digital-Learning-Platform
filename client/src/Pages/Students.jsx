import React, { useEffect, useState } from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Students.css'
import avatar from '../assets/img/avatar1.jpg'
import axios from 'axios'

const Courses = ({pageName='Students'}) => {
    const [students, setStudents] = useState([])

    const [last_name, setLast_name] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [img_path, setImg_path] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')
    const [sex, setSex] = useState('')
    const [date_of_birth, setDate_of_birth] = useState('')

    useEffect(() => {
      axios.get('http://localhost:3000/students')
      .then(result => setStudents(result.data))
      .catch(err => console.log('error getting students : ', err))
    }, [])

    return (
      <StarterPage>

        {/* Page Header */}

        <div className="page-head d-flex justify-content-between p-0 ">
          <div className="name d-flex flex-column justify-content-lg-start pt-2">
            <div className="top-name">
              <h6 className='fw-bold mb-1'>{pageName}</h6>
            </div>
            <div className="bottom-name mt-0">
              <p className='text-uppercase mb-0 fw-light'><span className='text-primary'>ACADEMIA</span> / {pageName}</p>
            </div>
          </div>
        </div>

        {/* Page Body */}

        <div className="section-body mt-4">
          <div className="container-fluid p-0">
            <div className="row">
              {/* Professor */}
              <div className="table-responsive card p-0 mb-0">
                <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                  <thead className=''>
                    <tr>
                      <th className='text-capitalize'>No.</th>
                      <th className='text-capitalize'>Name</th>
                      <th className='text-capitalize'></th>
                      <th className='text-capitalize'>Email</th>
                      <th className='text-capitalize'>Phone</th>
                      <th className='text-capitalize'>Sex</th>
                      <th className='text-capitalize'>Date of Birth</th>
                      <th className='text-capitalize'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => {
                      // student's date of birth
                      const formattedDateOfBirth = new Date(student.date_of_birth).toLocaleDateString();
                      return (
                        <tr key={student._id}>
                          <td className='text-secondary'>{student.number}</td>
                          <td>
                            <img className="avatar" src={'../../uploads/'+student.img_path} alt="Student" />
                          </td>
                          <td className='text-secondary'><span className="font-14 text-capitalize">{student.first_name} {student.last_name}</span></td>
                          <td className='text-secondary'>{student.email}</td>
                          <td className='text-secondary'>{student.phone_number}</td>
                          <td className='text-secondary'>{student.sex}</td>
                          <td className='text-secondary'>{formattedDateOfBirth}</td>
                          <td>
                            <button type="button" className="btn btn-icon btn-sm">
                              <i className="bi bi-eye-fill"></i>
                            </button>
                            <button type="button" className="btn btn-icon btn-sm">
                              <i className="bi bi-pencil text-success"></i>
                            </button>
                            <button type="button" className="btn btn-icon btn-sm js-sweetalert">
                              <i className="bi bi-trash text-danger"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
      </StarterPage>
    )
  }

export default Courses