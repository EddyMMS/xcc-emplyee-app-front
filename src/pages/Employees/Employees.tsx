import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mapper from '../../components/Mapper';
import Util from '../../components/Util';
import Popup from '../../components/Popup';
import styled from 'styled-components';
import { TextField, MenuItem } from '@mui/material';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Button,
  Alert
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import TablePagination from "@mui/material/TablePagination";
import Pagination from '@mui/material/Pagination';
import { api } from '../../services/api';
import { Employee } from '../../types/employee';
import NewEmployeeDialog from '../../components/NewEmployeeDialog'
import { EmployeeGenderEnum, Name } from '../../api/api'


const Employees: React.FC = () => {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

// TODO New useState mit boolean "isNewEmployeePopupOpen"
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

// in newEmployeeDialog auslagern
  const [newEmployee, setNewEmployee] = useState({
    name: {
        firstName: "",
        middleName: "",
        lastName: "",
        },
    department: "",
    birthdate: "",
    gender: EmployeeGenderEnum.M,
    hourlyRate: "",
    hoursPerWeek: "",
  });

 const openNewEmployeePopup = () => {
    setIsPopupOpen(true);
  };

    const closePopup = () => {
      setIsPopupOpen(false);
      setNewEmployee({
        name: {
        firstName: "",
        middleName: "",
        lastName: "",
        },
        department: "",
        birthdate: "",
        gender: EmployeeGenderEnum.M,
        hourlyRate: "",
        hoursPerWeek: "",
      });
    };


  useEffect(() => {
    fetchEmployees();
  }, []);


  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await api.listAllEmployees();
      const validEmployees = Mapper.validEmployees(response);
      setEmployees(validEmployees);
      setError(null);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Error loading employees! Try again later.');
    } finally {
      setLoading(false);
    }
  };

 const handleUUIDClick = (uuid: string) => {
   navigate(`/employees/${uuid}`);
 };



const EditButton = styled(Button)`
  cursor: pointer;
  background-color: white;
  color: black;

  &:hover {
    background-color: darkgray;
  }
`;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
      }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      }

  const handleSave = async () => {
      try {
          const formattedEmployee= {
              ...newEmployee,
              name: {
                  firstName: newEmployee.name.firstName,
                  middleName: newEmployee.name.middleName,
                  lastName: newEmployee.name.lastName
                  },
              hourlyRate: parseFloat(newEmployee.hourlyRate),
              hoursPerWeek: parseInt(newEmployee.hoursPerWeek),
              };

          console.log("Request Payload:", formattedEmployee);


          const response = await api.employeesPost(formattedEmployee);
          console.log("Employee created successfully: ", response);
          closePopup();
          } catch (error) {
              console.error("Error creating employee: ", error);
              }
      };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Employees
        </Typography>
        <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchEmployees}
          disabled={loading}
          sx={{ mr: 2 }}
        >
          Refresh
        </Button>
                <Button
                onClick={openNewEmployeePopup}
                variant="contained"
                color="primary">
                New Employee
                </Button>

         </Box>
       </Box>

       <NewEmployeeDialog
       isOpen={isPopupOpen}
       onClose={closePopup}
       onSave={handleSave}
       newEmployee={newEmployee}
       setNewEmployee={setNewEmployee}
       />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Department</TableCell>
                <TableCell sx={{ color: 'white' }}>Birthdate</TableCell>
                <TableCell sx={{ color: 'white' }}>Gender</TableCell>
                <TableCell sx={{ color: 'white' }}>Hourly Rate (€)</TableCell>
                <TableCell sx={{ color: 'white' }}>Hours per Week</TableCell>
                <TableCell sx={{ color: 'white' }}>Salary (€)</TableCell>
                <TableCell sx={{ color: 'white' }}>UUID</TableCell>
                <TableCell sx={{ color: 'white' }}></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
                  <TableRow key={employee.uuid}>
                    <TableCell>{Mapper.formatFullName(employee.name)}</TableCell>
                    <TableCell>{employee.department || '-'}</TableCell>
                    <TableCell>{Util.formatDate(employee.birthdate)}</TableCell>
                    <TableCell>{Util.formatGender(employee.gender)}</TableCell>
                    <TableCell>{Util.formatNumber(employee.hourlyRate)}</TableCell>
                    <TableCell>{Util.formatNumber(employee.hoursPerWeek, 0)}</TableCell>
                    <TableCell>{Util.formatNumber(employee.monthlySalary)}</TableCell>
                    <TableCell>{employee.uuid}</TableCell>
                    <TableCell>
                    <EditButton
                           variant="contained"
                           size="small"
                           onClick={() => navigate(`/employees/${employee.uuid}`)}>
                    <CreateIcon />
                    </EditButton>
                    </TableCell>

                  </TableRow>
                ))}

                 {employees.length === 0 &&(
                 <TableRow>
                  <TableCell colSpan={7} align="center">
                    No Employees found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={employees.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableContainer>
      )}
    </Container>
  );
};

export default Employees;
