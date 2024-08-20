const imagenCarrito = document.querySelector(".img_carrito");
const contenedorCarrito = document.getElementById("contenedor_carrito");
const cerrarVentana = document.querySelector(".cerrar_ventana");
const contenedor = document.querySelector(".contenedor_productos");
    // Mostrar la ventana emergente al hacer clic en el ícono del carrito
imagenCarrito.addEventListener("click", function() {
    contenedorCarrito.style.display = "block";
});

    // Cerrar la ventana emergente al hacer clic en la 'X'
cerrarVentana.addEventListener("click", function() {
    contenedorCarrito.style.display = "none";
});


const URL = 'https://66c416ebb026f3cc6cedfb5c.mockapi.io/productos';
fetch(URL)
    .then(res => res.json())
    .then(data => {
        let datos = '';
        data.forEach(producto => {
            datos += `
                <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="producto_informacion">
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${producto.precio}</p>
                        <p>Categoría: ${producto.categoria}</p>
                        <p>Stock: ${producto.stock}</p>
                        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                    </div>
                </div>
            `;
        });
        contenedor.innerHTML = datos;  // Asignamos los datos una vez que están todos concatenados
    })
    .catch(err => console.error(err));

