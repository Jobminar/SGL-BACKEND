import { Schema, model } from 'mongoose';

const userOrderSchema = Schema({
  totalItems: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  shipping: { type: String, required: false },
  grandTotal: { type: Number, required: true },
  username: { type: String, required: true },
  date: { type: Date, required: true },
  address: { type: String, required: true },
  status:{type:String,required:true}
});

const UserOrders = model('UserOrders', userOrderSchema);

export default UserOrders;
