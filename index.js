let contenedor = document.querySelector('div')
contenedor.style.height = '100px'
contenedor.style.width = '100px'
contenedor.style.background = 'blue'

let nuevoDiv = document.createElement('div')
nuevoDiv.innerText = 'esto es nuevo div'
document.body.append(nuevoDiv)

let parrafo = document.querySelector('p')
parrafo.remove()

let cosa = document.querySelector('h2')
cosa.classList.add('esto_h2')