import React, { useContext,useState } from 'react'
import TopNav from '../../Sidebar/TopNav'
import WrappedMap from '../OutletMap/GoogleMap'
import { key } from '../../key'
import { AppContext } from '../AppContext/AppContext'
// const pharmacies = [
//     {
//         name: 'Braunx Pharmaceuticals Ltd',
//         address: '183, Upper Chime Avenue, Enugu',
//         rating: 3,
//         distance: '15mins',
//         open: '9am-10pm',
//         directions: '9.7, 7.5'
//     },
//     {
//         name: 'Daisy Pharmacy Ltd',
//         address: '59, Zik Avenue, Enugu',
//         rating: 4,
//         distance: '25mins',
//         open: '9am-10pm',
//         directions: '9.767, 7.34'
//     },
//     {
//         name: 'Monet Pharmacy Ltd',
//         address: '123, Chime Avenue, Enugu',
//         rating: 3,
//         distance: '45mins',
//         open: '9am-10pm',
//         directions: '9.566, 7.767'
//     },
//     {
//         name: 'Alpha Pharmacy Ltd',
//         address: '123, Chime Avenue, Enugu',
//         rating: 5,
//         distance: '45mins',
//         open: '9am-10pm',
//         directions: '9.566, 7.767'
//     },
//     {
//         name: 'Renhooks Pharmacy Ltd',
//         address: '13, Chime Avenue, Enugu',
//         rating: 2,
//         distance: '45mins',
//         open: '9am-10pm',
//         directions: '9.566, 7.767'
//     },
// ]
const Outlets = () => {
    const {outlets} = useContext(AppContext)
    const [selected, setselected] = useState({})
    return (
        <div id="content">
        <TopNav title="Outlets" />
       
        <div class="outlet-container">          
           <div class="row m-0">
               <div className="col-md-9 outlet-map">
                    {/* <OutletMap /> */}
                    <WrappedMap 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key.GoogleMap}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{height: '100%'}}></div>}
                    containerElement={<div style={{height: '100%'}}></div>}
                    mapElement={<div style={{height: '100%'}}></div>}
                    />
               </div>
           
           <div class="col-md-3 ml-0 p-0  pl-1 sidebar-right" >
            <div class="card m-0 p-0 text-left">             
                <div class="form-group px-2 mr-3">
                    <label for=""></label>
                    <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Pharmacies" />
                    
                </div>
                <div class="row justify-content-center">
                    <a className="search-controls"><i class="las la-sliders-h"></i></a>
                    <a className="search-controls"><span>Open</span></a>
                    <a className="search-controls"><span>Visited</span></a>
                    <a className="search-controls"><span>Last visited</span></a>
                    <a className="search-controls"><i class="las la-ellipsis-h"></i></a>
                    
                </div>
              
            </div>
            {outlets && outlets.map(outlet => (
                <a onClick={() => setselected(outlet)}  class="row mt-3 pharmacies " data-toggle="modal" data-target=".bd-example-modal-sm">
                        <div class="col-md-2 mt-4">
                            <img src="https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" style={{width: "40px", height:"40px"}} class="rounded-circle " alt="" />
                        </div>
                        <div class="col-md-10 d-flex mt-2 flex-column pharma">
                            <strong>{outlet.name}</strong>
                            <small>{outlet.description}</small>
                            <small> <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span></small>
                            <div className="row ml-0 mt-2 pharma-info">
                            <span> <i class="las la-map-marker-alt"></i> {outlet.distance}</span>
                            <span> <i class="las la-clock"></i> {outlet.open}</span>
                            <span> <i class="las la-directions"></i> {outlet.directions}</span>
                                
                            </div>

                        </div>
                        
                    </a>

            ))}
           </div>
            </div>
           </div>
           <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm" role="document">
                      <div class="modal-content">
                        
                        <div class="modal-body mb-5">
                           <div class="row justify-content-center align-item-center">
                               <p class="mt-4 "><img src="https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" style={{width: "60px", height:"60px"}} class="rounded-circle " alt="" /></p>                               
                           </div>
                           <div class="row justify-content-center align-item-center">
                               <p class="mt-1 text-center text-dark">{selected.name}</p> <br/>                                                   
                           </div>
                           <div class="row justify-content-center align-item-center">

                               <small class="text-dark">{selected.description}</small>                             
                           </div>
                           <div class="row justify-content-center align-item-center mt-5 mb-3">
                               <a  target="blank" class="btn verify text-center text-light"  href={`https://www.google.com/maps/search/?api=1&query=${selected.latitude},${selected.longitude}`}>Open</a>
                                               
                           </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
            
        </div>
    )
}

export default Outlets
