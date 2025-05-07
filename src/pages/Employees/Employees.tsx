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

// TODO: Pagination 10 pro Seite https://mui.com/material-ui/react-pagination/
// TODO: Was sind props in React. Was sind callbacks (im Generellen und in React)

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
    name: "",
    department: "",
    birthdate: "",
    gender: "",
    hourlyRate: "",
    hoursPerWeek: "",
  });

 const openNewEmployeePopup = () => {
    setIsPopupOpen(true);
  };

    const closePopup = () => {
      setIsPopupOpen(false);
      setNewEmployee({
        name: "",
        department: "",
        birthdate: "",
        gender: "",
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


/*
Neuen Button hinzufügen "New Employee"
Grauen, durchsichtigen Hintergrund
In der Mitte Card-Componente
Diese Cart hat alle Felder die ich brauche zum anlegen eines neuen Employee2 Buttons / cancel and create
create button voll vorerst nix machen, opt. zu implementieren
cancel soll pop-up schließen als auch die freie Fläche drumherum

Note
Pop-Up als Button
Props festlegenm
IsOpen ist ein Prop
When isOpen false soll nix returned werden
Pop Up soll Kinder übergeben
Hauptaufgabe ist der Buttton, danach kommt der schwarze hIntergrund, cancelbutton schließt alles wieder (auch wenn man in die leere klickt)
*/

// Box mit TextFields in newEmployeeDialog auslagern

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
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        title="Create a new Employee"
      >

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
      id="name-popup-input"
      label="Name"
      variant="filled"
      //value={newEmployee.name}
      //onChange={(e) => { setNewEmployee({ ...newEmployee, name: e.value }) }}
      required
      />

      <TextField
      id="department-popup-input"
      label="Department"
      variant="filled"
      required

      />

      <TextField
      id="birthdate-popup-input"
      label="Birthdate"
      variant="filled"
      required
      />

       <TextField
       id="gender-popup-input"
       select
       label="Gender"
       variant="filled"
       required
       >
       <MenuItem value="M">Male</MenuItem>
       <MenuItem value="F">Female</MenuItem>
       <MenuItem value="D">Diverse</MenuItem>
       </TextField>

      <TextField
      id="hourlyRate-popup-input"
      label="Hourly Rate"
      variant="filled"
      required
      />

      <TextField
      id="hoursPerWeek-popup-input"
      label="Hours Per Week"
      variant="filled"
      required
      />

      </Box>

      </Popup>

         </Box>
      </Box>


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
