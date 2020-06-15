import React, { useState, useContext, useEffect } from 'react'
import TopNav from '../../../Sidebar/TopNav'
import UploadResult from '../uploadResult'
import { AppContext } from '../../AppContext/AppContext'
import {getDate, getTime, getOTPState,hospitalInfo} from '../../helpers/helpers'
import pdfIcon from '../../../assets/Icon awesome-file-pdf.svg'
import printer from '../../../assets/Icon feather-printer.svg'
import download from '../../../assets/Icon feather-download.svg'
import { useHistory } from 'react-router-dom'
const $ = window.$
const LaboratoryResultView = () => {
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
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="text-center text-success"> {data._id}</span>
                                                    <button data-toggle="collapse" data-target={`#demo${i}`}
                                                        className="view float-right"> Less <small><i className="las la-angle-up small-caret"></i></small></button>
                                                </div>
                                            </div>
                                            {data.activities.map(e =>(
                                                <>
                                                    {e.activity === 'Lab Request' ?
                                                     <>
                                                          <div className="row mt-5">
                                                <div className="col-md-6">
                                                    <p className="text-dark pt-2"><th>Laboratory Results</th></p>
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

                                                <div className="row-card py-3 my-3">
                                                <div className="col-md-6">
                                                    <p className="text-dark pt-2"><th>Laboratory results view</th></p>
                                                </div>
                                                    <table className="nested-table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">S/N</th>
                                                                <th scope="col">Description</th>
                                                                <th scope="col">Action</th>                                                                
                                                                
                                                            </tr>
                                                        </thead>
                                                        <tbody className="pb-5 mb-5">
                                                            {JSON.parse(e.activityDetails).map((detail, i)=>(
                                                                <tr>
                                                                    {console.log(JSON.parse(e.activityDetails))}
                                                                    {console.log(e)}
                                                                    <td>{i +  1}</td>
                                                                    <td>{detail.Name}</td>
                                                                    <td><a className="view accordion-toggle"  data-toggle="modal" data-target="#feedback">View</a></td>                                                                                                                                                                                               
                                                                </tr>

                                                                 ))}
                                                            
                                                           
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                            
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
            <div className="modal fade pb-3" id="feedback" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"style={{left:'25vw'}} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                    
                      <div className="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Laboratory result</h5>
                        <div  class="close d-flex justify-content-end">                       
                        <span className="feedback-control" aria-hidden="true"><img src={printer} /></span>                        
                        <span className="feedback-control" aria-hidden="true"><img src={download} /></span>                        
                        </div>                       
                    </div>
                        <div className="modal-body  py-3">
                           <div className="row justify-content-center align-item-center">                                
                               <img className="my-3" style={{width:'40%', height:'40%'}} src={pdfIcon} />                             
                           </div>
                         
                           
                        </div>
                        
                      </div>
                    </div>
                  </div>

        </div>
    </div>
    
    )
}

export default LaboratoryResultView
