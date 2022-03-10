import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

export default function PaymentForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Optional Configuration
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" variant="standard" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="cardNumber" label="Card number" fullWidth autoComplete="cc-number" variant="standard" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" variant="standard" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <JSONInput id="a_unique_id" placeholder={sampleObject} colors={darktheme} locale={locale} height="550px" />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
