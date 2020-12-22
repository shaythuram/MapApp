import React from "react";

const { compose, withProps, lifecycle } = require("recompose");
const { withScriptjs } = require("react-google-maps");
const {
  StandaloneSearchBox
} = require("react-google-maps/lib/components/places/StandaloneSearchBox");



const  EgoSearchBox = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key={GOOGLE SEARCHBOX API TOKEN HERE}&v=3.exp&libraries=geometry,drawing,places",
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
          
          const Ego = refs.searchBox.getPlaces();


          this.setState({
            Ego,

          });
          console.log(this.state ,"state in EgoSearchBox component")
          this.props.EgoSearchBox(this.state);
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
        placeholder="Input Your Store"
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
export default EgoSearchBox;
