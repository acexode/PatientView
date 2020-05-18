import React, { createContext,useEffect, useState } from "react";
import axios from "axios"
 
export const AppContext = createContext();

export const AppProvider = (props) => {
    const token = localStorage.getItem('token')
    const API = 'https://stagingapi.healthinabox.ng'
    const [hospitals, sethospitals] = useState([])
    const [encounter, setencounter] = useState([])
    const [patientInfo, setpatientInfo] = useState([])
    const [feedback, setfeedback] = useState()
    const [outlets, setoutlets] = useState()
    useEffect(() => {
        fetchHospitals()
        getFeedBack()
        // postFeedBack()
        getOutlets()
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
           localStorage.setItem('encounter', JSON.stringify(res.data))
            setencounter(res.data)
            return res.data
        })
        
    }
    const resendOTP = ()=>{
        return axios.post(`${API}/api/Hospitals/verify/resendotp`,  {headers: {'Authorization': `Bearer ${token}`}})
        
    }
    const resetPassword = (data)=>{
        return axios.post(`${API}/api/Auth/password/reset`, data, {headers: {'Authorization': `Bearer ${token}`}})
        
    }
    const getFeedBack = ()=>{
        let obj = {
            // encounterId: '294a45b5-cdbe-4291-b25a-1781135bc5e3',
            activityEntryId: 'be192955-1012-4a10-b298-0915301982b7'
        }
        
        axios.get(`${API}/api/feedback?activityEntryId=${obj.activityEntryId}`, {headers: {'Authorization': `Bearer ${token}`}})
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
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
        return axios.post(`${API}/api/Feedback`,userFeedback, config)
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
           // type =>  Lab, Radiology, Pharmacy   
        axios.get(`${API}/api/Outlet`,{headers: {'Authorization': `Bearer ${token}`}, body:{outletType: 'radiology'}})
        .then(res =>{
            setoutlets(res.data)
            console.log(res)           
        }).catch(err =>{
            console.log(err.response)
        })
        
    }
    return <AppContext.Provider
        value= {{hospitals, verifyPatient, verifyOTP, resendOTP, resetPassword,patientInfo, encounter, postFeedBack, outlets}}
>{props.children}</AppContext.Provider>
}