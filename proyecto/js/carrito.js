//localStorage.clear()
import { descontarStock } from "./productos.js";
let precioProductosCarrito = [];
let totalTodo = 0;
let listaProductos = [];
let productoAgregado = false;
let bandera = false
//localStorage.clear()
//localStorage.removeItem('compraRealizada');
//localStorage.setItem('compraRealizada', 'false');
const imagenCarrito = document.querySelector(".img_carrito");
const contenedorCarrito = document.querySelector(".carrito");
const cerrarVentana = document.querySelector(".cerrar_ventana");
const lista = document.getElementById("items");
const totalDeProductos = document.querySelector(".total_productos");
const botonComprarProductos = document.querySelector("#boton_compra");
const contenedorBotonCompra = document.querySelector('.compra_realizada');

function cargarDatosDesdeLocalStorage() {
    const preciosGuardados = localStorage.getItem('precios');
    const productosGuardados = localStorage.getItem('productos');
    const total = localStorage.getItem('total');
    if (preciosGuardados) {
        precioProductosCarrito = JSON.parse(preciosGuardados);
    } else {
        precioProductosCarrito = []; // inicializa si no hay datos
    }

    if (productosGuardados) {
        listaProductos = JSON.parse(productosGuardados);
    } else {
        listaProductos = []; // inicializa si no hay datos
    }

    if (total) {
        totalTodo = JSON.parse(total);
    } else {
        totalTodo = 0;
    }
}

export async function agregarCarrito() {
    cargarDatosDesdeLocalStorage();

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
                precioProductosCarrito.push(productoPrecio);
                listaProductos.push(`${productoNombre} | ${productoCategoria} | ${productoPrecioTexto}`);

                localStorage.setItem('precios', JSON.stringify(precioProductosCarrito));
                localStorage.setItem('productos', JSON.stringify(listaProductos));

                let nuevoElemento = document.createElement('li');
                nuevoElemento.textContent = `${productoNombre} | ${productoCategoria} | ${productoPrecioTexto}`;
                lista.appendChild(nuevoElemento);
                bandera = true;
                totalTodo = calcularTotal(precioProductosCarrito);
                totalDeProductos.innerHTML = '';
                let totalPrecioParrafo = document.createElement('p');
                totalPrecioParrafo.textContent = `Total: $${totalTodo}`;
                totalDeProductos.appendChild(totalPrecioParrafo);
                localStorage.setItem('total', JSON.stringify(totalTodo));
                contenedorBotonCompra.style.display = 'flex';
                // console.log(listaProductos); 
                // console.log(precioProductosCarrito);
                // console.log(totalTodo)
                productoAgregado = true
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
        contenedorCarrito.style.display = "none";
        document.body.style.overflow = "auto";
        const compraRealizada = localStorage.getItem('compraRealizada');
        if (compraRealizada === 'true') {
            lista.innerHTML = '';
            totalDeProductos.innerHTML = '';
            contenedorBotonCompra.style.display = 'none';
            precioProductosCarrito = [];
            listaProductos = [];
            totalTodo = 0;
            bandera = false;
            productoAgregado = false;
            localStorage.removeItem('precios');
            localStorage.removeItem('total');
            localStorage.removeItem('compraRealizada');

        }

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

        // reinicio de variables y limpiar local storage
        precioProductosCarrito = [];
        listaProductos = [];
        totalTodo = 0;
        bandera = false;
        productoAgregado = false;

        
        localStorage.removeItem('precios');
        localStorage.removeItem('productos');
        localStorage.removeItem('total');
        localStorage.removeItem('compraRealizada');
    });
}


export function cargarPaginaCarrito() {
    const compraRealizada = localStorage.getItem('compraRealizada');

    lista.innerHTML = '';
    totalDeProductos.innerHTML = '';

    if (compraRealizada === 'true') {
        contenedorBotonCompra.style.display = 'none';

        // reiniciar variables y limpiar local storage
        precioProductosCarrito = [];
        listaProductos = [];
        totalTodo = 0;
        bandera = false;
        productoAgregado = false;

        // eliminar
        localStorage.removeItem('precios');
        localStorage.removeItem('productos');
        localStorage.removeItem('total');
        localStorage.removeItem('compraRealizada');
    } else {
        let productos;
        if (localStorage.getItem('productos')) {
            productos = JSON.parse(localStorage.getItem('productos'));
        } else {
            productos = []; 
        }
        
        
        let total;
        if (localStorage.getItem('total')) {
            total = JSON.parse(localStorage.getItem('total'));
        } else {
            total = 0; 
        }

        if (productos.length > 0) {
            productos.forEach(producto => {
                let item = document.createElement('li');    
                item.textContent = producto;
                lista.appendChild(item);
            });

            let totalParrafo = document.createElement('p');
            totalParrafo.textContent = `Total: $${total}`;
            totalDeProductos.appendChild(totalParrafo);

            contenedorBotonCompra.style.display = 'flex';
            bandera = true;
        }
    }
}



