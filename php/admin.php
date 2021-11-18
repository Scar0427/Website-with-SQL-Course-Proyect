<?php

$user="root";
$pass="";
$direction="localhost";
$db="universidad";

//$json = array();
$connection = mysqli_connect($direction, $user, $pass, $db);
if(mysqli_connect_error()){
    $json = array('code'=>2, 'result'=>"Ocurrió un error durante la conexión a la base de datos");
    $jsonString = json_encode($json);
    echo $jsonString;
    return;
}

    if(isset($_POST['operation'])){
        switch($_POST['operation']){
            case 'teachers':
                //Obtener y enviar maestros
                $json = array();
                $query = "SELECT CURP FROM profesores";
                $data = mysqli_query($connection, $query);
                for($i = 0; $i < mysqli_num_rows($data);$i++){
                    $final = mysqli_fetch_row($data);
                    $json[] = array('code'=>1, 'CURP'=>$final[0]);
                }
                $jsonString = json_encode($json);
                echo $jsonString;
                break;
            case 'asignatura':
                $json = array();
                $query = "SELECT * FROM asignaturas";
                $data = mysqli_query($connection, $query);
                for($i = 0; $i < mysqli_num_rows($data);$i++){
                    $final = mysqli_fetch_row($data);
                    $json[] = array('code'=>1, 'id'=>$final[0], 'nombre'=>$final[2]);
                }
                $jsonString = json_encode($json);
                echo $jsonString;
                break;
            case 'curso':
                $json = array();
                $query = "SELECT * FROM curso_escolar";
                $data = mysqli_query($connection, $query);
                for($i = 0; $i < mysqli_num_rows($data);$i++){
                    $final = mysqli_fetch_row($data);
                    $json[] = array('code'=>1, 'id'=>$final[0], 'nombre'=>$final[1]);
                }
                $jsonString = json_encode($json);
                echo $jsonString;
                break;
            }
    }
    else{
        //Añadir persona
        if($_POST['state'] == 1){
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
        }
        //Añadir asignatura
        else if($_POST['state'] == 2){
            $matricula = $_POST["totalEstudiantes"];
            $asignatura = $_POST["nombreAsignatura"];
            $curp = $_POST["curp"];

            $query = "INSERT INTO asignaturas VALUES(DEFAULT,'$matricula', '$asignatura', NULL, '$curp')";
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

        //Añadir curso
        else if($_POST['state'] == 3){
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
        }

        //Añadir programa
        else if($_POST['state'] == 4){
            $asignatura = $_POST['asig'];
            $curso = $_POST['curso'];
            $programa = $_POST['nombre'];
            $duracion = $_POST['duracion'];

            $query = "INSERT INTO matricula VALUES($asignatura, '$curso', '$programa', '$duracion')";
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
    }

    

        mysqli_close($connection);
?>