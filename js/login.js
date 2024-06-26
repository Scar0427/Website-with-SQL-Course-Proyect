let register = document.getElementById("registerForm");
let login = document.getElementById("loginForm");

$(document).ready(function(){
    console.log("Working jQuery");

    $.ajax({
        url: 'php/login.php',
        data: {'action':'start'},
        type: 'POST',
        success: function(response){
            console.log(response);
            let finalResponse = JSON.parse(response);
            if(finalResponse.code == 2){
                $('#errors').html(finalResponse.result);
            }
        }
    })

    $('#login').submit(e => {
        e.preventDefault();
        $.ajax({
            url: 'php/login.php', 
            data: $('#login').serialize(),
            type: 'POST',
            success: function(response){
                if(!response.error){
                    console.log(response)
                    let finalResponse = JSON.parse(response);
                    if(finalResponse.code == 2){
                        console.log("Ocurrio un error durante el login");
                        $('#errors').html(finalResponse.result);
                    }
                    else{
                        console.log("Inicio de sesión exitoso");
                        console.log(finalResponse.role);
                        //Se logro iniciar la sesión, obtuvimos el role del usuario (alumno o profesor), y su CURP, clave principal en la tabla
                        if(finalResponse.role == "alumno"){
                            //Abrir el sitio de los alumnos, y enviar el CURP
                            console.log("Abriendo sesión de alumno");
                            window.open('student.html', "_self");
                        }
                        else if (finalResponse.role == "profesor"){
                            console.log("Abriendo sesión de profesor");
                            window.open('teacher.html', "_self");
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

    $('#register').submit(e =>{
        e.preventDefault();
        if($('#register [name="user"]').val().trim().length == 0 || $('#register [name="pass"]').val().trim().length == 0){
            alert("Los campos usuario o contraseña no pueden estar en blanco");
        }
        else{
            $.ajax({
                url: 'php/login.php',
                data: $('#register').serialize(),
                type: 'POST',
                success: function(response){
                    alert(response);
                }
            })
        }
    })
});

function ShowRegisterForm(){
    login.classList = "hidden";
    register.classList = "show";
}

function ReturnToLogin(){
    login.classList = "show";
    register.classList = "hidden";
}