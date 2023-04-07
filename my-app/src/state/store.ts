import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import popularReducer from './popularSlice';
import battleReducer from './battleSlice';

const logger = createLogger({
  collapsed: true,
});

const store = configureStore({
  reducer: {
    popular: popularReducer,
    battle: battleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
