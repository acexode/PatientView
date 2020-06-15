import React from 'react'

const ResetPassword = ({getEmail, handleEmail, loading, recoverShow,recoverMessage, recovertrueShow}) => {
    return (
        <div className="row">                
        <div className="modal fade" id="passowrdRecover" tabindex="-1" role="dialog" aria-labelledby="AssignDeviceLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
    
            <div className="modal-content">               
            <div className="modal-body">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            <form onSubmit={getEmail} style={{marginTop:"30px" }}>
                <h5 className="text-center" id="exampleModalLabel mb-4">Password Reset</h5>                   
                                <div className="row mt-5">
                                    <div className="col-md-12">
                                    
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Please enter your email address</label>
                                                    <input type="text" className="form-control" 
                                                    onChange={handleEmail} placeholder="Please enter your email address"/>
                                                </div>
                                            </div>
                                                                                    
                                            
                                        </div>
                                    </div>
                                </div>

              {loading ? <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>: <div className="submit-section">
                                    <button className="btn btn-success submit-btn">Submit</button>
                                </div>}
                                
                                
              <div>&nbsp;</div>
              { recoverShow && ( 
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {`${recoverMessage}, Please re-enter your details`}
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </div>)
              }
              { recovertrueShow  && ( 
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {recoverMessage}
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </div>)
              }
                            </form>
            </div>               
            </div>
        </div>
        </div>
        </div>
    )
}

export default ResetPassword
