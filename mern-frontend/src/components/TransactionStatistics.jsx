
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionStatistics.css'; 

const TransactionStatistics = ({ month }) => {
    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/transactions/statistics/${month}`);
                setStatistics(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [month]);

    if (loading) return <div>Loading statistics...</div>;

    return (
        <div className="transaction-statistics">
            <h2>Statistics for {month}</h2>
            <p>Total Sale Amount: ${statistics.totalSaleAmount?.toFixed(2) || 0}</p>
            <p>Total Sold Items: {statistics.totalSoldItems || 0}</p>
            <p>Total Not Sold Items: {statistics.totalNotSoldItems || 0}</p>
        </div>
    );
};

export default TransactionStatistics;
