import React, { useState } from 'react';
import './login.css'
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';


const Login  = () =>{
  let history = useHistory()
  const [message,setMessage] = useState('')
  const [show,setShow] = useState(false)
  const [email, setEmail] = useState('')
  return (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        axios.post(`https://stagingapi.healthinabox.ng/api/Auth/login`,  values )
        .then(res => {
          console.log(res.data);
          let user = {email : res.data.email , id: res.data.id }
          localStorage.setItem("token", res.data.authToken)
          localStorage.setItem('user', JSON.stringify(user))
          history.push('/history',{user: res.data.user})
        })
        .catch(err =>{         
          console.log(err);
          setShow(true)
          setMessage(err.response.data)
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
        handleSubmit,
        userEmail
      } = props;

      const getEmail = async e =>{
        e.preventDefault();	
        const mail = {
          email : email 
        }
        try{
          let email = await axios.get('https://stagingapi.healthinabox.ng/api/Auth/password/reset', {
            params: {
              email: mail.email
            }
          })
          console.log(email);
        }catch(error){
          console.log(error.response)
        }
      }
      return (
        <div class="login-wrapper">
        <div class="page-wrapper">
              <div class="form-wrapper">
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
                  <a className="text-muted float-right" id="showAssign" data-toggle="modal" data-target="#AssignDevice">
                    Forgot password?
                  </a>
                </div>
              {errors.password && touched.password && (
                <div className="input-feedback float-left">{errors.password}</div>
              )}
            </div>
                  {isSubmitting ? <div class="spinner-border text-success" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>: <button type="submit" class="mt-3 btn btn-primary submit">Sign In</button>}
                      <div>&nbsp;</div>
                      { show && ( 
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {`${message}, Please re-enter your details`}
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>)
                  }

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
                  
            <div className="row">                
            <div className="modal fade" id="AssignDevice" tabindex="-1" role="dialog" aria-labelledby="AssignDeviceLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            {/* {success && <div className="alert  alert-success" style={{width:'100%'}}>Device Successfully assigned</div> }
				{error &&  <div className="alert  alert-danger" style={{width:'100%'}}>Unable to assign device</div> } */}
                <div className="modal-content">               
                <div className="modal-body">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                <form onSubmit={getEmail} style={{marginTop:"30px" }}>
                    <h5 className="text-center" id="exampleModalLabel mb-4">Password Reset</h5>                   
									<div className="row mt-5">
										<div className="col-md-12">
										
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label>Email</label>
                                                        <input type="text" className="form-control" value={email}
                                                         placeholder="Please enter your email address"/>
													</div>
												</div>
																						
												
											</div>
										</div>
									</div>
									
									<div className="submit-section">
										<button className="btn btn-primary submit-btn">Submit</button>
									</div>
								</form>
                </div>               
                </div>
            </div>
            </div>
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


