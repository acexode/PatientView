import React,{useState,useEffect, useContext} from 'react'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps";
  import pharmacy from '../../assets/pharmacy.jpg'
import { AppContext } from '../AppContext/AppContext';
const places= [
    {
      _id: 1,
      name: 'Chagib Pharmacy',
      lat: '9.1512391',
      lng: '7.3187136'
    },
    {
      _id: 2,
      name: 'Ejimus Pharmacy Ltd',
      lat: '9.1541457',
      lng: '7.3203045'
    },
    {
      _id: 3,
      name: 'Iferika Medicine Shop',
      lat: '9.1510221',
      lng: '7.3187136'
    }
  ]
const Map = () => {
    const {outlets} = useContext(AppContext)
    const [selectedPlace, setselectedPlace] = useState(null)
    const [state, setstate] = useState({
        currentLocation: {
            lat: '',
            lng: ''
          }
    })
    useEffect(() => {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              const coords = pos.coords;
              setstate({
                currentLocation: {
                  lat: coords.latitude,
                  lng: coords.longitude
                }
              });
            });
          }
       
    }, [state.currentLocation])
    const {lat, lng} = state.currentLocation
   
    return (
        <div>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{lat:Number(places[0].lat),  lng:Number(places[0].lng)}}
            >
                {places.map(place => (
                    <Marker key={place._id} 
                    position={{lat: Number(place.lat), lng: Number(place.lng)}}
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
                    position={{lat: Number(selectedPlace.lat), lng: Number(selectedPlace.lng)}}
                    onCloseClick={() => {setselectedPlace(null)}}
                    >
                        <div>
                        <h2>{selectedPlace.name}</h2>
            <p>4-star Pharmacy</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    )
}
const WrappedMap = withScriptjs(withGoogleMap(Map))
export default WrappedMap
