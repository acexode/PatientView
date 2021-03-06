import React, { useState, useContext, useEffect } from 'react'
import TopNav from '../../../Sidebar/TopNav'
import UploadResult from '../uploadResult'
import { AppContext } from '../../AppContext/AppContext'
import {getDate, getTime, getOTPState,hospitalInfo} from '../../helpers/helpers'
import { useHistory } from 'react-router-dom'
import PrintDownload from '../reusables/print-download'
const $ = window.$
const LaboratoryResult = () => {
    let history = useHistory()
    const {encounter, postFeedBack, verifyPatient, getEncounters} = useContext(AppContext)  
    let allencounters = encounter.length > 0 ? encounter : JSON.parse(localStorage.getItem('encounter')) 
    const [PatientDidLabTest, setPatientDidLabTest] = useState(true) 
    const [PatientLabTestComment, setPatientLabTestComment] = useState('') 
    const [LabImages, setLabImages] = useState([])
    const [loading,setLoading] = useState(false)
    const [showThumbnails,setshowThumbnails] = useState(false)
    let otpState = getOTPState() 
    if(otpState == null){       
        history.push("/encounter",  { info: "To view your Laboratory result, you must select your hospital and input hospital ID" })
    }
    useEffect(() => {
       
    }, [LabImages])
    const ActivityIdRef  = React.createRef();
    const handleSubmit = (e) =>{
        e.preventDefault();        
        setLoading(true)
        const formData = new FormData(); 
        //formData.append('LabImages',LabImages)  
        formData.append('PatientDidLabTest',PatientDidLabTest)  
        formData.append('PatientLabTestComment',PatientLabTestComment)  
        formData.append('ActivityId',ActivityIdRef.current.value)  
        console.log(formData.get('LabImages'))
        console.log(formData.get('PatientDidLabTest'))
        console.log(formData.get('PatientLabTestComment'))        
        console.log(formData.get('ActivityId'))   
        
        if(LabImages!=null&&LabImages.length>0){
            LabImages.forEach(function(file) {
                formData.append('LabImages',file);
            });
        }
        
        postFeedBack(formData).then(res =>{
            console.log(res.data)
            setLoading(false)
            $('.bd-example-modal-sm').modal('toggle')
                    setTimeout(() =>{
                        $('.bd-example-modal-sm').modal('toggle')
                       setLabImages(null)
                       setPatientDidLabTest(true)
                       setPatientLabTestComment('')
                       $('.collapse').collapse('hide') 
                    },1500)
                    console.log(LabImages)
        }).catch(err =>{
            setLoading(false)
            setLabImages(null)
            console.log(err.response)
            alert("unable to send fedback")
        })
    }
    const retrieve = () =>{
        setLoading(true)      
     
        getEncounters().then(res =>{
            allencounters = res           
             setLoading(false)
           
        }).catch(err =>{
            console.log(err.response)
            setLoading(false)           
        })
    }

    return (
        <div id="content">
        <TopNav title="Laboratory Result" />
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
                            <th scope="col">Laboratory Request No</th>
                         
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                    <tbody>
                    { allencounters && allencounters.map((data, i)=>(
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
                                            <PrintDownload index={i} path="lab-results" />
                                            {data.activities.map(e =>(
                                                <>
                                                    {e.activity === 'Lab Request' ?
                                                     <>
                                                          <div className="row mt-5">
                                                <div className="col-md-6">
                                                    <p className="text-dark pt-2"><strong>Laboratory Request</strong></p>
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
                                            <form onSubmit={handleSubmit} id="feedback" enctype="multipart/form-data">
                                                <div className="row mt-5">
                                                    <div className="col-md-6">
                                                        <p className="text-dark pt-2"><strong>Feedback</strong></p>
                                                    </div>                                              
                                                    <div className="row invisible">
                                                                <div className="form-group">                                                            
                                                                        <label className="pres-label" for="">
                                                                        <input ref={ActivityIdRef} defaultValue={e.activityId} type="text"   />
                                                                                <span className="checkmark"></span> 
                                                                        </label>
                                                                        </div>
                                                                </div>
                                                    <div className="row-card feedback-card py-3">                                                        
                                                            <p className="pl-3 text-dark">Did you carry out the lab test</p>
                                                            <div className="form-group">
                                                                    
                                                                    <label className="pres-label" for="">
                                                                        <input value={PatientDidLabTest} checked={PatientDidLabTest} type="radio" onChange={() =>setPatientDidLabTest(true)} name="PatientDidLabTest"  />Yes
                                                                        <span className="checkmark"></span> </label>
                                                                </div>
                                                                <div className="form-group">
                                                                    
                                                                    <label className="pres-label" for="">
                                                                        <input type="radio" value ={PatientDidLabTest}  onChange={() =>setPatientDidLabTest(false)} name="PatientDidLabTest"  />No
                                                                        <span className="checkmark"></span> </label>
                                                                </div>
                                                       
                                                        {PatientDidLabTest ? 
                                                            <div className="row pl-5">
                                                                <p className="text-dark">Attach documents</p>
                                                                <UploadResult setImages={setLabImages} images={LabImages} />

                                                            </div>
                                                            : 
                                                            <div className="row pt-3">
                                                            
                                                            <textarea placeholder="comment"
                                                                className="row-card card bg-gray comment" onChange={() => setPatientLabTestComment} name="PatientLabTestComment"
                                                                id=""></textarea>
                                                        </div>
                                                        }
                                                      {loading ? <div className="spinner-border text-success" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>: <div className="submit-section">
                                                                <button type="submit" className="btn verify text-light float-right">Submit Feedback</button>
                                                                </div>}
                                                        
                                                    </div>

                                                </div>
                                                    

                                            </form>
                                                 
                                                 </>
                                                 
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
            <div className="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-sm" role="document">
                      <div className="modal-content">
                        
                        <div className="modal-body mb-5">
                           <div className="row justify-content-center align-item-center">
                               <p className="mt-4 "><i className="las la-check-circle big text-center"></i></p>                               
                           </div>
                           <div className="row justify-content-center align-item-center">
                               <h2 className="mt-1 text-center">Success</h2> <br/>                                                   
                           </div>
                           <div className="row justify-content-center align-item-center">

                               <small className="text-dark">Feedback has been sent</small>                             
                           </div>
                           
                        </div>
                        
                      </div>
                    </div>
                  </div>

        </div>
    </div>
    
    )
}

export default LaboratoryResult
