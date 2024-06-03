import React from 'react'
import '../Css/Index.css'
import Students from '../assets/img/students.png'

const Index = () => {
  return (
    <div className='w-100 vh-100 index overflow-y-hidden'>
        <div className="index-header bg-transparent d-flex justify-content-between align-items-center">
            <div className="logo-name overflow-hidden">
                <h3 className='mb-0 fw-bold font-24 text-primary'>
                    <i className='bi bi-mortarboard-fill me-3'></i> 
                    Academia
                </h3>
            </div>
            <div className="sign-up overflow-hidden">
                <button className='btn btn-outline-dark px-3'>Sign up</button>
            </div>
        </div>
        <div className="index-body bg-transparent d-flex justify-content-between align-items-center">
            <div className="left w-50 d-flex flex-column justify-content-center">
                <h6 className='mb-0 text-primary fw-semibold mb-3'>Your e-learning partner</h6>
                <h1 className='mb-0 fw-bolder text-dark mb-3'>This is <br /> the new way <br /> to learn online</h1>
                <p className="mb-0 textColor mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br /> Unde, numquam. Fugiat officia amet vitaenumquam?</p>
                <div className="btns d-flex">
                    <button className="btn btn-primary me-3 px-4 py-2">Get Started</button>
                    <button className="btn btn-outline-dark px-4 py-2">Discover</button>
                </div>
            </div>
            <div className="right d-block w-50 h-100">
                <img src={Students} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Index