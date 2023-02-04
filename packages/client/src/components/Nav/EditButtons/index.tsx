import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

export const EditButtons = ({step}: any) => {
  const [viewOnly, setViewOnly] = useState(true);
  const handleEdit = () => {
    setViewOnly(!viewOnly);
  };
  return (
    <Button
      onClick={handleEdit}
      variant="contained"
      sx={{
        display: `${step === 'review' ? 'none' : 'inline-block'}`,
        bgcolor: `${viewOnly ? '#0abf53' : '#ff5722'}`,
        '&:hover': { bgcolor: `${viewOnly ? '#388e3c' : '#bf360c'}` }
      }}
    >
      {viewOnly ? 'Edit' : 'View Only'}
    </Button>
  );
};
