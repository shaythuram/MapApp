import React from "react";

const { compose, withProps, lifecycle } = require("recompose");
const { withScriptjs } = require("react-google-maps");
const {
  StandaloneSearchBox
} = require("react-google-maps/lib/components/places/StandaloneSearchBox");



const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCTj2k0Hf8b5Iav6W9cVbd4qE17a5l0SiE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({

        bounds:null,              
        center: {
          lat: 1.287953, lng: 103.851784
        },
        places: [],
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          
          const places = refs.searchBox.getPlaces();


          this.setState({
            places,

          });
          console.log(this.state ,"state in searchbox component")
          this.props.PlacesWithStandaloneSearchBox(this.state);
        },

      });
    }
  }),
  withScriptjs
)((props) => (


  <div >
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={103.795190,1.422895,103.845316,1.461678}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Find-A-Store"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`
        }}
      />
    </StandaloneSearchBox>
    


  </div>
));
export default PlacesWithStandaloneSearchBox;