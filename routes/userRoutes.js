
const express = require("express");

const { protect } = require("../middleware/authMiddleware"); 
const { role } = require("../middleware/roleMiddleware");     

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserStatus
} = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Admin User Management APIs
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users fetched successfully
 */
router.get("/", protect, role("admin"), getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get single user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 */
router.get("/:id", protect, role("admin"), getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user details (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:   
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               email:
 *                 type: string
 *                 example: updated@gmail.com
 *               role:
 *                 type: string
 *                 example: analyst
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/:id", protect, role("admin"), updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/:id", protect, role("admin"), deleteUser);

/**
 * @swagger
 * /api/users/{id}/status:
 *   patch:
 *     summary: Update user status (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:   
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: User status updated successfully
 */
router.patch("/:id/status", protect, role("admin"), updateUserStatus);

module.exports = router;