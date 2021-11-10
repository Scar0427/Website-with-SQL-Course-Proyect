$(document).ready(function(){
    console.log("Working jQuery");

    $('#login').submit(e => {
        e.preventDefault();
        $.ajax({
            url: 'login.php',
            data: $('#login').serialize(),
            type: 'POST',
            success: function(response){
                if(!response.error){
                    console.log(response)
                    let finalResponse = JSON.parse(response);
                    if(finalResponse.code == 2){
                        console.log("Ocurrio un error durante el login");
                        $('#container').html(finalResponse.result);
                    }
                    else{
                        console.log("Inicio de sesión exitoso");
                        //Se logro iniciar la sesión, obtuvimos el role del usuario (alumno o profesor), y su CURP, clave principal en la tabla
                        if(finalResponse.role == "alumno"){
                            //Abrir el sitio de los alumnos, y enviar el CURP
                            window.open('student.php', "_self");
                        }
                    }
                }
            }
        })
    })

});