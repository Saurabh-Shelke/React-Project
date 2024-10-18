import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TransactionList from './components/TransactionList';
import TransactionStatistics from './components/TransactionStatistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import './App.css';

const App = () => {
    const [month, setMonth] = useState('January');
    return (
        <div>
            <Navbar />
            <main style={{ padding: '1rem' }}>
                <h2>Select Month:</h2>
                <select onChange={(e) => setMonth(e.target.value)}>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <TransactionStatistics month={month} />
                <BarChart month={month} />
                <PieChart month={month} />
                <TransactionList />
            </main>
        </div>
    );
};

export default App;
