import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [result, setResult] = useState(null);

  const [conversionRates, setConversionRates] = useState({ USD: 1 });
  const [loadingRates, setLoadingRates] = useState(true);
  const [rateError, setRateError] = useState(null);

  const API_KEY = 'c43728d3e6c291152e3d6da4';
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

  useEffect(() => {
    const loadRates = async () => {
      try {
        setLoadingRates(true);
        const response = await axios.get(url);
        setConversionRates(response.data.conversion_rates);
        setRateError(null);
      } 
      catch (error) {
        console.error('Exchange rate fetch failed:', error);
        setRateError('Failed to load exchange rates');
        setConversionRates({ USD: 1 });
      } 
      finally {
        setLoadingRates(false);
      }
    };
    loadRates();
  }, []);

  useEffect(()=> {console.log(conversionRates)}, [conversionRates])

  return (
    <AppContext.Provider
      value={{
        loanAmount,
        setLoanAmount,
        interestRate,
        setInterestRate,
        loanTerm,
        setLoanTerm,
        result,
        setResult,
        conversionRates,
        loadingRates,
        rateError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
