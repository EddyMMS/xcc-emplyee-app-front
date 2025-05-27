import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../types/employee';


interface EmployeesState {
  list: Employee[];
  loading: boolean;
}

const initialState: EmployeesState = (() => {
  if(typeof window === "undefined") {
      return {
        list: [],
        loading: false,
    };
}

const savedState = localStorage.getItem("employeesState")

if(savedState) {
    try {
        return JSON.parse(savedState);
        } catch (error) {
            console.error("Error parsing employees state from localStorage:", error);
            }
    }

  return {
    list: [],
    loading: false,
  };
})();


const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.list = action.payload;
      localStorage.setItem("employeesState", JSON.stringify(state));
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
     state.loading = action.payload;
     console.log('Loading state changed to:', action.payload);
    },

  },
});

export const { setEmployees, setLoading } = employeesSlice.actions;
export default employeesSlice.reducer;
