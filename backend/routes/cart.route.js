// import express from 'express';
// import { addToCart , removeAllFromCart, updateQuantity, getCartProducts} from '../controllers/cart.controller.js';
// import { protectRoute } from '../middleware/auth.middleware.js';

// const router = express.Router();

// router.get("/",protectRoute, getCartProducts);
// router.post("/",protectRoute, addToCart);
// router.delete("/",protectRoute, removeAllFromCart);
// router.put("/:id",protectRoute, updateQuantity);

// export default router;

import express from 'express';
import { addToCart , removeAllFromCart, updateQuantity, getCartProducts } from '../controllers/cart.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management APIs
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all products in the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart products
 *       401:
 *         description: Unauthorized
 */
router.get("/", protectRoute, getCartProducts);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product added to cart
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", protectRoute, addToCart);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Remove all products from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/", protectRoute, removeAllFromCart);

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product in the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", protectRoute, updateQuantity);

export default router;
