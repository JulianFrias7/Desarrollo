import { agregarCarrito, abrirCerrarVentanaCarrito, comprarProductos } from "./carrito.js";
import { abrirVentanaBusqueda, buscarProductoOCategoria } from "./busqueda.js";
import { mostrarProductos } from "./productos.js";
import { abrirCerrarVentanaPerfil } from "./perfil.js";
// Declaración de elementos del DOM
//let productos = [];
//let precioProductosCarrito = [];
//const imagenCarrito = document.querySelector(".img_carrito");
//const contenedorCarrito = document.getElementById("contenedor_carrito");
//const cerrarVentana = document.querySelector(".cerrar_ventana");
//const lista = document.getElementById("items");
//const totalDeProductos = document.querySelector(".total_productos");

//export {productos, imagenCarrito, contenedorCarrito, cerrarVentana, lista, totalDeProductos};

//para desktop
//const contenedorProductos = document.querySelector(".contenedor_productos"); //donde van los productos
//const buscador = document.querySelector('.buscar_producto') //el input de buscar producto
// const imagenBusqueda = document.querySelector('.img_busqueda') //imagen de busqueda
// export {contenedorProductos, buscador, imagenBusqueda}
//para moviles
const contenedorBusqueda = document.querySelector('.contenedor_buscador')
// const buscadorMovil= document.querySelector('.buscador')
// const botonBuscar = document.querySelector('.boton_buscar')
// const botonCerrar = document.querySelector('.boton_cerrar')
// const barraBusqueda = document.querySelector('.buscar_producto')
// const botonBusqueda = document.querySelector('.boton_buscar')
// export {contenedorBusqueda, buscadorMovil, botonBuscar, botonCerrar, barraBusqueda, botonBusqueda}
//para moviles
const URL = 'https://66c416ebb026f3cc6cedfb5c.mockapi.io/productos';



/*async function agregarCarrito() {
    const botonesAgregarCarrito = document.querySelectorAll('.agregar_carrito');
    
    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', async function() {
            const productoId = boton.id;
            const stockDisponible = await descontarStock(productoId); // verifica si hay stock disponible
            console.log(stockDisponible);
            if (stockDisponible === 0) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Sin stock!',
                    text: 'Lo sentimos, no hay más stock disponible para este producto.',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                const productoNombre = document.querySelector(`.dato-nombre${productoId}`).textContent;
                const productoCategoria = document.querySelector(`.dato-categoria${productoId}`).textContent;
                const productoPrecioTexto = document.querySelector(`.dato-precio${productoId}`).textContent;
                const productoPrecio = parseFloat(productoPrecioTexto.split('$')[1]);

                precioProductosCarrito.push(productoPrecio);
                
                let nuevoProducto = document.createElement('li');
                nuevoProducto.textContent = `${productoNombre} | ${productoCategoria} | ${productoPrecioTexto}`;
                lista.appendChild(nuevoProducto);
                


                
                totalTodo = calcularTotal(precioProductosCarrito);
                totalDeProductos.innerHTML= ''
                console.log(totalTodo);
                let totalPrecioParrafo = document.createElement('p');
                totalPrecioParrafo.textContent = `Total: $${totalTodo}`;
                totalDeProductos.appendChild(totalPrecioParrafo);
                console.log(productoNombre);
                console.log(precioProductosCarrito);
            }
        });
    });
}*/

/*function calcularTotal(array){
    let total = array.reduce((acumulador, valorActual) => acumulador + valorActual, 0)
    return total
}*/   
/*async function descontarStock(productoId) {
    try {
        const res = await fetch(URL);
        const data = await res.json();
        const producto = productos.find(p => p.id == productoId); // buscar producto id
        
        if (producto && producto.stock > 0) {
            producto.stock -= 1;
            console.log(`El nuevo stock de ${producto.nombre} es ${producto.stock}`);
            
            const stockElemento = document.getElementById(`stock-${productoId}`);
            stockElemento.textContent = `Stock: ${producto.stock}`;
            
            return producto.stock + 1; 
            
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Sin stock!',
                text: 'Lo sentimos, no hay más stock disponible para este producto.',
                confirmButtonText: 'Aceptar'
            });
            return 0; 
        }
    } catch (err) {
        console.error("Error al descontar el stock:", err);
        return 0; 
    }
}*/



/*function abrirCerrarVentanaCarrito() {
    imagenCarrito.addEventListener("click", function() {
        contenedorCarrito.style.display = "block";
        document.body.style.overflow = "hidden";
    });
    
    cerrarVentana.addEventListener("click", function() {
        contenedorCarrito.style.display = "none";
        document.body.style.overflow = "auto";
    });
}*/


/*function abrirVentanaBusqueda() {
    imagenBusqueda.addEventListener('click', function() {
        if (window.innerWidth < 550) {
            // para moviles
            if (contenedorBusqueda.style.display === 'none' || contenedorBusqueda.style.display === '') {
                buscadorMovil.style.display = 'block';
                contenedorBusqueda.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        } else {
            // para pantallas grandes
            contenedorBusqueda.style.display = 'none';
            buscadorMovil.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    botonCerrar.addEventListener('click', function() {
        contenedorBusqueda.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    botonBuscar.addEventListener('click', function() {
        realizarBusqueda(buscadorMovil);
    });
}*/

// evento cuando el tamaño del navegador cambia
window.addEventListener('resize', function() {
    if (window.innerWidth > 550) {
        contenedorBusqueda.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

/*function mostrarProductos() {
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        productos = data;
        let datos = '';
        data.forEach(producto => {
            datos += `
                <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="producto_informacion">
                        <h3 class="dato-nombre${producto.id}">${producto.nombre}</h3>
                        <p class="dato-precio${producto.id}">Precio: $${producto.precio}</p>
                        <p class="dato-categoria${producto.id}">Categoría: ${producto.categoria}</p>
                        <p id="stock-${producto.id}" class="stock">Stock: ${producto.stock}</p>
                        <button class="agregar_carrito" id="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>
            `;
        });
        contenedorProductos.innerHTML = datos;
        agregarCarrito();
    })
    .catch(err => console.error(err));
}*/

/*function realizarBusqueda(buscador) {
    const terminoBusqueda = buscador.value.toLowerCase();
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            const productosFiltrados = data.filter(producto => 
                producto.nombre.toLowerCase().includes(terminoBusqueda) ||
                producto.categoria.toLowerCase().includes(terminoBusqueda)
            );

            if (productosFiltrados.length > 0) {
                contenedorProductos.innerHTML = ''; // vaciar el contenedor anterior
                let productos = '';
                productosFiltrados.forEach(producto => {
                    productos += `
                        <div class="producto">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <div class="producto_informacion">
                                <h3 class="dato-nombre${producto.id}">${producto.nombre}</h3>
                                <p class="dato-precio${producto.id}">Precio: $${producto.precio}</p>
                                <p class="dato-categoria${producto.id}">Categoría: ${producto.categoria}</p>
                                <p id="stock-${producto.id}" class="stock">Stock: ${producto.stock}</p>
                                <button class="agregar_carrito" id="${producto.id}">Agregar al carrito</button>
                            </div>
                        </div>
                    `;
                });
                contenedorProductos.innerHTML = productos;
                agregarCarrito(); // Volvemos a agregar los eventos a los botones
            } else {
                alert('No se encontraron productos');
            }
        })
        .catch(err => console.error('Error al buscar productos:', err));
}*/



/*function buscarProductoOCategoria() {
    buscador.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            realizarBusqueda(buscador);
        }
    });

    buscador.addEventListener('keyup', function(event){
        if (event.key === 'Backspace' && buscador.value === '') {
            mostrarProductos();
        }
    });

    buscadorMovil.addEventListener('keyup', function(event){
        if (event.key === 'Backspace' && buscadorMovil.value === '') {
            mostrarProductos();
            descontarStock(productoId);
        }
    });
}*/

function main() {
    abrirCerrarVentanaCarrito(); //listo
    mostrarProductos();//listo
    buscarProductoOCategoria();
    abrirVentanaBusqueda();//listo
    agregarCarrito() //listo
    comprarProductos()
    abrirCerrarVentanaPerfil()
}

main()
