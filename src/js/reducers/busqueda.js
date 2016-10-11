const buscar = (state = '', action) => {
  switch(action.type){
    case 'SET_BUSQUEDA':
      return action.payload.busqueda;
    default:
      return state;
  }
}

export { buscar }