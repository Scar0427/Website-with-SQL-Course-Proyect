//La página estudiantes, tras abrirse, debe obtenerse el nombre del alumno, y algunos datos como un promedio, y una próxima clase, que por razones de práctica se tomará aleatoriamente
$('document').ready(function() {
    console.log("jQuery working");

    $.ajax({
        url: 'php/student.php',
        data: {"action": "start"},
        type: 'POST',
        success: function(response){
            console.log(response);
            var finalResponse = JSON.parse(response);
            if(finalResponse.code == 2){
                window.open('login.html', "_self");
            }else{
                var dataTable = "";
                var asignaturasConNota = 0;
                var totalNotas = 0;
                $('#matricula').html("No estas matriculado en ningún curso");
                finalResponse.forEach(element => {
                    if(element.tipo == 1){
                        $('#userName').html("Bienvenido estudiante: " + element.name);
                    }
                    else if(element.tipo == 2){
                        if(element.nota == null){
                            dataTable += `<tr><td>${element.asignatura}</td><td>${element.curso}</td><td>${element.profesor}</td><td>Por asignar</td></tr>`;
                        }else{
                            dataTable += `<tr><td>${element.asignatura}</td><td>${element.curso}</td><td>${element.profesor}</td><td>${element.nota}</td></tr>`;
                            asignaturasConNota++;
                            totalNotas += element.nota;
                        }
                    }
                });
                console.log(dataTable);
                if(dataTable != ""){
                    document.getElementById("matricula").innerHTML = "<table><tr><th>Asignatura</th><th>Curso Escolar</th><th>Profesor</th><th>Nota</th></tr>" + dataTable +"</table>";
                }
                if(asignaturasConNota > 0){
                    $("#promedio").html(`Tu promedio general es: ${totalNotas/asignaturasConNota}`);
                }else{
                    $("#promedio").html("No cuentas con notas para obtener tu promedio");
                }
            }
        }
    })

    $('#close').click(e=>{
        e.preventDefault();
        $.ajax({
            url: 'php/student.php',
            data: {"action":"close"},
            type: 'POST',
            success: function(response){
                window.open('login.html', "_self");
            }
        });
    })
});