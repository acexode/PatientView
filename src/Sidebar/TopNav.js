import React, {useState} from 'react'
import { useHistory, Link, Redirect } from 'react-router-dom'

const TopNav = ({title}) => {
    const [navigate, setnavigate] = useState(false)
    const Logout = () =>{
        localStorage.clear()
        setnavigate(true)
        
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

            <a  id="sidebarCollapse" >
                <i className="las la-bars"></i>
            </a>
            <ul className="nav navbar-nav">
                    
                    <li className="nav-item dropdown">
                        <a className="nav-link text-dark"  id="navbarDropdown" >                            
                            {title}
                        </a>
                       
                      </li>                          
                </ul>
            <a className="btn  d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="las la-ellipsis-h"></i>
            </a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav navbar-nav ml-auto">
                    
                    <li className="nav-item dropdown">
                        {navigate ? 
                            <Redirect to="/login" push={true} /> :
                        <Link onClick={Logout} className="nav-link" to="/login" id="navbarDropdown" role="button" >
                            <i className="las la-sign-out-alt"></i>
                            Logout
                        </Link> 
                        
                    
                    }
                       
                      </li>                          
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default TopNav
