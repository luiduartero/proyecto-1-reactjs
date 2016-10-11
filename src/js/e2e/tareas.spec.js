import tareas from '../reducers/tareas';

const testAddTarea = () => {
  const stateBefore = [];

  const action = {
    type: 'ADD_TAREA',
    payload: {
      id: 1,
      title: 'Vamo a Calmarnos',
      color: 'celeste'
    }
  }

  const stateAfter = [{
    id: 1,
    title: 'Vamo a Calmarnos',
    color: 'celeste',
    archivado: false,
    date: '',
    datemodi:''
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testRemoveTarea = () => {
  const stateBefore = [
    {
      id: 0,
      title: 'Limpiar mi casa',
      color: 'celeste'
      archivado: false,
      date: '',
      datemodi:''
    },
    {
      id: 1,
      title: 'Banarme',
      color: 'celeste'
      archivado: false,
      date: '',
      datemodi:''
    }
  ];

  const action = {
    type: 'REMOVE_TAREA',
    payload: {
      id: 1
    }
  }

  const stateAfter = [
    {
      id: 0,
      title: 'Limpiar mi casa',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}


const testEditTarea = () => {
  const stateBefore = [
    {
      id: 0,
      title: 'Limpiar mi casa',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    },
    {
      id: 1,
      title: 'Banarme',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    }
  ];

  const action = {
    type: 'EDIT_TAREA',
    payload: {
      id: 1,
      title: 'mama'
    }
  }

  const stateAfter = [
    {
      id: 0,
      title: 'Limpiar mi casa',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    },
    {
      id: 1,
      title: 'mama',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    }  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}
const testArchivarTarea = () => {
  const stateBefore = [
    {
      id: 0,
      title: 'Limpiar mi casa',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    },
    {
      id: 1,
      title: 'Banarme',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    }
  ];

  const action = {
    type: 'ARCHIVAR_TAREA',
    payload: {
      id: 1,
      archivado: true
    }
  }

  const stateAfter = [
    {
      id: 0,
      title: 'Limpiar mi casa',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    },
    {
      id: 1,
      title: 'mama',
      color: 'celeste',
      archivado: true,
      date: '',
      datemodi:''
    }  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

testAddTarea();
testRemoveTarea();
testEditTarea();
testArchivarTarea();
console.log("All todo tests passed!");