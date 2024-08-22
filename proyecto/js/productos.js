
import { agregarCarrito } from "./carrito.js";
import { productos, contenedorProductos } from "./app.js";
const URL = 'https://66c416ebb026f3cc6cedfb5c.mockapi.io/productos';
export function mostrarProductos() {
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
}

export function realizarBusqueda(buscador) {
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
}

export async function descontarStock(productoId) {
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
}