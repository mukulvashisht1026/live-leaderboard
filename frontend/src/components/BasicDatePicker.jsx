import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({ onDateChange }) {
  const handleDateChange = (newDate) => {
    if (onDateChange) {
      onDateChange(newDate); // Pass the selected date to the parent component
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}
        sx={{
            // Set custom height
            // backgroundColor: 'red',
            textDecorationColor: 'white',
            borderRadius: '10px',
    
            marginBottom:'10px',
          }}
      >
        <DatePicker
          onChange={handleDateChange} // Trigger callback on date change
          sx={{
            textDecorationColor: 'white',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 250, 240, 0.9)',
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
