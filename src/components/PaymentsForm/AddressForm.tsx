import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

export default function AddressForm() {
    const [library, setLibrary] = React.useState({
        dropin: '',
        checkout: ''
    });

    const { dropin, checkout } = library;
    const handleLibraryChange = (event: SelectChangeEvent) => {
        setLibrary({ ...library, dropin: event.target.value });
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Choose your libraries
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="profileName"
                        name="profileName"
                        label="Profile name"
                        autoComplete="profile-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl required sx={{ width: 1 }}>
                        <InputLabel id="demo-simple-select-required-label">Dropin</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={dropin}
                            label="Dropin Version *"
                            onChange={handleLibraryChange}
                            autoWidth
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl required sx={{ width: 1 }}>
                        <InputLabel id="demo-simple-select-required-label">Checkout</InputLabel>
                        <Select
                            value={checkout}
                            label="Checkout Version *"
                            onChange={handleLibraryChange}
                            autoWidth
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
