import todos from '../reducers/todos';

const testAddTodo = () => {
  const stateBefore = [];

  const action = {
    type: 'ADD_TODO',
    payload: {
      id: 1,
      text: 'Vamo a Calmarnos'
    }
  }

  const stateAfter = [{
    id: 1,
    text: 'Limpiar mi casa',
    completed: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Limpiar mi casa',
      completed: false
    },
    {
      id: 1,
      text: 'Banarme',
      completed: false
    }
  ];

  const action = {
    type: 'TOGGLE_TODO',
    payload: {
      id: 1
    }
  }

  const stateAfter = [
    {
      id: 0,
      text: 'Limpiar mi casa',
      completed: false
    },
    {
      id: 1,
      text: 'Banarme',
      completed: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

testAddTodo();
testToggleTodo();
console.log("All todo tests passed!");