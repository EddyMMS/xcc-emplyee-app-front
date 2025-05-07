import React from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { EmployeeGenderEnum } from '../../api/api';
import { Employee } from '../../types/employee';

interface NewEmployeeInputProps {
    newEmployee: Employee;
    setNewEmployee: React.Dispatch<React.SetStateAction<Employee>>;
}

const NewEmployeeInput: React.FC<NewEmployeeInputProps> = ({
    newEmployee,
    setNewEmployee
}) => {
    const handleInputChange = (field: string, value: any) => {
        setNewEmployee((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleNameChange = (field: string, value: string) => {
        setNewEmployee((prev) => ({
            ...prev,
            name: {
                ...prev.name,
                [field]: value,
            },
        }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
                id="firstName-popup-input"
                label="First Name"
                required
                value={newEmployee.name.firstName}
                onChange={(e) => handleNameChange("firstName", e.target.value)}
            />

            <TextField
                id="middleName-popup-input"
                label="Middle Name"
                value={newEmployee.name.middleName}
                onChange={(e) => handleNameChange("middleName", e.target.value)}
            />

            <TextField
                id="lastName-popup-input"
                label="Last Name"
                required
                value={newEmployee.name.lastName}
                onChange={(e) => handleNameChange("lastName", e.target.value)}
            />

            <TextField
                id="department-popup-input"
                label="Department"
                required
                value={newEmployee.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
            />

            <TextField
                id="birthdate-popup-input"
                label="Birthdate"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                value={newEmployee.birthdate}
                onChange={(e) => handleInputChange("birthdate", e.target.value)}
            />

            <TextField
                id="gender-popup-input"
                select
                label="Gender"
                required
                value={newEmployee.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
            >
                <MenuItem value={EmployeeGenderEnum.M}>Male</MenuItem>
                <MenuItem value={EmployeeGenderEnum.W}>Female</MenuItem>
                <MenuItem value={EmployeeGenderEnum.D}>Diverse</MenuItem>
            </TextField>

            <TextField
                id="hourlyRate-popup-input"
                label="Hourly Rate"
                type="number"
                required
                value={newEmployee.hourlyRate}
                onChange={(e) => handleInputChange("hourlyRate", parseFloat(e.target.value))}
            />

            <TextField
                id="hoursPerWeek-popup-input"
                label="Hours Per Week"
                type="number"
                required
                value={newEmployee.hoursPerWeek}
                onChange={(e) => handleInputChange("hoursPerWeek", parseFloat(e.target.value))}
            />
        </Box>
    );
};

export default NewEmployeeInput;
