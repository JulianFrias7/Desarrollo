const container = document.querySelector('.container')
const URL = 'https://66bfba2942533c403146ee08.mockapi.io/productos'
fetch(URL)
    .then(res => res.json())
    //.then(data => console.log(data))
    .then(data => {
        let datos = ''
        data.forEach(producto =>{
            datos += `
                <h3>${producto.name}</h3>
                <p>${producto.precio}</p>
                <img src="${producto.avatar}" alt="${producto.name}">
            `
        })
        container.innerHTML = datos
    })
    .catch(err => console.log(err))