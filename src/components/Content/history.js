import React, { useContext,useEffect,useState } from 'react'
import TopNav from '../../Sidebar/TopNav'
import download from '../../assets/Icon feather-download.svg'
import printer from '../../assets/Icon feather-printer.svg'
import { AppContext } from '../AppContext/AppContext'
import { getDate, getTime, getOTPState,hospitalInfo } from '../helpers/helpers'
import { useHistory, Link } from 'react-router-dom'
import PrescriptionDetails from './encounter-details/prescription-details'
import LaboratoryRequestDetails from './encounter-details/laboratory-request-details'
import RadiologyRequestDetails from './encounter-details/radiology-request-details'
import DiagnosisDetails from './encounter-details/diagnosis'
import PrintDownload from './reusables/print-download'
import PrintModal from './reusables/print-modal'
const $ = window.$

const EncounterHistory = () => {
    let history = useHistory()
    const {hospitals, verifyPatient,encounter, getEncounters} = useContext(AppContext)
    const [loading,setLoading] = useState(false)
    const allEncounters = encounter.length > 0 ? encounter : JSON.parse(localStorage.getItem('encounter'))
    console.log(allEncounters)
    useEffect(() => {
        getEncounters()
    }, [])
    let otpState = getOTPState()    
    useEffect(() => {
        
        
    }, [otpState])
  
    if(otpState == null){           
        history.push("/encounter")
    }
    // console.log(allEncounters)
    const retrieve = () =>{
        setLoading(true)      
     
        getEncounters().then(res =>{
            allEncounters = res           
             setLoading(false)
           
        }).catch(err =>{
            console.log(err.response)
            setLoading(false)          
        })
    }

   
    return (
        <div id="content" >
        <TopNav title="Encounter History" />
        
               
        <div className="container">              
               
               <div className="row">
                   <div className="col-md-6">
                       <a className="h-id btn border" href="">
                           <span>Hospital ID</span> <strong>{ hospitalInfo() && hospitalInfo().hospitalNumber}</strong>
                       </a>
                   </div>
                   <div className="col-md-6">
                       
                   <button onClick={retrieve}  className="btn text-light float-right verify">
                   {loading ? <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                        </div>: <div className="submit-section">Retrieve</div>}
                   </button>
                   </div>
               </div>   
             <div className="row">
               <table className="table table-condensed mb-5 pb-5" style={{borderCollapse:'collapse'}}>
                   <thead>
                       <tr>
                           <th scope="col">Encounter Number</th>
                           <th scope="col">Encounter Date</th>
                           <th scope="col">Call Desk</th>                           
                           <th scope="col">Action</th>
                         </tr>
                   </thead>
                   <tbody>
                       {allEncounters && allEncounters.map((data, i)=>(
                           <>
                           
                       <tr>
                           <th scope="row">{data.encounterNumber}</th>
                       <td>{new Date(data.encounterDate).toDateString()}</td>
                       <td>{data.callDesk}</td>
                       
                       <td><a  data-toggle="collapse" data-target={`#demo${i}`} className="view accordion-toggle">More</a></td>
                       
                       </tr>
                       <tr >
                           <td colSpan="6" className="hiddenRow"><div className="accordian-body collapse" id={`demo${i}`}> 
                               <div className="row">
                                   <div className="card row-card">
                                       
                                       <PrintDownload index={i} />
                                       <div className="row">
                                           <p className="text-dark">Provisional Diagnosis</p>
                                           <textarea className="row-card bg-gray comment " placeholder="Doctor Comment">
                                               
                                           </textarea>
                                       </div>
                                       {data.activities.map(activity => (
                                           <>
                                            {activity.activity === 'Diagnosis' ? 
                                                 <DiagnosisDetails activity={activity} /> :
                                            activity.activity === 'Drug Prescription' ? 
                                                 <PrescriptionDetails activity={activity} />
                                       : activity.activity === 'Lab Request' ?      
                                        <LaboratoryRequestDetails activity={activity} />
                                       : activity.activity === 'Radiology Request' ?
                                  <RadiologyRequestDetails activity={activity} />         
                               : null
                                        
                                        }
                                           </>
                                       ))}
                                      
                                       
                                       
                                   
                                   </div>
                               </div>
                           
                           
                           </div> </td>
                       </tr>
                           </>
                       ))}
                       
                   </tbody>
               </table>   
             </div>
            
           </div>
        </div>
    )
}

export default EncounterHistory
