const cartIcon = document.querySelector(".img_carrito");
const cartModal = document.getElementById("cartModal");
const closeBtn = document.querySelector(".closeBtn");
const contenedor = document.querySelector(".contenedor_categorias");
    // Mostrar la ventana emergente al hacer clic en el ícono del carrito
cartIcon.addEventListener("click", function() {
    cartModal.style.display = "block";
});

    // Cerrar la ventana emergente al hacer clic en la 'X'
closeBtn.addEventListener("click", function() {
    cartModal.style.display = "none";
});


const URL = 'https://66c416ebb026f3cc6cedfb5c.mockapi.io/productos'
fetch(URL)
    .then(res => res.json())
    .then(data => {
        let datos = '';
        data.forEach(producto => {
            datos += `
                <div class="producto" style="background-image: url('${producto.imagen}');">
                    <div class="producto_informacion">
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${producto.precio}</p>
                        <p>Categoria: ${producto.categoria}</p>
                        <p>Stock: ${producto.stock}</p>
                        <p>Descripción: ${producto.descripcion}</p>
                        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                    </div>
                </div>
            `;
        });
        contenedor.innerHTML = datos;
    })
    .catch(err => console.log(err));

    //<img src="${producto.imagen}" alt="${producto.nombre}"></img>