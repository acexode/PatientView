import React from 'react'
import TopNav from '../../Sidebar/TopNav'

const Encounter = () => {
    return (
        <div id="content">
        <TopNav />
       
        <div class="container">
          
           <div class="row justify-content-center">
            <div class="card ">
                <h3 class="text-center">Hospital ID</h3>
                <small class="text-dark">Please enter your details to retrieve your encounter</small>
                
                    <form action="">
                        <div class="form-row">
                            <div class="col-md-12">
                                <div class="dropdown show mt-4">
                                    <a class="btn border dropdown-toggle text-left" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      Select Hospital
                                    </a>
                                  
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                      <a class="dropdown-item" href="#">Nnamdi Azikwe University Teachinng Hospital</a>
                                      <a class="dropdown-item" href="#">Aminu Kano Teachinng Hospital</a>
                                      <a class="dropdown-item" href="#">University of Abuja Teachinng Hospital</a>
                                     
                                    </div>
                                  </div>

                            </div>

                        </div>
                          <div class="form-row mt-3">
                              <div class="col-md-12">
                                  <input type="text" class="form-control" placeholder="og00934" />
                              </div>
                          </div>
                          <button type="submit" class="mt-3 btn btn-block  text-light verify retrieve">Retrieve </button>


                    </form>
                </div>
            </div>
           </div>
            
        </div>
    )
}

export default Encounter
