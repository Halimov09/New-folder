import React, { useEffect, useState } from 'react';
import { getExchangeRates } from '..//../service/service.Api';

const Main = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const ratesData = await getExchangeRates('AED'); 
        setRates(ratesData);
        setLoading(false);
      } catch (error) {
        console.error('Valyuta kurslarini olishda xatolik:', error);
      }
    };

    fetchRates();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <div>
      <h2>Valyuta kurslari</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Valyuta</th>
            <th>Kurs</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates).map(([currency, rate]) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{rate.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
