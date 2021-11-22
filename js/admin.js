let personas = document.getElementById('personas');
let asignaturas = document.getElementById('asignatura');
let cursos = document.getElementById('curso');
let programa = document.getElementById('programa');
let tel = document.getElementById('tel');

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
            data: {"operation": "teachers"},
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
            data: {"operation": "asignatura"},
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
            data: {"operation": "curso"},
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
    console.log("Click en personas");
    personas.setAttribute('class', 'show');
    asignaturas.setAttribute('class', 'hidden');
    cursos.setAttribute('class', 'hidden');
    programa.setAttribute('class','hidden');
}

function showAsignaturas(){
    personas.setAttribute('class', 'hidden');
    asignaturas.setAttribute('class', 'show');
    cursos.setAttribute('class', 'hidden');
    programa.setAttribute('class','hidden');
}

function showCurso(){
    personas.setAttribute('class', 'hidden');
    asignaturas.setAttribute('class', 'hidden');
    cursos.setAttribute('class', 'show');
    programa.setAttribute('class','hidden');
}

function showPrograma(){
    personas.setAttribute('class', 'hidden');
    asignaturas.setAttribute('class', 'hidden');
    cursos.setAttribute('class', 'hidden');
    programa.setAttribute('class','show');
}