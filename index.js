let titulo = document.querySelector('div>h1')
console.log(titulo)
if (titulo.classList.contains('Titulo')){
    console.log('todo correcto')
} else {
    titulo.classList.toggle('titulo')
    console.log('se añadio la clase "titulo"')
}