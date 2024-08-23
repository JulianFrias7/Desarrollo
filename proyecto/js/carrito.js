import { descontarStock } from "./productos.js";
//import {imagenCarrito, contenedorCarrito, cerrarVentana, lista, totalDeProductos} from "./app.js"
let precioProductosCarrito = [];
let totalTodo = 0
const imagenCarrito = document.querySelector(".img_carrito");
const contenedorCarrito = document.getElementById("contenedor_carrito");
const cerrarVentana = document.querySelector(".cerrar_ventana");
const lista = document.getElementById("items");
const totalDeProductos = document.querySelector(".total_productos");
const botonComprarProductos = document.querySelector("#boton_compra");
const contenedorBotonCompra = document.querySelector('.compra_realizada')
export async function agregarCarrito() {
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
                contenedorBotonCompra.style.display = 'flex'
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
    });
    
    cerrarVentana.addEventListener("click", function() {
        contenedorCarrito.style.display = "none";
        document.body.style.overflow = "auto";
    });
}

export function comprarProductos(){
    botonComprarProductos.addEventListener('click', function(){
        lista.innerHTML = '';
        totalDeProductos.innerHTML = '';
        Swal.fire({
            title: '¡Compra Exitosa!',
            text: '¡Gracias por su compra!, esta se vera en su perfil',
            icon: 'success',
            confirmButtonText: 'Aceptar'
            });
        contenedorBotonCompra.style.display = 'none'
    })
}