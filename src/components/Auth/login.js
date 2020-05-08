import React, { useState } from 'react';
import './login.css'
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';



const Login  = () =>{

 
  const [message,setMessage] = useState('')
  const [show,setShow] = useState(false)
  return (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        axios.post(``,  values )
        .then(res => {
          console.log(res.data);
        })
        .catch(err =>{         
          
          setShow(true)
          setMessage(err.response.data.message)
        })	
        setSubmitting(false);
      }, 500);
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string() 
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")        
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <div class="login-wrapper">
        <div class="page-wrapper">
              <div class="form-wrapper">
              { show ? ( 
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {message}
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>): (<div></div>)
                  }
                  <form onSubmit={handleSubmit} class="form">
                      <div class="form-row ">
                          <div class="col-md-12 logo-box">
                              <img class="logo text-center" src="https://image.winudf.com/v2/image1/dGhlbWVkaWNhbGwuY29tX2ljb25fMTU1MTYxODk2Ml8wMTA/icon.png?w=170&fakeurl=1" alt="" />
                              <h2 class="text-center">MEDICALL</h2>
                          </div>                            
                      </div>
                      <div class="form-row instruction mb-3">
                          <h5 class="">Log in</h5> 
                          <span>Enter your details below</span>
                                                 
                      </div>                                              
                      
            <div className="form-group login-input">
              <label>Email </label>
              <input 
              name="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email && "error"}
               />
              {errors.email && touched.email && (
                <div className="input-feedback float-left">{errors.email}</div>
              )}
            </div>
            <div className="form-group login-input">
              <div className="row">
                <div className="col">
                  <label>Password</label>
                </div>                
              </div>
              <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password && "error"}
              type="password" />
              <div className="col-auto">
                  <a className="text-muted float-right" href="#">
                    Forgot password?
                  </a>
                </div>
              {errors.password && touched.password && (
                <div className="input-feedback float-left">{errors.password}</div>
              )}
            </div>
                      <button type="submit" class="mt-3 btn btn-primary submit">Sign In</button>

                      <div class="form-row mt-4">
                          <div class="form-group col-md-4 border-top mt-3"></div>
                          <div class="form-group col-md-4">
                            <p class="pl-3 text-center or">or</p>
                          </div>
                          <div class="form-group col-md-4 border-top mt-3"></div>

                          
                        </div>
                      <div class="form-row justify-content-md-center">
                          <a href="#" class="social-login">
                              <img src="https://colorlib.com/etc/lf/Login_v9/images/icons/icon-google.png" alt="" />
                          
                          </a>
                         <a href="#" class="social-login">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png" alt="" />
                          </a>
                         <a href="#" class="social-login">
                          <i class="fa fa-facebook-f"></i>
                          </a>
                         <a href="#" class="social-login">
                          <i class="fa fa-twitter fa-fw"></i>
                          </a>

                          
                        </div>
                        <div class="form-row mt-4 justify-content-md-center">
                            <p>You dont have an account ? </p> <Link class="pl-2" to="/signup">Sign Up</Link>
                        </div>
                    </form>
                  <div class="right-bg">

                  </div>
              </div>
        </div>

    </div>
  )
      }}
      </Formik>
      )
}

export default Login


