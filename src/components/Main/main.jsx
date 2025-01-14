import React, { useState } from 'react';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import TransactionForm from '../TransactionForm/TransactionForm';
import NavbarMenu from '../Navbar/Navbar';

const Main = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div>
     <NavbarMenu/>  
      <div className="container">
        <CurrencyConverter />
        <TransactionForm addTransaction={addTransaction} />
      </div>
    </div>
  );
};

export default Main;
