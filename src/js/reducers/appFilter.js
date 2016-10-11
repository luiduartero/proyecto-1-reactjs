const filter = (state = 'SHOW_ALL', action) => {
  switch(action.type){
    case 'SET_APP_FILTER':
      return action.payload.name;
    default:
      return state;
  }
}

export { filter }