import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mapper from '../../components/Mapper';
import Util from '../../components/Util';
import Popup from '../../components/Popup';
import styled from 'styled-components';
import { TextField, MenuItem, LinearProgress } from '@mui/material';
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
import LoadingBar from '../../components/LoadingBar'
import { EmployeeGenderEnum, Name } from '../../api/api'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setEmployees, setLoading } from '../../features/employees/employeesSlice';
import { getAllEmployees } from "../../employeeAPI"

// Loading Balken klein anzeigen wenn Employee Liste nicht leer - DONE
// Speichern und auslesen des States aus Browser Local Storage - DONE
// Bei EmployeeDetails lade Employee mit UUID as Cache, setzte abgeänderten Employee im Cache -> alert hinzufügen



        /*
        ##-- OAuth Flows --##

        1. Baue im UI einen Login Button, welcher dich direkt auf Github weiterleitet zum Authorisieren - DONE
        Client ID -> Kann ich öffentlich machen
        Client Secret -> Nur im Backend als Secret, (nicht öffentlich machen)

        2. Bau eine Page auf der Redirect Url,
         welche den "code" einließt und zum Backend schickt auf {backendUrl}/authlogin/oauth/github/access_token - DONE


TODOOO
        3. Erstellen im Backend einen AuthController,
         welcher auf /auth/login/oauth/github/access_token hört,
          den "code" entgegennimmt, und den Code für ein OAuth Token austauscht

        4. Das Frontend kriegt den OAuth Token vom Backened
        als antwort zurück und speichert das OAuth Token im Redux Store


        https://github.com/settings/applications/3045564
        https://docs.github.com/de/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
        https://docs.github.com/de/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
         */




const Employees: React.FC = () => {

   const dispatch = useAppDispatch();
   const employees = useAppSelector((state) => state?.employees?.list ?? []);

   const [error, setError] = useState<string | null>(null);

const [loadingFromCache, setLoadingFromCache] = useState<boolean>(false);
const [loadingFromAPI, setLoadingFromAPI] = useState<boolean>(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

 const openNewEmployeePopup = () => {
    setIsPopupOpen(true);
  };

    const closePopup = () => {
      setIsPopupOpen(false);
    };

useEffect(() => {

   fetchEmployees()
}, []);


const fetchEmployees = async () => {
  try {
    setLoadingFromAPI(true);

    const username = "username123";
    const password = "password123";

    const response = await getAllEmployees(username, password);
    const validEmployees = Mapper.validEmployees(response);

    dispatch(setEmployees(validEmployees));
    setError(null);
  } catch (err) {
    console.error('Error fetching employees:', err);

    const savedState = localStorage.getItem("employeesState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        if (parsedState.list && parsedState.list.length > 0) {
          console.log('Using cached data as fallback');
          setError(null);
          return;
        }
      } catch (cacheError) {
        console.error('Error parsing cache:', cacheError);
      }
    }
    setError('Error loading employees! Try again later.');
  } finally {
    setLoadingFromAPI(false);
  }
};

  const handleSave = async () => {
     closePopup()
    fetchEmployees()
  };

 const handleUUIDClick = (uuid: string) => {
   navigate(`/employees/${uuid}`);
 };

const handleRefresh = () => {
  setTimeout(() => fetchEmployees(), 10);
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

  const handleClearCache = () => {
    localStorage.removeItem('employeesState');
    fetchEmployees();
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      }


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
            onClick={handleRefresh}
            disabled={loadingFromAPI}
            sx={{ mr: 2 }}
            >
            Refresh
         </Button>
           <Button
              onClick={openNewEmployeePopup}
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}>
              New Employee
           </Button>

         </Box>
       </Box>

       <NewEmployeeDialog
       isOpen={isPopupOpen}
       onClose={closePopup}
       onSave={handleSave}
       />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

    {loadingFromAPI && (
      <Box sx={{ width: '100%', mb: 2 }}>
       <LinearProgress />
      </Box>
    )}


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

    </Container>
  );
};

export default Employees;
