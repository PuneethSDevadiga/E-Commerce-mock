import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      quantity: Number
    }
  ]
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
