import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import './TransactionList.css'; 

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/transactions?page=${page}&perPage=${perPage}&search=${search}`);
                setTransactions(response.data.transactions);
                setTotal(response.data.total);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [page, perPage, search]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="transaction-list">
            <input
                type="text"
                placeholder="Search Transactions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>${transaction.price.toFixed(2)}</td>
                            <td>{transaction.category}</td>
                            <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
                <span>{` Page ${page} of ${Math.ceil(total / perPage)}`}</span>
                <button onClick={() => setPage((prev) => (prev < Math.ceil(total / perPage) ? prev + 1 : prev))}>Next</button>
            </div>
        </div>
    );
};

export default TransactionList;
