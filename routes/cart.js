import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";  // Update the path as necessary
import Cart from "../models/Cart.js";  // Update the path as necessary

const router = express.Router();

// Fetch cart for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add items to the cart for the authenticated user
router.post("/", authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      // Create a new cart if none exists
      cart = await Cart.create({ userId: req.user.id, items: [{ productId, quantity }] });
    } else {
      const index = cart.items.findIndex(item => item.productId === productId);
      if (index > -1) {
        // Update quantity if the product already exists in the cart
        cart.items[index].quantity += quantity;
      } else {
        // Add new item if not found
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Remove an item from the cart for the authenticated user
router.delete("/:productId", authenticateToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    // Remove the item with the specified productId
    cart.items = cart.items.filter(item => item.productId !== req.params.productId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

export default router;  // Exporting the router for use in other files
