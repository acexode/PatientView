import React, { useContext,useEffect } from 'react'
import TopNav from '../../Sidebar/TopNav'
import { AppContext } from '../AppContext/AppContext'
import { getDate, getTime, getOTPState,hospitalInfo } from '../helpers/helpers'
import { useHistory } from 'react-router-dom'


const EncounterHistory = () => {
    let history = useHistory()
    const {hospitals, verifyPatient,encounter} = useContext(AppContext)
    const allEncounters = encounter.length > 0 ? encounter : JSON.parse(localStorage.getItem('encounter'))
    console.log(hospitalInfo)
    useEffect(() => {
       
    }, [encounter])
    console.log(allEncounters)
   
    return (
        <div id="content">
        <TopNav title="Encounter History" />
       
        <div class="container"> 
               
               <div class="row">
                   <div class="col-md-6">
                       <a class="h-id btn border" href="">
                           <span>Hospital ID</span> <strong>{hospitalInfo().hospitalId}</strong>
                       </a>
                   </div>
                   <div class="col-md-6">
                       <button class="btn text-light float-right verify">Retrieve</button>
                   </div>
               </div>                  
                        
                 
             <div class="row">
               <table class="table table-condensed mb-5 pb-5" style={{borderCollapse:'collapse'}}>
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
                       
                       <td><a  data-toggle="collapse" data-target={`#demo${i}`} class="view accordion-toggle">More</a></td>
                       
                       </tr>
                       <tr >
                           <td colspan="6" class="hiddenRow"><div class="accordian-body collapse" id={`demo${i}`}> 
                               <div class="row">
                                   <div class="card row-card">
                                       <div class="row">
                                          <div class="col-md-12">
                                           <span class="text-center text-success"> EN01</span>
                                           <button data-toggle="collapse" data-target={`#demo${i}`} class="view float-right" > Less</button>
                                          </div>
                                       </div>
                                       <div class="row">
                                           <p class="text-dark">Medical Summary</p>
                                           <div class="row-card bg-gray p-4">
                                               
                                           </div>
                                       </div>
                                       {data.activities.map(activity => (
                                           <>
                                            {activity.activity === 'Drug Prescription' ? 
                                                 <div class="row mt-5">
                                                 <div class="col-md-6">
                                                     <p class="text-dark pt-2"><strong>{activity.activity}</strong></p>
                                                 </div>
                                                 <div class="col-md-6 align-items-end">
                                                     <a class="border rounded p-2 float-right ml-3" href="">
                                                         <i class="las la-calendar-day"></i>  {getDate(activity.activityDate)}
                                                     </a>
                                                     <a class="border rounded p-2 float-right ml-3" href="">
                                                         <i class="lar la-clock"></i> {getTime(activity.activityDate)}
                                                     </a>
                                                 </div>
                                                                                                
                                                     <div class="row-card ">
                                                         <table class="nested-table">
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
                                       <div class="row mt-5">
                                       <div class="col-md-6">
                                           <p class="text-dark pt-2"><strong>{activity.activity}</strong></p>
                                       </div>
                                       <div class="col-md-6 align-items-end">
                                           <a class="border rounded p-2 float-right ml-3" href="">
                                               <i class="las la-calendar-day"></i>  {getDate(activity.activityDate)}
                                           </a>
                                           <a class="border rounded p-2 float-right ml-3" href="">
                                               <i class="lar la-clock"></i> {getTime(activity.activityDate)}
                                           </a>
                                       </div>                                                                                               
                                           <div class="row-card ">
                                               <table class="nested-table">
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
                                   <div class="row mt-5">
                                   <div class="col-md-6">
                                       <p class="text-dark pt-2"><strong>{activity.activity}</strong></p>
                                   </div>
                                   <div class="col-md-6 align-items-end">
                                       <a class="border rounded p-2 float-right ml-3" href="">
                                           <i class="las la-calendar-day"></i>  {getDate(activity.activityDate)}
                                       </a>
                                       <a class="border rounded p-2 float-right ml-3" href="">
                                           <i class="lar la-clock"></i> {getTime(activity.activityDate)}
                                       </a>
                                   </div>                                                                                               
                                       <div class="row-card mb-3">
                                           <table class="nested-table">
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
