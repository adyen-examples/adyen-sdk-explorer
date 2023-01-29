import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, Grid, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { ChangeEvent, Fragment, useState } from 'react';

export const ArrayOption = ({ descriptor, onChange, value, isChecked, current }: any) => {
  const [input, setInput] = useState('');
  const [listItems, setListItems] = useState<string[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newList = [...listItems, input];
    setListItems(newList);
    onChange(descriptor.name, newList, current);
    setInput('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const deleteItem = (target: string) => {
    const newList = listItems.filter(item => item !== target);
    setListItems(newList);
    onChange(descriptor.name, newList, current);
  };

  let showListItems;

  if (listItems && listItems.length) {
    showListItems = (
      <List>
        {listItems.map(item => (
          <ListItem
            key={item}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item)}>
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
        <FormControl sx={{ width: '25%' }} size="small">
          <Grid item xs={11}>
            <Typography variant="body2">{descriptor.name}</Typography>
            {isChecked && (
              <TextField
                name={descriptor.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                id={descriptor.name}
                value={input}
                fullWidth
                variant="standard"
              />
            )}
          </Grid>
        </FormControl>
      </form>
      {showListItems}
    </Fragment>
  );
};