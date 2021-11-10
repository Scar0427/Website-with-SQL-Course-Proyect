<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <?php
        session_start();
        $user="root";
        $pass="";
        $direction="localhost";
        $db="universidad";

        //$json = array();
        $connection = mysqli_connect($direction, $user, $pass, $db);
        if(mysqli_connect_error()){
            echo "Ocurrio un error al conectarse a la base de datos";
            return;
        }
        
        $curp = $_SESSION["userCURP"];
        //echo "$curp <br>";
        $query = "SELECT * FROM alumnos WHERE CURP = '$curp'";

        $result = mysqli_query($connection, $query);
        if(mysqli_num_rows($result) > 0){
            $user = mysqli_fetch_row($result);
            echo "Bienvenido estudiante " . $user[1] . " " . $user[2] . " " . $user[3];
        }

        mysqli_close($connection);
    ?>
</body>
</html>