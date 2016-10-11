import notas from '../reducers/notas';

const testAddNota = () => {
  const stateBefore = [];

  const action = {
    type: 'ADD_NOTA',
    payload: {
      id: 1,
      title: 'Vamo a Calmarnos',
      description: 'asdasdasd',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    }
  }

  const stateAfter = [{
      id: 1,
      title: 'Vamo a Calmarnos',
      description: 'asdasdasd',
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

const testRemoveNota = () => {
  const stateBefore = [
    {
      id: 0,
      title: 'Vamo a Calmarnos',
      description: 'asdasdasd',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    },
    {
      id: 1,
      title: 'Vamo a Calmarnos',
      description: 'asdasdasd',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    }
  ];

  const action = {
    type: 'REMOVE_NOTA',
    payload: {
      id: 1
    }
  }

  const stateAfter = [
    {
      id: 0,
      title: 'Vamo a Calmarnos',
      description: 'asdasdasd',
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

const testEditNota = () => {
  const stateBefore = [
    {
      id: 0,
      title: 'Limpiar mi casa',
      description: 'me',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    },
    {
      id: 1,
      title: 'Banarme',
      description: 'po',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    }
  ];

  const action = {
    type: 'EDIT_NOTA',
    payload: {
      id: 1,
      title: 'mama',
      description: 'mijo'
    }
  }

  const stateAfter = [
    {
      id: 0,
      title: 'Limpiar mi casa',
      description: 'me',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    },
    {
      id: 1,
      title: 'mama',
      description:'mijo',
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
const testArchivarNota = () => {
  const stateBefore = [
    {
      id: 0,
      title: 'Limpiar mi casa',
      description: 'me',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    },
    {
      id: 1,
      title: 'Banarme',
      description: 'me',
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    }
  ];

  const action = {
    type: 'ARCHIVAR_NOTA',
    payload: {
      id: 1,
      archivado: true
    }
  }

  const stateAfter = [
    {
      id: 0,
      title: 'Limpiar mi casa',
      description: 'me'
      color: 'celeste',
      archivado: false,
      date: '',
      datemodi:''
    },
    {
      id: 1,
      title: 'mama',
      description: 'me'
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


testAddNota();
testRemoveNota();
testEditNota();
testArchivarNota();
console.log("All todo tests passed!");