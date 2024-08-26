//localStorage.clear()
import { agregarCarrito, abrirCerrarVentanaCarrito, comprarProductos } from "./js/carrito.js";
import { abrirVentanaBusqueda, buscarProductoOCategoria } from "./js/busqueda.js";
import { mostrarProductos } from "./js/productos.js";
import { abrirCerrarVentanaPerfil } from "./js/perfil.js";

const contenedorBusqueda = document.querySelector('.contenedor_buscador')
const URL = 'https://66c416ebb026f3cc6cedfb5c.mockapi.io/productos';

// evento cuando el tamaño del navegador cambia
window.addEventListener('resize', function() {
    if (window.innerWidth > 550) {
        contenedorBusqueda.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});


function main() {
    abrirCerrarVentanaCarrito(); //listo
    mostrarProductos();//listo
    buscarProductoOCategoria();
    abrirVentanaBusqueda();//listo
    agregarCarrito() //listo
    comprarProductos() //listo
    abrirCerrarVentanaPerfil() //listo
}

main()
