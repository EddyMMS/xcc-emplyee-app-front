import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

  const Util = {

    formatDate: (dateString: string | null): string => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('de-DE');
    } catch (e) {
      return '-';
    }
  },

     formatGender: (gender: string | null): string => {
      if (!gender) return '-';
      switch (gender) {
        case 'M': return 'Male';
        case 'W': return 'Female';
        case 'D': return 'Divers';
        default: return gender;
      }
    },

   formatNumber: (value: number | null | undefined, decimals: number = 2): string => {
    if (value === null || value === undefined) return '-';
    return value.toFixed(decimals);

  }}


export default Util;