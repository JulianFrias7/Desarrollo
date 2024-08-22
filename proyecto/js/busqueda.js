
import { mostrarProductos, realizarBusqueda, descontarStock } from "./productos.js";
import {buscador, imagenBusqueda, contenedorBusqueda, buscadorMovil, botonBuscar, botonCerrar} from "./app.js"
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
