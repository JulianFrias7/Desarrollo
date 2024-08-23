const botonPerfil = document.querySelector('.img_perfil')
const contenedorPerfil = document.querySelector('.contenedor_perfil')
const botonCerrarPerfil = document.querySelector('.cerrar_perfil')
export function abrirCerrarVentanaPerfil(){
    botonPerfil.addEventListener('click', function(){
        contenedorPerfil.style.display = 'block';
        document.body.style.overflow = 'hidden';
    })
    botonCerrarPerfil.addEventListener('click', function(){
        contenedorPerfil.style.display = 'none';
        document.body.style.overflow = 'auto';
    })
}