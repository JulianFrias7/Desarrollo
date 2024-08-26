import { descontarStock } from "./productos.js";
let precioProductosCarrito = [];
let totalTodo = 0;
let listaProductos = [];
let productoAgregado = false;

const imagenCarrito = document.querySelector(".img_carrito");
const contenedorCarrito = document.querySelector(".carrito");
const cerrarVentana = document.querySelector(".cerrar_ventana");
const lista = document.getElementById("items");
const totalDeProductos = document.querySelector(".total_productos");
const botonComprarProductos = document.querySelector("#boton_compra");
const contenedorBotonCompra = document.querySelector('.compra_realizada');

export async function agregarCarrito() {
    const botonesAgregarCarrito = document.querySelectorAll('.agregar_carrito');
    
    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', async function() {
            const productoId = boton.id;
            const stockDisponible = await descontarStock(productoId); 
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

                
                precioProductosCarrito = JSON.parse(localStorage.getItem('precios')) || [];

                precioProductosCarrito.push(productoPrecio);

                
                localStorage.setItem('precios', JSON.stringify(precioProductosCarrito));

                listaProductos = JSON.parse(localStorage.getItem('productos')) || [];
                totalTodo = JSON.parse(localStorage.getItem('total')) || 0;
                
                let nuevoProducto = `${productoNombre} | ${productoCategoria} | ${productoPrecioTexto}`;
                listaProductos.push(nuevoProducto);
                localStorage.setItem('productos', JSON.stringify(listaProductos));

                let nuevoElemento = document.createElement('li');
                nuevoElemento.textContent = nuevoProducto;
                lista.appendChild(nuevoElemento);

                productoAgregado = true;

                totalTodo = calcularTotal(precioProductosCarrito);
                totalDeProductos.innerHTML = '';

                localStorage.setItem('total', JSON.stringify(totalTodo));

                let totalPrecioParrafo = document.createElement('p');
                totalPrecioParrafo.textContent = `Total: $${totalTodo}`;
                totalDeProductos.appendChild(totalPrecioParrafo);

                contenedorBotonCompra.style.display = 'flex';
                console.log(productoNombre);
                console.log(precioProductosCarrito);
            }
        });
    });
}

export function calcularTotal(array) {
    let total = array.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    return total;
}

export function abrirCerrarVentanaCarrito() {
    imagenCarrito.addEventListener("click", function() {
        contenedorCarrito.style.display = "block";
        document.body.style.overflow = "hidden";
        cargarPaginaCarrito();
    });
    
    cerrarVentana.addEventListener("click", function() {
        productoAgregado = true;
        contenedorCarrito.style.display = "none";
        document.body.style.overflow = "auto";
    });
}

export function comprarProductos() {
    botonComprarProductos.addEventListener('click', function() {
        lista.innerHTML = '';
        totalDeProductos.innerHTML = '';
        Swal.fire({
            title: '¡Compra Exitosa!',
            text: '¡Gracias por su compra!, esta se verá en su perfil',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        contenedorBotonCompra.style.display = 'none';

        localStorage.setItem('compraRealizada', 'true');
    });
}

export function cargarPaginaCarrito() {
    const compraRealizada = localStorage.getItem('compraRealizada') === 'true';

    if (compraRealizada) {
        lista.innerHTML = '';
        totalDeProductos.innerHTML = '';
        contenedorBotonCompra.style.display = 'none';
    } else {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const total = JSON.parse(localStorage.getItem('total')) || 0;
        
        if (productoAgregado === false && lista.style.display === '') {
            productos.forEach(producto => {
                console.log(producto);
                let item = document.createElement('li');
                item.textContent = producto;
                lista.appendChild(item);
            });

            let totalParrafo = document.createElement('p');
            totalParrafo.textContent = `Total: $${total}`;
            totalDeProductos.appendChild(totalParrafo);

            contenedorBotonCompra.style.display = 'flex';
        }
    }
}
