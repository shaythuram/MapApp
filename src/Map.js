import React from "react";
import {render,ReactDom } from 'react-dom';
import {MapView} from '@deck.gl/core';
import ReactMapGL, { Marker, Popup , StaticMap , MapGL} from "react-map-gl";
import {_MapContext as MapContext, NavigationControl} from 'react-map-gl';
import {FullscreenControl} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer,IconLayer} from '@deck.gl/layers';
import {TransitionInterpolator , Deck} from '@deck.gl/core';
import * as mdata from './data/data.json'
import * as allstores from './data/allstores.json'
import {LineLayer} from '@deck.gl/layers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider,connect } from 'react-redux';
import { object } from "prop-types";
import PlacesWithStandaloneSearchBox from './Searchbox'
import EgoSearchbox from './EgoSearchBox'



const MAPBOX_TOKEN = "pk.eyJ1Ijoic2hheXRodXJhbSIsImEiOiJja2J2N2l3ZGcwMWJtMm9veWFvYW9odjI3In0.f_qWlnfX1UfbUTIJGz6ubA";




const INITIAL_VIEW_STATE = {
    longitude: 103.7443,
    latitude: 1.3851,
    zoom: 12,
    maxZoom: 22,
    pitch: 0,
    bearing: 0,
    width: "80vw",
    height: "50vh",
};



class Map extends React.Component {
  _isMounted = false;

  state={
    id:null,
    store:null,
    places:null,
    searched_data:[],
    ego_list:[]
  }



  PS = (places_list) =>{

    console.log(places_list)
    var i = 0
    var to_searched_data=[]
    for (i = 0; i < places_list.places.length; i++) {
      var lat = places_list.places[i].geometry.location.lat()
      var lng = places_list.places[i].geometry.location.lng()
      var business_status = places_list.places[i].business_status
      var name = places_list.places[i].name
      var place_id = places_list.places[i].place_id
      
      var dict = {

        name : name,
        place_id: place_id,
        business_status: business_status,
        coordinates: [lng,lat]
      }

      to_searched_data.push(dict)

    }
    to_searched_data.push({
      name : "to_searched_data",
      place_id: 0,

    })
    this.setState({
      searched_data:to_searched_data,
    })
    this.props.Map(this.state.searched_data);


    console.log( this.state)
  }
  ES = (ego) =>{
    console.log(ego,"ego")
    var i = 0
    var ego_list=[]

    for (i = 0; i < ego.Ego.length; i++) {
      var lat = ego.Ego[i].geometry.location.lat()
      var lng = ego.Ego[i].geometry.location.lng()
      var business_status = ego.Ego[i].business_status
      var name = ego.Ego[i].name
      var place_id = ego.Ego[i].place_id

      var dict = {
        name : name,
        place_id: place_id,
        business_status: business_status,
        coordinates: [lng,lat]
      }

      ego_list.push(dict)

    }
    ego_list.push({
      name : "ego",
      place_id: 0,

    })

    this.setState({
      ego_list,
    })
    this.props.Map(this.state.ego_list);
    console.log(ego_list , "Ego in Map")
  }


  handleClick= (data) =>{
    try{
      var rdata = []
      var Place_ID = data["Place_ID"]
      var store = data["store"]
      rdata = {Place_ID:Place_ID , store:store}
      this.props.dispatch({
        type:'ADD_POST',
        rdata});
      console.log(rdata,"Place_ID and {name_of_store}(store) in map.js upon clicking icon")
    }
    catch(err){
      console.log(err)
    }


  };
  handleHover=(e)=>{
    try{
      this.setState({
        id: e.object.Place_ID,
        store: e.object.store
      });
      console.log(this.state,"hover set state shaythuram")
    }
    catch(err) {
      this.setState({
        id: null,
        store: null
      });
      console.log(this.state,"null state shaythuram")
    }

  };


  render(

  ) {



    const layers = [

          new ScatterplotLayer({
            INITIAL_VIEW_STATE,
            id: 'scatterplot-layer',
            data : this.state.searched_data,
            pickable: true,
            opacity: 0.8,
            stroked: true,
            filled: true,
            radiusScale:1/100,
            radiusMinPixels:8,
            radiusMaxPixels: 40,
            lineWidthMinPixels: 1,
            getPosition: d => d.coordinates,
            getLineColor: d => [0, 0, 0],
            getTooltip: ({object}) => object && object.name,
            getFillColor: d => (  [255, 0, 0] ),
            updateTriggers: {
              getPosition: [
                this.state.searched_data
                  ? this.state.searched_data.coordinates
                  : null
              ]
            }
          }),

          new ScatterplotLayer({
            INITIAL_VIEW_STATE,
            id: 'scatterplot-layer',
            data : this.state.ego_list,
            pickable: true,
            opacity: 0.8,
            stroked: true,
            filled: true,
            radiusScale:1/100,
            radiusMinPixels:8,
            radiusMaxPixels: 40,
            lineWidthMinPixels: 1,
            getPosition: d => d.coordinates,

            getLineColor: d => [0, 0, 0],
            getTooltip: ({object}) => object && object.name,
            getFillColor: d => (  [102, 255, 51] ),
            updateTriggers: {
              getPosition: [
                this.state.ego_list
                  ? this.state.ego_list.coordinates
                  : null
              ]
            }
          })
    ]
    const data = mdata['features']
    const alldata = allstores['features']
    const {TimeFilter} = this.props
    console.log(TimeFilter , "Timefilter IN MAPJS")
    var Time = TimeFilter['Time']
    var Day = TimeFilter['Day']
    if(true){
      if (this.state.store == null ){
        try{
          var tt = "incomp"
        }
        catch(err){
          console.log("error")
        }
        
      }
      else if(this.state.store == "McDonalds " ){
        if (Time  == undefined){
          var tt = `Outlet Name: ${this.state.store } \n Yet To Set Date And Time`
        }
        else{
          var i = 0
          for(i in data){
            if(data[i]["Place_ID"] == this.state.id ){
              console.log(this.state.id , data[i].info[Day][Time] )
              console.log(Time,Day)
              var tt = data[i].info[Day][Time][1]
              var tt = `${tt} Popular Times  `
            }
          }
        }
      }
      else{
        if (Time == undefined){// when the time and
          // var tt = "Yet To Set Date And Time"
          var tt = this.state.store
        }
        else{
          var tt = this.state.store
        }
      }
    }
    return (

      <div >
        <DeckGL className="map"  initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}
          getTooltip={ ({object}) => object && object.name   }
          // getTooltip={ ({object}) => object && `${tt} `   }
        ContextProvider={MapContext.Provider}
        >
        

            <StaticMap
              reuseMaps
              mapStyle='mapbox://styles/mapbox/light-v9'
              preventStyleDiffing={true}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              
            />   
          <PlacesWithStandaloneSearchBox PlacesWithStandaloneSearchBox={this.PS} ></PlacesWithStandaloneSearchBox>
          <EgoSearchbox EgoSearchBox={this.ES} ></EgoSearchbox>
        </DeckGL>
    </div>
    );
  }
}
export default connect()(Map);