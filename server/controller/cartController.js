// cartController.js
import Cart from '../model/cartModel.js'; // Assuming the path is correct

// Controller function to handle the creation of a new cart item
export const createCartItem = async (req, res) => {
  console.log(req.body);
  try {
    // Create a new Cart instance with all the data from the request body
    const newCartItem = new Cart(req.body);

    // Save the new cart item to the database
    await newCartItem.save();

    // Sending a success response
    res.status(201).json({ message: 'Cart item created successfully', cartItem: newCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to retrieve all cart items
export const getAllCartItems = async (req, res) => {
  try {
    // Retrieve all cart items from the database
    const cartItems = await Cart.find();

    // Sending a success response
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to delete a specific cart item by ID
export const deleteCartItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    // Find and delete the cart item by ID
    const deletedCartItem = await Cart.findByIdAndDelete(itemId);

    if (!deletedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Sending a success response
    res.status(200).json({ message: 'Cart item deleted successfully', deletedCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  createCartItem,
  getAllCartItems,
  deleteCartItem,
};
