import React, {useState} from 'react'
import { useHistory, Link, Redirect } from 'react-router-dom'

const TopNav = ({title}) => {
    const [navigate, setnavigate] = useState(false)
    const Logout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setnavigate(true)
        
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

            <a href="#" id="sidebarCollapse" >
                <i class="las la-bars"></i>
            </a>
            <ul class="nav navbar-nav">
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link text-dark" href="" id="navbarDropdown" >                            
                            {title}
                        </a>
                       
                      </li>                          
                </ul>
            <a class="btn  d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="las la-ellipsis-h"></i>
            </a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav ml-auto">
                    
                    <li class="nav-item dropdown">
                        {navigate ? 
                            <Redirect to="/login" push={true} /> :
                        <Link onClick={Logout} class="nav-link" to="/login" id="navbarDropdown" role="button" >
                            <i class="las la-sign-out-alt"></i>
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
