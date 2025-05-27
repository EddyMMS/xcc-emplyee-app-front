import React from 'react';
import { LinearProgress, Box } from '@mui/material';

const LinearLoadingBar: React.FC = () => {
  return (
    <Box sx={{ width: '100%', position: 'relative', mb: 2 }}>
      <LinearProgress color="primary" />
    </Box>
  );
};

export default LinearLoadingBar;