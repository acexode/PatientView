import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/MEDICALL.svg'
import {User} from '../components/helpers/helpers'
import avater from '../assets/user.png'
const Sidebar = () => {
    
    return (
        <nav id="sidebar">
        <div className="sidebar-header">
           <Link to="/" className="text-center">
            <img className=" text-center" src={logo} style={{width:"80px", marginLeft:"%"}} alt=""/>

           </Link>
        </div>           

        <ul className="list-unstyled components">   
            <li>
                <div className=" profile cfr">
                    <div className="image">
                        <Link to="/" >
                            <img className="profile-img " src={avater} alt=""/>
                        </Link>
                    </div>
                    <div className="profile-info pt-4  cfc">
                        <span className="pl-4">{User().name}</span>
                        <span><strong>{User().phoneNumber}</strong></span>
                    </div>
                </div>
            </li>            
           <li  className="sidebar-link sidebar-active">
            <Link to="/encounter" >
                <i className="las la-history"></i>
               Encounter History
            </Link>
           </li>
            <li className="sidebar-link">
                <Link to="/prescription" >
                <i className="las la-file-medical-alt"></i>
               Prescription
            </Link>
            </li>      
            <li className="submenu">
            <Link to className="submenu-dropdown" >                
               <span>Laboratory</span>
               <i className="las la-angle-right small-caret"></i>
            </Link>    
            <ul className="ul submenu-menu" style={{display:'none', background:"white"}}>
                    <li className="sidebar-link">
                        <Link to="/lab-requests" >
                            <i className="las la-stethoscope"></i>
                            Requests
                        </Link>
                    </li>
                    <li className="sidebar-link">
                        <Link to="/lab-results" >
                            <i className="lar la-newspaper"></i>
                            Results
                        </Link>
                    </li>
            </ul>
                   
            
            </li> 
            <li className="submenu">
            <Link to className="submenu-dropdown" >                
               <span>Radiology</span>
               <i className="las la-angle-right small-caret"></i>
            </Link>    
            <ul className="ul submenu-menu" style={{display:'none', background:"white"}}>
                    <li className="sidebar-link">
                        <Link to="/radiology-requests" >
                            <i className="las la-stethoscope"></i>
                            Requests
                        </Link>
                    </li>
                    <li className="sidebar-link">
                        <Link to="/radiology-results" >
                            <i className="lar la-newspaper"></i>
                            Results
                        </Link>
                    </li>
            </ul>
                   
            
            </li> 
            <li className="sidebar-link">
                <Link to="/outlets" >
                <i className="las la-map-marked"></i>
               Outlets
            </Link>
            </li> 
            
           
          
        </ul>
        <ul  className="store-details">
            <Link to="/settings" className="first" >
                <i className="las la-cog"></i>
               Settings
            </Link>
            <Link to="/help-center" >
                <i className="las la-question-circle"></i>
               Help center
            </Link>
           
        </ul>

    </nav>

    )
}

export default Sidebar
