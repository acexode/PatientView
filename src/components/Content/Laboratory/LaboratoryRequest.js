import React, { useContext } from 'react'
import TopNav from '../../../Sidebar/TopNav'
import { AppContext } from '../../AppContext/AppContext'
import {getDate, getTime, getOTPState, hospitalInfo} from '../../helpers/helpers'
import { useHistory } from 'react-router-dom'

const LaboratoryRequest = () => {
    const {encounter} = useContext(AppContext)  
    let history = useHistory()  
    let otpState = getOTPState() 
    if(otpState == null){       
        history.push("/encounter",  { info: "To view your Laboratory request, you must select your hospital and input hospital ID" })
    }
    const allencounters = encounter.length > 0 ? encounter : JSON.parse(localStorage.getItem('encounter'))  
    return (
        <div id="content">
        <TopNav title="Laboratory Request" />
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
                <table class="table table-condensed" style={{borderCollapse:'collapse'}}>
                    <thead>
                        <tr>
                            <th scope="col">Encounter ID</th>
                            <th scope="col">Encounter Date</th>
                            <th scope="col">Laboratory Request No</th>
                         
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {allencounters && allencounters.map((data, i)=>(
                           <>

                        <tr>
                            <th scope="row">{data.encounterId}</th>
                            <td>{getDate(data.encounterDate)}</td>
                            <td>{data.encounterNumber}</td>                            
                            <td><a data-toggle="collapse" data-target={`#demo${i}`}
                                    class="view accordion-toggle">More</a></td>

                        </tr>
                        <tr>
                            <td colspan="6" class="hiddenRow">
                                <div class="accordian-body collapse" id={`demo${i}`}>
                                    <div class="row">
                                        <div class="card row-card">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <span class="text-center text-success"> {data._id}</span>
                                                    <button data-toggle="collapse" data-target={`#demo${i}`}
                                                        class="view float-right"> Less <small><i class="las la-angle-up small-caret"></i></small></button>
                                                </div>
                                            </div>
                                            {data.activities.map(e =>(
                                                <>
                                                    {e.activity === 'Lab Request' ?
                                                     <div class="row mt-5">
                                                     <div class="col-md-6">
                                                         <p class="text-dark pt-2"><strong>Laboratory Request</strong></p>
                                                     </div>
                                                     <div class="col-md-6 align-items-end">
                                                         <a class="border rounded p-2 float-right ml-3" href="">
                                                             <i class="lar la-clock"></i> {getTime(e.activityDate)}
                                                         </a>
                                                         <a class="border rounded p-2 float-right ml-3" href="">
                                                             <i class="las la-calendar-day"></i> {getDate(e.activityDate)}
                                                         </a>
                                                     </div>
     
                                                     <div class="row-card py-3">
                                                         <table class="nested-table">
                                                             <thead>
                                                                 <tr>
                                                                     <th scope="col">Name</th>
                                                                     <th scope="col">Specimen</th>
                                                                     <th scope="col">Comment</th>                                                                
                                                                     <th scope="col">Raised by</th>
                                                                 </tr>
                                                             </thead>
                                                             <tbody className="pb-5 mb-5">
                                                             {JSON.parse(e.activityDetails).map(detail=>(
                                                                <tr>
                                                                    <td>{detail.Name}</td>
                                                                    <td>{detail.Specimen}</td>
                                                                    <td>{detail.Comment}</td>
                                                                    <td>{e.activityBy}</td>                                                                                                                                   
                                                                </tr>

                                                                 ))}
                                                                
                                                             </tbody>
                                                         </table>
                                                     </div>
     
                                                 </div>
                                                 
                                                    : null
                                                }
                                                </>
                                               

                                            ))}
                                            
                                        </div>

                                    </div>
                                    </div>
                            </td>
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

export default LaboratoryRequest
