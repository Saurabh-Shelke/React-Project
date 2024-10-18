const axios = require('axios');
const Transaction = require('../models/Transaction');

const API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';


const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        const transactions = response.data;

        await Transaction.deleteMany(); 
        await Transaction.insertMany(transactions);

        res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error initializing database', error: error.message });
    }
};

const listTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '' } = req.query;
    const query = search
        ? {
              $or: [
                  { title: { $regex: search, $options: 'i' } },
                  { description: { $regex: search, $options: 'i' } },
                  { price: { $regex: search, $options: 'i' } },
              ],
          }
        : {};

    try {
        const transactions = await Transaction.find(query)
            .limit(Number(perPage))
            .skip((Number(page) - 1) * Number(perPage));
        const total = await Transaction.countDocuments(query);
        
        res.status(200).json({ total, transactions });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
    }
};

const getStatistics = async (req, res) => {
    const { month } = req.params; 
    const monthMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
    };

    const monthNumber = monthMap[month];
    const startDate = new Date(new Date().getFullYear(), monthNumber, 1);
    const endDate = new Date(new Date().getFullYear(), monthNumber + 1, 0);

    try {
        const soldItems = await Transaction.find({
            dateOfSale: { $gte: startDate, $lte: endDate },
        });

        const totalSales = soldItems.reduce((acc, transaction) => acc + transaction.price, 0);
        const notSoldItems = await Transaction.countDocuments({
            dateOfSale: { $gte: startDate, $lte: endDate },
            price: 0,
        });

        res.status(200).json({
            totalSaleAmount: totalSales,
            totalSoldItems: soldItems.length,
            totalNotSoldItems: notSoldItems,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error: error.message });
    }
};

// Get bar chart data for a selected month
const getBarChartData = async (req, res) => {
    const { month } = req.params;
    const monthMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
    };

    const monthNumber = monthMap[month];
    const startDate = new Date(new Date().getFullYear(), monthNumber, 1);
    const endDate = new Date(new Date().getFullYear(), monthNumber + 1, 0);

    const ranges = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '901-above': 0,
    };

    try {
        const transactions = await Transaction.find({
            dateOfSale: { $gte: startDate, $lte: endDate },
        });

        transactions.forEach((transaction) => {
            const price = transaction.price;
            if (price <= 100) ranges['0-100']++;
            else if (price <= 200) ranges['101-200']++;
            else if (price <= 300) ranges['201-300']++;
            else if (price <= 400) ranges['301-400']++;
            else if (price <= 500) ranges['401-500']++;
            else if (price <= 600) ranges['501-600']++;
            else if (price <= 700) ranges['601-700']++;
            else if (price <= 800) ranges['701-800']++;
            else if (price <= 900) ranges['801-900']++;
            else ranges['901-above']++;
        });

        res.status(200).json(ranges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bar chart data', error: error.message });
    }
};

// Get pie chart data for unique categories
const getPieChartData = async (req, res) => {
    const { month } = req.params;
    const monthMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
    };

    const monthNumber = monthMap[month];
    const startDate = new Date(new Date().getFullYear(), monthNumber, 1);
    const endDate = new Date(new Date().getFullYear(), monthNumber + 1, 0);

    try {
        const transactions = await Transaction.find({
            dateOfSale: { $gte: startDate, $lte: endDate },
        });

        const categoryCount = {};
        transactions.forEach((transaction) => {
            categoryCount[transaction.category] = (categoryCount[transaction.category] || 0) + 1;
        });

        res.status(200).json(categoryCount);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pie chart data', error: error.message });
    }
};

// Combined API
const getCombinedData = async (req, res) => {
    const { month } = req.params;
    const statistics = await getStatistics(month);
    const barChartData = await getBarChartData(month);
    const pieChartData = await getPieChartData(month);

    res.status(200).json({
        statistics,
        barChartData,
        pieChartData,
    });
};

module.exports = {
    initializeDatabase,
    listTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData,
    getCombinedData,
};
