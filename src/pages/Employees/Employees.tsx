import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mapper from '../../components/Mapper';
import Util from '../../components/Util';
import styled from 'styled-components';
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
import { api } from '../../services/api';
import { Employee } from '../../types/employee';

// TODO: Pagination 10 pro Seite
// TODO: Was sind props in React. Was sind callbacks (im Generellen und in React)

const Employees: React.FC = () => {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

    // TODO: Create a nice 404 page with react router :)

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

 // TODO: Auslagern UTIL package


 // TODO: Auslagern in Mapper


 // TODO: Auslagern in Mapper


// TODO: Auslagern UTIL package


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


 /*
onClick={() => navigate(`/employees/${employee.uuid}`)}
style={{cursor: 'pointer'}}
onMouseEnter={(e) => (e.target as HTMLElement).style.background = 'darkgray'}
onMouseLeave={(e) => (e.target as HTMLElement).style.background = 'white'}>
 */

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Employees
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchEmployees}
          disabled={loading}
        >
          Refresh
        </Button>
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
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <TableRow>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No Employees found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Employees;
