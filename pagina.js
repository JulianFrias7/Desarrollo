let body = document.querySelector('body')
let boton_claro = document.querySelector('#claro')
let boton_oscuro = document.querySelector('#oscuro')
boton_claro.addEventListener('click', function(){
    event.preventDefault()
    body.style.backgroundColor = 'white'
})
boton_oscuro.addEventListener('click', function(){
    event.preventDefault()
    body.style.backgroundColor = 'black'
})



let boton = document.querySelector('#boton')
boton.addEventListener('click', function(){
    let usuario = {
        nombre : document.querySelector('#nombre_usuario'),
        apellido : document.querySelector('#apellido_usuario'),
        email : document.querySelector('#email_usuario'),
        contraseña : document.querySelector('#contraseña_usuario')
    }
    
    localStorage.setItem("Nombre", usuario.nombre.value)
    localStorage.setItem("Apellido", usuario.apellido.value)
    localStorage.setItem("Email", usuario.email.value)
    localStorage.setItem("Contraseña", usuario.contraseña.value)

})

  
  