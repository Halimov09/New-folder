import React, { useState } from 'react';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import TransactionForm from '../TransactionForm/TransactionForm';

const Main = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div>
      <div className="container">
        <TransactionForm addTransaction={addTransaction} />
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default Main;
