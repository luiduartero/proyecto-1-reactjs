import Immutable from 'immutable';
const nota = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_NOTA':
      return {
        id: action.payload.id,
        title:action.payload.title,
        description:action.payload.description,
        color: action.payload.color,
        archivado: false,
        date: new Date().toLocaleString(),
        datemodi:''
      };
    case 'EDIT_NOTA':
      if(state.id === action.payload.id){
        return {
          ...state,
          title: action.payload.title,
          description: action.payload.description,
          datemodi: new Date().toLocaleString()
        };
      }
    case 'ARCHIVAR_NOTA':
      if(state.id === action.payload.id){
        return {
          ...state,
          archivado: action.payload.archivado,
          datemodi: new Date().toLocaleString()
        };
      }
    default:
      return state;
  }
}

const notas = (state = Immutable.List.of(), action) => {
  switch (action.type){
    case 'ADD_NOTA':
      return state.push(nota(undefined, action));
    case 'REMOVE_NOTA':
      return state.delete(state.indexOf(state.filter(s => s.id == action.payload.id).get(0)));
    case 'EDIT_NOTA':
      return state.map(n => nota(n, action));
    case 'ARCHIVAR_NOTA':
      return state.map(n => nota(n, action));
    default:
      return state;
  }
}

export { notas };