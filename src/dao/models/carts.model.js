import mongoose from "mongoose";

const collectionName = "carts";

const cartSchema = new mongoose.Schema({
    products: {
      type:[
        {
          product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true
          },
          quantity:{
            type: Number,
            required: true
            //default: 1
          }
        }
      ],
    }
  });

cartSchema.pre('find', function () {
    console.log("EJECUTO EL PRE MDW DE MONGOOSE");
    this.populate('products.product');
})

const cartsModel = mongoose.model(collectionName, cartSchema);
export default cartsModel;