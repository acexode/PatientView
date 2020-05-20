import React, { useContext, useState } from 'react'
import TopNav from '../../../Sidebar/TopNav'
import { AppContext } from '../../AppContext/AppContext'
import {getDate, getTime, getOTPState, hospitalInfo} from '../../helpers/helpers'
import { useHistory } from 'react-router-dom'

const RadiologyRequest = () => {
    const {encounter,verifyPatient} = useContext(AppContext)  
    const [loading, setLoading] = useState(false)
    console.log(encounter.length) 
    let history = useHistory()  
    let otpState = getOTPState() 
    if(otpState == null){      
        history.push("/encounter",  { info: "To view your Radiology request, you must select your hospital and input hospital ID" })
    }
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
    const allencounters = encounter.length > 0 ? encounter : JSON.parse(localStorage.getItem('encounter'))  
    return (
        <div id="content">
        <TopNav title="Radiology Request" />
        <div className="container">

            <div className="row">
                <div className="col-md-6">
                    <a className="h-id btn border" href="">
                        <span>Hospital ID</span> <strong>{hospitalInfo() && hospitalInfo().hospitalNumber}</strong>
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
                <table className="table table-condensed" style={{borderCollapse:'collapse'}}>
                    <thead>
                        <tr>
                            <th scope="col">Encounter ID</th>
                            <th scope="col">Encounter Date</th>
                            <th scope="col">Radiology Request No</th>
                           
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
                                    className="view accordion-toggle">More</a></td>

                        </tr>
                        <tr>
                            <td colspan="6" className="hiddenRow">
                                <div className="accordian-body collapse" id={`demo${i}`}>
                                    <div className="row">
                                        <div className="card row-card">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="text-center text-success"> {data._id}</span>
                                                    <button data-toggle="collapse" data-target={`#demo${i}`}
                                                        className="view float-right"> Less <small><i className="las la-angle-up small-caret"></i></small></button>
                                                </div>
                                            </div>
                                            {data.activities.map(e =>(
                                                <>
                                                    {e.activity === 'Radiology Request' ?
                                                     <div className="row mt-5">
                                                     <div className="col-md-6">
                                                         <p className="text-dark pt-2"><strong>{e.activity}</strong></p>
                                                     </div>
                                                     <div className="col-md-6 align-items-end">
                                                         <a className="border rounded p-2 float-right ml-3" href="">
                                                             <i className="lar la-clock"></i> {getTime(e.activityDate)}
                                                         </a>
                                                         <a className="border rounded p-2 float-right ml-3" href="">
                                                             <i className="las la-calendar-day"></i> {getDate(e.activityDate)}
                                                         </a>
                                                     </div>
     
                                                     <div className="row-card py-3">
                                                         <table className="nested-table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Name</th>                                                              
                                                                    <th scope="col">Comment</th>                                                                
                                                                    <th scope="col">Raised by</th>
                                                                </tr>
                                                            </thead>    
                                                             <tbody className="pb-5 mb-5">
                                                             {JSON.parse(e.activityDetails).map(detail=>(
                                                                <tr>
                                                                    <td>{detail.Name}</td>                                                                  
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

export default RadiologyRequest
