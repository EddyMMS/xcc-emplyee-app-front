
export interface Name {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface Employee {
  uuid: string;
  birthdate: string;
  hourlyRate: number;
  hoursPerWeek: number;
  monthlySalary: number;
  gender: 'M' | 'W' | 'D';
  department: string;
  name: Name;
}

export interface NewEmployeeRequest {
  birthdate: string;
  hourlyRate: number;
  hoursPerWeek: number;
  gender: 'M' | 'W' | 'D';
  department: string;
  name: Name;
}
