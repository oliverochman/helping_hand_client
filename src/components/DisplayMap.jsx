import React, { Component } from "react";
import { Marker, Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";


class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }
  render () {
    let locations = {
      cities: [
        {
          id: 1,
          name: 'Stockholm',
          position: { lat: 59.3285865, lng: 18.0599052 }
        },
        {
          id: 2,
          name: 'Tellusborgsvägen',
          position: { lat: 59.3042815, lng: 18.0105969 }
        },
        {
          id: 3,
          name: 'Gothenburg',
          position: { lat: 57.7089, lng: 11.9746 }
        }
      ]
    }
    const style = {
      width: '100%',
      height: '100%'
    }
    const onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      })
    // const onMapClicked = props => {
    //   if (this.state.showingInfoWindow) {
    //     this.setState({
    //       showingInfoWindow: false,
    //       activeMarker: null
    //     })
    //   }
    // }
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 59.3293,
          lng: 18.0686
        }}
        zoom={15}
        onClick={this.onMapClicked}
      >
        {locations.cities.map(city => (
          <Marker
            title={city.name}
            name={city.name}
            key={city.id}
            position={city.position}
            onClick={onMarkerClick.bind(this)}
          />
        ))}
        {/* <Marker onClick={this.onMarkerClick} name={'Current location'} /> */}
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>{/* <h1>{this.state.selectedPlace.name}</h1> */}</div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
