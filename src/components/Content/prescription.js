import React,{useState, useContext, createRef} from 'react'
import TopNav from '../../Sidebar/TopNav'
import {getDate, getTime} from '../helpers/helpers'
import { AppContext } from '../AppContext/AppContext'
const $ = window.$
const Prescription = () => {
    const {encounter,postFeedBack} = useContext(AppContext)  
    const ActivityIdRef  = React.createRef();
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
            console.log(res)
            setSuccessMessage("Feedback sent")
            setLoading(false)
            $('.bd-example-modal-sm').modal('toggle')
            setTimeout(() =>{
                $('.bd-example-modal-sm').modal('toggle')
             
            },1500)
            setPatientCompletedDosage('')
            setPatientCompletedDosageComment('')
            setPatientUsedPrescription(false)
            setPatientUsedPrescriptionComment('')

        }).catch(err =>{
            console.log(err.response)
            seterrMessage(err.response.data)
            alert("unable to send fedback")
            setLoading(false)
        })
    }
    return (
        <div id="content">
            <TopNav title="Prescription" />
            <div class="container">

                <div class="row">
                    <div class="col-md-6">
                        <a class="h-id btn border" href="">
                            <span>Hospital ID</span> <strong>0094567</strong>
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
                                <th scope="col">Prescription No</th>
                               
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
                                                        <span class="text-center text-success"> EN01</span>
                                                        <button data-toggle="collapse" data-target={`#demo${i}`}
                                                            class="view float-right"> Less <small><i class="las la-angle-up small-caret"></i></small></button>
                                                    </div>
                                                </div>
                                                {data.activities.map(e =>(
                                                    <>
                                                         {e.activity === 'Drug Prescription' ?  
                                                            <>
                                                            <div class="row mt-5">
                                                            <div class="col-md-6">
                                                                <p class="text-dark pt-2"><strong>{e.activity}</strong></p>
                                                            </div>
                                                            <div class="col-md-6 align-items-end">
                                                                    <a class="border rounded p-2 float-right ml-3" href="">
                                                                    <i class="lar la-clock"></i> {getTime(e.activityDate)}
                                                                </a>
                                                                <a class="border rounded p-2 float-right ml-3" href="">
                                                                    <i class="las la-calendar-day"></i> {getDate(e.activityDate)}
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
                                                                    {JSON.parse(e.activityDetails).map(detail=>(
                                                                    <tr>
                                                                        <td>{detail.Name}</td>
                                                                        <td className="text-center">{detail.Dosage}</td>
                                                                        <td className="text-center">{detail.Day}</td>
                                                                        <td className="text-center">{detail.Frequency}</td>
                                                                        <td>{detail.AdministrationRoute}</td>
                                                                        
                                                                    </tr>

                                                                 ))}       
                                                                    </tbody>
                                                                </table>
                                                            </div>
        
                                                        </div>
                                                         
                                                            <form onSubmit={handleSubmit} id="feedback" enctype="multipart/form-data">
                                                                <div class="row mt-5">
                                                                    <div class="col-md-12">
                                                                        <p class="text-dark">Did you use the prescription?</p>

                                                                    </div>
                                                                    <div class="col-md-3">
                                                                        <div class="form-group">
                                                                            
                                                                            <label className="pres-label" for="">
                                                                                <input onChange={(e)=> setPatientUsedPrescription(e.target.value)} value="fully"  type="radio" name="PatientUsedPrescription"  />Fully
                                                                                <span className="checkmark"></span> </label>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            
                                                                            <label className="pres-label" for="">
                                                                                <input onChange={(e)=> setPatientUsedPrescription(e.target.value)} value="partially" type="radio" name="PatientUsedPrescription"  />Partially
                                                                                <span className="checkmark"></span> </label>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            
                                                                            <label className="pres-label" for="">
                                                                                <input onChange={(e)=> setPatientUsedPrescription(e.target.value)} value="no" type="radio" name="PatientUsedPrescription"  />No
                                                                                <span className="checkmark"></span> </label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-8">
                                                                        <textarea placeholder="comment"
                                                                            class="row-card card bg-gray comment" onChange={(e) => setPatientUsedPrescriptionComment(e.target.value)} name={PatientUsedPrescriptionComment}
                                                                            id=""></textarea>
                                                                    </div>


                                                                </div>
                                                                <div class="row mt-5">
                                                                    <div class="col-md-12">
                                                                        <p class="text-dark">Did you complete the dosage?</p>

                                                                    </div>
                                                                    <div class="col-md-3">
                                                                        <div class="form-group">
                                                                        <label className="pres-label" for="">
                                                                            <input onChange={(e)=> setPatientCompletedDosage(e.target.value)} value="yes" type="radio" name={PatientCompletedDosage}  />Yes
                                                                            <span className="checkmark"></span> 
                                                                        </label>
                                                                        </div>
                                                                        <div class="form-group">                                                            
                                                                        <label className="pres-label" for="">
                                                                        <input onChange={(e)=> setPatientCompletedDosage(e.target.value)} value="no" type="radio" name={PatientCompletedDosage}  />No
                                                                                <span className="checkmark"></span> 
                                                                        </label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-8">
                                                                        <textarea placeholder="comment"
                                                                            class="row-card card bg-gray comment" onChange={(e) => setPatientCompletedDosageComment(e.target.value)} name={PatientCompletedDosageComment}
                                                                            id=""></textarea>
                                                                    </div>


                                                                </div>
                                                                <div class="row invisible">
                                                                <div class="form-group">                                                            
                                                                        <label className="pres-label" for="">
                                                                        <input ref={ActivityIdRef} defaultValue={e.activityId} type="text" className="form-control" style={{width: '100%'}}  />
                                                                                <span className="checkmark"></span> 
                                                                        </label>
                                                                        </div>
                                                                </div>

                                                                
                                                                {loading ? <div class="spinner-border text-success" role="status">
                                                                    <span class="sr-only">Loading...</span>
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
                <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm" role="document">
                      <div class="modal-content">
                        
                        <div class="modal-body mb-5">
                           <div class="row justify-content-center align-item-center">
                               <p class="mt-4 "><i class="las la-check-circle big text-center"></i></p>                               
                           </div>
                           <div class="row justify-content-center align-item-center">
                               <h2 class="mt-1 text-center">Success</h2> <br/>                                                   
                           </div>
                           <div class="row justify-content-center align-item-center">

                               <small class="text-dark">Feedback has been sent</small>                             
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
