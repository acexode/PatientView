import React from 'react'
import { getDate, getTime, getOTPState,hospitalInfo } from '../../helpers/helpers'
const RadiologyRequestDetails = ({activity}) => {
    return (
        <div className="row mt-5">
        <div className="col-md-6">
            <p className="text-dark pt-2"><strong>{activity.activity}</strong></p>
        </div>
        <div className="col-md-6 align-items-end">
            <a className="border rounded p-2 float-right ml-3" href="">
                <i className="las la-calendar-day"></i>  {getDate(activity.activityDate)}
            </a>
            <a className="border rounded p-2 float-right ml-3" href="">
                <i className="lar la-clock"></i> {getTime(activity.activityDate)}
            </a>
        </div>                                                                                               
            <div className="row-card mb-3">
                <table className="nested-table">
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
        
    </div> 
             
    )
}

export default RadiologyRequestDetails
