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
                        console.log(finalResponse.role);
                        //Se logro iniciar la sesión, obtuvimos el role del usuario (alumno o profesor), y su CURP, clave principal en la tabla
                        if(finalResponse.role == "alumno"){
                            //Abrir el sitio de los alumnos, y enviar el CURP
                            console.log("Abriendo sesión de alumno");
                            window.open('student.php', "_self");
                        }
                        else if (finalResponse.role == "profesor"){
                            console.log("Abriendo sesión de profesor");
                            window.open('teacher.php', "_self");
                        }
                        else{
                            console.log("Abriendo sesión de admin");
                            window.open('admin.html', '_self');
                        }
                    }
                }
            }
        })
    })

});