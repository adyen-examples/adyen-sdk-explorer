import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, Grid, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { ChangeEvent, Fragment, useState } from 'react';

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
    console.log('target: ', target);
    console.log('value: ', value);
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
              <IconButton sx={{ color: 'rgb(255, 87, 34)' }} edge="end" aria-label="delete" onClick={() => deleteItem(item)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <Fragment>
      <form onSubmit={(e: any) => handleSubmit(e)}>
        <FormControl size="small">
          <Grid item xs={11}>
            {isChecked && (
              <TextField
                name={descriptor.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                id={descriptor.name}
                value={input}
                fullWidth
                variant="filled"
                sx={{ py: 0 }}
                size="small"
                hiddenLabel
              />
            )}
          </Grid>
        </FormControl>
      </form>
      {showListItems}
    </Fragment>
  );
};
