import React,{useState} from 'react'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps";
  import * as places from './data.json'
  import pharmacy from '../../assets/pharmacy.jpg'
// const places= [
//     {
//       _id: 1,
//       name: 'Chagib Pharmacy',
//       lat: '9.1492624',
//       lng: '7.319255'
//     },
//     {
//       _id: 2,
//       name: 'Rayjones Pharmacy Limited',
//       lat: '9.1493046',
//       lng: '7.319255'
//     },
//     {
//       _id: 3,
//       name: 'Iferika Medicine Shop',
//       lat: '9.1493468',
//       lng: '7.319255'
//     }
//   ]
const Map = () => {
    const [selectedPlace, setselectedPlace] = useState(null)
    return (
        <div>
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{lat:45.424721,  lng: -75.695000}}
            >
                {places.features.map(place => (
                    <Marker key={place.properties.PARK_ID} 
                    position={{lat: place.geometry.coordinates[1], lng: place.geometry.coordinates[0]}}
                    onClick={() => {
                        setselectedPlace(place);
                      }}
                    // icon={{
                    //     url:'../../assets/pharmacy.jpg',
                    //     scaledSize: new window.google.maps.Size(25,25)
                    // }}
                    />
                ))}
                {selectedPlace && (
                    <InfoWindow
                    position={{lat: selectedPlace.geometry.coordinates[1], lng: selectedPlace.geometry.coordinates[0]}}
                    onCloseClick={() => {setselectedPlace(null)}}
                    >
                        <div>
                        <h2>{selectedPlace.properties.NAME}</h2>
            <p>{selectedPlace.properties.DESCRIPTIO}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    )
}
const WrappedMap = withScriptjs(withGoogleMap(Map))
export default WrappedMap
