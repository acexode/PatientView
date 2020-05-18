import React, { useState,useContext } from 'react'
import TopNav from '../../../Sidebar/TopNav'
import UploadResult from '../uploadResult'
import { AppContext } from '../../AppContext/AppContext'
import { useHistory } from 'react-router-dom'
import {getDate, getTime, getOTPState, hospitalInfo} from '../../helpers/helpers'
const $ = window.$
const RadiologyResult = () => {
    let history = useHistory()
    const {encounter, postFeedBack} = useContext(AppContext) 
    const allencounters = encounter.length > 0 ? encounter : JSON.parse(localStorage.getItem('encounter'))  
    const [PatientDidRadTest, setPatientDidRadTest] = useState(true) 
    const [PatientRadTestComment, setPatientRadTestComment] = useState('') 
    const [RadiologyImages, setRadiologyImages] = useState([])
    const ActivityIdRef  = React.createRef();
    const [loading,setLoading] = useState(false)
    let otpState = getOTPState() 
    if(otpState == null){         
        history.push("/encounter",  { info: "To view your Radiology Result, you must select your hospital and input hospital ID" })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();        
        setLoading(true)
        const formData = new FormData();
        formData.append('RadiologyImages',RadiologyImages[0])  
        formData.append('PatientDidRadTest',PatientDidRadTest)  
        formData.append('PatientRadTestComment',PatientRadTestComment)  
        formData.append('ActivityId',ActivityIdRef.current.value)       
        console.log(formData.get('RadiologyImages'))
        console.log(formData.get('PatientDidRadTest'))
        console.log(formData.get('PatientRadTestComment'))
        console.log(formData.get('ActivityId'))
        
       
        postFeedBack(formData).then(res =>{
            console.log(res)
            $('.bd-example-modal-sm').modal('toggle')
            setLoading(false)
            setTimeout(() =>{
                $('.bd-example-modal-sm').modal('toggle')
                setRadiologyImages(null)
                setPatientDidRadTest(true)
                setPatientRadTestComment('')
            },1500)

        }).catch(err =>{
            setLoading(false)
            setRadiologyImages(null)
            console.log(err.response)
            alert("unable to send fedback")
        })
    }
    return (
        <div id="content">
        <TopNav title="Laboratory Result" />
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
                                                    {e.activity === 'Radiology Request' ?
                                                     <>
                                                          <div class="row mt-5">
                                                <div class="col-md-6">
                                                    <p class="text-dark pt-2"><strong>Radiology Request</strong></p>
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
                                                                <th scope="col">Examination required</th>
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
                                                <div class="row mt-5">
                                                    <div class="col-md-6">
                                                        <p class="text-dark pt-2"><strong>Feedback</strong></p>
                                                    </div>                                              
                                                    <div class="row invisible">
                                                                <div class="form-group">                                                            
                                                                        <label className="pres-label" for="">
                                                                        <input ref={ActivityIdRef}  defaultValue={e.activityId} type="text"   />
                                                                                <span className="checkmark"></span> 
                                                                        </label>
                                                                        </div>
                                                                </div>
                                                    <div class="row-card feedback-card py-3">                                                        
                                                            <p className="pl-3 text-dark">Did you carry out the test</p>
                                                            <div class="form-group">
                                                                    
                                                                    <label className="pres-label" for="">
                                                                        <input value={PatientDidRadTest} checked={PatientDidRadTest} type="radio" onChange={() =>setPatientDidRadTest(true)} name="PatientDidRadTest"  />Yes
                                                                        <span className="checkmark"></span> </label>
                                                                </div>
                                                                <div class="form-group">
                                                                    
                                                                    <label className="pres-label" for="">
                                                                        <input type="radio" value ={PatientDidRadTest}  onChange={() =>setPatientDidRadTest(false)} name="PatientDidRadTest"  />No
                                                                        <span className="checkmark"></span> </label>
                                                                </div>
                                                       
                                                        {PatientDidRadTest ? 
                                                            <div className="row pl-5">
                                                                <p className="text-dark">Attach documents</p>
                                                                <UploadResult setImages={setRadiologyImages} images={RadiologyImages} />

                                                            </div>
                                                            : 
                                                            <div className="row pt-3">
                                                            
                                                            <textarea placeholder="comment"
                                                                class="row-card card bg-gray comment" onChange={() => setPatientRadTestComment} name="PatientRadTestComment"
                                                                id=""></textarea>
                                                        </div>
                                                        }
                                                        {loading ? <div class="spinner-border text-success" role="status">
                                                                    <span class="sr-only">Loading...</span>
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

export default RadiologyResult
