import React, { useState } from 'react';
import './login.css'
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpeg'
import { useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';




const Signup  = () =>{
  let history = useHistory()
  const [message,setMessage] = useState('')
  const [show,setShow] = useState(false)

  return (
  <Formik
    initialValues={{firstname: "", lastname: "", phoneNumber: "", email: "", password: "", confirmPassword:"" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        axios.post(`https://stagingapi.healthinabox.ng/api/Account/create`,  values )
        .then(res => {
          console.log(res.data);
          let user = {email : res.data.email , id: res.data.id }
          localStorage.setItem("token", res.data.authToken)
          localStorage.setItem('user', JSON.stringify(user))
          history.push('/login',{user: res.data.user})
        })
        .catch(err =>{         
          console.log(err.response.data);
          setShow(true)
          setMessage(err.response.data)
        })	
        setSubmitting(false);
      }, 500);
    }}
    validationSchema={Yup.object().shape({
      firstname: Yup.string() 
        .required("Firstname is required"),
      lastname: Yup.string() 
        .required("Lastname is required"),
      email: Yup.string() 
        .required("Email is required"),
      phoneNumber: Yup.string() 
        .required("Phone number is required"),
      password: Yup.string()
        .required("No password provided."),       
      confirmPassword: Yup.string()
        .required("Please confirm your password")        
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
      const responseFacebook =  response => {
        console.log(response.accessToken);
        let fbResponse =  axios.post(`https://stagingapi.healthinabox.ng/api/Auth/facebook`, {accessToken : response.accessToken})
        .then(res => {
          console.log(res.data);
          let user = {email : res.data.email , id: res.data.id }
          localStorage.setItem("token", res.data.authToken)
          localStorage.setItem('user', JSON.stringify(user))
          history.push('/history',{user: res.data.user})
        })
        .catch(err =>{         
          console.log(err.response);
          setShow(true)
          if(err.response.data.errors){
            setMessage(err.response.data.errors.AccessToken[0])
          }else{
            setMessage(err.response.data)

          }
        })	
      }
      const responseGoogle = (response) => {
        console.log(response);
        let googleResponse =  axios.post(`https://stagingapi.healthinabox.ng/api/Auth/google`, {accessToken : response.code})
        .then(res => {
          console.log(res.data);
          let user = {email : res.data.email , id: res.data.id }
          localStorage.setItem("token", res.data.authToken)
          localStorage.setItem('user', JSON.stringify(user))
          history.push('/history',{user: res.data.user})
        })
        .catch(err =>{         
          console.log(err.response);
          setShow(true)
          if(err.response.data.errors){
            setMessage(err.response.data.errors.AccessToken[0])
          }else{
            setMessage(err.response.data)

          }
        })
      }
      const componentClicked = (response) => {
        console.log('data', response);
      }
      return (
        <div class="login-wrapper">
        <div class="page-wrapper">
              <div class="form-wrapper">
                  <form onSubmit={handleSubmit} class="form">
                      <div class="form-row ">
                          <div class="col-md-12 logo-box">
                              <img class="logo text-center" src={logo} alt="" />                              
                          </div>                            
                      </div>
                      <div class="form-row instruction mb-3">
                          <h5 class="">Sign up</h5> 
                          <span>Enter your details to create an account</span>
                                                 
                      </div>                                              
            <div class="form-row">
            <div className="form-group login-input col-md-6">
              <label>Firstname </label>
              <input 
              name="firstname"
              type="text"
              placeholder="Ben"
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.firstname && touched.firstname && "error"}
               />
              {errors.firstname && touched.firstname && (
                <div className="input-feedback float-left">{errors.firstname}</div>
              )}
            </div>
            
            <div className="form-group login-input col-md-6">
              <label>Lastname </label>
              <input 
              name="lastname"
              type="text"
              placeholder="Chinedu"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.lastname && touched.lastname && "error"}
               />
              {errors.lastname && touched.lastname && (
                <div className="input-feedback float-left">{errors.lastname}</div>
              )}
            </div>
            
            </div>  
            <div class="form-row">                 
            <div className="form-group login-input col-md-6">
              <label>Email </label>
              <input 
              name="email"
              type="email"
              placeholder="ben78@gmail.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email && "error"}
               />
              {errors.email && touched.email && (
                <div className="input-feedback float-left">{errors.email}</div>
              )}
            </div>
            <div className="form-group login-input col-md-6">
              <label>Phone </label>
              <input 
              name="phoneNumber"
              type="text"
              placeholder="08058697008"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phoneNumber && touched.phoneNumber && "error"}
               />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className="input-feedback float-left">{errors.phoneNumber}</div>
              )}
            </div>
            
            </div>             
            <div className="form-group login-input">
            <label>Password</label>
              <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password && "error"}
                />              
              {errors.password && touched.password && (
                <div className="input-feedback float-left">{errors.password}</div>
              )}
            </div>
            <div className="form-group login-input">
            <label>Confirm Password</label>
              <input
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.confirmPassword && touched.confirmPassword && "error"}
               />             
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="input-feedback float-left">{errors.confirmPassword}</div>
              )}
            </div>
                      
                      {isSubmitting ? <div class="spinner-border text-success" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>: <button type="submit" class="mt-3 btn btn-primary submit">Sign In</button>}
                      <div>&nbsp;</div>
                      { show && ( 
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <span style={{fontSize:'80%'}}>{`${message}, Please re-enter your details`}</span>
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>)
                  }
                      <div class="form-row mt-4">
                            <h2 className="line-text"><span>or</span></h2>

                          
                        </div>
                      <div class="form-row justify-content-md-center">
                          <div class="social-login">
                          <GoogleLogin
                              clientId="113873161933-1j99gn4fvnm1832i61m3lg8d6gfleb0l.apps.googleusercontent.com"
                              buttonText="Login"
                              responseType="code"
                              onSuccess={responseGoogle}
                              onFailure={responseGoogle}
                              cookiePolicy={'single_host_origin'}
                            />
                          
                          </div>
                        
                         <div class="social-login">
                          
                          <FacebookLogin
                            appId="531093777583624"
                            autoLoad={true}
                            fields="name,email,picture"                            
                            callback={responseFacebook}
                            icon="fa-facebook"
                            
                            
                                                  />
                          
                         
                          </div>
                         

                          
                        </div>
                        <div class="form-row mt-4 justify-content-md-center">
                            <p>You dont have an account ? </p> <Link class="pl-2" to="/login">Login</Link>
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

export default Signup


