  // establish component local start values **Not used with STATE tracking**
  const cashRegisterNumberFormat: Intl.NumberFormatOptions = {
    style: "currency", 
    currencySign: "standard", 
    currency: "USD", 
    useGrouping: true
  };

  export default cashRegisterNumberFormat;