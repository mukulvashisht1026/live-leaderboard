import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

const SymbolDropdown = ({ symbols, selectedSymbol, handleSymbolChange, theme }) => {
  return (
    <FormControl
      style={{
        marginBottom: '2rem',
        backgroundColor: theme === 'dark' ? '#000' : '#000',
        color: theme === 'dark' ? '#000' : '#fff',
        borderRadius: '8px',
        minWidth: '20%',
        height: '16px',
        opacity: '0.9'
      }}
    >
      <Select
        value={selectedSymbol}
        onChange={handleSymbolChange}
        style={{
          color: theme === 'dark' ? '#fff' : '#000',
          backgroundColor: theme === 'dark' ? '#333' : '#fff',
          maxHeight: '25px',
          // height: '16px',
          
        }}
        MenuProps={{
          PaperProps: {
            sx: {

              '& .MuiMenu-list': {
                paddingTop: 0,
                paddingBottom: 0,
              },
            },
          },
        }}
      >
        {symbols.map((symbol) => (
          <MenuItem
            key={symbol}
            value={symbol}
            style={{
              color: theme === 'dark' ? '#fff' : '#000',
              backgroundColor: theme === 'dark' ? '#333' : '#fff',
            }}
          >
            {symbol}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SymbolDropdown;
