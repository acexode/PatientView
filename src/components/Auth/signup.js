import React, { useState } from 'react';
import './login.css'
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import logo from '../../assets/MEDICALL.svg'
import { useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import config from '../../config.json';



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
        axios.post(`${config.BASE_URL}Account/create`,  values )
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
        .required("No password provided.")
        .min(6, "Password is too short - should be 6 chars minimum"),       
      confirmPassword: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same")
        })
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
        let fbResponse =  axios.post(`${config.BASE_URL}Auth/facebook`, {accessToken : response.accessToken})
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
            //setMessage(err.response.data.errors.AccessToken[0])
          }else{
            setMessage(err.response.data)

          }
        })	
      }
      const responseGoogle = (response) => {
        console.log(response);
        let googleResponse =  axios.post(`${config.BASE_URL}Auth/google`, {accessToken : response.code})
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
            //setMessage(err.response.data.errors.AccessToken[0])
          }else{
            setMessage(err.response)

          }
        })
      }
      const componentClicked = (response) => {
        console.log('data', response);
      }
      return (
        <div className="login-wrapper">
        <div className="page-wrapper">
              <div className="form-wrapper">
                  <form onSubmit={handleSubmit} className="form">
                      <div className="form-row ">
                          <div className="col-md-12 logo-box">
                              <img className="logo text-center" src={logo} alt="" />                              
                          </div>                            
                      </div>
                      <div className="form-row instruction mb-3">
                          <h5 className="">Sign up</h5> 
                          <span>Enter your details to create an account</span>
                                                 
                      </div>                                              
            <div className="form-row">
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
            <div className="form-row">                 
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
                      
                      {isSubmitting ? <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>: <button type="submit" className="mt-3 btn btn-primary submit">Sign Up</button>}
                      <div>&nbsp;</div>
                      { show && ( 
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <span style={{fontSize:'80%'}}>{`${message}, Please re-enter your details`}</span>
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>)
                  }
                      <div className="form-row mt-4">
                            <h2 className="line-text"><span>or</span></h2>

                          
                        </div>
                      <div className="form-row justify-content-center">
                          <div className="social-login">
                          <GoogleLogin
                            clientId={config.GOOGLE_CLIENT_ID}
                            buttonText=""
                            accessType="offline"
                            responseType="code"
                            redirectUri={config.GOOGLE_AUTH_CALLBACK_URL}
                            scope="profile email"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                          />
                          
                          </div>
                        
                         <div className="social-login">
                          
                          <FacebookLogin
                            appId={config.FACEBOOK_APP_ID}
                            // autoLoad={true}
                            fields="name,email,picture"                            
                            callback={responseFacebook}
                            icon="fa-facebook"
                            reAuthenticate={true}/>
                          
                         
                          </div>
                         

                          
                        </div>
                        <div className="form-row mt-4 justify-content-center">
                            <p>You dont have an account ? </p> <Link className="pl-2" to="/login">Login</Link>
                        </div>
                    </form>
                  <div className="right-bg">

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


