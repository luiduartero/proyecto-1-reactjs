import filter from '../reducers/appFilter';

const testAppFilter = () => {
  const stateBefore = 'SHOW_ALL';

  const action = {
    type: 'SET_APP_FILTER',
    payload: {
      visibilityFilter: 'SHOW_NOTAS'
    }
  }

  const stateAfter = 'SHOW_NOTAS';

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    visibilityFilter(stateBefore, action)
  ).toEqual(stateAfter);
}

testAppFilter();
console.log("All visibility filter tests passed!");