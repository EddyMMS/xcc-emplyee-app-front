import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from "./features/employees/employeesSlice";
import authReducer from "./features/auth/authSlice";
import { saveState, loadState } from './components/localStorage/localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    auth: authReducer,
  },
  preloadedState: {
      employees: persistedState?.employees,
      auth: persistedState?.auth
  },
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


