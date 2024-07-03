import mongoose from "mongoose";
import { productService } from "../repository/index.js";

const socketProducts = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log("Cliente conectado: ", socket.id);

        //Ver lista productos
        const listadeproductos = await productService.getProducts();
        socket.emit("real-products", listadeproductos);

        //Ingresar nuevo producto
        socket.on("create-prod", async (data) => {
            console.log("Data ingresada:", data)
            const res = await productService.addProduct(data);
            console.log("Respuesta:", res);

            const listadeproductos = await productService.getProducts();
            socket.emit("real-products", listadeproductos);
        })

        //Eliminar producto
        socket.on("delete-prod", async (pid) => {
            console.log("Id ingresado:", pid);
            if (pid && !mongoose.Types.ObjectId.isValid(pid)) {
                socket.emit("error", { error: "Id no valido" });
                return;
            }

            const res = await productService.deleteProduct(pid);
            console.log("Respuesta:", res);

            const listadeproductos = await productService.getProducts();
            socket.emit("real-products", listadeproductos)
        })

    });
};

export default socketProducts;