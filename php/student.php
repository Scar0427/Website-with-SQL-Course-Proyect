<?php
    include 'connection.php';

    if(isset($_POST["action"])){
        switch($_POST["action"]){
            case 'start':
                StartStudent();
                break;
            case 'close':
                CloseSession();
                break;
        }
        return;
    }

    function StartStudent(){
        session_start();
        $connection = OpenConnection();
        $curp = $_SESSION["userCURP"];
        if($curp == null){
            //No hay sesión iniciada
            $_SESSION["errors"] = "Por favor, inicia sesión para acceder a la página";
            $json = array('code'=>2, 'error'=>'noCurp');
            $jsonString = json_encode($json);
            echo $jsonString;
            return;
        }
        //echo "$curp <br>";
        $_SESSION["errors"] = null;

        $query = "SELECT * FROM alumnos WHERE CURP = '$curp'";
        $result = mysqli_query($connection, $query);

        $json = array();
        //Tipos: 1-Nombre, 2-Cursos
        if(mysqli_num_rows($result) > 0){
            $user = mysqli_fetch_row($result);
            $json[] = array('code' => 1, 'tipo'=>1, 'name' => $user[1] . " " . $user[2] . " " . $user[3]);
        }
        else{
            //Hay CURP pero es de maestro... o errado
            $_SESSION["errors"] = "Por favor, inicia sesión para acceder a la página";
            $json = array('code'=>2, 'error'=>'noCurp');
            $jsonString = json_encode($json);
            echo $jsonString;
            return;
        }

        $query = "SELECT * FROM matricula WHERE CURP = '$curp'";
        $result = mysqli_query($connection, $query);
        if(mysqli_num_rows($result) > 0){
            while($mat = mysqli_fetch_row($result)){
                $getProgram = "SELECT * FROM programa where id_programa = '{$mat[1]}'";
                $program = mysqli_query($connection, $getProgram);
                $program = mysqli_fetch_row($program);
                $getCurso = "SELECT anio_inicio FROM curso_escolar where id_curso = '{$program[2]}'";
                $curso = mysqli_query($connection,$getCurso);
                $curso = mysqli_fetch_row($curso);
                $getAsignatura = "SELECT * FROM asignaturas WHERE id_asignatura = '{$program[1]}'";
                $asignatura = mysqli_query($connection, $getAsignatura);
                $asignatura = mysqli_fetch_row($asignatura);
                $getProfesor = "SELECT * FROM profesores WHERE CURP = '{$asignatura[3]}'";
                $profesor = mysqli_query($connection, $getProfesor);
                $profesor = mysqli_fetch_row($profesor);
                $json[] = array('code'=>1, 'tipo'=>2, 'asignatura'=>$asignatura[2], 'curso'=>$curso[0], 'profesor'=> $profesor[1] . " " . $profesor[2] . " " . $profesor[3], 'nota'=>$mat[2]);
            }
        }

        $jsonString = json_encode($json);
        echo $jsonString;

        CloseConnection($connection);
    }

    function CloseSession(){
        session_start();
        $_SESSION["userCURP"] = null;
        $_SESSION["errors"] = "Sesión cerrada correctamente";
    }
?>