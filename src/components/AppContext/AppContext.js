import React, { createContext,useEffect, useState } from "react";
import axios from "axios"
 
export const AppContext = createContext();

export const AppProvider = (props) => {
    const token = localStorage.getItem('token')
    const API = 'https://stagingapi.healthinabox.ng'
    const [hospitals, sethospitals] = useState([])
    const [encounter, setencounter] = useState()
    const [patientInfo, setpatientInfo] = useState()
    useEffect(() => {
        fetchHospitals()
    }, [])
    const fetchHospitals = ()=>{
        axios.get(`${API}/api/Hospitals`,{headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {   
            console.log(res.data) 
            sethospitals(res.data)        
        }).catch(err =>{
            console.log(err.response)
        })
    }
    const verifyPatient = (data)=>{
        return axios.post(`${API}/api/Hospitals/verify/patient`, data, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{
            setpatientInfo(res.data)
        })
    }
    const verifyOTP = (data)=>{
        return axios.post(`${API}/api/Hospitals/verify/otp`, data, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{
            setencounter(res.data)
        })
        
    }
    const resendOTP = ()=>{
        return axios.post(`${API}/api/Hospitals/verify/resendotp`,  {headers: {'Authorization': `Bearer ${token}`}})
        
    }
    const resetPassword = (data)=>{
        return axios.post(`${API}/api/Auth/password/reset`, data, {headers: {'Authorization': `Bearer ${token}`}})
        
    }
    return <AppContext.Provider
        value= {{hospitals, verifyPatient, verifyOTP, resendOTP, resetPassword,patientInfo, encounter}}
>{props.children}</AppContext.Provider>
}