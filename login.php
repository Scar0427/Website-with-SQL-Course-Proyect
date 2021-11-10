<?php
    session_start();
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
    
    $user = $_POST["user"];
    $password = $_POST["pass"];

    $query = "SELECT * FROM login WHERE user = '$user'";

    $data = mysqli_query($connection, $query);
    if(mysqli_num_rows($data) > 0){
        $loginData = mysqli_fetch_row($data);
        if($loginData[1] == $password){
            if($loginData[2] == "alumno"){
                //Abrir página para los usuarios. El usuario existe, ahora solo abrimos la página de los alumnos, y almacenamos el CURP como variable de sesión
                //header("Location: user.php");
                $json = array('code' => 1, 'result'=>"Login completo", 'role'=>"alumno");

                $_SESSION["userCURP"] = $loginData[3];
            }
        }
        else{
            $json = array('code' => 2,'result' => "Contraseña incorrecta");
        }
    }
    else{
        $json = array('code' => 2,'result' => "El usuario no existe");
    }

    mysqli_close($connection);
    
    $jsonString = json_encode($json);
    echo $jsonString;
?>
