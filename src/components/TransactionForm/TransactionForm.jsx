import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const TransactionForm = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');

  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  // Qo'shish funksiyasi
  const addTransaction = (e) => {
    e.preventDefault();
    if (amount && description && category && date) {
      setTransactions([
        ...transactions,
        { type, amount: parseFloat(amount), description, category, date },
      ]);
      setAmount('');
      setDescription('');
      setCategory('');
      setDate('');
    }
  };

  // Jami hisoblash
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  // Diagramma uchun ma'lumotlar
  const expenseData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const chartData = {
    labels: Object.keys(expenseData),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(expenseData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Filtrlangan tranzaksiyalar
  const filteredTransactions = transactions.filter((t) => {
    return (
      (filterType ? t.type === filterType : true) &&
      (filterCategory ? t.category === filterCategory : true)
    );
  });

  return (
    <div className="mt-4">
      <form onSubmit={addTransaction} className="card p-3 shadow">
        <h5>Add Transaction</h5>
        <div className="mb-2">
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Category (Food, Transport, etc.)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add</button>
      </form>

      <div className="card p-3 shadow mt-4">
        <h4>Balance: ${balance.toFixed(2)}</h4>
        <p>Income: <span className="text-success">${income.toFixed(2)}</span></p>
        <p>Expense: <span className="text-danger">${expense.toFixed(2)}</span></p>
      </div>

      {/* Filtr */}
      <div className="card p-3 shadow mt-4">
        <h5>Filter Transactions</h5>
        <select className="form-select mb-2" onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          className="form-control"
          placeholder="Filter by Category"
          onChange={(e) => setFilterCategory(e.target.value)}
        />
      </div>

      {/* Tranzaksiya ro'yxati */}
      <ul className="list-group mt-3">
        {filteredTransactions.map((t, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            <span>
              {t.date} - {t.category}: {t.description} - ${t.amount.toFixed(2)}
            </span>
            <span className={`badge ${t.type === 'income' ? 'bg-success' : 'bg-danger'}`}>
              {t.type.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>

      {/* Diagramma */}
      <div className="mt-4">
        <h5>Expense Categories</h5>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default TransactionForm;
