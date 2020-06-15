import React from 'react'
import  './print-modal.css'
const PrintModal = () => {
    return (        
        <div class="modal fade  print-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style={{left:'25vw'}} aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style={{width: '50vw'}}>
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-5">
                                <h3>Print Preview</h3>                                
                                <div className="row">
                                <div class="dropdown">
                                    <label>Section</label>
                                    <button class="btn btn-secondary btn-select dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Select section
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-7">

                            </div>
                        </div>                  
                        
                        </div>
                </div>
            </div>
        </div>
        </div>  
        
    )
}

export default PrintModal
