import React, { useState } from 'react';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import TransactionForm from '../TransactionForm/TransactionForm';
import TransactionList from '../TransactionList/TransactionList';
import FinanceChart from '../FinanceChart/FinanceChart';
import NavbarMenu from '../Navbar/Navbar';

const Main = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div>
    <NavbarMenu/>
    <div className="container mt-4">
      <div className="row mt-4">
        <div className="col-md-6">
          <CurrencyConverter />
        </div>
        <div className="col-md-6">
        <TransactionForm addTransaction={addTransaction} />
        </div>
      </div>
      <TransactionList transactions={transactions} />
      <FinanceChart transactions={transactions} />
    </div>
    </div>
  );
};

export default Main;
