import React, { useState } from 'react';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import TransactionForm from '../TransactionForm/TransactionForm';
import TransactionList from '../TransactionList/TransactionList';
import FinanceChart from '../FinanceChart/FinanceChart';

const Main = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div className="container mt-4">
      <CurrencyConverter />
      <div className="row mt-4">
        <div className="col-md-6">
          <TransactionForm addTransaction={addTransaction} />
        </div>
        <div className="col-md-6">
          <TransactionList transactions={transactions} />
        </div>
      </div>
      <FinanceChart transactions={transactions} />
    </div>
  );
};

export default Main;
