import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './GoogleMaps';
import { key } from '../../key';

export class OutletMap extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    places: [
      {
        _id: 1,
        name: 'Chagib Pharmacy',
        lat: '9.1492624',
        lng: '7.319255'
      },
      {
        _id: 2,
        name: 'Rayjones Pharmacy Limited',
        lat: '9.1493046',
        lng: '7.319255'
      },
      {
        _id: 3,
        name: 'Iferika Medicine Shop',
        lat: '9.1493468',
        lng: '7.319255'
      }
    ]
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const {places,activeMarker,showingInfoWindow} = this.state
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        {places.map(place =>(
          <>
              <Marker
              position={{ lat: place.lat, lng: place.longitude }}
              onClick={this.onMarkerClick} name={'current location'} />
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow> 
          </>

        ))}
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: key.GoogleMap
})(OutletMap);
