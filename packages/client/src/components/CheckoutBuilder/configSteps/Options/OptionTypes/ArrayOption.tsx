import DeleteIcon from '@mui/icons-material/Delete';
import { Box, FormControl, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { AdyenInputTheme } from './AdyenInputTheme';

export const ArrayOption = ({ descriptor, onChange, value, isChecked, current }: any) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newList = [...value, input];
    onChange(descriptor.name, newList, current);
    setInput('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const deleteItem = (target: string) => {
    const newList = value.filter((item: any) => item !== target);
    onChange(descriptor.name, newList, current);
  };

  let showListItems = null;

  if (value && value.length) {
    showListItems = (
      <List>
        {value.map((item: any) => (
          <ListItem
            key={item}
            secondaryAction={
              <IconButton sx={{ color: 'error.main' }} edge="end" aria-label="delete" onClick={() => deleteItem(item)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primaryTypographyProps={{ fontSize: '0.9rem' }} primary={item} />
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <Box>
      <form onSubmit={(e: any) => handleSubmit(e)}>
        <FormControl sx={{ width: '100%' }}>
          {isChecked && (
            <AdyenInputTheme
              name={descriptor.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              id={descriptor.name}
              value={input}
              sx={{
                width: '50%',
                '& .MuiInputBase-input': {
                  py: 1
                }
              }}
            />
          )}
        </FormControl>
      </form>
      {showListItems}
    </Box>
  );
};
