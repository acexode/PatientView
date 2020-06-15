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
        <div class="container">      
    <div style={{zoom:'80%'}} class="login-wrapper " >
        <div class="modal-dialog signup-dialog modal-dialog-centered">
            <div class="login-content">               
                <div class="login-header">
                    <div class="login-title"><img class="img-fluid" src={logo} /></div>
                </div>
                <div class="modal-body">
                    <form method="POST">
                        <h3 class="title">Sign up</h3>
                        <span class="subtitle">Enter your details to create an account</span>
                        <div class="row">
                            <div class="col login-input">
                                <label for="">First name</label>
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
                            <div class="col login-input">
                                <label for="">Last name</label>
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
                        <div class="row">
                            <div class="col login-input">
                                <label for="exampleInputEmail1">Email address</label>
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
                            <div class="col login-input">
                                <label for="">Phone</label>
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
                          <div class="form-group login-input">
                            <label for="exampleInputPassword1">Password</label>
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
                          <div class="form-group login-input">
                            <label for="exampleInputPassword1">Confirm Password</label>
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
                          </div>: <button type="submit" className="btn btn-submit btn--signin">Sign Up</button>}
                          <div>&nbsp;</div>
                          { show && ( 
                          <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <span style={{fontSize:'80%'}}>{`${message}, Please re-enter your details`}</span>
                          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                          </div>)
                      }
                        <div class="row">
                            <div class="col-md-12 d-flex justify-content-center">
                                <span class="text-center mx-auto pt-2 pb-0">or </span>

                            </div>
                            <div class="col d-flex justify-content-center">
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
                                      cssClass="fb-login"
                                      textButton=""
                                      // autoLoad={true}
                                      fields="name,email,picture"                            
                                      callback={responseFacebook}
                                      icon="fa-facebook"
                                      reAuthenticate={true}                                      
                                      />  
                                </div>
                            </div>                                
                        </div>
                          
                       
                        <span class="extra text-center">Already have an account? <Link style={{display:'inline'}} className="pl-2" to="/login"><strong>Login</strong></Link></span>
                    </form>
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

export default Signup


