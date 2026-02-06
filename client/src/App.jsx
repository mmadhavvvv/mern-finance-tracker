import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/transactions';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const res = await axios.get(API_URL);
      setTransactions(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    const newTransaction = {
      text,
      amount: +amount,
      category
    };

    try {
      const res = await axios.post(API_URL, newTransaction);
      setTransactions([res.data.data, ...transactions]);
      setText('');
      setAmount('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTransactions(transactions.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  return (
    <div className="container">
      <header>
        <h2>Finance Tracker</h2>
      </header>

      <div className="balance-container">
        <h4>Your Balance</h4>
        <h1 className="balance">${total}</h1>
      </div>

      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">+${income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">-${expense}</p>
        </div>
      </div>

      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <li key={transaction._id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
            {transaction.text} <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
            <button
              onClick={() => deleteTransaction(transaction._id)}
              className="delete-btn"
            >x</button>
          </li>
        ))}
      </ul>

      <h3>Add New Transaction</h3>
      <form onSubmit={addTransaction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  );
}

export default App;
