// pearlsModel.js
import { Schema, model } from 'mongoose';

const pearlsSchema = Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  colour: { type: String, required: true },
  subtype: { type: String, required: true },
  units: { type: String, required: true },
  value: { type: String, required: true },
  shape: { type: String, required: true },
  dimensions:{type:String,required:true},
  transparency:{type:String,required:true},
  hardness:{type:Number,required:true},
  microscopicexamination:{type:String,required:true}
});

const Pearls = model('Pearls', pearlsSchema);

export default Pearls;
