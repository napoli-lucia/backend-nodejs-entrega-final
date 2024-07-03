import mongoose from "mongoose";

const collectionName = "messages";

const messageSchema = new mongoose.Schema({
    user: {
      //correo del usuario
      type: String,
      required: true,
    },
    message: {
      //mensaje del usuario
      type: String,
      required: true,
    }
  });
  
const messagesModel = mongoose.model(collectionName, messageSchema);
export default messagesModel;