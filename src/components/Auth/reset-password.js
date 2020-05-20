import React, { useState, useContext } from 'react';
import './login.css'
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import {useHistory, useLocation} from 'react-router-dom';
import { AppContext } from '../AppContext/AppContext';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const PasswordReset  = () =>{
    let query = useQuery();
    let history = useHistory()
    const {resetPassword} = useContext(AppContext)
    const [errMsg, seterrMsg] = useState()
    const [showError, setshowError] = useState(false)
    const [showSuccess, setshowSuccess] = useState(false)
    const [successMsg, setsuccessMsg] = useState(false)
    const [state, setState] = useState({
        email: '',
        password: '',
        code: query.get('token')
    })
    console.log(query.get('token'))
    const handleChange = (evt) =>{
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
    }
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        console.log(state)
        let values = Object.values(state)
        console.log(values)
        console.log(values.length)
        if(state.code != "" && state.email != "" && state.password != ""){
            resetPassword(state).then(data =>{ 
                console.log(data)
                setsuccessMsg(data.description)
                setshowSuccess(true)
                setTimeout(() =>{
                    setsuccessMsg('')
                    setshowSuccess(false)  
                    history.push('/login')                
                },2500)
            }).catch(err =>{
                console.log(err.response)
                seterrMsg(err.response.data)
                setshowError(true)
                setTimeout(() =>{
                    seterrMsg('')                  
                    setshowError(false)
                },2500)
            })

        }else{
            seterrMsg('Fields cannot be empty')
            setshowError(true)
            setTimeout(() =>{
                seterrMsg('')               
                setshowError(false)
            },2500)
        }
        
    }
    
   return (
    <div className="container mt-5">
          
           <div className="row justify-content-center align-item-center mt-5">
            <div className="card mt-5 ">
                <h3 className="text-center">Reset Password</h3>
                <small className="text-dark">Please enter your email and new password </small>
                    {showError && <span className="text-danger text-center">{errMsg}</span> }
                    {showSuccess && <span className="text-success text-center">{successMsg}</span> }
                    <form onSubmit={handleSubmit}>                        
                          <div className="form-row mt-3">
                              <div className="col-md-12">
                                  <label><small>Email</small></label>
                                  <input type="email" name="email" value={state.email} onChange={handleChange}  className="form-control" placeholder="ben@gmail.com" />
                              </div>
                          </div>
                          <div className="form-row mt-3">
                                <label><small>Password</small></label>
                              <div className="col-md-12">
                                  <input type="password" name="password" value={state.password} onChange={handleChange}  className="form-control" placeholder="password" />
                              </div>
                          </div>
                          <button type="submit" className="mt-3 btn btn-block  text-light verify retrieve">Retrieve </button>


                    </form>
                </div>
            </div>
           </div>
            
       
   )
}

export default PasswordReset


