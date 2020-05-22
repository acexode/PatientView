import React, { useContext,useEffect,useState } from 'react'
import TopNav from '../../Sidebar/TopNav'
import { AppContext } from '../AppContext/AppContext'
import { getDate, getTime, getOTPState,hospitalInfo } from '../helpers/helpers'
import { useHistory, Link } from 'react-router-dom'
const $ = window.$

const EncounterHistory = () => {
    let history = useHistory()
    const {hospitals, verifyPatient,encounter} = useContext(AppContext)
    const [loading,setLoading] = useState(false)
    const allEncounters = encounter.length > 0 ? encounter : JSON.parse(localStorage.getItem('encounter'))
    useEffect(() => {
       
    }, [encounter])
    // console.log(allEncounters)
    const retrieve = () =>{
        setLoading(true)
        let data = {
            "hospitalId": hospitalInfo().hospitalId,
            "hospitalNumber": hospitalInfo().hospitalNumber
        }
        history.push('/verify-code')
        console.log(data)
        verifyPatient(data).then(res =>{
            console.log(res)
             setLoading(false)
            history.push('/verify-code')
        }).catch(err =>{
            console.log(err.response)
            setLoading(false)
            // seterrMsg(err.response.data)
            // setshowError(true)
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
                                                                </div>: <div className="submit-section">
                                                                Retrieve
                                                                </div>}
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
                                       <div className="row">
                                          <div className="col-md-12">
                                           <span className="text-center text-success"> EN01</span>
                                           <button data-toggle="collapse" data-target={`#demo${i}`} className="view float-right" > Less</button>
                                          </div>
                                       </div>
                                       <div className="row">
                                           <p className="text-dark">Medical Summary</p>
                                           <div className="row-card bg-gray p-4">
                                               
                                           </div>
                                       </div>
                                       {data.activities.map(activity => (
                                           <>
                                            {activity.activity === 'Drug Prescription' ? 
                                                 <div className="row mt-5">
                                                 <div className="col-md-6">
                                                     <p className="text-dark pt-2"><strong>{activity.activity}</strong></p>
                                                 </div>
                                                 <div className="col-md-6 align-items-end">
                                                     <a className="border rounded p-2 float-right ml-3" href="">
                                                         <i className="las la-calendar-day"></i>  {getDate(activity.activityDate)}
                                                     </a>
                                                     <a className="border rounded p-2 float-right ml-3" href="">
                                                         <i className="lar la-clock"></i> {getTime(activity.activityDate)}
                                                     </a>
                                                 </div>
                                                                                                
                                                     <div className="row-card ">
                                                         <table className="nested-table">
                                                             <thead>
                                                                 <tr>
                                                                     <th scope="col">Name</th>
                                                                     <th scope="col">Dosage</th>
                                                                     <th scope="col">Day</th>
                                                                     <th scope="col">Frequency</th>
                                                                     <th scope="col">Aministration Route</th> 
                                                                 </tr>
                                                             </thead>
                                                             <tbody>
                                                                 {JSON.parse(activity.activityDetails).map(detail=>(
                                                                    <tr>
                                                                        <td>{detail.Name}</td>
                                                                        <td>{detail.Dosage}</td>
                                                                        <td>{detail.Day}</td>
                                                                        <td>{detail.Frequency}</td>
                                                                        <td>{detail.AdministrationRoute}</td>
                                                                        
                                                                    </tr>

                                                                 ))}                                                                
                                                             </tbody>
                                                         </table>
                                                     </div>
                                                 
                                             </div>
                                       : activity.activity === 'Lab Request' ?      
                                       <div className="row mt-5">
                                       <div className="col-md-6">
                                           <p className="text-dark pt-2"><strong>{activity.activity}</strong></p>
                                       </div>
                                       <div className="col-md-6 align-items-end">
                                           <a className="border rounded p-2 float-right ml-3" href="">
                                               <i className="las la-calendar-day"></i>  {getDate(activity.activityDate)}
                                           </a>
                                           <a className="border rounded p-2 float-right ml-3" href="">
                                               <i className="lar la-clock"></i> {getTime(activity.activityDate)}
                                           </a>
                                       </div>                                                                                               
                                           <div className="row-card ">
                                               <table className="nested-table">
                                                   <thead>
                                                       <tr>
                                                           <th scope="col">Name</th>
                                                           <th scope="col">Specimen</th>
                                                           <th scope="col">Comment</th>
                                                           <th scope="col">Raise By</th>                                                                    
                                                       </tr>
                                                   </thead>
                                                   <tbody>
                                                   {JSON.parse(activity.activityDetails).map(detail=>(
                                                        <tr>
                                                            <td>{detail.Name}</td>
                                                            <td>{detail.Specimen}</td>
                                                            <td>{detail.Comment}</td>
                                                            <td>{activity.activityBy}</td>                                                                                                                                   
                                                        </tr>

                                                                 ))}
                                                                                                                 
                                                   </tbody>
                                               </table>
                                           </div>
                                       
                                   </div>
                                   : activity.activity === 'Radiology Request' ?
                                   <div className="row mt-5">
                                   <div className="col-md-6">
                                       <p className="text-dark pt-2"><strong>{activity.activity}</strong></p>
                                   </div>
                                   <div className="col-md-6 align-items-end">
                                       <a className="border rounded p-2 float-right ml-3" href="">
                                           <i className="las la-calendar-day"></i>  {getDate(activity.activityDate)}
                                       </a>
                                       <a className="border rounded p-2 float-right ml-3" href="">
                                           <i className="lar la-clock"></i> {getTime(activity.activityDate)}
                                       </a>
                                   </div>                                                                                               
                                       <div className="row-card mb-3">
                                           <table className="nested-table">
                                               <thead>
                                                   <tr>
                                                       <th scope="col">Name</th>
                                                       <th scope="col">Examination Required</th>
                                                       <th scope="col">Comment</th>
                                                       <th scope="col">Raise By</th>                                                                    
                                                   </tr>
                                               </thead>
                                               <tbody>
                                               {JSON.parse(activity.activityDetails).map(detail=>(
                                                    <tr>
                                                        <td>{detail.Name}</td>
                                                        <td>{detail.ExaminationRequired}</td>
                                                        <td>{detail.Comment}</td>
                                                        <td>{activity.activityBy}</td>                                                        
                                                                        
                                                    </tr>

                                                                 ))}                                                              
                                               </tbody>
                                           </table>
                                       </div>
                                   
                               </div> : null
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
