import {
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box
  } from '@mui/material';
  import { useState } from 'react';
  import { calculateEMI } from '../utils/calculateEMI';
  import { useAppContext } from '../context/AppContext';
  
  const LoanForm = () => {
    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState('');
    const [term, setTerm] = useState('');
    const [result, setResult] = useState(null);
    const [currency, setCurrency] = useState('USD');
  
    const { conversionRates, loadingRates, rateError } = useAppContext();
  
    const handleCalculate = () => {
      const { emi, schedule } = calculateEMI(+amount, +rate, +term);
      setResult({ emi, schedule });
    };
  
    const reset = () => {
      setAmount('');
      setRate('');
      setTerm('');
      setResult(null);
    };
  
    const convert = (val) => {
      const rate = conversionRates[currency] || 1;
      return (val * rate).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };
  
    if (loadingRates) {
      return <Typography>Loading exchange rates...</Typography>;
    }
  
    if (rateError) {
      return <Typography color="error">{rateError}</Typography>;
    }
  
    return (
      <Paper sx={{
        p: { xs: 2, sm: 4 },
        mt: { xs: 4, sm: 8 },
        mx: 'auto',
        maxWidth: 600,
        textAlign: 'center',
      }}>
        <Typography variant="h5" gutterBottom>
          Loan Calculator Dashboard
        </Typography>
  
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField
            label="Loan Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            size="small"
            sx={{ width: 150 }}
          />
          <TextField
            label="Interest Rate (%)"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            size="small"
            sx={{ width: 150 }}
          />
          <TextField
            label="Term (Years)"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            size="small"
            sx={{ width: 150 }}
          />
        </Box>
  
        <Box sx={{ mb: 3 }}>
          <Button variant="contained" onClick={handleCalculate}>
            Calculate
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={reset}
            sx={{ ml: 2 }}
          >
            Reset
          </Button>
        </Box>
  
        {result && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Monthly EMI: {convert(result.emi)} {currency}
            </Typography>
  
            <FormControl sx={{ mt: 2, width: 120 }}>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                label="Currency"
                onChange={(e) => setCurrency(e.target.value)}
              >
                {Object.keys(conversionRates).map((cur) => (
                  <MenuItem key={cur} value={cur}>
                    {cur}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <Typography variant="h6" sx={{ mt: 4 }}>
              Amortization Schedule ({currency})
            </Typography>
  
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Month</strong></TableCell>
                    <TableCell><strong>Principal</strong></TableCell>
                    <TableCell><strong>Interest</strong></TableCell>
                    <TableCell><strong>Remaining Balance</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.schedule.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{convert(row.principal)} {currency}</TableCell>
                      <TableCell>{convert(row.interest)} {currency}</TableCell>
                      <TableCell>{convert(row.remainingBalance)} {currency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Paper>
    );
  };
  
  export default LoanForm;
  