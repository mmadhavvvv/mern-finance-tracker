import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trash2, LogOut, Wallet, TrendingUp, TrendingDown, PlusCircle } from 'lucide-react';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('General');
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/transactions');
            setTransactions(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addTransaction = async (e) => {
        e.preventDefault();
        if (!text || !amount) return;
        try {
            const res = await axios.post('http://localhost:5000/api/transactions', { text, amount: +amount, category });
            setTransactions([res.data.data, ...transactions]);
            setText(''); setAmount('');
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/transactions/${id}`);
            setTransactions(transactions.filter(t => t._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = Math.abs(amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0)).toFixed(2);

    // Chart Data
    const chartData = transactions.slice().reverse().map(t => ({
        name: new Date(t.createdAt).toLocaleDateString(),
        amount: t.amount
    }));

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2 style={{ marginBottom: '2rem' }}>💰 WealthWave</h2>
                <div style={{ marginBottom: '2rem' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>WELCOME BACK</p>
                    <h3>{user?.name}</h3>
                </div>

                <button className="logout-btn" onClick={logout}>
                    <LogOut size={18} style={{ marginRight: '8px' }} /> Logout
                </button>
            </div>

            <div className="main-content">
                <div className="stat-grid">
                    <div className="stat-card">
                        <h4>Total Balance</h4>
                        <div className="value">${total}</div>
                    </div>
                    <div className="stat-card income">
                        <h4>Monthly Income</h4>
                        <div className="value">+${income}</div>
                    </div>
                    <div className="stat-card expense">
                        <h4>Monthly Expense</h4>
                        <div className="value">-${expense}</div>
                    </div>
                </div>

                <div className="flex-row">
                    <div className="card-box" style={{ flex: 2 }}>
                        <h3>Spending Overview</h3>
                        <div style={{ width: '100%', height: 300, marginTop: '1rem' }}>
                            <ResponsiveContainer>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                                    <YAxis stroke="#94a3b8" fontSize={12} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="amount" stroke="#6366f1" fillOpacity={1} fill="url(#colorAmt)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card-box">
                        <h3>New Transaction</h3>
                        <form className="modern-form" onSubmit={addTransaction} style={{ marginTop: '1rem' }}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Food, Rent, etc..." />
                            </div>
                            <div className="form-group">
                                <label>Amount (Use - for expense)</label>
                                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                            </div>
                            <button className="modern-btn">Add Record</button>
                        </form>
                    </div>
                </div>

                <div className="card-box" style={{ marginTop: '2rem' }}>
                    <h3>Recent History</h3>
                    <div className="transaction-list">
                        {transactions.map(t => (
                            <div key={t._id} className={`t-item ${t.amount > 0 ? 'plus' : 'minus'}`}>
                                <div>
                                    <strong>{t.text}</strong>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{new Date(t.createdAt).toDateString()}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span className="value">{t.amount > 0 ? '+' : '-'}${Math.abs(t.amount)}</span>
                                    <button onClick={() => deleteTransaction(t._id)} className="delete-btn">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
