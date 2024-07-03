//Escucha del cliente
const socket = io();

//**Real time products list**//
socket.on("real-products", (productsData) => {
    updateProductsList(productsData);
})

function updateProductsList(productList) {
    const realProducts = document.getElementById("real-products");

    let productsHTML = "";

    productList.forEach(product => {
        productsHTML += `
        <div class="container">
        <div class="producto">
        <img src=${product.thumbnails} alt="Producto ${product.title}" onerror="this.onerror=null; this.src='./images/no-image.jpg'; this.alt='image no available';">
            <div class="info">
            <ul>
                <li>ID: ${product.id}</li>
                <li>Titulo: ${product.title}</li>
                <li>Descripcion: ${product.description}</li>
                <li>Codigo: ${product.code}</li>
                <li>Stock: ${product.stock}</li>
                <li>Categoria: ${product.category}</li>
                <li>Owner: $${product.owner}</li>
                <li>Precio: $${product.price}</li>
            </ul>
            </div>
        </div>
        </div>`;
    });

    realProducts.innerHTML = productsHTML;
}

//Obtener datos nuevo producto
const form = document.getElementById("create-product");

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let price = Number(form.elements.price.value);
    let status = form.elements.status.checked; //Obtener valor checkbox
    let stock = Number(form.elements.stock.value);
    let category = form.elements.category.value;

    socket.emit("create-prod", {
        title,
        description,
        price,
        status,
        stock,
        category,
    })

    form.reset();
})


//Obtener id de producto a eliminar
document.getElementById("send-delete").addEventListener("click", function () {
    const deleteIdInput = document.getElementById("product-id");
    console.log("🚀 ~ deleteIdInput:", deleteIdInput)
    const pid = deleteIdInput.value;
    socket.emit("delete-prod", pid);
    deleteIdInput.value = "";
})

//Alerta error
socket.on("error", (error) => {
    console.error("Error received from server:", error);
    alert(error.error);
});