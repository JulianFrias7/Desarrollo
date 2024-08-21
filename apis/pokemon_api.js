const container = document.querySelector('.container') //seleccionamos el contenedor de div
const URL = 'https://pokeapi.co/api/v2/pokemon?limit=10' //en esta variable guardo la url de la api
fetch(URL)//llamamos a nuestra api para realizar solitides
    .then(res => res.json())//cuando la solicitud se completa el objeto res se convierte a json 
    .then(data => {
        let datos = ''//variable vacia de string
        data.results.forEach(pokemon => {
            console.log(pokemon)
            datos += `<li>${pokemon.name}</li>`
        })
        container.innerHTML = datos
    })//la data es la respuesta que nos va a dar el servidor de esta API
    .catch(err => console.log(err))//en el caso de que haya un error
