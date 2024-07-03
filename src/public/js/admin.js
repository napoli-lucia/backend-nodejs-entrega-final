//Escucha del cliente
const socket = io();

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.roleSelect').forEach(function (select) {
        var role = select.parentNode.querySelector('input[name="role"]').value;
        select.value = role;

        select.addEventListener('change', function () {
            var email = this.getAttribute('data-email');
            var role = this.value;
            var form = document.getElementById('changeRole-' + Array.from(document.querySelectorAll('.roleSelect')).indexOf(this));
            form.querySelector('input[name="role"]').value = role;
        });
    });
});


//Eliminar un usuario
document.getElementById("send-delete").addEventListener("click", function () {
  const deleteIdInput = document.getElementById("user-email");
  console.log("🚀 ~ deleteIdInput:", deleteIdInput)
  const uid = deleteIdInput.value;
  socket.emit("delete-user", uid);
  deleteIdInput.value = "";
})