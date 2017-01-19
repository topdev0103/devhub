import createSagaMiddleware from 'redux-saga';
import { Map } from 'immutable';
import { AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist-immutable';

import sagas from '../sagas';
import reducer from '../reducers';

export default (initialState = Map()) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    initialState,
    compose(applyMiddleware(sagaMiddleware), autoRehydrate()),
  );

  sagaMiddleware.run(sagas);

  persistStore(store, { debounce: 500, storage: AsyncStorage });

  return store;
};
