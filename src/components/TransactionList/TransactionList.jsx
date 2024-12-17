import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div className="card shadow mt-4">
      <div className="card-header bg-primary text-white">
        <h5>Transaction List</h5>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {transactions.map((transaction, index) => (
            <li
              key={index}
              className={`list-group-item d-flex justify-content-between ${
                transaction.type === 'income' ? 'text-success' : 'text-danger'
              }`}
            >
              {transaction.description}
              <span>{transaction.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
