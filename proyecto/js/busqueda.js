
import { mostrarProductos, realizarBusqueda, descontarStock } from "./productos.js";
const buscador = document.querySelector('.buscar_producto')
const imagenBusqueda = document.querySelector('.img_busqueda')
const contenedorBusqueda = document.querySelector('.contenedor_buscador')
const buscadorMovil= document.querySelector('.buscador')
const botonBuscar = document.querySelector('.boton_buscar')
const botonCerrar = document.querySelector('.boton_cerrar')
export function abrirVentanaBusqueda() {
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
}
export function buscarProductoOCategoria() {
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
}
