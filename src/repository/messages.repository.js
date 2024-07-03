export default class MessageRepositoryDao {
  constructor(dao) {
    this.dao = dao;
  }

  getMessages = async () => {
    return this.dao.getMessages();
  }

  createMessage = async (message) => {
    return this.dao.createMessage(message);
  }
}