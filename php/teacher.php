<?php
    include 'connection.php';

    if(isset($_POST["action"])){
        switch($_POST["action"]){
            case 'start':
                StartTeacher();
                break;
            case 'close':
                CloseTeacher();
                break;
            case 'programs':
                GetProgramsOfCourse();
                break;
            case 'alumnosNoInscritos':
                ShowAlumnosSinMatricular();
                break;
            case 'addAlumnos':
                AddAlumnos();
                break;
        }
        return;
    }

    function StartTeacher(){
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

        $query = "SELECT * FROM profesores WHERE CURP = '$curp'";
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

        $query = "SELECT * FROM asignaturas WHERE CURP = '{$user[0]}'";
        $result = mysqli_query($connection, $query);
        if(mysqli_num_rows($result) > 0){
            while($asig = mysqli_fetch_row($result)){
                $query = "SELECT * FROM programa WHERE id_asignatura = '{$asig[0]}'";
                $total = mysqli_query($connection, $query);
                $total = mysqli_num_rows($total);
                $json[] = array('code'=>1, 'tipo'=>2, 'asignatura'=>$asig[2], 'matricula'=> $asig[1], 'id'=>$asig[0], 'programs'=>$total);
            }
        }

        $jsonString = json_encode($json);
        echo $jsonString;

        CloseConnection($connection);
    }

    function CloseTeacher(){
        session_start();
        $_SESSION["userCURP"] = null;
        $_SESSION["errors"] = "Sesión cerrada correctamente";
    }

    function GetProgramsOfCourse(){
        $connection = OpenConnection();

        $json = array();
        $courseID = $_POST["id_curso"];

        $query = "SELECT * FROM programa WHERE id_asignatura = '$courseID'";
        $result = mysqli_query($connection, $query);

        while($programa = mysqli_fetch_row($result)){
            $query = "SELECT * FROM matricula WHERE ID_PROGRAMA = '{$programa[0]}'";
            $matriculados = mysqli_query($connection, $query);
            $matriculados = mysqli_num_rows($matriculados);
            $query = "SELECT * FROM asignaturas WHERE id_asignatura = '$courseID'";
            $totalMatricula = mysqli_query($connection, $query);
            $totalMatricula = mysqli_fetch_row($totalMatricula);
            $slotsDisponibles = $totalMatricula[1] - $matriculados;
            $query = "SELECT anio_inicio FROM curso_escolar WHERE id_curso = '{$programa[2]}'";
            $curso = mysqli_query($connection, $query);
            $curso = mysqli_fetch_row($curso);
            $json[] = array('programa'=>$programa[3], 'matriculaTotal'=>$totalMatricula[1], 'matriculados'=>$matriculados, 'disponible'=>$slotsDisponibles, 'asignatura'=>$totalMatricula[2], 'curso'=>$curso[0], 'id'=>$programa[0]);
        }

        $jsonString = json_encode($json);
        echo $jsonString;
        CloseConnection($connection);
    }

    function ShowAlumnosSinMatricular(){
        $connection = OpenConnection();
        $json = array();
        $programID = $_POST["programID"];
        //Primero almacenamos en un array los alumnos que estan matriculados, ¿para que matricularlos 2 veces, verdad?
        $CURPMatriculados = array();
        $query = "SELECT * FROM matricula WHERE ID_PROGRAMA = '$programID'";
        $result = mysqli_query($connection, $query);
        $query = "SELECT * FROM programa WHERE id_programa = '$programID'";
        $prog = mysqli_query($connection, $query);
        $prog = mysqli_fetch_row($prog);
        while($matricula = mysqli_fetch_row($result)){
            $CURPMatriculados[] = "'{$matricula[0]}'";
        }
        $maxMatri = mysqli_query($connection, "SELECT Matrícula FROM asignaturas WHERE id_asignatura = '{$prog[1]}'");
        $maxMatri = mysqli_fetch_row($maxMatri);

        if(count($CURPMatriculados)>0){
            $curpInStrings = implode(",", $CURPMatriculados);
            $query = "SELECT * FROM alumnos WHERE CURP NOT IN($curpInStrings)";
        }else{
            $query = "SELECT * FROM alumnos";
        }
        //Ahora seleccionamos todos los alumnos que no esten en ese array
        
        $result = mysqli_query($connection, $query);
        $disponibles = $maxMatri[0] - count($CURPMatriculados);
        while($alumno = mysqli_fetch_row($result)){
            $json[] = array('nombre'=>$alumno[1] . " " . $alumno[2] . " " . $alumno[3], 'curp'=>$alumno[0], 'prog'=>$prog[3], 'dispo'=>$disponibles);
        }
        $jsonString = json_encode($json);
        echo $jsonString;
        CloseConnection($connection);
    }

    function AddAlumnos(){
        $connection = OpenConnection();
        $arrayCURPS = $_POST['curps'];
        $programID = $_POST['id_programa'];
        $alumnosRegistradosOK = 0;
        foreach($arrayCURPS as $alumnoCURP){
            $query = "INSERT INTO matricula VALUES('$alumnoCURP', '$programID', NULL)";
            $result = mysqli_query($connection, $query);
            if($result == true){
                $alumnosRegistradosOK++;
            }
            else{
                echo mysqli_error($connection) . "<br>";
            }
        }
        echo "Se registraron $alumnosRegistradosOK alumnos";
        CloseConnection($connection);
    }
?>