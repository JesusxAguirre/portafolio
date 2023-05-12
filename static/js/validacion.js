//declarando constante que guarda en un array todos los inputs dentro del id formulario
const formulario = document.querySelector("formulario")
const inputs = document.querySelectorAll("#formulario input")
const textareas = document.querySelectorAll("#formulario textarea")
// Obtener el elemento de entrada oculto

const campos = {
    name: false,
    email: false,
    asunto: false,
    mensaje: false,
}


const expresiones = { //objeto con varias expresiones regulares

    caracteres: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{3,12}$/, // Letras y espacios, pueden llevar acentos.
    
    mensaje: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{10,200}$/, // Letras y espacios, pueden llevar acentos.
    email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
}

const validar_formulario = (e) => {

    switch (e.target.name) {
        case "name":
            validar_campo(expresiones.caracteres, e.target, 'name');
            break;

        case "email":
            validar_campo(expresiones.email, e.target, 'email');
        
        case "asunto":
            validar_campo(expresiones.caracteres, e.target, "asunto");

        case "mensaje":
            validar_campo(expresiones.mensaje, e.target, "mensaje");
    }

}



const validar_campo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {

        document.querySelector(`#grupo__${campo} p`).classList.remove('d-block');


        document.querySelector(`#grupo__${campo} p`).classList.add('d-none');
        campos[campo] = true;

    } else {


        document.querySelector(`#grupo__${campo} p`).classList.remove('d-none');

        document.querySelector(`#grupo__${campo} p`).classList.add('d-block');
  
        campos[campo] = false;
    }
}



//recorriendo foreach de inputs por ada inputs se le agrega un evento y se llama la funcion validar formulario
inputs.forEach((input) => {
    input.addEventListener('keyup', validar_formulario);
    input.addEventListener('blur', validar_formulario);

});


textareas.forEach((textarea) => {
    textarea.addEventListener('keyup', validar_formulario)
    textarea.addEventListener('blur', validar_formulario)
})









$(document).on('submit', '#formulario', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    
    if (!(campos.name && campos.email && campos.asunto && campos.mensaje )) {
        Swal.fire({
            icon: 'error',
            title: 'Lo siento ',
            text: 'Registra el formulario correctamente ',
            position: 'center'
        })
    } else {
        
        
        $.ajax({
            type: 'POST',
            url: window.location.pathname,
            data: $(this).serialize(),// Obtiene los datos del formulario
            success: function (response) {
                document.getElementById("formulario").reset()
                for (let key in campos) {
                    campos[key] = false;
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Mensaje enviado correctamente',
                    text:  response.msj
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                     window.location.replace(window.location.pathname);
                    } 
                  })

                  setTimeout(function() {
                    window.location.replace(window.location.pathname);
                  },4000);
            },
            error: function (xhr, status, error) {
                // Código a ejecutar si se produjo un error al realizar la solicitud

               
                Swal.fire({
                    icon: 'error',
                    title: xhr.responseJSON.ErrorType,
                    text: xhr.responseJSON.Message
                })



            }
        });
    }
});
