//Escucha del cliente
const socket = io();

const deleteButtons = document.querySelectorAll('.cartButtonDel');

deleteButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        const cid = event.target.getAttribute('data-cart-id');
        const pid = event.target.getAttribute('data-product-id');

        socket.emit('deleteProduct', { cid, pid });
    });
});