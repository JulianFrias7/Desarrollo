// Declaración de elementos del DOM
const imagenCarrito = document.querySelector(".img_carrito");
const contenedorCarrito = document.getElementById("contenedor_carrito");
const cerrarVentana = document.querySelector(".cerrar_ventana");
const contenedor = document.querySelector(".contenedor_productos");
const buscador = document.querySelector('.buscar_producto')
const imagenBusqueda = document.querySelector('.img_busqueda')
const barraBusqueda = document.querySelector('.buscar_producto')
const botonBusqueda = document.querySelector('.boton_buscar')
const botonCerrar = document.querySelector('.boton_cerrar')
const URL = 'https://66c416ebb026f3cc6cedfb5c.mockapi.io/productos';


function abrirCerrarVentanaCarrito() {
    imagenCarrito.addEventListener("click", function() {
        contenedorCarrito.style.display = "block";
    });
    
    cerrarVentana.addEventListener("click", function() {
        contenedorCarrito.style.display = "none";
    });
}


function abrirVentanaBusqueda() {
    imagenBusqueda.addEventListener("click", function() {
        if (barraBusqueda.style.display === 'none' || barraBusqueda.style.display === '') {
            barraBusqueda.style.display = 'block';
            botonBusqueda.style.display = 'inline-block';  
            botonCerrar.style.display = 'inline-block'; 
            document.body.style.overflow = 'hidden'; 
        }
    });

    botonBusqueda.addEventListener('click', function(){
        realizarBusqueda();
    })

    botonCerrar.addEventListener('click', function() {
        barraBusqueda.style.display = 'none';
        botonBusqueda.style.display = 'none';  
        botonCerrar.style.display = 'none';  
        document.body.style.overflow = 'auto';
    });
}


function mostrarProductos() {
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
        contenedor.innerHTML = datos;
    })
    .catch(err => console.error(err));
}

function realizarBusqueda() {
    const terminoBusqueda = buscador.value.toLowerCase();
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            const productosFiltrados = data.filter(producto => 
                producto.nombre.toLowerCase() === terminoBusqueda ||
                producto.categoria.toLowerCase() === terminoBusqueda
            );

            if (productosFiltrados.length > 0) {
                contenedor.innerHTML = ''; // vaciar el contenedor anterior
                let productos = '';
                productosFiltrados.forEach(producto => {
                    productos += `
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
                contenedor.innerHTML = productos;
            } else {
                alert('No se encontraron productos');
            }
        })
        .catch(err => console.error('Error al buscar productos:', err));
}


function buscarProductoOCategoria() {
    buscador.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            realizarBusqueda();
        }
    });

    buscador.addEventListener('keyup', function(event){
        if (event.key === 'Backspace' && buscador.value === '') {
            mostrarProductos();
        }
    });
}

function main() {
    abrirCerrarVentanaCarrito();
    mostrarProductos();
    buscarProductoOCategoria();
    abrirVentanaBusqueda();
}

main();
