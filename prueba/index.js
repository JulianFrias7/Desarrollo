let textoParrafo = document.querySelector('input')
let agregado = document.querySelector('.addbutton')
let lista = document.querySelector('.itemlist')


agregado.addEventListener('click', function() {
    

    // Crear un nuevo ítem de lista
    let nuevoItem = document.createElement('li');
    nuevoItem.textContent = textoParrafo.value;

    // Crear el botón de eliminar
    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', function() {
        lista.removeChild(nuevoItem);
    });

    nuevoItem.addEventListener('mouseover', function(){
        this.style.backgroundColor = 'red'
    })

    // Agregar el botón al ítem de lista
    nuevoItem.appendChild(botonEliminar);

    // Agregar el ítem de lista a la lista
    lista.appendChild(nuevoItem);

    // Limpiar el campo de entrada
    textoParrafo.value = '';
});





/*agregado.addEventListener('click', function(){
    let nuevoItem = document.createElement('li')
    nuevoItem.textContent = textoParrafo.value
    lista.appendChild(nuevoItem)

    let botonEliminar = document.createElement('button')
    botonEliminar.textContent = 'Eliminar'
    botonEliminar.addEventListener('click', function(){
    lista.removeChild(nuevoItem)
})
//})
//let nuevoItem = document.createElement('li')
//nuevoItem.textContent = textoParrafo.value


//nuevoItem.appendChild(botonEliminar)
//lista.appendChild(nuevoItem)













//let botonEliminar = document.querySelector('button')
//botonEliminar.textContent = 'Eliminar'
//botonEliminar.addEventListener('click', function(){
    //lista.removeChild(nuevoItem)
//})*/