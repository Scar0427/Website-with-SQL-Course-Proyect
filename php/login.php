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
            case 'register':
                CreateUser();
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
    
    function CreateUser(){
        $connection = OpenConnection();

        //Primero hay que hacer una verificacion de seguridad
        //1-¿Es alumno?
        //2-¿Es profesor?
        //3-¿No tiene cuenta?
        //4-¿El usuario no esta en uso?
        //Si estas preguntas son verdaderas, se registra el usuario
        $curp = $_POST['curp'];
        $user = $_POST['user'];
        $password = $_POST['pass'];
        $query = "SELECT * FROM alumnos WHERE CURP = '$curp'";
        $result = mysqli_query($connection, $query);
        if(mysqli_num_rows($result) > 0){
            //Es alumno
            $query = "SELECT * FROM login WHERE CURP_alumno = '$curp'";
            $result= mysqli_query($connection, $query);
            if(mysqli_num_rows($result) <= 0){
                //No tiene cuenta de usuario
                $query = "SELECT * FROM login WHERE user = '$user'";
                $result = mysqli_query($connection, $query);
                if(mysqli_num_rows($result) == 0){
                    //Se puede crear la cuenta de alumno
                    $query = "INSERT INTO login VALUES('$user', '$password', 'alumno', '$curp', NULL)";
                    $result = mysqli_query($connection, $query);
                    if($result == true){
                        echo "Usuario creado exitosamente. Ya puede iniciar sesión";
                    }else{
                        echo "Ocurrió un error: " . mysqli_error($connection);
                    }
                }
                else{
                    echo "El nombre de usuario ya esta en uso. Por favor, escriba otro.";
                }
            }
            else{
                echo "El CURP introducido ya cuenta con un usuario. Puede iniciar sesión. Si cree que es un error, comuniquese con un administrador";
            }
        }
        else{
            $query = "SELECT * FROM profesores WHERE CURP = '$curp'";
            $result = mysqli_query($connection, $query);
            if(mysqli_num_rows($result) > 0){
                //Es profesor
                $query = "SELECT * FROM login WHERE CURP_profesor = '$curp'";
                $result = mysqli_query($connection, $query);
                if(mysqli_num_rows($result) == 0){
                    //No tiene cuenta de usuario
                    $query = "SELECT * FROM login WHERE user = '$user'";
                    $result = mysqli_query($connection, $query);
                    if(mysqli_num_rows($result) == 0){
                        //Se puede crear la cuenta de profesor
                        $query = "INSERT INTO login VALUES('$user', '$password', 'profesor', NULL, '$curp')";
                        $result = mysqli_query($connection, $query);
                        if($result == true){
                            echo "Usuario creado exitosamente. Ya puede iniciar sesión";
                        }else{
                            echo "Ocurrió un error: " . mysqli_error($connection);
                        }
                    }
                    else{
                        echo "El nombre de usuario ya esta en uso. Por favor, escriba otro.";
                    }
                }
                else{
                    echo "El CURP introducido ya cuenta con un usuario. Puede iniciar sesión. Si cree que es un error, comuniquese con un administrador";
                }
            }
            else{
                //No existe el CURP
                echo "El CURP introducido no existe. Por favor, verífiquelo. Si esta bien, comuniquese con un administrador";
            }
        }

        CloseConnection($connection);
    }
?>
