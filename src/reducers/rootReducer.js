// const initState = {
//     Store_ID: [],
//     // store:[]
//   }
  
//   const rootReducer = (state = initState, action) => {
//     const id = action.Place_ID
//     // const store = action.data["store"]
//     // var id = action.rdata[0]
//     // if(x){
//     //   state.Store_ID = [x[0]],
//     //   state.store = [x[1]]
//     //   console.log(state, "State in root reducer")
//     // }

    
 
    

//     state.Store_ID = [id]

//     return state;
//   }
  
//   export default rootReducer

// const initState = {
//   Store_ID: [],

// }

// const rootReducer = (state = initState, action) => {
//   const id = action["Place_ID"]

//   state.Store_ID = id
//   console.log(state , "rr")
//   return state;
// }

// export default rootReducer


const initState = {
  data: [],

}

const rootReducer = (state = initState, action) => {
  const data= action.rdata
  console.log(action.rdata,"present in reducer")
  state = [data]

  return state;
}

export default rootReducer