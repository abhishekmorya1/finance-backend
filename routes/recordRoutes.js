
const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const { role } = require("../middleware/roleMiddleware");

const {
  createRecord,
  getAllRecords,
  filterRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");

const { getSummary } = require("../controllers/dashboardController");

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Financial Records API
 */


/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a new record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *               - category
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: income
 *               category:
 *                 type: string
 *                 example: Salary
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-05
 *               description:
 *                 type: string
 *                 example: Monthly salary
 *     responses:
 *       201:
 *         description: Record created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", protect, role("admin"), createRecord);


/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all records (Viewer, Analyst, Admin)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all records
 */
router.get("/", protect, role("viewer", "analyst", "admin"), getAllRecords);


/**
 * @swagger
 * /api/records/filter:
 *   get:
 *     summary: Filter records (Analyst, Admin)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         example: expense
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: Food
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-12-31
 *     responses:
 *       200:
 *         description: Filtered records
 */
router.get("/filter", protect, role("analyst", "admin"), filterRecords);


/**
 * @swagger
 * /api/records/summary:
 *   get:
 *     summary: Get dashboard summary (Analyst, Admin)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data (total income, expense, balance)
 */
router.get("/summary", protect, role("analyst", "admin"), getSummary);


/**
 * @swagger
 * /api/records/{id}:
 *   get:
 *     summary: Get single record (All roles)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6610a9f1c123abcd12345678
 *     responses:
 *       200:
 *         description: Single record fetched
 *       404:
 *         description: Record not found
 */
router.get("/:id", protect, role("viewer", "analyst", "admin"), getRecordById);


/**
 * @swagger
 * /api/records/{id}:
 *   patch:
 *     summary: Update record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6610a9f1c123abcd12345678
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 3000
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated successfully
 */
router.patch("/:id", protect, role("admin"), updateRecord);


/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete record (Admin only - soft delete)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6610a9f1c123abcd12345678
 *     responses:
 *       200:
 *         description: Record deleted successfully
 */
router.delete("/:id", protect, role("admin"), deleteRecord);


module.exports = router;