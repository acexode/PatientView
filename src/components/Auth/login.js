import React, { useState, useContext } from 'react';
import './login.css'
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import logo from '../../assets/MEDICALL.svg'
import {useHistory} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import config from '../../config.json';
import { AppContext } from '../AppContext/AppContext';
import ResetPassword from './resetpassword';


const Login  = () =>{
  let history = useHistory()
  const {fetchHospitals} = useContext(AppContext)
  const [message,setMessage] = useState('')
  const [show,setShow] = useState(false)
  const [recoverMessage,setRecoverMessage] = useState('')
  const [recoverShow,setRecoverShow] = useState(false)
  const [recovertrueShow,setRecoverTrueShow] = useState(false)
  const [loading,setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const API = 'https://stagingapi.healthinabox.ng/api/'
  return (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        axios.post(`${config.BASE_URL}Auth/login`,  values )
        .then(res => {
          console.log(res.data);
          let user = {email : res.data.email , id: res.data.id,name: res.data.name,
          phoneNumber: res.data.phoneNumber }
          localStorage.setItem("token", res.data.authToken)
          localStorage.setItem('user', JSON.stringify(user))          
          fetchHospitals()
          history.push('/history',{user: res.data.user})
        })
        .catch(err =>{         
          console.log(err.response);
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
      } = props;

      const getEmail = async e =>{
        e.preventDefault();	
        setLoading(true)
        try{
          let emailResponse = await axios.get(`${config.BASE_URL}Auth/password/reset`, {
            params: {
              email: email
            }
          })
          console.log(emailResponse);
          setRecoverTrueShow(true);
          setRecoverMessage(emailResponse.data)
          setLoading(false)
        }catch(error){
          console.log(error.response.data);
          setRecoverShow(true)
          setRecoverMessage(error.response.data)
          setLoading(false)
        }
      }
      const handleEmail = (e) => {
        setEmail(e.target.value)
      }
      const responseFacebook =  response => {
        console.log(response.accessToken);
        setAccessToken(response.accessToken)
        console.log(accessToken);
        let fbResponse =  axios.post(`${config.BASE_URL}Auth/facebook`, {accessToken : response.accessToken})
        .then(res => {
          console.log(res.data);
          let user = {email : res.data.email , id: res.data.id }
          localStorage.setItem("token", res.data.authToken)
          localStorage.setItem('user', JSON.stringify(user))
          fetchHospitals()
          
          history.push('/history',{user: res.data.user})
        })
        .catch(err =>{         
          console.log(err.response);
          setShow(true)
          //console.log(err.response.data.errors.AccessToken[0])
          if(err.response.data.errors){
            setMessage(err.response.data.errors.AccessToken[0])
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
          fetchHospitals()
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
        <div class="container">      
    <div style={{zoom:'90%'}} class="login-wrapper " >
        <div class="modal-dialog modal-dialog-centered">
            <div class="login-content">
               
                <div class="login-header">
                    <div class="login-title"><img class="img-fluid" src="./MEDICALL.svg" /></div>
                </div> 
                <div class="modal-body">
                    <form  onSubmit={handleSubmit} method="POST">
                        <h1 class="title">Log in</h1>
                        <h1 class="subtitle">Enter your details</h1>
                        <div class="login-input form-group mt-3">
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
                                <div className="input-feedback ">{errors.email}</div>
                            )}                            
                          </div>
                          <div class="login-input form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.password && touched.password && "error"}
                                type="password" />
                            <small id="emailHelp" class="form-text text-muted float-right">
                              <a className="text-muted float-right" id="showAssign" data-toggle="modal" data-target="#passowrdRecover">
                                Forgot password?
                              </a>
                              </small>
                            {errors.password && touched.password && (
                                <div className="input-feedback float-left">{errors.password}</div>
                              )}
                        </div>
                        <div class="p-t-10"> 
                            {isSubmitting ? <div className="spinner-border text-success" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>: <button class="btn btn-submit btn--signin" type="submit" data-target="#">SIGN IN</button> }
                              <div>&nbsp;</div>
                              { show && ( 
                              <div className="alert alert-danger alert-dismissible fade show p-1"  role="alert">
                             <span style={{fontSize:'80%'}}>{`${message}, Please re-enter your details`}</span>
                              <button type="button" className="close p-0" data-dismiss="alert" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                              </button>
                              </div>)
                          }  
                        </div>
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
                      />
                      </div>
                                
                            </div>
                          
                        </div>
                        <span class="extra text-center">Dont have an account? <Link to="/signup"><strong>Signup</strong></Link></span>
                    </form>
                </div>
            </div>
        </div>
      <ResetPassword 
      getEmail={getEmail} 
      handleEmail={handleEmail}
      loading={loading}
      recoverShow={recoverShow}
      recoverMessage={recoverMessage} 
      recovertrueShow={recovertrueShow}
        />
    </div>    
</div>
)
  }}
  </Formik>
      )
}

export default Login


