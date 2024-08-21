const form = document.querySelector('form')
const pEdad = document.querySelector('.d-edad')
const pNombre = document.querySelector('.d-nombre')
function comprobarDato(obj, key){
    if(obj[key].length === 0){
        if(key === 'nombre' && obj['nombre'].length === 0){
            pNombre.classList.toggle('danger')
        }
        if(key === 'edad' && obj['edad'].length === 0){
            pEdad.classList.toggle('danger')
        }
        throw new Error(`Hay un error en el input ${key}`)
    }
    return true
}
form.addEventListener('submit', function(event){
    pNombre.classList.add('danger')
    pEdad.classList.add('danger')
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))
    console.log(data)
    Object.keys(data).forEach(key=> {
        try {
            comprobarDato(data, key)
        } catch (error) {
            console.log(error)
        }

    })
})  

