export function calculateEMI(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const n = years * 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1);
  
    const schedule = [];
    let remaining = principal;
  
    for (let i = 1; i <= n; i++) {
      const interest = remaining * monthlyRate;
      const principalPaid = emi - interest;
      remaining -= principalPaid;
  
      schedule.push({
        month: i,
        principal: principalPaid,
        interest,
        remainingBalance: remaining > 0 ? remaining : 0,
      });
    }
  
    return {
      emi,
      schedule,
    };
  }
  