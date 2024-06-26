<?php

    include 'connection.php';

    if(isset($_POST["action"])){
        switch($_POST["action"]){
            case 'teachers':
                GetTeachersCURP();
                break;
            case 'asignatura':
                GetAsignaturas();
                break;
            case 'curso':
                GetCursos();
                break;
            case 'getAlumnos':
                GetAllStudents();
                break;
            case 'getProfesores':
                GetAllTeachers();
                break;
            case 'deleteUser':
                DeleteUser();
                break;
            case 'changePass':
                ChangePassWord();
                break;
            case 'getAsignaturas';
                GetAllAsig();
                break;
            case 'deleteAsig':
                DeleteAsig();
                break;
            case 'getCourses':
                GetAllCourses();
                break;
            case 'deleteCourse':
                DeleteCourse();
                break;
            case 'getProgram':
                GetAllProgramas();
                break;
            case 'deleteProgram':
                DeleteProgram();
                break;
        }
    }else if(isset($_POST['state'])){
        switch($_POST['state']){
            case 1:
                AddPerson();
                break;
            case 2:
                AddAsignatura();
                break;
            case 3: 
                AddCourse();
                break;
            case 4: 
                AddProgram();
                break;
        }
    }

    function GetTeachersCURP(){
        //Obtener y enviar maestros
        $connection = OpenConnection();

        $json = array();
        $query = "SELECT CURP FROM profesores";
        $data = mysqli_query($connection, $query);
        for($i = 0; $i < mysqli_num_rows($data);$i++){
            $final = mysqli_fetch_row($data);
            $json[] = array('code'=>1, 'CURP'=>$final[0]);
        }
        $jsonString = json_encode($json);
        echo $jsonString;

        CloseConnection($connection);
    }

    function GetAsignaturas(){
        $connection = OpenConnection();

        $json = array();
        $query = "SELECT * FROM asignaturas";
        $data = mysqli_query($connection, $query);
        for($i = 0; $i < mysqli_num_rows($data);$i++){
            $final = mysqli_fetch_row($data);
            $json[] = array('code'=>1, 'id'=>$final[0], 'nombre'=>$final[2]);
        }
        $jsonString = json_encode($json);
        echo $jsonString;

        CloseConnection($connection);
    }

    function GetCursos(){
        $connection = OpenConnection();

        $json = array();
        $query = "SELECT * FROM curso_escolar";
        $data = mysqli_query($connection, $query);
        for($i = 0; $i < mysqli_num_rows($data);$i++){
            $final = mysqli_fetch_row($data);
            $json[] = array('code'=>1, 'id'=>$final[0], 'nombre'=>$final[1]);
        }
        $jsonString = json_encode($json);
        echo $jsonString;
        
        CloseConnection($connection);
    }

    //Añadir personas
    function AddPerson(){
        $connection = OpenConnection();

        $tipo = $_POST['tipo'];
        $nombre = $_POST['namePerson'];
        $apellidoP = $_POST['apellidoP'];
        $apellidoM = $_POST['apellidoM'];
        $curp = $_POST['curp'];
        if($tipo == 1){
            $tel = $_POST['telefono'];
            
            $query = "INSERT INTO alumnos VALUES('$curp', '$nombre', '$apellidoP', '$apellidoM', '$tel')";
            $result = mysqli_query($connection, $query);

            if($result == true){
                $json = array('code' => 1, 'result' => "Registro exitoso");
                $jsonString = json_encode($json);
                echo $jsonString;
            }
            else{
                $json = array('code' => 2, 'result' => mysqli_error($connection));
                $jsonString = json_encode($json);
                echo $jsonString;
            }
        }
        else{
            $query = "INSERT INTO profesores VALUES('$curp', '$nombre', '$apellidoP', '$apellidoM')";
            $result = mysqli_query($connection, $query);

            if($result == true){
                $json = array('code' => 1, 'result' => "Registro exitoso");
                $jsonString = json_encode($json);
                echo $jsonString;
            }
            else{
                $json = array('code' => 2, 'result' => mysqli_error($connection));
                $jsonString = json_encode($json);
                echo $jsonString;
            }
        }

        CloseConnection($connection);
    }

    //Añadir asignatura
    function AddAsignatura(){
        $connection = OpenConnection();

        $matricula = $_POST["totalEstudiantes"];
        $asignatura = $_POST["nombreAsignatura"];
        $curp = $_POST["curp"];

        $query = "INSERT INTO asignaturas VALUES(DEFAULT,'$matricula', '$asignatura', '$curp')";
        $result = mysqli_query($connection, $query);

        if($result == true){
            $json = array('code' => 1, 'result' => "Registro exitoso");
            $jsonString = json_encode($json);
            echo $jsonString;
        }
        else{
            $json = array('code' => 2, 'result' => mysqli_error($connection));
            $jsonString = json_encode($json);
            echo $jsonString;
        }

        CloseConnection($connection);
    }

    //Añadir curso
    function AddCourse(){
        $connection = OpenConnection();

        $año = $_POST['inicio'];
        $duracion = $_POST['duracion'];

        $query = "INSERT INTO curso_escolar VALUES(DEFAULT, '$año', '$duracion')";
        $result = mysqli_query($connection, $query);

        if($result == true){
            $json = array('code' => 1, 'result' => "Registro exitoso");
            $jsonString = json_encode($json);
            echo $jsonString;
        }
        else{
            $json = array('code' => 2, 'result' => mysqli_error($connection));
            $jsonString = json_encode($json);
            echo $jsonString;
        }

        CloseConnection($connection);
    }

    //Añadir Programa
    function AddProgram(){
        $connection = OpenConnection();

        $asignatura = $_POST['asig'];
        $curso = $_POST['curso'];
        $programa = $_POST['nombre'];
        $duracion = $_POST['duracion'];

        $query = "INSERT INTO programa VALUES(DEFAULT, '$asignatura', '$curso', '$programa', '$duracion')";
        $result = mysqli_query($connection, $query);

        if($result == true){
            $json = array('code' => 1, 'result' => "Registro exitoso");
            $jsonString = json_encode($json);
            echo $jsonString;
        }
        else{
            $json = array('code' => 2, 'result' => mysqli_error($connection));
            $jsonString = json_encode($json);
            echo $jsonString;
        }
        
        CloseConnection($connection);
    }

    function GetAllStudents(){
        $connection = OpenConnection();

        $json = array();
        $query = "SELECT * FROM alumnos";
        $result = mysqli_query($connection, $query);
        while($persona = mysqli_fetch_row($result)){
            //Enviar extra cursos y promedio
            $nombre = $persona[1] . " " . $persona[2] . " " . $persona[3];
            $query = "SELECT * FROM matricula WHERE CURP = '{$persona[0]}'";
            $promedio = "No hay promedio";
            $matricula = mysqli_query($connection, $query);
            $cursos = mysqli_num_rows($matricula);
            if($cursos > 0){
                $totalCursos = 0;
                $totalNotas = 0;
                while($nota = mysqli_fetch_row($matricula)){
                    $totalCursos++;
                    $totalNotas += $nota[2];
                }
                $promedio = $totalNotas/$totalCursos;
            }
            $query = "SELECT user FROM login WHERE CURP_alumno = '{$persona[0]}'";
            $user = mysqli_query($connection, $query);
            if(mysqli_num_rows($user) == 0){
                $user = "No ha creado su cuenta";
            } 
            else{
                $user = mysqli_fetch_row($user);
                $user = $user[0];
            }
            $json[] = array('nombre'=>$nombre, 'curp'=>$persona[0], 'cursos'=>$cursos, 'promedio'=>$promedio, 'user'=>$user);
        }

        $jsonString = json_encode($json);
        echo $jsonString;

        CloseConnection($connection);
    }

    function GetAllTeachers(){
        $connection = OpenConnection();

        $json = array();
        $query = "SELECT * FROM profesores";
        $result = mysqli_query($connection, $query);
        while($persona = mysqli_fetch_row($result)){
            //Enviar extra cursos y promedio
            $nombre = $persona[1] . " " . $persona[2] . " " . $persona[3];

            $query = "SELECT * FROM asignaturas WHERE CURP = '{$persona[0]}'";
            $asignaturas = mysqli_query($connection, $query);
            $asignaturas = mysqli_num_rows($asignaturas);

            $query = "SELECT user FROM login WHERE CURP_profesor = '{$persona[0]}'";
            $user = mysqli_query($connection, $query);
            if(mysqli_num_rows($user) == 0){
                $user = "No ha creado su cuenta";
            } 
            else{
                $user = mysqli_fetch_row($user);
                $user = $user[0];
            }
            $json[] = array('nombre'=>$nombre, 'curp'=>$persona[0], 'asig'=>$asignaturas, 'user'=>$user);
        }

        $jsonString = json_encode($json);
        echo $jsonString;

        CloseConnection($connection);
    }

    //Eliminar un usuario (alumno o profesor)
    function DeleteUser(){
        $connection = OpenConnection();
        
        if($_POST['tipo'] == 'alumno'){
            $query = "DELETE FROM alumnos WHERE CURP = '{$_POST['curp']}'";
            $result = mysqli_query($connection, $query);
            if($result == true){
                echo "Alumno eliminado exitosamente";
            }else{
                echo "Ocurrió un erro: " . mysqli_error($connection);
            }
        }else if($_POST['tipo'] == 'profesor'){
            $query = "DELETE FROM profesores WHERE CURP = '{$_POST['curp']}'";
            $result = mysqli_query($connection, $query);
            if($result == true){
                echo "Profesor eliminado exitosamente";
            }else{
                echo "Ocurrió un erro: " . mysqli_error($connection);
            }
        }

        CloseConnection($connection);
    }

    function ChangePassWord(){
        $connection = OpenConnection();

        $user = $_POST['user'];
        $query = "UPDATE login SET password = '123456' WHERE user = '$user'";
        $result = mysqli_query($connection, $query);
        if($result == true){
            echo "Contraseña de $user reestablecida a 123456";
        }
        else{
            echo "Ocurrió un error al reestablecer la contraseña: " . mysqli_error($connection);
        }

        CloseConnection($connection);
    }

    function GetAllAsig(){
        $connection = OpenConnection();

        $json = array();
        $query = "SELECT * FROM asignaturas";
        $result = mysqli_query($connection, $query);
        while($asig = mysqli_fetch_row($result)){
            $query = "SELECT * FROM profesores WHERE CURP = '{$asig[3]}'";
            $profe = mysqli_query($connection, $query);
            $profe = mysqli_fetch_row($profe);
            $profeNombre = $profe[1] . " " . $profe[2] . " " . $profe[3];
            $json[] = array('nombre'=>$asig[2], 'id'=>$asig[0], 'matri'=>$asig[1], 'profe'=> $profeNombre, 'curp'=>$asig[3]);
        }   
        $jsonString = json_encode($json);
        echo $jsonString;

        CloseConnection($connection);
    }

    function DeleteAsig(){
        $connection = OpenConnection();

        $id = $_POST['id'];
        $query = "DELETE FROM asignaturas WHERE id_asignatura = '$id'";
        $result = mysqli_query($connection, $query);
        if($result == true){
            echo "Asignatura borrada exitosamente";
        }
        else{
            echo "Ocurrió un error: " . mysqli_error($connection);
        }

        CloseConnection($connection);
    }

    //Cursos
    function GetAllCourses(){
        $connection = OpenConnection();

        $json = array();
        $query = "SELECT * FROM curso_escolar";
        $result = mysqli_query($connection, $query);
        while($curso = mysqli_fetch_row($result)){
            $query = "SELECT * FROM programa WHERE id_curso = '{$curso[0]}'";
            $programas = mysqli_query($connection, $query);
            $programas = mysqli_num_rows($programas);

            $json[] = array('nombre'=>$curso[1], 'id'=>$curso[0], 'duracion'=>$curso[2], 'progs'=> $programas);
        }   
        $jsonString = json_encode($json);
        echo $jsonString;

        CloseConnection($connection);
    }

    function DeleteCourse(){
        $connection = OpenConnection();

        $id = $_POST['id'];
        $query = "DELETE FROM curso_escolar WHERE id_curso = '$id'";
        $result = mysqli_query($connection, $query);
        if($result == true){
            echo "Curso borrado exitosamente";
        }
        else{
            echo "Ocurrió un error: " . mysqli_error($connection);
        }

        CloseConnection($connection);
    }

    //Programas
    function GetAllProgramas(){
        $connection = OpenConnection();

        $json = array();
        $query = "SELECT * FROM programa";
        $result = mysqli_query($connection, $query);
        while($program = mysqli_fetch_row($result)){
            $query = "SELECT * FROM asignaturas WHERE id_asignatura = '{$program[1]}'";
            $asig = mysqli_query($connection, $query);
            $asig = mysqli_fetch_row($asig);
            $query = "SELECT anio_inicio FROM curso_escolar WHERE id_curso = '{$program[2]}'";
            $curso = mysqli_query($connection, $query);
            $curso = mysqli_fetch_row($curso);
            $query = "SELECT * FROM profesores WHERE CURP = '{$asig[3]}'";
            $profe = mysqli_query($connection, $query);
            $profe = mysqli_fetch_row($profe);
            $nombreProfe = $profe[1] . " " . $profe[2] . " " . $profe[3];

            $json[] = array('nombre'=>$program[3], 'id'=>$program[0], 'duracion'=>$program[4], 'asig'=> $asig[2], 'curso'=> $curso[0], 'profe'=> $nombreProfe);
        }   
        $jsonString = json_encode($json);
        echo $jsonString;

        CloseConnection($connection);
    }

    function DeleteProgram(){
        $connection = OpenConnection();

        $id = $_POST['id'];
        $query = "DELETE FROM programa WHERE id_programa = '$id'";
        $result = mysqli_query($connection, $query);
        if($result == true){
            echo "Programa borrado exitosamente";
        }
        else{
            echo "Ocurrió un error: " . mysqli_error($connection);
        }

        CloseConnection($connection);
    }
?>