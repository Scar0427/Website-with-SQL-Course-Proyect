let personas = document.getElementById('personas');
let asignaturas = document.getElementById('asignatura');
let cursos = document.getElementById('curso');
let programa = document.getElementById('programa');
let tel = document.getElementById('tel');
let gestorPersonas = document.getElementById('gestorPersonas');
let tableAlumnos= document.getElementById('tableAlumnos');
let tableMaestros = document.getElementById('tableMaestros');
let mainGestor = document.getElementById('mainGestor');
let gestorAsig = document.getElementById('gestorAsig');
let tableAsig = document.getElementById('tableAsig');
let gestorCursos = document.getElementById('gestorCursos');
let tableCursos = document.getElementById('tableCursos');
let gestorProgramas = document.getElementById('gestorProgramas');
let tableProgramas = document.getElementById('tableProgramas');

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
    gestorAsig.setAttribute('class', 'hidden');
}

function ShowAllPeople(){
    gestorPersonas.setAttribute('class', 'show');
    gestorAsig.setAttribute('class', 'hidden');
    gestorCursos.setAttribute('class', 'hidden');
    gestorProgramas.setAttribute('class', 'hidden');

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

function ShowAsignaturas(){
    gestorPersonas.setAttribute('class', 'hidden');
    gestorAsig.setAttribute('class', 'show');
    gestorCursos.setAttribute('class', 'hidden');
    gestorProgramas.setAttribute('class', 'hidden');

    $.ajax({
        url: 'php/admin.php',
        data: {'action':'getAsignaturas'},
        type: 'POST',
        success: function(response){
            var data = "";
            let finalResponse = JSON.parse(response);
            finalResponse.forEach(element=>{
                data += `<tr><td>${element.nombre}</td><td>${element.id}</td><td>${element.matri}</td><td>${element.profe}</td><td>${element.curp}</td><td><button onclick="DeleteAsig('${element.id}')">Eliminar asignatura</button></td></tr>`;
            })
            tableAsig.innerHTML = `<tr><th>Nombre de la Asignatura</th><th>ID de la asignatura</th><th>Matrícula máxica</th><th>Nombre del profesor</th><th>CURP del profesor</th><!--Eliminar asignatura-->
            <th></th></tr>${data}`;
        }
    })
}

function DeleteAsig(id){
    if(confirm('Eliminar una asignatura también borra todos los programas relacionados. ¿Desea continuar?'))
    $.ajax({
        url: 'php/admin.php',
        data: {'action':'deleteAsig', 'id':id},
        type: 'POST',
        success: function(response){
            alert(response);
            ShowAsignaturas();
        }
    })
}

//Funciones de los cursos
function ShowAllCourses(){
    gestorPersonas.setAttribute('class', 'hidden');
    gestorAsig.setAttribute('class', 'hidden');
    gestorCursos.setAttribute('class', 'show');
    gestorProgramas.setAttribute('class', 'hidden');


    $.ajax({
        url: 'php/admin.php',
        data: {'action':'getCourses'},
        type: 'POST',
        success: function(response){
            var data = "";
            let finalResponse = JSON.parse(response);
            finalResponse.forEach(element=>{
                data += `<tr><td>${element.nombre}</td><td>${element.id}</td><td>${element.duracion}</td><td>${element.progs}</td><td><button onclick="DeleteCourse('${element.id}')">Eliminar curso</button></td></tr>`;
            })
            tableCursos.innerHTML = `<tr><th>Año de Inicio</th><th>Id del curso</th><th>Duración del curso</th><th>Programas del curso</th><th></th></tr>${data}`;
        }
    })
}

function DeleteCourse(id){
    if(confirm('Eliminar un curso también borra todos los programas y matriculas relacionados. ¿Desea continuar?'))
    $.ajax({
        url: 'php/admin.php',
        data: {'action':'deleteCourse', 'id':id},
        type: 'POST',
        success: function(response){
            alert(response);
            ShowAllCourses();
        }
    })
}

//Funciones de los programas
function ShowProgramas(){
    gestorPersonas.setAttribute('class', 'hidden');
    gestorAsig.setAttribute('class', 'hidden');
    gestorCursos.setAttribute('class', 'hidden');
    gestorProgramas.setAttribute('class', 'show');

    $.ajax({
        url: 'php/admin.php',
        data: {'action':'getProgram'},
        type: 'POST',
        success: function(response){
            var data = "";
            let finalResponse = JSON.parse(response);
            finalResponse.forEach(element=>{
                data += `<tr><td>${element.nombre}</td><td>${element.id}</td><td>${element.duracion}</td><td>${element.asig}</td><td>${element.curso}</td><td>${element.profe}</td>
                <td><button onclick="DeleteProgram('${element.id}')">Eliminar programa</button></td></tr>`;
            })
            tableProgramas.innerHTML = `<tr><th>Nombre del Programa</th><th>Id del Programa</th><th>Duración del programa</th><th>Asignatura</th><th>Curso escolar</th><th>Profesor</th><th></th>
            </tr>${data}`;
        }
    })
}

function DeleteProgram(id){
    if(confirm('Eliminar un programa eliminará todas las matrículas de este. ¿Desea continuar?'))
    $.ajax({
        url: 'php/admin.php',
        data: {'action':'deleteProgram', 'id':id},
        type: 'POST',
        success: function(response){
            alert(response);
            ShowProgramas();
        }
    })
}