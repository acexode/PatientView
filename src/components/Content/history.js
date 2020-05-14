import React, { useContext } from 'react'
import TopNav from '../../Sidebar/TopNav'
import { AppContext } from '../AppContext/AppContext'

let sampleData = [
    {
        _id: 'EN001',
        date: '05/06/2020',
        call_desk:'Nnamdi Azikwe Teaching Hospital',
        doctor: 'Dr. Okafor',
        email: 'okafor@gmail.com' 
    },
    {
        _id: 'EN002',
        date: '05/06/2020',
        call_desk:'Aminu Kano Teaching Hospital',
        doctor: 'Dr. Mallam',
        email: 'okafor@gmail.com'
    },
    {
        _id: 'EN003',
        date: '05/06/2020',
        call_desk:'UBTH Hospital',
        doctor: 'Dr. Ogundu',
        email: 'okafor@gmail.com'
    },
]
const EncounterHistory = () => {
    const {hospitals, verifyPatient} = useContext(AppContext)
    return (
        <div id="content">
        <TopNav title="Encounter Listing" />
       
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
               <table class="table table-condensed mb-5 pb-5" style={{borderCollapse:'collapse'}}>
                   <thead>
                       <tr>
                           <th scope="col">Encounter ID</th>
                           <th scope="col">Encounter Date</th>
                           <th scope="col">Call Desk</th>
                           <th scope="col">Doctor</th>
                           <th scope="col">Email Address</th>
                           <th scope="col">Action</th>
                         </tr>
                   </thead>
                   <tbody>
                       {sampleData.map((data, i)=>(
                           <>
                           
                       <tr>
                           <th scope="row">{data._id}</th>
                       <td>{data.date}</td>
                       <td>{data.call_desk}</td>
                       <td>{data.doctor}</td>
                       <td>{data.email}</td>
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
                                       <div class="row mt-5">
                                           <div class="col-md-6">
                                               <p class="text-dark pt-2"><strong>Drug Description</strong></p>
                                           </div>
                                           <div class="col-md-6 align-items-end">
                                               <a class="border rounded p-2 float-right ml-3" href="">
                                                   <i class="las la-calendar-day"></i>  10:00am
                                               </a>
                                               <a class="border rounded p-2 float-right ml-3" href="">
                                                   <i class="lar la-clock"></i> 01/02/2021
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
                                                           <tr>
                                                               <td>Paracetamol 20mg</td>
                                                               <td>2</td>
                                                               <td>5</td>
                                                               <td>TD</td>
                                                               <td>Oral</td>
                                                           </tr>
                                                           <tr>
                                                               <td>Lornat DS-250mg</td>
                                                               <td>1</td>
                                                               <td>5</td>
                                                               <td>OD</td>
                                                               <td>Oral</td>
                                                           </tr>
                                                       </tbody>
                                                   </table>
                                               </div>
                                           
                                       </div>
                                       <div class="row mt-5">
                                           <div class="col-md-6">
                                               <p class="text-dark pt-2"><strong>Laboratory Request</strong></p>
                                           </div>
                                           <div class="col-md-6 align-items-end">
                                               <a class="border rounded p-2 float-right ml-3" href="">
                                                   <i class="las la-calendar-day"></i>  10:00am
                                               </a>
                                               <a class="border rounded p-2 float-right ml-3" href="">
                                                   <i class="lar la-clock"></i> 01/02/2021
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
                                                           <tr>
                                                               <td>Liver Function Test-LFT</td>
                                                               <td>Blood</td>
                                                               <td class="text-danger">Urgent</td>
                                                               <td>Dr. Uche</td>                                                                    
                                                           </tr>                                                             
                                                       </tbody>
                                                   </table>
                                               </div>
                                           
                                       </div>
                                       <div class="row mt-5">
                                           <div class="col-md-6">
                                               <p class="text-dark pt-2"><strong>Radiology Request</strong></p>
                                           </div>
                                           <div class="col-md-6 align-items-end">
                                               <a class="border rounded p-2 float-right ml-3" href="">
                                                   <i class="las la-calendar-day"></i>  10:00am
                                               </a>
                                               <a class="border rounded p-2 float-right ml-3" href="">
                                                   <i class="lar la-clock"></i> 01/02/2021
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
                                                           <tr>
                                                               <td>Chest X-ray (PA)</td>
                                                               <td></td>
                                                               <td class="text-danger">Urgent</td>
                                                               <td>Dr. Uche</td>                                                                    
                                                           </tr>                                                             
                                                       </tbody>
                                                   </table>
                                               </div>
                                           
                                       </div>
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
