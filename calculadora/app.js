//calculos
const visualizacionCalculos = document.querySelector('.calculos');
//numeros
const botonesNumeros = document.querySelectorAll('.numeros');
const numeroCero = document.getElementById('cero');
const numeroUno = document.getElementById('uno');
const numeroDos = document.getElementById('dos');
const numeroTres = document.getElementById('tres');
const numeroCuatro = document.getElementById('cuatro');
const numeroCinco = document.getElementById('cinco');
const numeroSeis = document.getElementById('seis');
const numeroSiete = document.getElementById('siete');
const numeroOcho = document.getElementById('ocho');
const numeroNueve = document.getElementById('nueve');

//operaciones
const botonesOperaciones = document.querySelectorAll('.operaciones_aritmeticas');
const operacionSuma = document.getElementById('suma');
const operacionResta = document.getElementById('resta');
const operacionProducto = document.getElementById('producto');
const operacionDivision = document.getElementById('division');

//botones de borrar
const botonesBorrar = document.querySelectorAll('.botones_borrar');
const borrarTodo = document.getElementById('borrar_todo');
const borrarUltimo = document.getElementById('borrar_ultimo');

//boton calcular
const botonCalcular = document.getElementById('calcular_resultado');
let listaOperacionesNumeros = []
const operadores = '+-*/';
const numeros = '0123456789';

function operaciones(){
    botonesNumeros.forEach(botonNumero => {
        botonNumero.addEventListener('click', function(){
            visualizacionCalculos.value += botonNumero.textContent
            listaOperacionesNumeros.push(botonNumero.textContent)
            console.log(listaOperacionesNumeros)
            console.log(visualizacionCalculos.value)
        })
    })
    botonesOperaciones.forEach(botonOperacion => {
        botonOperacion.addEventListener('click', function(){
            if(listaOperacionesNumeros.length > 0 && operadores.includes(listaOperacionesNumeros[listaOperacionesNumeros.length - 1])){
                return
            }
            visualizacionCalculos.value += botonOperacion.textContent
            listaOperacionesNumeros.push(botonOperacion.textContent)
            console.log(listaOperacionesNumeros)
            console.log(visualizacionCalculos.value)
        })
    })
    botonesBorrar.forEach(botonBorrar => {
        botonBorrar.addEventListener('click', function(){
            switch(botonBorrar.textContent){
                case 'C':
                    visualizacionCalculos.value = '';
                    listaOperacionesNumeros = [];
                    console.log(listaOperacionesNumeros); 
                    console.log(visualizacionCalculos.value)
                    break
                case 'CE':
                    visualizacionCalculos.value = visualizacionCalculos.value.slice(0, -1);
                    listaOperacionesNumeros.pop();
                    console.log(listaOperacionesNumeros); 
                    console.log(visualizacionCalculos.value)
                    break
            }
        })
    })
    botonCalcular.addEventListener('click', function(){
        calcularTotal(visualizacionCalculos, listaOperacionesNumeros)
    })
}


function calcularTotal(visualizacionCalculos, lista){
    if(lista.length > 2 && numeros.includes(lista[lista.length - 1])){
       //alert(`El resultado de la operacion es ${eval(visualizacionCalculos.value)}`)
       visualizacionCalculos.value = eval(visualizacionCalculos.value)
    } else{
        alert('No se puede realizar la operacion')
    }
 }

function main(){
    operaciones()
}
main()