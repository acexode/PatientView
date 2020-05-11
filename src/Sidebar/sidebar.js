import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpeg'
const Sidebar = () => {
    return (
        <nav id="sidebar">
        <div class="sidebar-header">
            <img class=" text-center" src={logo} style={{width:"80px", marginLeft:"35%"}} alt=""/>
           <Link to="/" class="text-center">MEDICALL</Link>
        </div>           

        <ul class="list-unstyled components">   
            <li>
                <div class=" profile cfr">
                    <div class="image">
                        <Link to="/" >
                            <img class="profile-img " src="https://image.shutterstock.com/image-photo/smiling-doctor-sitting-table-his-260nw-346218035.jpg" alt=""/>
                        </Link>
                    </div>
                    <div class="profile-info pt-4  cfc">
                        <span>Chukwudi Ojukwu</span>
                        <span><strong>07087584957</strong></span>
                    </div>
                </div>
            </li>            
           <li  class="sidebar-link sidebar-active">
            <Link to="/encounter" >
                <i class="las la-history"></i>
               Encounter History
            </Link>
           </li>
            <li class="sidebar-link">
                <Link to="/prescription" >
                <i class="las la-file-medical-alt"></i>
               Prescription
            </Link>
            </li>
            <li class="sidebar-dropdown dropdown-btn">
               <span>
               Laboratory
               <i class="las la-angle-right small-caret"></i>
                   
                   </span>           
            
            <div class="list-unstyled components dropdown-container">
                    <li class="sidebar-link">
                        <Link to="/lab-requests" >
                        <i class="las la-stethoscope"></i>
                    Requests
                    </Link>
                    </li>
                    <li class="sidebar-link">
                    <Link to="/lab-results" >
                        <i class="lar la-newspaper"></i>
                        Results
                    </Link>

                </li>
            </div>
            </li>
            <li class="sidebar-dropdown dropdown-btn">
                <Link to className="" >                
               Radiology
               <i class="las la-angle-right small-caret"></i>
            </Link>
            <div class="list-unstyled components dropdown-container">
                    <li class="sidebar-link">
                        <Link to="/radiology-requests" >
                        <i class="las la-stethoscope"></i>
                    Requests
                    </Link>
                    </li>
                    <li class="sidebar-link">
                    <Link to="/radiology-results" >
                        <i class="lar la-newspaper"></i>
                        Results
                    </Link>

                </li>
            </div>
            </li>
            <li class="sidebar-link">
                <Link to="/outlets" >
                <i class="las la-map-marked"></i>
               Outlets
            </Link>
            </li> 
           
          
        </ul>
        <ul  class="store-details">
            <Link to="/settings" class="first" >
                <i class="las la-cog"></i>
               Settings
            </Link>
            <Link to="/help-center" >
                <i class="las la-question-circle"></i>
               Help center
            </Link>
           
        </ul>

    </nav>

    )
}

export default Sidebar
