
import React, { useEffect, useState } from 'react';
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
import { api } from '../../services/api';
import { Employee } from '../../types/employee';

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await api.listAllEmployees();


      const validEmployees = (response.data || []).map((emp: any) => ({
        ...emp,
        hourlyRate: emp.hourlyRate || 0,
        monthlySalary: emp.monthlySalary || 0,
        hoursPerWeek: emp.hoursPerWeek || 0,

        name: emp.name || { firstName: '', lastName: '' },
        gender: emp.gender || 'U',
        department: emp.department || '',
        birthdate: emp.birthdate || '',
      }));

      setEmployees(validEmployees);
      setError(null);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Fehler beim Laden der Mitarbeiter. Bitte versuche es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('de-DE');
    } catch (e) {
      return '-';
    }
  };

  const formatGender = (gender: string | null): string => {
    if (!gender) return '-';
    switch (gender) {
      case 'M': return 'Männlich';
      case 'W': return 'Weiblich';
      case 'D': return 'Divers';
      default: return gender;
    }
  };


  const formatFullName = (name: Employee['name'] | null): string => {
    if (!name) return '-';
    return `${name.firstName || ''} ${name.middleName ? name.middleName + ' ' : ''}${name.lastName || ''}`.trim() || '-';
  };


  const formatNumber = (value: number | null | undefined, decimals: number = 2): string => {
    if (value === null || value === undefined) return '-';
    return value.toFixed(decimals);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mitarbeiter
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchEmployees}
          disabled={loading}
        >
          Aktualisieren
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
                <TableCell sx={{ color: 'white' }}>Abteilung</TableCell>
                <TableCell sx={{ color: 'white' }}>Geburtsdatum</TableCell>
                <TableCell sx={{ color: 'white' }}>Geschlecht</TableCell>
                <TableCell sx={{ color: 'white' }}>Stundenlohn (€)</TableCell>
                <TableCell sx={{ color: 'white' }}>Wochenstunden</TableCell>
                <TableCell sx={{ color: 'white' }}>Monatsgehalt (€)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <TableRow key={employee.uuid} hover>
                    <TableCell>{formatFullName(employee.name)}</TableCell>
                    <TableCell>{employee.department || '-'}</TableCell>
                    <TableCell>{formatDate(employee.birthdate)}</TableCell>
                    <TableCell>{formatGender(employee.gender)}</TableCell>
                    <TableCell>{formatNumber(employee.hourlyRate)}</TableCell>
                    <TableCell>{formatNumber(employee.hoursPerWeek, 0)}</TableCell>
                    <TableCell>{formatNumber(employee.monthlySalary)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Keine Mitarbeiter gefunden
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
