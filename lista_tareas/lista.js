localStorage.clear()
let añadir = document.querySelector('#link_imagen')
let lista = document.querySelector('ul')
const tareas = {
    tareasAgregadas : [],
    tareasHechas : [],
    tareasBorradas : []
}
//terminar de hacer el local storage para las tareas hechas y borradas
añadir.addEventListener('click', function(){
    let tarea = prompt('Ingrese la nueva tarea')
    while(!tarea || tarea.trim() === ''){
        alert("La tarea no puede estar vacia, ingrese una tarea valida")
        tarea = prompt('Ingrese la nueva tarea')
    }
    let nuevaTarea = document.createElement('li')
    nuevaTarea.textContent = tarea
    lista.appendChild(nuevaTarea)
    tareas.tareasAgregadas.push(tarea)
    localStorage.setItem('tareas_agregadas', JSON.stringify(tareas.tareasAgregadas))


    botonEliminar = document.createElement('button')
    botonEliminar.textContent = 'x'
    botonEliminar.addEventListener('click', function(){
        lista.removeChild(nuevaTarea)
    })
    botonEliminar.style.marginLeft = '10px'
    nuevaTarea.appendChild(botonEliminar)
    nuevaTarea.addEventListener('click', function(){
        if(nuevaTarea.style.textDecoration === 'none'){
            nuevaTarea.style.textDecoration = 'line-through'
        }else{
            nuevaTarea.style.textDecoration = 'none'
        }

    })
})


