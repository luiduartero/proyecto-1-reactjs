const visibilityFilter = (state = {}, action) => {
  switch(action.type){
  	case 'ADD_FILTER':
  		return {
  			id: action.payload.id,
        	value:action.payload.value
        }
    case 'SET_VISIBILITY_FILTER':
    	if(state.id === action.payload.id){
        return {
          ...state,
          value: action.payload.value
        };
      }
    default:
      return state;
  }
}
const filters = (state = [], action) => {
  switch (action.type){
    case 'ADD_FILTER':
      return [
        ...state,
        visibilityFilter(undefined, action)
      ];
    case 'SET_VISIBILITY_FILTER':
       return state.map(t => visibilityFilter(t, action));
    default:
      return state;
  }
}

export { filters };