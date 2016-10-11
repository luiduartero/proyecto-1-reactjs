import Immutable from 'immutable';
const todo = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.payload.id, 
        text: action.payload.text,
        daddy: action.payload.daddy,
        completed: false
      };
    case 'TOGGLE_TODO':
      if(state.id === action.payload.id){
        return {
          ...state,
          completed: !state.completed
        };
      }

    default:
      return state;
  }
}

const todos = (state = Immutable.List.of(), action) => {
  switch (action.type){
    case 'ADD_TODO':
      return state.push(todo(undefined, action));
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    case 'REMOVE_TODO':
      return state.delete(state.indexOf(state.filter(s => s.id == action.payload.id).get(0)));
    default:
      return state;
  }
}

export { todos };
