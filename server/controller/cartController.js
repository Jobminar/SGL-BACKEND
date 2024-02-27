import Cart from '../model/cartModel.js';
import express from 'express';

const cartController = express.Router();

// Controller to create a new cart item
cartController.post('/create', async (req, res) => {
  try {
    const {
      clarity,
      colour,
      dimenensions,
      hardness,
      name,
      quantity,
      shape,
      size,
      subtype,
      transparency,
      units,
      userIds,
      weight,
      image, // Assuming the image is directly sent in the request body
    } = req.body;

    const newCartItem = new Cart({
      clarity,
      colour,
      dimenensions,
      hardness,
      image,
      name,
      quantity,
      shape,
      size,
      subtype,
      transparency,
      units,
      userIds,
      weight,
    });

    const savedCartItem = await newCartItem.save();

    res.status(201).json({ message: 'Cart item created successfully', cartItem: savedCartItem });
  } catch (error) {
    console.error('Error creating Cart item:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Controller to get all cart items
cartController.get('/getAll', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error fetching Cart items:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  };
//
cartController.post('/getCartByUserId', async (req, res) => {
  try {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required in the request body' });
    }

    const cartItems = await Cart.find({ userIds: userId });
  
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ error: 'No cart items found for the specified user ID' });
    }
  
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error fetching Cart items by user ID:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


 // Controller to delete a cart item by ID
cartController.delete('/deleteCart/:cartItemId', async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;

    const deletedCartItem = await Cart.findByIdAndDelete(cartItemId);

    if (!deletedCartItem) {
      return res.status(404).json({ error: 'Cart item not found or already deleted' });
    }

    res.status(200).json({ message: 'Cart item deleted successfully', deletedCartItem });
  } catch (error) {
    console.error('Error deleting Cart item:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


});

export default cartController;