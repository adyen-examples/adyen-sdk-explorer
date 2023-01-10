import { Fragment, useState } from 'react';
import { FormControl, List, ListItem, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Option, OptionPropTypes } from './Option';

export const ArrayOption = ({ descriptor, onChange, value, isChecked, current }: OptionPropTypes) => {
  const [input, setInput] = useState('');
  const [listItems, setListItems] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setListItems([...listItems, input]);
    onChange(descriptor.name, listItems, current);
    setInput('');
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const deleteItem = (item: string) => {
    const index = listItems.indexOf(item);
    if (index > -1) {
      const newList = listItems.splice(index, 1);
      setListItems(newList);
      onChange(descriptor.name, newList, current);
    }
  };

  return (
    <Fragment>
      <FormControl sx={{ width: '25%' }} size="small" onSubmit={e => handleSubmit(e)}>
        <Option descriptor={descriptor} onChange={handleChange} value={value} isChecked={isChecked} current={input} />
      </FormControl>
      <List>
        {listItems.length &&
          listItems.map(item => (
            <ListItem
              key={item}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon onClick={() => deleteItem(item)} />
                </IconButton>
              }
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
      </List>
    </Fragment>
  );
};
