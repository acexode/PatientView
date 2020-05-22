import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/MEDICALL.svg'
import {User} from '../components/helpers/helpers'
import avater from '../assets/user.png'
const $ = window.$
const Sidebar = () => {
    const handleActiveMenu = (e) =>{  
        console.log(e);
        console.log($('#sidebarCollapse'))
        $('.sidebar-link').removeClass('sidebar-active');
        console.log(e.target.tagName)
        if(e.target.tagName === "LI"){
            e.target.classList.toggle('sidebar-active');

        }else if(e.target.tagName === "A"){
            // e.target.parentNode.toggle('sidebar-active')
            // $(this).parent().toggleClass('sidebar-active')
            console.log($(this))
             e.currentTarget.classList.toggle("sidebar-active")
            console.log()
            console.log(e.currentTarget)
        }
                 
    }
    useEffect(() => {
        $(".submenu-dropdown").click(function(){
            $("#sidebar").mCustomScrollbar({
                theme: "minimal"
            });
            $('.ul').hide();
            $(".submenu-dropdown").children("i").removeClass("la-angle-down")
            $(".submenu-dropdown").children("i").addClass("la-angle-right")
            $(this).next().slideToggle();
            if($(this).children("i").hasClass("la-angle-right")){
              $(this).children("i").removeClass("la-angle-right")
              $(this).children("i").addClass("la-angle-down")
            }else{
              $(this).children("i").removeClass("la-angle-down")
              $(this).children("i").addClass("la-angle-right")
            }
            $('.sidebar-link, .sidebar-link a').on('click', function () {
                
                $('.sidebar-link').removeClass('sidebar-active');
                $(this).toggleClass('sidebar-active');
                
            });
            $('.sidebar-link a').on('click', function () {               
                $('.sidebar-link').removeClass('sidebar-active');
                $(this).toggleClass('sidebar-active');
                
            });
      
          });
    }, [])
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
           <li onClick={handleActiveMenu} className="sidebar-link sidebar-active">
            <Link to="/encounter" >
                <i className="las la-history"></i>
               Encounter History
            </Link>
           </li>
            <li onClick={handleActiveMenu} className="sidebar-link">
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
           
            <li onClick={handleActiveMenu} className="sidebar-link">
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
