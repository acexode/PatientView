import React from 'react'
import TopNav from '../../Sidebar/TopNav'
import WrappedMap from '../OutletMap/GoogleMap'
import { key } from '../../key'
const pharmacies = [
    {
        name: 'Braunx Pharmaceuticals Ltd',
        address: '183, Upper Chime Avenue, Enugu',
        rating: 3,
        distance: '15mins',
        open: '9am-10pm',
        directions: '9.7, 7.5'
    },
    {
        name: 'Daisy Pharmacy Ltd',
        address: '59, Zik Avenue, Enugu',
        rating: 4,
        distance: '25mins',
        open: '9am-10pm',
        directions: '9.767, 7.34'
    },
    {
        name: 'Monet Pharmacy Ltd',
        address: '123, Chime Avenue, Enugu',
        rating: 3,
        distance: '45mins',
        open: '9am-10pm',
        directions: '9.566, 7.767'
    },
    {
        name: 'Alpha Pharmacy Ltd',
        address: '123, Chime Avenue, Enugu',
        rating: 5,
        distance: '45mins',
        open: '9am-10pm',
        directions: '9.566, 7.767'
    },
    {
        name: 'Renhooks Pharmacy Ltd',
        address: '13, Chime Avenue, Enugu',
        rating: 2,
        distance: '45mins',
        open: '9am-10pm',
        directions: '9.566, 7.767'
    },
]
const Outlets = () => {
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
            {pharmacies && pharmacies.map(pharmacy => (
                <a class="row mt-3 pharmacies ">
                        <div class="col-md-2 mt-4">
                            <img src="https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" style={{width: "40px", height:"40px"}} class="rounded-circle " alt="" />
                        </div>
                        <div class="col-md-10 d-flex mt-2 flex-column pharma">
                            <strong>{pharmacy.name}</strong>
                            <small>{pharmacy.address}</small>
                            <small> <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span></small>
                            <div className="row ml-0 mt-2 pharma-info">
                            <span> <i class="las la-map-marker-alt"></i> {pharmacy.distance}</span>
                            <span> <i class="las la-clock"></i> {pharmacy.open}</span>
                            <span> <i class="las la-directions"></i> {pharmacy.directions}</span>
                                
                            </div>

                        </div>
                        
                    </a>

            ))}
           </div>
            </div>
           </div>
            
        </div>
    )
}

export default Outlets
