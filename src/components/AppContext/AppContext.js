import React, { createContext,useEffect, useState } from "react";
import config from '../../config.json';
import axios from "axios"
 
export const AppContext = createContext();


export const AppProvider = (props) => {
    const API = 'https://stagingapi.healthinabox.ng/api/'
    const [hospitals, sethospitals] = useState([])
    const [encounter, setencounter] = useState([])
    const [patientInfo, setpatientInfo] = useState([])
    const [feedback, setfeedback] = useState()
    const [outlets, setoutlets] = useState()
    useEffect(() => {
        fetchHospitals()
         getEncounters()
        
        
        getOutlets()
    }, [])
    const fetchHospitals = ()=>{
        const token = localStorage.getItem('token')
        axios.get(`${config.BASE_URL}Hospitals`,{headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {   
            // console.log(res.data) 
            sethospitals(res.data)        
        }).catch(err =>{
            console.log(err.response)
        })
    }
    const verifyPatient = (data)=>{
        const token = localStorage.getItem('token')
        return axios.post(`${config.BASE_URL}Hospitals/verify/patient`, data, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{
            setpatientInfo(res.data)
        })
    }
    const verifyOTP = (data)=>{
        const token = localStorage.getItem('token')
        return axios.post(`${config.BASE_URL}Hospitals/verify/otp`, data, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{
           localStorage.setItem('encounter', JSON.stringify(res.data))
            setencounter(res.data)
            return res.data
        })
        
    }
    const getEncounters = ()=>{
        const token = localStorage.getItem('token')
        return axios.get(`${config.BASE_URL}Hospitals/encounters`,{headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{
           localStorage.setItem('encounter', JSON.stringify(res.data))
           console.log(res.data)
           if(res.data.length > 0){
            localStorage.setItem('noOTP', true)
           }
            setencounter(res.data)
            return res.data
        })
        
    }
    const resendOTP = ()=>{
        const token = localStorage.getItem('token')
        return axios.post(`${config.BASE_URL}Hospitals/verify/resendotp`,{},  {headers: {'Authorization': `Bearer ${token}`}})
        
    }
    const resetPassword = (data)=>{
        const token = localStorage.getItem('token')
        return axios.post(`${config.BASE_URL}Auth/password/reset`, data, {headers: {'Authorization': `Bearer ${token}`}})
        
    }
    const getFeedBack = (activityId)=>{
        const token = localStorage.getItem('token')        
        
        axios.get(`${config.BASE_URL}Feedback?activityId=${activityId}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{
            console.log(res)
            // const fileData = JSON.stringify(res.data);
            // const blob = new Blob([fileData], {type: "text/plain"});
            // const url = URL.createObjectURL(blob);
            // const link = document.createElement('a');
            // link.download = 'filename.json';
            // link.href = url;
            // link.click();
       }).catch(err =>{
           console.log(err.response)
        })
        
    }

    const postFeedBack = (userFeedback)=>{  
        const token = localStorage.getItem('token')     
        const headerConfig = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
        return axios.post(`${config.BASE_URL}Feedback`,userFeedback, headerConfig)
        // .then(res =>{
            // console.log(res.data)
            // const fileData = JSON.stringify(res.data);
            // const blob = new Blob([fileData], {type: "text/plain"});
            // const url = URL.createObjectURL(blob);
            // const link = document.createElement('a');
            // link.download = 'filename.json';
            // link.href = url;
            // link.click();
        // }).catch(err =>{
        //     console.log(err.response)
       // })
        
    }
    const getOutlets = ()=>{
        const token = localStorage.getItem('token')
           // type =>  Lab, Radiology, Pharmacy   
        axios.get(`${config.BASE_URL}Outlet`,{headers: {'Authorization': `Bearer ${token}`}, body:{outletType: 'radiology'}})
        .then(res =>{
            setoutlets(res.data)
             console.log(res)           
        }).catch(err =>{
            console.log(err.response)
        })
        
    }
    return <AppContext.Provider
        value= {{fetchHospitals, getEncounters, hospitals, verifyPatient, verifyOTP, resendOTP, resetPassword,patientInfo, encounter, postFeedBack,getFeedBack, outlets}}
>{props.children}</AppContext.Provider>
}