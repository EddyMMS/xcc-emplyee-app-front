import React from "react";
import {Box, Button, MenuItem, TextField} from "@mui/material";
import Popup from "../Popup";

interface NewEmployeeDialogProps {
    isOpen: boolean
    onClose: () => void;
    onSave: () => void;
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
    }

const NewEmployeeDialog: React.FC<NewEmployeeDialogProps> = ({
    isOpen,
    onClose,
    onSave,
    newEmployee,
    setNewEmployee,
    }) => {
        const handleInputChange = (field: string, value: any) => {
            setNewEmployee((prev: any) => ({
                ...prev,
                [field]: value,
                }));
            };

        const handleNameChange = (field: string, value: string) => {
            setNewEmployee((prev: any) => ({
                ...prev,
                name: {
                    ...prev.name,
                    [field]: value,
                    },
                }));
            };


        return(
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    title ="Create a new Employee"
    >

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
      required
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
      type="date"
      required
      value={newEmployee.birthdate}
      onChange={(e) => handleInputChange("birthdate", e.target.value)}
      />

       <TextField
       id="gender-popup-input"
       select
       label="Gender"
       required
      //value={newEmployee.name}
      //onChange={(e) => { setNewEmployee({ ...newEmployee, name: e.value }) }}
      value={newEmployee.gender}
      onChange={(e) => handleInputChange("gender", e.target.value)}
       >
       <MenuItem value="M">Male</MenuItem>
       <MenuItem value="W">Female</MenuItem>
       <MenuItem value="D">Diverse</MenuItem>
       </TextField>

      <TextField
      id="hourlyRate-popup-input"
      label="Hourly Rate"
      type="number"
      required
      value={newEmployee.hourlyRate}
      onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
      />

      <TextField
      id="hoursPerWeek-popup-input"
      label="Hours Per Week"
      type="number"
      required
      value={newEmployee.hoursPerWeek}
      onChange={(e) => handleInputChange("hoursPerWeek", e.target.value)}
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
      <Button size="small" onClick={onClose}>
      Cancel
      </Button>
      <Button size="small" color="primary" onClick={onSave}>
       Save
      </Button>
      </Box>
      </Box>
</Popup>
  );
};

export default NewEmployeeDialog;