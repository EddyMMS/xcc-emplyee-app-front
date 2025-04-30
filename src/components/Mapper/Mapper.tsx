import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Employee } from '../../types/employee';

const Mapper = {
  validEmployees: (response: { data: any[] }) => {
    return (response.data || []).map((emp: Employee) => ({
      ...emp,
      uuid: emp.uuid,
      hourlyRate: emp.hourlyRate || 0,
      monthlySalary: emp.monthlySalary || 0,
      hoursPerWeek: emp.hoursPerWeek || 0,
      name: emp.name || { firstName: '', lastName: '' },
      gender: emp.gender || 'U',
      department: emp.department || '',
      birthdate: emp.birthdate || '',
    }));
  },

  formatFullName: (name: Employee['name'] | null): string => {
    if (!name) return '-';
    return `${name.firstName || ''} ${name.middleName ? name.middleName + ' ' : ''}${name.lastName || ''}`.trim() || '-';
  }
};

export default Mapper;
