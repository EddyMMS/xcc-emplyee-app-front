import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../types/employee';


interface EmployeesState {
  list: Employee[];
  loading: boolean;
}

const initialState: EmployeesState = {
 list: [],
 loading: false,
}


const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.list = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
     state.loading = action.payload;
    },

  },
});

export const { setEmployees, setLoading } = employeesSlice.actions;
export default employeesSlice.reducer;
