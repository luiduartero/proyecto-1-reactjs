import buscar from '../reducers/busqueda';

const testBusqueda = () => {
  const stateBefore = '';

  const action = {
    type: 'SET_BUSQUEDA',
    payload: {
      visibilityFilter: 'pollito'
    }
  }

  const stateAfter = 'pollito';

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    visibilityFilter(stateBefore, action)
  ).toEqual(stateAfter);
}

testBusqueda();
console.log("All visibility filter tests passed!");