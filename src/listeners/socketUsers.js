import { userService } from "../repository/index.js";

const socketUsers = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log("Cliente conectado: ", socket.id);

        //Ver lista
        const listaUsers = await userService.getAllUsers();
        socket.emit("realusers", listaUsers);

        //Eliminar producto
        socket.on("delete-user", async (email) => {
            console.log("🚀 ~ socket.on ~ email:", email);
            const res = await userService.deleteUser(email);
            console.log("Respuesta:", res);

            const listaUsers = await userService.getAllUsers();
            socket.emit("realusers", listaUsers)
        })

    });
};

export default socketUsers;