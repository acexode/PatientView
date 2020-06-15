import React,{useState, useContext, createRef, useEffect} from 'react'
import TopNav from '../../Sidebar/TopNav'
import {getDate, getTime, getOTPState, hospitalInfo} from '../helpers/helpers'
import { AppContext } from '../AppContext/AppContext'
import { useHistory } from 'react-router-dom'
import PrescriptionDetails from './encounter-details/prescription-details'
import PrintDownload from './reusables/print-download'
const $ = window.$

const Prescription = ({location}) => {
    let history = useHistory()
   
    const {encounter,postFeedBack, verifyPatient, getEncounters} = useContext(AppContext)  
    const ActivityIdRef  = createRef();
    const allencounters = encounter.length > 0 ? encounter : JSON.parse(localStorage.getItem('encounter')) 
    const [PatientUsedPrescription, setPatientUsedPrescription] = useState()
    const [PatientUsedPrescriptionComment, setPatientUsedPrescriptionComment] = useState('')
    const [PatientCompletedDosage, setPatientCompletedDosage] = useState()
    const [PatientCompletedDosageComment, setPatientCompletedDosageComment] = useState('')
    const [successmessage,setSuccessMessage] = useState('')
    
    const [errMessage, seterrMessage] = useState('')
    const [show,setShow] = useState(false)   
    const [loading,setLoading] = useState(false)
    const [ActivityEntryId , setActivityEntryId ] = useState()
    let otpState = getOTPState()    
    useEffect(() => {
        
        
    }, [otpState])
  
    if(otpState == null){   
        
        history.push("/encounter",  { info: "To view your prescription you must select your hospital and input hospital ID" })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();  
        
        setLoading(true)         
        const formData = new FormData();   
        formData.append('PatientUsedPrescription',PatientUsedPrescription)  
        formData.append('PatientUsedPrescriptionComment',PatientUsedPrescriptionComment)  
        formData.append('PatientCompletedDosage',PatientCompletedDosage)  
        formData.append('PatientCompletedDosageComment',PatientCompletedDosageComment)  
        formData.append('ActivityId',ActivityIdRef.current.value)         
        postFeedBack(formData).then(res =>{
            console.log('replaceState')
            console.log(res)
           
            setPatientCompletedDosageComment("")
            setPatientUsedPrescriptionComment("")
           
            setSuccessMessage("Feedback sent")
            setLoading(false)
            $('.bd-example-modal-sm').modal('toggle')
            setTimeout(() =>{
                $('.bd-example-modal-sm').modal('toggle')
                $('.collapse').collapse('hide')
             
            },1500)
            setPatientCompletedDosage('')
            setPatientCompletedDosageComment('')
           
            setPatientUsedPrescriptionComment('')

        }).catch(err =>{
            console.log(err.response)
            seterrMessage(err.response.data)
            alert("unable to send fedback")
            setLoading(false)
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
            <TopNav title="Prescription" />
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
                                <th scope="col">Prescription No</th>
                               
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {allencounters && allencounters.map((data, i)=>(
                            < >
                                   <tr>
                                <th scope="row">{data.encounterId}</th>
                                <td>{getDate(data.encounterDate)}</td>
                                <td>{data.encounterNumber}</td>                                
                                <td><a data-toggle="collapse" data-target={`#demo${i}`}
                                        className="view accordion-toggle">More</a></td>

                            </tr>
                            <tr>
                                <td colSpan="6" className="hiddenRow">
                                    <div className="accordian-body collapse" id={`demo${i}`}>
                                        <div className="row">
                                            <div className="card row-card">
                                                <PrintDownload index={i} />
                                                {data.activities.map(e =>(
                                                    <>
                                                         {e.activity === 'Drug Prescription' ?  
                                                            <>
                                                            <PrescriptionDetails activity={e} />
                                                            <form onSubmit={handleSubmit} id="feedback" encType="multipart/form-data">
                                                                <div className="row mt-5">
                                                                    <div className="col-md-12">
                                                                        <p className="text-dark">Did you use the prescription?</p>

                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            
                                                                            <label className="pres-label" htmlFor="">
                                                                                <input onChange={(e)=> setPatientUsedPrescription(e.target.value)} value="fully"  type="radio" name="PatientUsedPrescription"  />Fully
                                                                                <span className="checkmark"></span> </label>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            
                                                                            <label className="pres-label" htmlFor="">
                                                                                <input onChange={(e)=> setPatientUsedPrescription(e.target.value)} value="partially" type="radio" name="PatientUsedPrescription"  />Partially
                                                                                <span className="checkmark"></span> </label>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            
                                                                            <label className="pres-label" htmlFor="">
                                                                                <input onChange={(e)=> setPatientUsedPrescription(e.target.value)} value="no" type="radio" name="PatientUsedPrescription"  />No
                                                                                <span className="checkmark"></span> </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-8">
                                                                        <textarea placeholder="comment"
                                                                            className="row-card card bg-gray  comment" value={PatientUsedPrescriptionComment} onChange={(e) => setPatientUsedPrescriptionComment(e.target.value)} name={PatientUsedPrescriptionComment}
                                                                            id=""></textarea>
                                                                    </div>


                                                                </div>
                                                                <div className="row mt-5">
                                                                    <div className="col-md-12">
                                                                        <p className="text-dark">Did you complete the dosage?</p>

                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                        <label className="pres-label" htmlFor="">
                                                                            <input onChange={(e)=> setPatientCompletedDosage(e.target.value)} value="yes" type="radio" name={PatientCompletedDosage}  />Yes
                                                                            <span className="checkmark"></span> 
                                                                        </label>
                                                                        </div>
                                                                        <div className="form-group">                                                            
                                                                        <label className="pres-label" htmlFor="">
                                                                        <input onChange={(e)=> setPatientCompletedDosage(e.target.value)} value="no" type="radio" name={PatientCompletedDosage}  />No
                                                                                <span className="checkmark"></span> 
                                                                        </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-8">
                                                                        <textarea placeholder="comment"
                                                                            className="row-card card bg-gray comment" value={PatientCompletedDosageComment} onChange={(e) => setPatientCompletedDosageComment(e.target.value)} name={PatientCompletedDosageComment}
                                                                            id=""></textarea>
                                                                    </div>


                                                                </div>
                                                                <div className="row invisible">
                                                                <div className="form-group">                                                            
                                                                        <label className="pres-label" htmlFor="">
                                                                        <input ref={ActivityIdRef} defaultValue={e.activityId} type="text" className="form-control" style={{width: '100%'}}  />
                                                                                <span className="checkmark"></span> 
                                                                        </label>
                                                                        </div>
                                                                </div>

                                                                
                                                                {loading ? <div className="spinner-border text-success" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>: <div className="submit-section">
                                                                <button type="submit" className="btn verify text-light float-right">Submit Feedback</button>
                                                                </div>}
                                                            </form>

                                                            </>
                                                         : null}
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
                <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
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

export default Prescription
