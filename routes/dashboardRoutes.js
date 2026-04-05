
const router = require("express").Router();

const {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrends,
  getWeeklyTrends,
  getRecentActivity,
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");
const { role } = require("../middleware/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Analytics and dashboard APIs
 */


/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get financial summary (All authenticated users)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               totalIncome: 50000
 *               totalExpense: 20000
 *               balance: 30000
 */
router.get("/summary", protect, getSummary);


/**
 * @swagger
 * /api/dashboard/categories:
 *   get:
 *     summary: Get category-wise breakdown (Admin, Analyst)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category breakdown fetched
 *         content:
 *           application/json:
 *             example:
 *               - _id: Food
 *                 total: 5000
 *               - _id: Salary
 *                 total: 30000
 */
router.get(
  "/categories",
  protect,
  role("admin", "analyst"),
  getCategoryBreakdown
);


/**
 * @swagger
 * /api/dashboard/trends/monthly:
 *   get:
 *     summary: Get monthly trends (Admin, Analyst)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trends data
 *         content:
 *           application/json:
 *             example:
 *               - _id:
 *                   year: 2026
 *                   month: 4
 *                 total: 15000
 */
router.get(
  "/trends/monthly",
  protect,
  role("admin", "analyst"),
  getMonthlyTrends
);


/**
 * @swagger
 * /api/dashboard/trends/weekly:
 *   get:
 *     summary: Get weekly trends (Admin, Analyst)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Weekly trends data
 *         content:
 *           application/json:
 *             example:
 *               - _id:
 *                   year: 2026
 *                   week: 14
 *                 total: 8000
 */
router.get(
  "/trends/weekly",
  protect,
  role("admin", "analyst"),
  getWeeklyTrends
);


/**
 * @swagger
 * /api/dashboard/recent:
 *   get:
 *     summary: Get recent activity (All authenticated users)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent records fetched
 *         content:
 *           application/json:
 *             example:
 *               - amount: 5000
 *                 type: income
 *                 category: Salary
 *                 date: 2026-04-05
 */
router.get("/recent", protect, getRecentActivity);

module.exports = router;