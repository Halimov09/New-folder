import React, { useState, useEffect } from 'react';
import { getExchangeRates } from '../../service/service.Api';
import 'bootstrap/dist/css/bootstrap.min.css';

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [amount, setAmount] = useState(1);
  const [convertedRates, setConvertedRates] = useState([]);
  const [showAll, setShowAll] = useState(false); // Qo'shimcha state

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getExchangeRates(baseCurrency);
        setRates(data);
        calculateConversion(data);
      } catch (error) {
        console.error('Error fetching exchange rates:', error.message);
      }
    };

    fetchRates();
  }, [baseCurrency, amount]);

  const calculateConversion = (data) => {
    const converted = Object.entries(data).map(([currency, rate]) => ({
      currency,
      value: (rate * amount).toFixed(2),
    }));
    setConvertedRates(converted);
  };

  // Kurslarni qisqartirish
  const displayedRates = showAll ? convertedRates : convertedRates.slice(0, 5);

  return (
    <div className="">
      <div className="row ">
        <div className="col-sm-12">
          <div className="card shadow">
            <div className="card-header text-center bg-primary text-white">
              <h3>Currency Converter</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="baseCurrency" className="form-label">Base Currency</label>
                  <select
                    id="baseCurrency"
                    className="form-select"
                    value={baseCurrency}
                    onChange={(e) => setBaseCurrency(e.target.value)}
                  >
                    {Object.keys(rates).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                  />
                </div>
              </form>
              <h5 className="mt-4">Converted Rates</h5>
              <ul className="list-group">
                {displayedRates.map((rate) => (
                  <li key={rate.currency} className="list-group-item d-flex justify-content-between align-items-center">
                    {rate.currency}
                    <span className="badge bg-primary rounded-pill">{rate.value}</span>
                  </li>
                ))}
              </ul>
              {/* Qo'shimcha button */}
              {convertedRates.length > 1 && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? 'Kamroq ko\'rsatish' : 'Ko\'proq ko\'rsatish'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
