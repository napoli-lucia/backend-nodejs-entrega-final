//Escucha del cliente
const socket = io();

const nombreUsuario = document.getElementById("nombreusuario");
const formulario = document.getElementById("formulario");
const messageInput = document.getElementById("message-input");
const chat = document.getElementById("chat");
const deleteMessages = document.getElementById("delete-messages");

let user=null
if(!user){
    Swal.fire({
        title:"Bienvenido al chat del Ecommerce",
        text:"Ingrese su mail",
        input:"text",
        inputValidator:(value)=>{
          return !value && "Debe ingresar un mail para poder chatear";
        },
        allowOutsideClick: false
    })
    .then(username=>{
        user = username.value
        nombreUsuario.innerHTML = user
        socket.emit("nuevousuario",user)
    })
}

socket.on("new-user", (user) => {
  if(!user) return
  Swal.fire({
    text: `¡${user} se a conectado al chat!`,
    toast: true,
    position: "top-right",
    timer: 15000,
    timerProgressBar: true
  })
});


formulario.onsubmit=(e)=>{
  e.preventDefault()
  const data={
      user: user,
      message: messageInput.value
  }
  console.log("🚀 ~ data:", data)
  socket.emit("mensaje",data)
  messageInput.value=" "
}

socket.on("messageLogs", (data) => {
    console.log("🚀 ~ socket.on ~ data:", data)
    const log = document.getElementById("message-logs");
    let messages = "";
    data.forEach(msg => {
      console.log("🚀 ~ socket.on ~ msg:", msg)
      messages += `<p>${msg.user}: ${msg.message}</p>`
    })
  
    log.innerHTML = messages;
})
