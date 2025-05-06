import {
    Paper,
    Typography,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  import { useAppContext } from '../context/AppContext';
  
  const CurrencyConverter = () => {
    const { conversionRates, loadingRates, rateError } = useAppContext();
  
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);
  
    useEffect(() => {
      if (amount && fromCurrency && toCurrency) {
        convertCurrency();
      }
    }, [amount, fromCurrency, toCurrency]);
  
    const convertCurrency = () => {
      const fromRate = conversionRates[fromCurrency] || 1;
      const toRate = conversionRates[toCurrency] || 1;
      const baseAmount = parseFloat(amount) / fromRate;
      const result = baseAmount * toRate;
      setConvertedAmount(result.toFixed(2));
    };
  
    if (loadingRates) {
      return <Typography>Loading exchange rates...</Typography>;
    }
  
    if (rateError) {
      return <Typography color="error">{rateError}</Typography>;
    }
  
    return (
      <Paper sx={{ padding: 4, marginTop: 2 }}>
        <Typography variant="h4" gutterBottom>
          Currency Converter
        </Typography>
  
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>From</InputLabel>
            <Select
              value={fromCurrency}
              label="From"
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.keys(conversionRates).map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>To</InputLabel>
            <Select
              value={toCurrency}
              label="To"
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {Object.keys(conversionRates).map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Box>
  
        {convertedAmount !== null && (
          <Typography variant="h6" sx={{ mt: 4 }}>
            Converted Amount: {convertedAmount} {toCurrency}
          </Typography>
        )}
      </Paper>
    );
  };
  
  export default CurrencyConverter;
  