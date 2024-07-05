import { cartService } from "../repository/index.js";

const socketCarts = (socketServer) => {
    socketServer.on("connection", async (socket) => {

        socket.on('deleteProduct', async (data) => {
            console.log("🚀 ~ socket.on ~ data:", data);
            const { cid, pid } = data;
            const res = await cartService.deleteProductInCart(cid, pid);
            console.log("🚀 ~ socket.on ~ res:", res);
            socketServer.emit('productDeleted', { cid, pid });

        });

    });
};

export default socketCarts;