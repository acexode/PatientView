import React from 'react'

const TopNav = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

            <a href="#" id="sidebarCollapse" >
                <i class="las la-bars"></i>
                
            </a>
            <a class="btn  d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="las la-ellipsis-h"></i>
            </a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav ml-auto">
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="las la-sign-out-alt"></i>
                            Logout
                        </a>
                       
                      </li>                          
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default TopNav
