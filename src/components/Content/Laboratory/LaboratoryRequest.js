import React from 'react'
import TopNav from '../../../Sidebar/TopNav'
let sampleData = [
    {
        _id: 'EN001',
        date: '05/06/2020',
        lab_req:'LRN001',
        doctor: 'Dr. Okafor',
       
    },
    {
        _id: 'EN002',
        date: '05/06/2020',
        lab_req:'LRN002',
        doctor: 'Dr. Mallam',
       
    },
    {
        _id: 'EN003',
        date: '05/06/2020',
        lab_req:'LRN003',
        doctor: 'Dr. Ogundu',       
    },
]
const LaboratoryRequest = () => {
    return (
        <div id="content">
        <TopNav title="Laboratory Request" />
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
                            <th scope="col">Laboratory Request No</th>
                            <th scope="col">Doctor</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sampleData.map((data, i)=>(
                           <>

                        <tr>
                            <th scope="row">{data._id}</th>
                            <td>{data.date}</td>
                            <td>{data.lab_req}</td>
                            <td>{data.doctor}</td>
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

                                            <div class="row mt-5">
                                                <div class="col-md-6">
                                                    <p class="text-dark pt-2"><strong>Laboratory Request</strong></p>
                                                </div>
                                                <div class="col-md-6 align-items-end">
                                                    <a class="border rounded p-2 float-right ml-3" href="">
                                                        <i class="las la-calendar-day"></i> 10:00am
                                                    </a>
                                                    <a class="border rounded p-2 float-right ml-3" href="">
                                                        <i class="lar la-clock"></i> 01/02/2021
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
                                                            <tr>
                                                                <td>Liver Function Test-LFT</td>
                                                                <td>Blood</td>
                                                                <td className="text-danger"><strong>Urgent</strong></td>
                                                                <td>{data.doctor}</td>                                                                
                                                            </tr>
                                                            <tr>
                                                                <td> Full blood count</td>
                                                                <td>Blood</td>
                                                                <td className="text-danger"><strong>Urgent</strong></td>
                                                                <td>{data.doctor}</td>                                                                
                                                            </tr>
                                                           
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                            
                                            
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
