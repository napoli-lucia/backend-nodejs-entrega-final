import messagesModel from "../models/messages.model.js"

class MessageServiceDao{
    constructor(path) {
		this.path = path;
	}

	async getMessages(){
        try {
            return await messagesModel.find({}).lean();
        } catch (error) {
            throw new Error(`No se pueden obtener los mensajes\n ${error.message}`);
        }
    }

	async createMessage(message){
        try {
            return await messagesModel.create(message);
        } catch (error) {
            throw new Error(`No se pueden crear el mensaje\n ${error.message}`);
        }
    }
}

export default MessageServiceDao;