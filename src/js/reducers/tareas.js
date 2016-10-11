import Immutable from 'immutable';
const tarea = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TAREA':
      return {
        id: action.payload.id,
        title:action.payload.title,
        color: action.payload.color,
        archivado: false,
        date: new Date().toLocaleString(),
        datemodi:''
      };
    case 'EDIT_TAREA':
      if(state.id === action.payload.id){
        return {
          ...state,
          title: action.payload.title,
          datemodi: new Date().toLocaleString()
        };
      }
    case 'ARCHIVAR_TAREA':
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

const tareas = (state = Immutable.List.of(), action) => {
  switch (action.type){
    case 'ADD_TAREA':
      return state.push(tarea(undefined, action));
    case 'REMOVE_TAREA':
      return state.delete(state.indexOf(state.filter(s => s.id == action.payload.id).get(0)));
    case 'EDIT_TAREA':
      return state.map(t => tarea(t, action));
    case 'ARCHIVAR_TAREA':
      return state.map(t => tarea(t, action));
    default:
      return state;
  }
}

export {tareas}