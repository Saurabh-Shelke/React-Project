const express = require('express');
const {
    initializeDatabase,
    listTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData,
    getCombinedData,
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/initialize', initializeDatabase);
router.get('/', listTransactions);
router.get('/statistics/:month', getStatistics);
router.get('/bar-chart/:month', getBarChartData);
router.get('/pie-chart/:month', getPieChartData);
router.get('/combined/:month', getCombinedData);

module.exports = router;
