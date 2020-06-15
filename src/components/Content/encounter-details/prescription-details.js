import React from 'react'
import { getDate, getTime, getOTPState,hospitalInfo } from '../../helpers/helpers'
const PrescriptionDetails = ({activity}) => {
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
                                                       
            <div className="row-card ">
                <table className="nested-table">
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
                        {JSON.parse(activity.activityDetails).map(detail=>(
                           <tr>
                               <td>{detail.Name}</td>
                               <td>{detail.Dosage}</td>
                               <td>{detail.Day}</td>
                               <td>{detail.Frequency}</td>
                               <td>{detail.AdministrationRoute}</td>
                               
                           </tr>

                        ))}                                                                
                    </tbody>
                </table>
            </div>
        
    </div>
    )
}

export default PrescriptionDetails
