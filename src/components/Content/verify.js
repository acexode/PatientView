import React from 'react'
import TopNav from '../../Sidebar/TopNav'

const Verify = () => {
    console.log('verify')
    return (
        <div id="content">
        <TopNav />
        <div class="container">
              
              <div class="row justify-content-center">
               <div class="card ">
                   <h3 class="text-center"><i class="las la-mobile-alt phone"></i></h3>
                   <h3 class="text-center">Verification Code</h3>
                   <small class="text-dark pt-2 text-center">The verfication code has been sent <br/> to the patient's phone  number</small>
                   <strong class="text-dark pt-3 text-small text-center">Please enter the code below</strong>
                   
                       <div class="container">                           
                             <div class="row">
                               <div class="form-row justify-content-center mr-5 ml-5 mt-3">                                   
                                        <input maxlength="1" type="text" class="form-control v-code" placeholder="0" />
                                        <input maxlength="1" type="text" class="form-control v-code" placeholder="0" />
                                        <input maxlength="1" type="text" class="form-control v-code" placeholder="0" />
                                       <input maxlength="1" type="text" class="form-control v-code" placeholder="0" />
                                       <input maxlength="1" type="text" class="form-control v-code" placeholder="0" />
                                       <input maxlength="1" type="text" class="form-control v-code" placeholder="0" />                                    
                                   
                               </div>
                             </div>
                             <button class="mt-3 btn btn-block btn-primary verify" data-toggle="modal" data-target=".bd-example-modal-sm">Retrieve </button>


                       </div>
                   </div>
                   <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm" role="document">
                      <div class="modal-content">
                        
                        <div class="modal-body mb-5">
                           <div class="row justify-content-center align-item-center">
                               <p class="mt-4 "><i class="las la-check-circle big text-center"></i></p>                               
                           </div>
                           <div class="row justify-content-center align-item-center">
                               <h2 class="mt-1 text-center">Success</h2> <br/>                                                   
                           </div>
                           <div class="row justify-content-center align-item-center">

                               <small class="text-dark">Your phone has been verified!</small>                             
                           </div>
                           <div class="row justify-content-center align-item-center mt-5 mb-3">
                               <button type="button" class="btn verify text-center text-light" data-dismiss="modal">Continue</button>
                                                     
                           </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
               </div>
              </div>
       
        </div>
    )
}

export default Verify
