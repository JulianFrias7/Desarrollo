const form = document.querySelector('.productos-form')
const container = document.querySelector('.container')
const URL = 'https://66bfba2942533c403146ee08.mockapi.io/productos'
//GET DE TODOS LOS PRODUCTOS
function cargarProductos(){
    fetch(URL)
        .then(res => res.json())
        //.then(data => console.log(data))
        .then(data => {
            let datos = ''
            data.forEach(producto => {
                datos += `
                    <div class="product-card">
                        <h3>${producto.name}</h3>
                        <p>${producto.descripcion}</p>
                        <p>${producto.precio}</p>
                        <img src="${producto.avatar}" alt="${producto.name}" width="50%">
                        <button onclick="editarProducto(${producto.id})">Editar</button>
                        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                    </div>
                `
            })
            container.innerHTML = datos
        })
        .catch(err => console.log(err))
}
//post para crear un nuevo recurso
function guardarProductos(){
    form.addEventListener('submit', function(event){
        event.preventDefault()
        const data = Object.fromEntries(new FormData(event.target))
        const id = form.querySelector('.producto_id').value//saco su valor por eso pongo value
        console.log('id-form', id)
        //console.log("Data", data)
        //aqui va el post para Enviar datos al servidor para crear un nuevo recurso
        if(id){ //si el id que ingresa es un id que ya tengo que haga una actualizacion pero si esta vacio que haga un post
            //editar el producto cuando pongo editar todas las cosas que estan en la pagina vallan para editarlo , por eso 
            //tiene un boton editar, toda la info que esta en cada cuadrito se va para guardarlo asi se lo edita
            console.log('IF', id)
            fetch(`${URL}/${id}`, {
                method : 'PUT',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(() => {
                cargarProductos()
                form.reset()
            })
        }else{
            //crear el nuevo proyecto

        }
        fetch(URL, {
            method : 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                cargarProductos()
                form.reset()//reseteo el formulario una vez hecho esto 
            })
            .catch(err => console.log(err))
    })
}
function editarProducto(id){
    console.log('Editar', id)
    fetch(`${URL}/${id}`)
        .then(res => res.json())
        .then(producto => {
            //importante que los name coincida con las claves de los objetos de la api
            form.querySelector('.producto_id').value = producto.id
            form.querySelector('.producto_nombre').value = producto.nombre //name="nombre" fijarse en el form de html
            form.querySelector('.producto_precio').value = producto.precio
            form.querySelector('.producto_descripcion').value = producto.descripcion
            form.querySelector('.producto_avatar').value = producto.avatar
        })
        .catch(err => console.log(err))
}
function eliminarProducto(id){
    console.log('Eliminar', id)
    fetch(`${URL}/${id}`, { //aqui ingreso a mi url de la api y le pongo el id que quiero borrar por eso va la barra
        method : 'DELETE' //no hace enviarle la cabezera 
    })
    .then(() => {
        cargarProductos()

    })
    .catch(err => console.log(err))
}
function main(){
    cargarProductos()
    guardarProductos()
}
main()
