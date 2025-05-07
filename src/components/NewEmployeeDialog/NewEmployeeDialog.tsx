import React, { useState } from "react";
import {Box, Button, MenuItem, TextField} from "@mui/material";
import Popup from "../Popup";
import { EmployeeGenderEnum, Name } from '../../api/api'
import { api } from '../../services/api';
import { Employee } from '../../types/employee'
import NewEmployeeInput from '../NewEmployeeInput'

interface NewEmployeeDialogProps {
    isOpen: boolean
    onClose: () => void;
    onSave: () => void;

    }

/**
 newEmployee: {
         name:{
             firstName: string;
             middleName: string;
             lastName: string;
             };
         department: string;
         birthdate: string;
         gender: string;
         hourlyRate: string;
         hoursPerWeek: string;
         };
     setNewEmployee: React.Dispatch<React.SetStateAction<any>>;
 */


 const getEmptyEmployee = (): Employee => ({
     name: {
             firstName: "",
             middleName: "",
             lastName: "",
            },
        department: "",
        birthdate: "",
        gender: EmployeeGenderEnum.M,
        hourlyRate: 0.0,
        hoursPerWeek: 40.0,
        uuid: "",
        monthlySalary: 0,
});


const NewEmployeeDialog: React.FC<NewEmployeeDialogProps> = ({
    isOpen,
    onClose,
    onSave,
    }) => {
        const [newEmployee, setNewEmployee] = useState<Employee>(getEmptyEmployee());

        const onPopupClose = () => {
            setNewEmployee(getEmptyEmployee());
            onClose()
        };



        const handleSave = async () => {
          try {
              console.log("Request Payload:", newEmployee);


              const response = await api.employeesPost({
                    name: {
                    firstName: newEmployee.name.firstName,
                    middleName: newEmployee.name.middleName,
                    lastName: newEmployee.name.lastName,
                    },
                    department: newEmployee.department,
                    birthdate: newEmployee.birthdate,
                    gender: newEmployee.gender,
                    hourlyRate: newEmployee.hourlyRate,
                    hoursPerWeek: newEmployee.hoursPerWeek,
                    });
              console.log("Employee created successfully: ", response);
              setNewEmployee(getEmptyEmployee());
              onSave();
              } catch (error) {
                  console.error("Error creating employee: ", error);
                  }
          };

    // TODO 1: Input Felder in neue Componente verschieben (Props: Employee, setNewEmployee(employee) => void)
    // TODO 2: No "handleNameChange"
    // TODO 3: Empty Employee und Employee auf newEmployeeRequest mappen auslagern

    return (
        <Popup
            isOpen={isOpen}
            onClose={onPopupClose}
            title="Create a new Employee"
        >
            <NewEmployeeInput
                newEmployee={newEmployee}
                setNewEmployee={setNewEmployee}
            />

            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button size="small" onClick={onPopupClose}>
                    Cancel
                </Button>
                <Button size="small" color="primary" onClick={handleSave}>
                    Save
                </Button>
            </Box>
        </Popup>
    );
};

export default NewEmployeeDialog;