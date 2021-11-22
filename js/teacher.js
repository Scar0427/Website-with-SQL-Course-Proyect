let cursosView = document.getElementById("misCursos");
let programas = document.getElementById("cursoView");
let editProgram = document.getElementById("programEdit");
var actualProgramID;
var matriculaDisponible;

$('document').ready(function() {
    console.log("jQuery working");

    $.ajax({
        url: 'php/teacher.php',
        data: {"action": "start"},
        type: 'POST',
        success: function(response){
            console.log(response);
            var finalResponse = JSON.parse(response);
            if(finalResponse.code == 2){
                window.open('login.html', "_self");
            }else{
                var dataCursos = "";
                if(finalResponse.some(el => !(el.tipo == 2))){
                    $('#misCursos').html("<h1>Mis Cursos</h1>No tienes cursos asignados. Solicita al administrador que añada tu curso");
                }
                finalResponse.forEach(element => {
                    if(element.tipo == 1){
                        $('#userName').html("Bienvenido profesor: " + element.name);
                    }
                    else if(element.tipo == 2){
                        dataCursos += `<tr><td>${element.asignatura}</td><td>${element.matricula}</td><td>${element.programs}</td><td><button type="button" onClick="ShowPrograms(${element.id})">Ver Programas</button></td></tr>`;
                    }
                });
                if(dataCursos != ""){
                    $('#misCursos').html(`<h1>Mis Cursos</h1><table><tr><th>Asignatura</th><th>Máxima matrícula</th><th>Programas Asignados</th><th></th></tr>${dataCursos}</table>`);
                }
            }
        }
    })

    $('#close').click(e=>{
        e.preventDefault();
        $.ajax({
            url: 'php/teacher.php',
            data: {"action":"close"},
            type: 'POST',
            success: function(response){
                window.open('login.html', "_self");
            }
        });
    })
});

function ShowPrograms(buttonValue){
    cursosView.classList = "hidden";
    programas.classList = "show";
    actualProgramID = buttonValue;
    $.ajax({
        url: 'php/teacher.php',
        data: {"action": "programs", "id_curso":buttonValue},
        type: 'POST',
        success: function(response){
            console.log(response);
            let finalResponse = JSON.parse(response);
            var data = "";
            finalResponse.forEach(element=>{
                if(element.disponible <= 0){
                    data += `<tr><td>${element.programa}</td><td>${element.curso}</td><td>${element.matriculaTotal}</td><td>${element.matriculados}</td><td>${element.disponible}</td><td>
                    No hay matrícula</td><td><button type="button" onClick="SendScores(${element.id})">Subir calificaciones</button></td></tr>`;
                }
                else if(element.matriculados == '0'){
                    data +=  `<tr><td>${element.programa}</td><td>${element.curso}</td><td>${element.matriculaTotal}</td><td>${element.matriculados}</td><td>${element.disponible}</td><td><button type="button"
                    onClick="AddAlumnos(${element.id})">Añadir alumnos</button></td><td>No se pueden subir calificaciones</td></tr>`;
                }
                else{
                    data +=  `<tr><td>${element.programa}</td><td>${element.curso}</td><td>${element.matriculaTotal}</td><td>${element.matriculados}</td><td>${element.disponible}</td><td><button type="button"
                    onClick="AddAlumnos(${element.id})">Añadir alumnos</button></td><td><button type="button" onClick="SendScores(${element.id})">Subir calificaciones</button></td></tr>`;
                }        
            })
            if(data != ""){
                programas.innerHTML = "<button type='button' onclick='ReturnToCursos()'>Regresar a Mis Cursos</button><h1>Programas de "+finalResponse[0].asignatura+"</h1><table><tr><th>Programa</th><th>Curso Escolar</th><th>Matrícula Máxima</th><th>Matriculados</th><th>Matrícula disponible</th><th></th><th></th></tr>" + data + "</table>";
            }
        }
    })
}

function ReturnToCursos(){
    cursosView.classList = "show";
    programas.classList = "hidden";
    
    $.ajax({
        url: 'php/teacher.php',
        data: {"action": "start"},
        type: 'POST',
        success: function(response){
            console.log(response);
            var finalResponse = JSON.parse(response);
            if(finalResponse.code == 2){
                window.open('login.html', "_self");
            }else{
                var dataCursos = "";
                if(finalResponse.some(el => !(el.tipo == 2))){
                    $('#misCursos').html("<h1>Mis Cursos</h1>No tienes cursos asignados. Solicita al administrador que añada tu curso");
                }
                finalResponse.forEach(element => {
                    if(element.tipo == 1){
                        $('#userName').html("Bienvenido profesor: " + element.name);
                    }
                    else if(element.tipo == 2){
                        dataCursos += `<tr><td>${element.asignatura}</td><td>${element.matricula}</td><td>${element.programs}</td><td><button type="button" onClick="ShowPrograms(${element.id})">Ver Programas</button></td></tr>`;
                    }
                });
                if(dataCursos != ""){
                    $('#misCursos').html(`<h1>Mis Cursos</h1><table><tr><th>Asignatura</th><th>Máxima matrícula</th><th>Programas Asignados</th><th></th></tr>${dataCursos}</table>`);
                }
            }
        }
    })
}

function AddAlumnos(programID){
    cursosView.classList = "hidden";
    programas.classList = "hidden";
    editProgram.classList = "show";
    $('#programEdit').html(`<button type="button" onclick="ReturnToPrograms()">Regresar a Programas</button>`);
    //Obtener los datos de los alumnos (El server debe eliminar los ya matriculados)
    console.log(programID);
    $.ajax({
        url: 'php/teacher.php',
        data: {'action':'alumnosNoInscritos', 'programID':programID},
        type: 'POST',
        success: function(response){
            console.log(response);
            let finalResponse = JSON.parse(response);
            var data = "";
            finalResponse.forEach(element=>{
                data += `<tr><td>${element.nombre}</td><td>${element.curp}</td><td><input type="checkbox" name="curps[]" value="${element.curp}" onclick="UpdateMatricula()"></td></tr>`;
            });
            if(data != ""){
                matriculaDisponible = finalResponse[0].dispo;
                editProgram.innerHTML = "<button type='button' onclick='ReturnToPrograms()'>Regresar a Programas</button><div><h1>Inscribir alumnos en " + finalResponse[0].prog + "</h1><form onsubmit='return UploadNewStudents()' method='post' id='addStudent'><table><tr><th>Nombre Alumno</th><th>CURP Alumno</th><th>Inscribir?</th></tr>" + data + "</table><center id='disponible'>Matrícula disponible <b>" + matriculaDisponible + "</b></center><center><input type='submit' value='Registrar alumnos al curso'></center><input type='hidden' name='action' value='addAlumnos'><input type='hidden' name='id_programa' value='" + programID + "'></form></div>"
            }
        }
    })
}

function SendScores(programID){
    $('#programEdit').html(`<button type="button" onclick="ReturnToPrograms()">Regresar a Programas</button>`);
    cursosView.classList = "hidden";
    programas.classList = "hidden";
    editProgram.classList = "show";
    console.log(programID);
    //Obtener todos los alumnos matriculados y su respectiva calificacion
    $.ajax({
        url: 'php/teacher.php',
        data: {'action':'getNotes', 'program_id':programID},
        type: 'POST',
        success: function(response){
            console.log(response);
            var data = "";
            let finalResponse = JSON.parse(response);
            finalResponse.forEach(element =>{
                var selector = `<select id='note' name='${element.curp}'>`;
                if(element.nota == 'NULL'){
                    selector += "<option value='null' selected>Sin calificar</option>";
                }
                else{
                    selector += "<option value='null'>Sin calificar</option>";
                }
                for(var i = 0; i <= 10; i++){
                    if(element.nota == i){
                        selector += `<option value='${i}' selected>${i}</option>`;
                    }else{
                        selector += `<option value='${i}'>${i}</option>`;
                    }
                }
                selector += "</select>";

                data += `<tr><td>${element.name}</td><td>${element.curp}</td><td>${selector}</td></tr>`;
            })

            if(data != null){
                $('#programEdit').html(`<button type="button" onclick="ReturnToPrograms()">Regresar a Programas</button><div><h1>Subir notas de ${finalResponse[0].asig}</h1><form onsubmit="return SubmitScoresSubmit()" method="post" id="sendScores">
                 <table><tr><th>Nombre del alumno</th><th>CURP</th><th>Nota</th></tr>${data}</table><input type="submit" value="Subir calificaciones" onclick='SubmitScores()'><input type="hidden" name="action" value="uploadScores">
                 <input type="hidden" name="programID" value="${programID}"></form></div>`);
            }
        }                              
    })
}

function ReturnToPrograms(){ 
    cursosView.classList = "hidden";
    programas.classList = "show";
    editProgram.classList = "hidden";
    console.log(actualProgramID);
    $.ajax({
        url: 'php/teacher.php',
        data: {"action": "programs", "id_curso":actualProgramID},
        type: 'POST',
        success: function(response){
            console.log(response);
            let finalResponse = JSON.parse(response);
            var data = "";
            finalResponse.forEach(element=>{
                if(element.disponible <= 0){
                    data += `<tr><td>${element.programa}</td><td>${element.curso}</td><td>${element.matriculaTotal}</td><td>${element.matriculados}</td><td>${element.disponible}</td><td>
                    No hay matrícula</td><td><button type="button" onClick="SendScores(${element.id})">Subir calificaciones</button></td></tr>`;
                }
                else if(element.matriculados == '0'){
                    data +=  `<tr><td>${element.programa}</td><td>${element.curso}</td><td>${element.matriculaTotal}</td><td>${element.matriculados}</td><td>${element.disponible}</td><td><button type="button"
                    onClick="AddAlumnos(${element.id})">Añadir alumnos</button></td><td>No se pueden subir calificaciones</td></tr>`;
                }
                else{
                    data +=  `<tr><td>${element.programa}</td><td>${element.curso}</td><td>${element.matriculaTotal}</td><td>${element.matriculados}</td><td>${element.disponible}</td><td><button type="button"
                    onClick="AddAlumnos(${element.id})">Añadir alumnos</button></td><td><button type="button" onClick="SendScores(${element.id})">Subir calificaciones</button></td></tr>`;
                }                
            })
            if(data != ""){
                programas.innerHTML = "<button type='button' onclick='ReturnToCursos()'>Regresar a Mis Cursos</button><h1>Programas de "+finalResponse[0].asignatura+"</h1><table><tr><th>Programa</th><th>Curso Escolar</th><th>Matrícula Máxima</th><th>Matriculados</th><th>Matrícula disponible</th><th></th><th></th></tr>" + data + "</table><br><br><div id='errors'></div>";
            }
        }
    })
}

function UpdateMatricula(){
    $('#disponible').html('Matrícula disponible <b>' + (matriculaDisponible - $("input:checked").length) + '</b>');
    if(matriculaDisponible - $("input:checked").length <= 0){
        console.log("MENOS DE 0");
        $('input:checkbox:not(:checked)').prop("disabled", true);
    }
    else{
        $('input[type=checkbox]').prop("disabled", false);
    }
}

function UploadNewStudents(){
    SolitudeOfNewStudents();
    return false;
}

function SolitudeOfNewStudents(){
    console.log($('#addStudent').serialize());
    $.ajax({
        url: 'php/teacher.php',
        data: $('#addStudent').serialize(),
        type: 'POST',
        success: function(response){
            console.log(response);
            ReturnToPrograms();
            alert(response);
        }
    })
}

function SubmitScoresSubmit(){
    return false;
}

function SubmitScores(){
    var todosCalificados = true;
    //Primero necesito obtener si todos los alumnos se calificaron
    $('select').each(function() {
        if(this.value == 'null'){
            todosCalificados = false;
        }
    })
    if(todosCalificados == false){
        alert("Se necesitan calificar a todos los alumnos para continuar");
    }
    else{
        ReturnToPrograms();
        $.ajax({
            url: 'php/teacher.php',
            data: $('#sendScores').serialize(),
            type: 'POST',
            success: function(response){
                alert(response);
            }
        })
    }
}