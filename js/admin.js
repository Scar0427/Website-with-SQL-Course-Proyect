let personas = document.getElementById('personas');
let asignaturas = document.getElementById('asignatura');
let cursos = document.getElementById('curso');
let programa = document.getElementById('programa');
let tel = document.getElementById('tel');
let gestorPersonas = document.getElementById('gestorPersonas');
let tableAlumnos= document.getElementById('tableAlumnos');
let tableMaestros = document.getElementById('tableMaestros');
let mainGestor = document.getElementById('mainGestor');

$(document).ready(function(){
    console.log("Working jQuery");

    $('#tipo').change(function(){
        console.log("changed to " + $(this).val())
        if($(this).val() == 1){
            tel.setAttribute('class','show');
        }
        else{
            tel.setAttribute('class','hidden');
        }
    });

    $('#addAsignatura').click(e=>{
        e.preventDefault()
        $.ajax({
            url: 'php/admin.php',
            data: {"action": "teachers"},
            type: 'POST',
            success: function(response){
                console.log(response);
                let finalResponse = JSON.parse(response);
                    if(finalResponse.code == 2){
                        console.log("ERROR");
                        alert(finalResponse.result);
                    }
                    else{
                        console.log("Obtención de datos correcta");
                        $('#curp').html("");
                        finalResponse.forEach(element => {
                            console.log(element);
                            document.getElementById("curp").innerHTML += "<option value='" + element.CURP + "'> " + element.CURP + "</option>";
                        });
                    }
            }
        })
    });


    $('#addProgram').click(e=>{
        e.preventDefault()
        $('#cursoEsc').html("");
        $('#asig').html("");
        $.ajax({
            url: 'php/admin.php',
            data: {"action": "asignatura"},
            type: 'POST',
            success: function(response){
                console.log(response);
                let finalResponse = JSON.parse(response);
                    if(finalResponse.code == 2){
                        console.log("ERROR");
                        alert(finalResponse.result);
                    }
                    else{
                        console.log("Obtención de datos correcta");
                        finalResponse.forEach(element => {
                            console.log(element);
                            document.getElementById("asig").innerHTML += "<option value='" + element.id + "'> " + element.nombre + "</option>";
                        });
                    }
            }
        });

        $.ajax({
            url: 'php/admin.php',
            data: {"action": "curso"},
            type: 'POST',
            success: function(response2){
                console.log(response2);
                let finalResponse2 = JSON.parse(response2);
                    if(finalResponse2.code == 2){
                        console.log("ERROR");
                        alert(finalResponse2.result);
                    }
                    else{
                        console.log("Obtención de datos correcta");
                        finalResponse2.forEach(element => {
                            console.log(element);
                            document.getElementById("cursoEsc").innerHTML += "<option value='" + element.id + "'> " + element.nombre + "</option>";
                        });
                    }
            }
        })
    });


    $('#personForm').submit(e=>{
        e.preventDefault();
        $.ajax({
            url: 'php/admin.php',
            data: $('#personForm').serialize(),
            type: 'POST',
            success: function(response){
                console.log(response);
                if(!response.error){
                    let finalResponse = JSON.parse(response);
                    if(finalResponse.code == 2){
                        console.log("ERROR");
                        alert(finalResponse.result);
                    }
                    else{
                        console.log("registro exitoso");
                        alert(finalResponse.result);
                    }
                }
            }
        });
    });


    $('#asignaturaForm').submit(e=>{
        e.preventDefault();
        $.ajax({
            url: 'php/admin.php',
            data: $('#asignaturaForm').serialize(),
            type: 'POST',
            success: function(response){
                console.log(response);
                if(!response.error){
                    let finalResponse = JSON.parse(response);
                    if(finalResponse.code == 2){
                        console.log("ERROR");
                        alert(finalResponse.result);
                    }
                    else{
                        console.log("registro exitoso");
                        alert(finalResponse.result);
                    }
                }
            }
        });
    });


    $('#cursoForm').submit(e=>{
        e.preventDefault();
        $.ajax({
            url: 'php/admin.php',
            data: $('#cursoForm').serialize(),
            type: 'POST',
            success: function(response){
                console.log(response);
                if(!response.error){
                    let finalResponse = JSON.parse(response);
                    if(finalResponse.code == 2){
                        console.log("ERROR");
                        alert(finalResponse.result);
                    }
                    else{
                        console.log("registro exitoso");
                        alert(finalResponse.result);
                    }
                }
            }
        });
    });


    $('#programForm').submit(e=>{
        e.preventDefault();
        $.ajax({
            url: 'php/admin.php',
            data: $('#programForm').serialize(),
            type: 'POST',
            success: function(response){
                console.log(response);
                if(!response.error){
                    let finalResponse = JSON.parse(response);
                    if(finalResponse.code == 2){
                        console.log("ERROR");
                        alert(finalResponse.result);
                    }
                    else{
                        console.log("registro exitoso");
                        alert(finalResponse.result);
                    }
                }
            }
        });
    });
});

/*personas.click(showAddPersonas());
asignaturas.click(showAsignaturas());*/

/*personas.click(showAddPersonas());
asignaturas.click(showAsignaturas());*/

function showAddPersonas(){
    mainGestor.setAttribute('class', 'hidden');
    console.log("Click en personas");
    personas.setAttribute('class', 'show');
    asignaturas.setAttribute('class', 'hidden');
    cursos.setAttribute('class', 'hidden');
    programa.setAttribute('class','hidden');
}

function showAsignaturas(){
    mainGestor.setAttribute('class', 'hidden');
    personas.setAttribute('class', 'hidden');
    asignaturas.setAttribute('class', 'show');
    cursos.setAttribute('class', 'hidden');
    programa.setAttribute('class','hidden');
}

function showCurso(){
    mainGestor.setAttribute('class', 'hidden');
    personas.setAttribute('class', 'hidden');
    asignaturas.setAttribute('class', 'hidden');
    cursos.setAttribute('class', 'show');
    programa.setAttribute('class','hidden');
}

function showPrograma(){
    mainGestor.setAttribute('class', 'hidden');
    personas.setAttribute('class', 'hidden');
    asignaturas.setAttribute('class', 'hidden');
    cursos.setAttribute('class', 'hidden');
    programa.setAttribute('class','show');
}

//Gestor buttons
function ShowGestor(){
    mainGestor.setAttribute('class', 'show');
    personas.setAttribute('class', 'hidden');
    asignaturas.setAttribute('class', 'hidden');
    cursos.setAttribute('class', 'hidden');
    programa.setAttribute('class','hidden');
    gestorPersonas.setAttribute('class', 'hidden');
}

function ShowAllPeople(){
    gestorPersonas.setAttribute('class', 'show');
    //Dos solicitudes AJAX, una para alumnos, y otra para maestros
    $.ajax({
        url: 'php/admin.php',
        data: {'action': 'getAlumnos'},
        type: 'POST',
        success: function(response){
            var data = "";
            let finalResponse = JSON.parse(response);
            finalResponse.forEach(element=>{
                var reset = `<button onclick="ResetPassword('${element.user}')">Reestablecer Contraseña</button>`;
                if(element.user == "No ha creado su cuenta"){
                    reset = "No tiene cuenta";
                }
                data += `<tr><td>${element.nombre}</td><td>${element.curp}</td><td>${element.cursos}</td><td>${parseFloat(element.promedio).toFixed(2)}</td><td>${element.user}</td>
                <td>${reset}</td><td><button onclick="DeleteAlumn('${element.curp}')">Eliminar alumno</button></td></tr>`;
            })
            tableAlumnos.innerHTML = `<tr><th>Nombre</th><th>CURP</th><th>Cursos matriculados</th><th>Promedio</th><th>Usuario</th><!--Restablecer contraseña, dar de baja a alumno--><th></th>
            <th></th></tr> ${data}`;
        }
    });

    $.ajax({
        url: 'php/admin.php',
        data: {'action': 'getProfesores'},
        type: 'POST',
        success: function(response){
            var data = "";
            let finalResponse = JSON.parse(response);
            finalResponse.forEach(element=>{
                var reset = `<button onclick="ResetPassword('${element.user}')">Reestablecer Contraseña</button>`;
                if(element.user == "No ha creado su cuenta"){
                    reset = "No tiene cuenta";
                }
                data += `<tr><td>${element.nombre}</td><td>${element.curp}</td><td>${element.asig}</td><td>${element.user}</td>
                <td>${reset}</td><td><button onclick="DeleteTeacher('${element.curp}')">Eliminar profesor</button></td></tr>`;
            })
            tableMaestros.innerHTML = `<tr><th>Nombre</th><th>CURP</th><th>Asignaturas impartidas</th><th>Usuario</th><th></th><th></th></tr> ${data}`;
        }
    })
}

function ResetPassword(user){
    if(confirm("¿Desea restablecer la contraseña del usuario " + user + "?")){
        $.ajax({
            url: 'php/admin.php',
            data: {'action':'changePass', 'user': user},
            type: 'POST',
            success: function(response){
                alert(response);
            }
        })
    }
}

function DeleteAlumn(curp){
    if(confirm("Eliminar un alumno eliminára toda la información relacionada, como notas, matriculas, etc. ¿Esta seguro de que desea continuar?")){
        $.ajax({
            url: 'php/admin.php',
            data: {'action':'deleteUser', 'curp': curp, 'tipo':'alumno'},
            type: 'POST',
            success: function(response){
                alert(response);
                ShowAllPeople();
            }
        })
    }
}

function DeleteTeacher(curp){
    if(confirm("Eliminar un profesor eliminará toda la información relacionada, como asignaturas, programas, etc. ¿Esta seguro de que desea continuar?")){
        $.ajax({
            url: 'php/admin.php',
            data: {'action':'deleteUser', 'curp': curp, 'tipo':'profesor'},
            type: 'POST',
            success: function(response){
                alert(response);
                ShowAllPeople();
            }
        })
    }
}