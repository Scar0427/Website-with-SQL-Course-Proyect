<?php
    include 'connection.php';

    if(isset($_POST["action"])){
        switch($_POST["action"]){
            case "start":
                CheckErrorsFromStart();
                break;
            case "login":
                CheckLogin();
                break;
        }
    }

    function CheckErrorsFromStart(){
        session_start();
        if(isset($_SESSION["errors"])){
            $json = array('code'=>2, "result" => $_SESSION["errors"]);
            $jsonString = json_encode($json);
            echo $jsonString;
            $_SESSION["errors"] = null;
        }
        else{
            $json = array('code'=>1);
            $jsonString = json_encode($json);
            echo $jsonString;
        }
    }

    function CheckLogin(){
        session_start();
        $connection = OpenConnection();

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
                else if($loginData[2] == "profesor"){
                    $json = $json = array('code' => 1, 'result'=>"Login completo", 'role'=>"profesor");
                    $_SESSION["userCURP"] = $loginData[4];
                }
                else{
                    $json = array('code' => 1, 'result'=>"Login completo", 'role'=>"admin");
                    $_SESSION["userCURP"] = null;
                }
            }
            else{
                $json = array('code' => 2,'result' => "Contraseña incorrecta");
            }
        }
        else{
            $json = array('code' => 2,'result' => "El usuario no existe");
        }    

        CloseConnection($connection);

        $jsonString = json_encode($json);
        echo $jsonString;
    }   
    
?>
