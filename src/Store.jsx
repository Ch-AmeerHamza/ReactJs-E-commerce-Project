// src/Store.jsx
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './Redux/Reducer/rootReducer';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    
    // Filter out unknown keys and only keep known reducer keys
    const knownReducerKeys = ['auth', 'products']; // Add other known reducers here
    const filteredState = {};
    
    knownReducerKeys.forEach(key => {
      if (state[key] !== undefined) {
        filteredState[key] = state[key];
      }
    });
    
    console.log('🔄 Loaded filtered state from localStorage:', filteredState);
    return filteredState;
  } catch (err) {
    console.error('❌ Error loading state from localStorage:', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    // Only save known reducer states
    const stateToSave = {
      auth: state.auth,
      products: state.products,
      // Add other known reducers here
    };
    
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('❌ Error saving state to localStorage:', err);
  }
};

const persistedState = loadState();

console.log('🔄 Initializing store with persisted state:', persistedState);

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;